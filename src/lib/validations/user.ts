import { z } from "zod";

export const successSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const userProfileQuerySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  birthday: z.string(),
  hockeyLevel: z.string(),
  location: z.string(),
});

export const waitlistSchema = z.object({
  email: z.string().email(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export const logUserPurchaseSchema = z.object({
  productId: z.string().length(21),
  stripeCustomerId: z.string(),
  priceId: z.string(), // Stripe price ID
});

export type LogUserPurchaseInput = z.infer<typeof logUserPurchaseSchema>;

export const grantCourseAccessSchema = z.object({
  courseId: z.string(),
});

export type GrantCourseAccessInput = z.infer<typeof grantCourseAccessSchema>;

export const revokeCourseAccessSchema = z.object({
  courseId: z.string(),
});

export type RevokeCourseAccessInput = z.infer<typeof revokeCourseAccessSchema>;

export const userCoursesQuerySchema = z.array(
  z.object({
    courseId: z.string(),
    title: z.string(),
    description: z.string(),
  })
);

export type UserCoursesQueryOutput = z.infer<typeof userCoursesQuerySchema>;

export const userProductsQuerySchema = z.array(
  z.object({
    productId: z.string(),
    name: z.string(),
    description: z.string(),
    price: z.string(),
    type: z.enum(["one-time", "subscription"]),
  })
);

export type UserProductsQueryOutput = z.infer<typeof userProductsQuerySchema>;

export const userHasCourseInputSchema = z.object({
  courseId: z.string(),
});

export type UserHasCourseInput = z.infer<typeof userHasCourseInputSchema>;

export const userHasCourseQuerySchema = z.object({
  hasCourse: z.boolean(),
});

export type UserHasCourseQueryOutput = z.infer<typeof userHasCourseQuerySchema>;

export const requestOneonOneInputSchema = z.object({
  preferredTime1: z.string(),
  preferredTime2: z.string().optional(),
  preferredTime3: z.string().optional(),
  preferredDate1: z.string(),
  preferredDate2: z.string().optional(),
  preferredDate3: z.string().optional(),
  notes: z.string(),
});

export type RequestOneonOneInput = z.infer<typeof requestOneonOneInputSchema>;
