import { db } from "@/lib/db";
import { generateId } from "lucia";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { products, courses, courseAccess } from "@/lib/db/schema/product";
import {
  userProfiles,
  waitlist,
  userPurchases,
  oneOnOneRequests,
} from "@/lib/db/schema/user";
import {
  protectedProcedure,
  createTRPCRouter,
  publicProcedure,
  ProtectedTRPCContext,
} from "@/lib/server/trpc";
import {
  GrantCourseAccessInput,
  LogUserPurchaseInput,
  RequestOneonOneInput,
  RevokeCourseAccessInput,
  UserHasCourseInput,
  WaitlistInput,
  grantCourseAccessSchema,
  logUserPurchaseSchema,
  requestOneonOneInputSchema,
  revokeCourseAccessSchema,
  successSchema,
  userCoursesQuerySchema,
  userHasCourseInputSchema,
  userHasCourseQuerySchema,
  userProductsQuerySchema,
  userProfileQuerySchema,
  waitlistSchema,
  UserProfileQueryOutput,
} from "@/lib/validations/user";
import { authResponseSchema } from "@/lib/validations/auth";
import { EmailTemplate, sendMail } from "@/lib/email";

export const userRouter = createTRPCRouter({
  getUserProfile: protectedProcedure
    .output(userProfileQuerySchema)
    .query((ctx) => getUserProfile(ctx)),
  addUserToWaitlist: publicProcedure
    .input(waitlistSchema)
    .output(successSchema)
    .mutation((input) => addUserToWaitlist(input)),
  requestOneonOne: protectedProcedure
    .input(requestOneonOneInputSchema)
    .output(successSchema)
    .mutation(({ input, ctx }) => requestOneonOne({ input, ctx })),
  logUserPurchase: protectedProcedure
    .input(logUserPurchaseSchema)
    .output(successSchema)
    .mutation(({ input, ctx }) => logUserPurchase({ input, ctx })),
  grantUserCourseAccess: protectedProcedure
    .input(grantCourseAccessSchema)
    .output(successSchema)
    .mutation(({ input, ctx }) => grantCourseAccess({ input, ctx })),
  revokeUserCourseAccess: protectedProcedure
    .input(revokeCourseAccessSchema)
    .output(successSchema)
    .mutation(({ input, ctx }) => revokeCourseAccess({ input, ctx })),
  getUserCourses: protectedProcedure
    .output(userCoursesQuerySchema)
    .query((ctx) => getUserCourses(ctx)),
  getUserProducts: protectedProcedure
    .output(userProductsQuerySchema)
    .query((ctx) => getUserProducts(ctx)),
  userHasCourse: protectedProcedure
    .input(userHasCourseInputSchema)
    .output(userHasCourseQuerySchema)
    .query(({ input, ctx }) => userHasCourse({ input, ctx })),
});

async function requestOneonOne({
  input,
  ctx,
}: {
  input: RequestOneonOneInput;
  ctx: ProtectedTRPCContext;
}) {
  const newId = generateId(21);

  const user = ctx.user;

  if (!user) {
    throw new TRPCError({
      message: "User not found",
      code: "NOT_FOUND",
    });
  }

  let preferredDate1Final: string,
    preferredDate2Final: string | undefined,
    preferredDate3Final: string | undefined;
  preferredDate1Final = input.preferredDate1 + input.preferredTime1;

  if (input.preferredDate2 && input.preferredTime2) {
    preferredDate2Final = input.preferredDate2 + input.preferredTime2;
  }

  if (input.preferredDate3 && input.preferredTime3) {
    preferredDate3Final = input.preferredDate3 + input.preferredTime3;
  }

  try {
    await ctx.db.insert(oneOnOneRequests).values({
      id: newId,
      userId: user.id,
      preferredDate1: preferredDate1Final,
      preferredDate2: preferredDate2Final,
      preferredDate3: preferredDate3Final,
      notes: input.notes,
    });

    // Send email to coach
    await sendMail("mateodixon@gmail.com", EmailTemplate.OneOnOneCoach, {
      userEmail: user.email,
      notes: input.notes,
      preferredDate1: preferredDate1Final,
      preferredDate2: preferredDate2Final,
      preferredDate3: preferredDate3Final,
    });

    // Send email to user
    await sendMail(user.email, EmailTemplate.OneOnOneUser, {
      notes: input.notes,
      preferredDate1: preferredDate1Final,
      preferredDate2: preferredDate2Final,
      preferredDate3: preferredDate3Final,
    });

    return {
      success: true,
      message: "One on one request sent",
    };
  } catch (error) {
    console.error("Failed to insert one on one request", error);
    throw new TRPCError({
      message: "Failed to insert one on one request",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

async function getUserProfile({ ctx }: { ctx: ProtectedTRPCContext }) {
  const user = ctx.user;
  if (!user) {
    return {
      success: false,
      redirect: "/login",
    };
  }
  console.log("Getting user profile for user: ", user.id);

  if (!user.emailVerified) {
    console.log("User email not verified");
    return {
      success: false,
      redirect: "/verify-email",
    };
  }

  try {
    const userProfile = await db
      .select({
        firstName: userProfiles.firstName,
        lastName: userProfiles.lastName,
        birthday: userProfiles.birthday,
        hockeyLevel: userProfiles.hockeyLevel,
        location: userProfiles.location,
      })
      .from(userProfiles)
      .where(eq(userProfiles.userId, ctx.user.id))
      .limit(1);

    return {
      success: true,
      redirect: "",
      data: {
        firstname: userProfile[0].firstName ?? "",
        lastname: userProfile[0].lastName ?? "",
        birthday: userProfile[0].birthday?.toLocaleDateString() ?? "",
        hockeylevel: userProfile[0].hockeyLevel ?? "",
        location: userProfile[0].location ?? "",
      },
    };
  } catch (error) {
    console.error("Failed to get user profile", error);
    return { success: false, redirect: "/create-profile" };
  }
}

async function addUserToWaitlist({ input }: { input: WaitlistInput }) {
  const newId = generateId(21);

  await db.transaction(async (tx) => {
    // make sure the email is not already in the waitlist
    const existing = await tx
      .select()
      .from(waitlist)
      .where(eq(waitlist.email, input.email))
      .limit(1);

    if (existing.length) {
      throw new TRPCError({
        message: "Email already in waitlist",
        code: "BAD_REQUEST",
      });
    }

    try {
      await tx.insert(waitlist).values({
        userId: newId,
        email: input.email,
      });
    } catch (error) {
      throw new TRPCError({
        message: "Failed to insert email",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  });

  return {
    success: true,
    message: "Email added to waitlist",
  };
}

async function logUserPurchase({
  input,
  ctx,
}: {
  input: LogUserPurchaseInput;
  ctx: ProtectedTRPCContext;
}) {
  const user = ctx.user;

  if (!user) {
    throw new TRPCError({
      message: "User not found",
      code: "NOT_FOUND",
    });
  }

  const purchaseId = generateId(21);
  const { productId, stripeCustomerId, priceId } = input;

  try {
    await ctx.db.insert(userPurchases).values({
      id: purchaseId,
      userId: user.id,
      productId,
      stripeCustomerId,
      priceId,
    });

    return {
      success: true,
      message: "User purchase logged",
    };
  } catch (error) {
    throw new TRPCError({
      message: "Failed to log user purchase",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

async function grantCourseAccess({
  input,
  ctx,
}: {
  input: GrantCourseAccessInput;
  ctx: ProtectedTRPCContext;
}) {
  const user = ctx.user;

  if (!user) {
    throw new TRPCError({
      message: "User not found",
      code: "NOT_FOUND",
    });
  }

  const courseUserId = generateId(21);

  try {
    await ctx.db.insert(courseAccess).values({
      id: courseUserId,
      courseId: input.courseId,
      userId: ctx.user.id,
    });
  } catch (error) {
    throw new TRPCError({
      message: "Failed to grant course access",
      code: "INTERNAL_SERVER_ERROR",
    });
  }

  return {
    success: true,
    message: `Course ${input.courseId} access granted to user with ID: ${ctx.user.id}`,
  };
}

async function revokeCourseAccess({
  input,
  ctx,
}: {
  input: RevokeCourseAccessInput;
  ctx: ProtectedTRPCContext;
}) {
  await db.transaction(async (tx) => {
    try {
      await tx
        .delete(courseAccess)
        .where(
          and(
            eq(courseAccess.courseId, input.courseId),
            eq(courseAccess.userId, ctx.user.id)
          )
        );
    } catch (error) {
      throw new TRPCError({
        message: "Failed to revoke course access",
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  });

  return {
    success: true,
    message: "Course access revoked from user with ID: " + ctx.user.id,
  };
}

async function getUserCourses({ ctx }: { ctx: ProtectedTRPCContext }) {
  const user = ctx.user;

  if (!user) {
    throw new TRPCError({
      message: "User not found",
      code: "NOT_FOUND",
    });
  }

  try {
    const courseList = await db
      .select({
        courseId: courses.id,
        title: courses.title,
        description: courses.description,
      })
      .from(courses)
      .leftJoin(courseAccess, eq(courses.id, courseAccess.courseId))
      .where(eq(courseAccess.userId, ctx.user.id));

    if (!courseList.length) {
      throw new TRPCError({
        message: "No courses found for user",
        code: "NOT_FOUND",
      });
    }
    return courseList;
  } catch (error) {
    throw new TRPCError({
      message: "Failed to get user courses",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

async function getUserProducts({ ctx }: { ctx: ProtectedTRPCContext }) {
  const user = ctx.user;

  if (!user) {
    throw new TRPCError({
      message: "User not found",
      code: "NOT_FOUND",
    });
  }

  try {
    const productList = await db
      .select({
        id: products.id,
        name: products.name,
        description: products.description,
        price: products.price,
        stripePriceId: products.stripePriceId,
        type: products.type,
      })
      .from(products)
      .leftJoin(userPurchases, eq(products.id, userPurchases.productId))
      .where(eq(userPurchases.userId, ctx.user.id));

    if (!productList.length) {
      throw new TRPCError({
        message: "No products found for user",
        code: "NOT_FOUND",
      });
    }
    return productList.map((product) => ({
      productId: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stripePriceId: product.stripePriceId,
      type: product.type,
    }));
  } catch (error) {
    throw new TRPCError({
      message: "Failed to get user products",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}

async function userHasCourse({
  input,
  ctx,
}: {
  input: UserHasCourseInput;
  ctx: ProtectedTRPCContext;
}) {
  const user = ctx.user;

  console.log("Checking user course access", user);

  if (!user) {
    throw new TRPCError({
      message: "User not found",
      code: "NOT_FOUND",
    });
  }

  try {
    const course = await db
      .select()
      .from(courseAccess)
      .where(
        and(
          eq(courseAccess.userId, ctx.user.id),
          eq(courseAccess.courseId, input.courseId)
        )
      );

    console.log("Course Access", course);

    if (!course.length) {
      console.log("User does not have course");
      return { hasCourse: false };
    }

    return { hasCourse: true };
  } catch (error) {
    throw new TRPCError({
      message: "Failed to get user course",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
}
