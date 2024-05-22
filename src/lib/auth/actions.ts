"use server";

import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { redirects } from "@/lib/utils";
import { validateRequest } from "@/lib/auth";

import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { isWithinExpirationDate, TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import {
  users,
  verificationTokens,
} from "@/lib/db/schema/auth";
// import { sendMail } from "@/lib/resend/send-mail";
// import { renderVerificationCodeEmail } from "@/components/emails/email-verification";

export interface ActionResponse<T> {
  fieldError?: Partial<Record<keyof T, string | undefined>>;
  formError?: string;
}

export const checkAuth = async () => {
  const { session } = await validateRequest();
  if (!session) {
    return redirect("/login");
  }
};

export async function logout(): Promise<{ error: string } | void> {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "No session found",
    };
  }
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  return redirect(redirects.afterLogout);
}

// export async function resendVerificationEmail(): Promise<{
//   error?: string;
//   success?: boolean;
// }> {
//   const { user } = await validateRequest();
//   if (!user) {
//     return redirect(redirects.toLogin);
//   }
//   const lastSent = await db.query.verificationTokens.findFirst({
//     where: (table, { eq }) => eq(table.userId, user.id),
//     columns: { expiresAt: true },
//   });

//   if (lastSent && isWithinExpirationDate(lastSent.expiresAt)) {
//     return {
//       error: `Please wait ${timeFromNow(lastSent.expiresAt)} before resending`,
//     };
//   }
//   const verificationCode = await generateEmailVerificationCode(
//     user.id,
//     user.email,
//   );
//   await sendMail({
//     to: user.email,
//     subject: "Verify your account",
//     body: renderVerificationCodeEmail({ code: verificationCode }),
//   });

//   return { success: true };
// }

export async function verifyEmail(
  _: any,
  formData: FormData,
): Promise<{ error: string } | void> {
  const code = formData.get("code");
  if (typeof code !== "string" || code.length !== 8) {
    return { error: "Invalid code" };
  }
  const { user } = await validateRequest();
  if (!user) {
    return redirect(redirects.toLogin);
  }

  const dbCode = await db.transaction(async (tx) => {
    const item = await tx.query.verificationTokens.findFirst({
      where: (table, { eq }) => eq(table.userId, users.id),
    });
    if (item) {
      await tx
        .delete(verificationTokens)
        .where(eq(verificationTokens.id, item.id));
    }
    return item;
  });

  if (!dbCode || dbCode.token !== code)
    return { error: "Invalid verification code" };

  if (!isWithinExpirationDate(dbCode.expiresAt))
    return { error: "Verification code expired" };

  if (dbCode.userId !== user?.email) return { error: "Email does not match" };

  await lucia.invalidateUserSessions(user?.id);
  await db
    .update(users)
    .set({ emailVerified: new Date() })
    .where(eq(users.id, user.id));
  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
  redirect(redirects.afterLogin);
}

const timeFromNow = (time: Date) => {
  const now = new Date();
  const diff = time.getTime() - now.getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  const seconds = Math.floor(diff / 1000) % 60;
  return `${minutes}m ${seconds}s`;
};

async function generateEmailVerificationCode(
  userId: string,
  email: string,
): Promise<string> {
  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.userId, userId));
  const token = generateRandomString(8, alphabet("0-9")); // 8 digit code
  await db.insert(verificationTokens).values({
    userId,
    token,
    expiresAt: createDate(new TimeSpan(10, "m")), // 10 minutes
  });
  return token;
}

