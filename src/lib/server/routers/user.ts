import { protectedProcedure, createTRPCRouter } from "@/lib/server/trpc";

export const userRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => ctx.user),
});
