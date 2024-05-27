import * as z from "zod";
import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { TRPCError } from "@trpc/server";
import { waitlist } from "@/lib/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  waitlist: publicProcedure
    .input(z.object({ email: z.string().email() }))
    .output(z.object({ success: z.boolean(), message: z.string() }))
    .mutation(async ({ input }) => {
      const newId = uuidv4();

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
    }),
});
