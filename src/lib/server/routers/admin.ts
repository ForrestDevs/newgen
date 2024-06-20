import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  ProtectedTRPCContext,
} from "../trpc";
import { generateId } from "lucia";
import {
  createProductSchema,
  type CreateProductInput,
  deleteProductSchema,
  type DeleteProductInput,
  createCourseSchema,
  type CourseInput,
  deleteCourseSchema,
  type DeleteCourseInput,
} from "@/lib/validations/admin";
import { successSchema } from "@/lib/validations/user";
import { products, courses } from "@/lib/db/schema/product";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const adminRouter = createTRPCRouter({
  generateId: publicProcedure.output(z.string()).mutation(() => generateId(21)),
  listProducts: protectedProcedure
    // .output(z.array(z.object(products)))
    .query(({ ctx }) => listProducts({ ctx })),
  createProduct: protectedProcedure
    .input(createProductSchema)
    .output(successSchema)
    .mutation(({ input, ctx }) => createProduct({ input, ctx })),

  deleteProduct: protectedProcedure
    .input(deleteProductSchema)
    .output(successSchema)
    .mutation(({ input, ctx }) => deleteProduct({ input, ctx })),

  createCourse: protectedProcedure
    .input(createCourseSchema)
    .output(successSchema)
    .mutation(({ input, ctx }) => createCourse({ input, ctx })),

  deleteCourse: protectedProcedure
    .input(deleteCourseSchema)
    .output(successSchema)
    .mutation(({ input, ctx }) => deleteCourse({ input, ctx })),
});

async function listProducts({ ctx }: { ctx: ProtectedTRPCContext }) {
  const res = await ctx.db.select().from(products).execute();
  return res;
}

async function createProduct({
  input,
  ctx,
}: {
  input: CreateProductInput;
  ctx: ProtectedTRPCContext;
}) {
  const productId = generateId(21);

  try {
    await ctx.db.insert(products).values({
      id: productId,
      stripePriceId: input.priceId,
      name: input.name,
      description: input.description,
      price: input.price.toString(),
      type: input.type,
    });
  } catch (error) {
    console.error(error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create product.",
    });
  }

  return {
    success: true,
    message: `Product ${productId} created.`,
  };
}

async function deleteProduct({
  input,
  ctx,
}: {
  input: DeleteProductInput;
  ctx: ProtectedTRPCContext;
}) {
  try {
    await ctx.db.delete(products).where(eq(products.id, input.productId));
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to delete product.",
    });
  }

  return {
    success: true,
    message: `Product ${input.productId} deleted.`,
  };
}

async function createCourse({
  input,
  ctx,
}: {
  input: CourseInput;
  ctx: ProtectedTRPCContext;
}) {
  const courseId = generateId(21);
  try {
    await ctx.db.insert(courses).values({
      id: courseId,
      title: input.name,
      description: input.description,
      productId: input.productId,
    });
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to create course.",
    });
  }

  return {
    success: true,
    message: `Course ${courseId} created.`,
  };
}

async function deleteCourse({
  input,
  ctx,
}: {
  input: DeleteCourseInput;
  ctx: ProtectedTRPCContext;
}) {
  try {
    await ctx.db.delete(courses).where(eq(courses.id, input.courseId));
  } catch (error) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to delete course.",
    });
  }

  return {
    success: true,
    message: `Course ${input.courseId} deleted.`,
  };
}
