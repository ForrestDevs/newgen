import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { lucia } from "@/lib/auth";
import { env } from "@/lib/env.mjs";
import { cookies } from "next/headers";
import { TRPCError } from "@trpc/server";
import { generateId, Scrypt } from "lucia";
import { redirect } from "next/navigation";
import { Paths } from "@/config/constants";
import { EmailTemplate, sendMail } from "@/lib/email";
import { generateRandomString, alphabet } from "oslo/crypto";
import { isWithinExpirationDate, TimeSpan, createDate } from "oslo";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  ProtectedTRPCContext,
} from "@/lib/server/trpc";
import {
  authResponseSchema,
  loginSchema,
  signupSchema,
  resetPasswordSchema,
  forgotPasswordSchema,
  verifyEmailSchema,
  type LoginInput,
  type SignupInput,
  type ResetPasswordInput,
  type ForgotPasswordInput,
  type VerifyEmailInput,
  ProfileInput,
  IntroSurveyInput,
  profileSchema,
  introSurveySchema,
} from "@/lib/validations/auth";
import {
  users,
  emailVerificationCodes,
  passwordResetTokens,
  userProfiles,
  userSurveyResponses,
} from "@/lib/db/schema";

export const authRouter = createTRPCRouter({
  login: publicProcedure
    .input(loginSchema)
    .output(authResponseSchema)
    .mutation((input) => login(input)),
  logout: protectedProcedure
    .output(authResponseSchema)
    .mutation((ctx) => logout(ctx)),
  signup: publicProcedure
    .input(signupSchema)
    .output(authResponseSchema)
    .mutation((input) => signup(input)),
  verifyEmail: protectedProcedure
    .input(verifyEmailSchema)
    .output(authResponseSchema)
    .mutation(({ input, ctx }) => verifyEmail({ input, ctx })),
  resendVerificationEmail: protectedProcedure.mutation((ctx) =>
    resendVerificationEmail(ctx)
  ),
  createProfile: protectedProcedure
    .input(profileSchema)
    .output(authResponseSchema)
    .mutation(({ input, ctx }) => createProfile({ input, ctx })),
  submitIntroSurvey: protectedProcedure
    .input(introSurveySchema)
    .output(authResponseSchema)
    .mutation(({ input, ctx }) => submitIntroSurvey({ input, ctx })),
  sendPasswordResetLink: publicProcedure
    .input(forgotPasswordSchema)
    .output(authResponseSchema)
    .mutation((input) => sendPasswordResetLink(input)),
  resetPassword: publicProcedure
    .input(resetPasswordSchema)
    .output(authResponseSchema)
    .mutation((input) => resetPassword(input)),
});

async function logout({ ctx }: { ctx: ProtectedTRPCContext }) {
  const { session } = ctx;
  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "No session found",
    });
  }
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  try {
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { redirect: Paths.Login };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to set session cookie",
    });
  }
}

async function login({ input }: { input: LoginInput }) {
  const { email, password } = input;
  const existingUser = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, email),
  });
  if (!existingUser || !existingUser.hashedPassword) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid email or password",
    });
  }
  const validPassword = await new Scrypt().verify(
    existingUser.hashedPassword,
    password
  );
  if (!validPassword) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid email or password",
    });
  }
  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  try {
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { redirect: Paths.Dashboard };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to set session cookie",
    });
  }
}

async function signup({ input }: { input: SignupInput }) {
  const { email, password } = input;

  const existingUser = await db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, email),
    columns: { email: true },
  });

  if (existingUser) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Email already in use",
    });
  }

  const userId = generateId(21);
  const hashedPassword = await new Scrypt().hash(password);

  await db.insert(users).values({
    email,
    id: userId,
    hashedPassword,
  });

  const verificationCode = await generateEmailVerificationCode(userId, email);

  await sendMail(email, EmailTemplate.EmailVerification, {
    code: verificationCode,
  });

  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return { redirect: Paths.VerifyEmail };
}

async function verifyEmail({
  input,
  ctx,
}: {
  input: VerifyEmailInput;
  ctx: ProtectedTRPCContext;
}) {
  const { code } = input;
  const { user } = ctx;

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User not authenticated",
    });
  }

  const dbCode = await db.transaction(async (tx) => {
    const item = await tx.query.emailVerificationCodes.findFirst({
      where: (table, { eq }) => eq(table.userId, user.id),
    });
    if (item) {
      await tx
        .delete(emailVerificationCodes)
        .where(eq(emailVerificationCodes.id, item.id));
    }
    return item;
  });

  if (!dbCode || dbCode.code !== code) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid verification code",
    });
  }

  if (!isWithinExpirationDate(dbCode.expiresAt)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Verification code expired",
    });
  }

  if (dbCode.email !== user.email) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Email does not match",
    });
  }

  await lucia.invalidateUserSessions(user.id);
  await db
    .update(users)
    .set({ emailVerified: true })
    .where(eq(users.id, user.id));
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return { redirect: Paths.CreateProfile };
}

async function resendVerificationEmail({ ctx }: { ctx: ProtectedTRPCContext }) {
  const { user } = ctx;
  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User not authenticated",
    });
  }
  const lastSent = await db.query.emailVerificationCodes.findFirst({
    where: (table, { eq }) => eq(table.userId, user.id),
    columns: { expiresAt: true },
  });

  if (lastSent && isWithinExpirationDate(lastSent.expiresAt)) {
    throw new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message: `Please wait ${timeFromNow(
        lastSent.expiresAt
      )} before resending`,
    });
  }
  const verificationCode = await generateEmailVerificationCode(
    user.id,
    user.email
  );
  await sendMail(user.email, EmailTemplate.EmailVerification, {
    code: verificationCode,
  });
  return { success: true };
}

async function createProfile({
  input,
  ctx,
}: {
  input: ProfileInput;
  ctx: ProtectedTRPCContext;
}) {
  const { firstName, lastName, birthday, location, hockeyLevel } = input;

  const { user } = ctx;

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User not authenticated",
    });
  }

  const existingProfile = await db.query.userProfiles.findFirst({
    where: (table, { eq }) => eq(table.userId, user.id),
  });

  if (existingProfile) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Profile already exists",
    });
  }

  try {
    await db.insert(userProfiles).values({
      userId: user.id,
      firstName,
      lastName,
      birthday,
      location,
      hockeyLevel,
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create profile",
    });
  }

  return { redirect: Paths.IntroSurvey };
}

async function submitIntroSurvey({
  input,
  ctx,
}: {
  input: IntroSurveyInput;
  ctx: ProtectedTRPCContext;
}) {
  const { goal, performance } = input;
  const { user } = ctx;

  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User not authenticated",
    });
  }

  // const existingSurveyInput = await db.query.userSurveyResponses.findFirst({
  //   where: (table, { eq }) =>
  //     eq(table.userId, user.id) && eq(table.surveyTitle, "intro"),
  // });

  // if (existingSurveyInput) {
  //   throw new TRPCError({
  //     code: "BAD_REQUEST",
  //     message: "Survey already submitted",
  //   });
  // }

  try {
    await db.insert(userSurveyResponses).values({
      id: generateId(21),
      userId: user.id,
      surveyTitle: "intro",
      responses: { goal, performance },
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to submit survey",
    });
  }

  return { redirect: Paths.Dashboard };
}

async function sendPasswordResetLink({
  input,
}: {
  input: ForgotPasswordInput;
}) {
  const { email } = input;

  try {
    const user = await db.query.users.findFirst({
      where: (table, { eq }) => eq(table.email, email),
    });

    if (!user || !user.emailVerified) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Provided email is invalid.",
      });
    }

    const verificationToken = await generatePasswordResetToken(user.id);

    const verificationLink = `${env.NEXT_PUBLIC_APP_URL}/reset-password/${verificationToken}`;

    await sendMail(user.email, EmailTemplate.PasswordReset, {
      link: verificationLink,
    });

    return { redirect: Paths.Home };
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to send password reset link",
    });
  }
}

async function resetPassword({ input }: { input: ResetPasswordInput }) {
  const { token, password } = input;

  const dbToken = await db.transaction(async (tx) => {
    const item = await tx.query.passwordResetTokens.findFirst({
      where: (table, { eq }) => eq(table.id, token),
    });
    if (item) {
      await tx
        .delete(passwordResetTokens)
        .where(eq(passwordResetTokens.id, item.id));
    }
    return item;
  });

  if (!dbToken) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid password reset token.",
    });
  }

  if (!isWithinExpirationDate(dbToken.expiresAt)) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Password reset link expired.",
    });
  }

  await lucia.invalidateUserSessions(dbToken.userId);

  const hashedPassword = await new Scrypt().hash(password);

  try {
    await db
      .update(users)
      .set({ hashedPassword })
      .where(eq(users.id, dbToken.userId));
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to reset password",
    });
  }
  const session = await lucia.createSession(dbToken.userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return { redirect: Paths.Dashboard };
}

async function generateEmailVerificationCode(
  userId: string,
  email: string
): Promise<string> {
  await db
    .delete(emailVerificationCodes)
    .where(eq(emailVerificationCodes.userId, userId));
  const code = generateRandomString(8, alphabet("0-9")); // 8 digit code
  await db.insert(emailVerificationCodes).values({
    userId,
    email,
    code,
    expiresAt: createDate(new TimeSpan(10, "m")), // 10 minutes
  });
  return code;
}

async function generatePasswordResetToken(userId: string): Promise<string> {
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.userId, userId));
  const tokenId = generateId(40);
  await db.insert(passwordResetTokens).values({
    id: tokenId,
    userId,
    expiresAt: createDate(new TimeSpan(2, "h")),
  });
  return tokenId;
}

function timeFromNow(time: Date): string {
  const now = new Date();
  const diff = time.getTime() - now.getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  const seconds = Math.floor(diff / 1000) % 60;
  return `${minutes}m ${seconds}s`;
}
