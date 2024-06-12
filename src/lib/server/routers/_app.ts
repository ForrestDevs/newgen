import { createTRPCRouter } from "@/lib/server/trpc";
import { authRouter } from "./auth";
import { userRouter } from "./user";
import { stripeRouter } from "./stripe";
import { adminRouter } from "./admin";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  stripe: stripeRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;


