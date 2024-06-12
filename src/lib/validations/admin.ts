import { z } from "zod";

export const createProductSchema = z.object({
  priceId: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  type: z.enum(["one-time", "subscription"]),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;

export const deleteProductSchema = z.object({
  productId: z.string(),
});

export type DeleteProductInput = z.infer<typeof deleteProductSchema>;

export const createCourseSchema = z.object({
  name: z.string(),
  description: z.string(),
  productId: z.string(),
});

export type CourseInput = z.infer<typeof createCourseSchema>;

export const deleteCourseSchema = z.object({
  courseId: z.string(),
});

export type DeleteCourseInput = z.infer<typeof deleteCourseSchema>;
