import { createTRPCRouter } from "@/lib/server/trpc";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { stripeRouter } from "./stripe";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  stripe: stripeRouter,
});

export type AppRouter = typeof appRouter;
