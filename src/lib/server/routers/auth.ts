import { router } from "../trpc";
import { publicProcedure } from "../trpc";
import { generateState } from "arctic";
import { github, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { env } from "@/lib/env.mjs";
import { db } from "@/lib/db";
import { accounts, users, NewAccount, NewUser } from "@/lib/db/schema/auth";
import { eq, and } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

import * as z from "zod";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";

export const githubCallbackInput = z.object({
  code: z.string(),
});

export const authRouter = router({
  githubAuth: publicProcedure
    .output(z.object({ status: z.number(), location: z.string() }))
    .mutation(async () => {
      const state = generateState();
      const url = await github.createAuthorizationURL(state, {
        scopes: ["identify", "user:email"],
      });

      console.log("state", state);

      cookies().set("github-oauth-state", state, {
        path: "/",
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        httpOnly: true,
        maxAge: 60 * 10, // 10 minutes
      });

      console.log("url", url);

      return {
        status: 302,
        location: url.href,
      };
    }),

  githubCallback: publicProcedure
    .input(githubCallbackInput)
    .output(z.object({ status: z.number(), location: z.string() }))
    .mutation(async ({ input: data }) => {
      const tokens = await github.validateAuthorizationCode(data.code);
      const githubUserResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      });

      if (!githubUserResponse.ok) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to fetch user",
        });
      }

      const githubUser = await githubUserResponse.json();
      let existingAccount;
      try {
        [existingAccount] = await db
          .select()
          .from(accounts)
          .where(
            and(
              eq(accounts.provider, "github"),
              eq(accounts.providerId, githubUser.id)
            )
          )
          .limit(1);
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch account",
        });
      }
      if (existingAccount) {
        let user;
        try {
          [user] = await db
            .select()
            .from(users)
            .where(eq(users.id, existingAccount.userId))
            .limit(1);
        } catch (err) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch user",
          });
        }

        if (!user) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to fetch user",
          });
        }

        const session = await lucia.createSession(
          existingAccount.userId,
          {},
          { sessionId: uuidv4() }
        );
        const sessionCookie = lucia.createSessionCookie(session.id);

        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes
        );
      } else {
        try {
          const userId = uuidv4();

          await db.transaction(async (tx) => {
            const githubUserEmailsResponse = await fetch(
              "https://api.github.com/user/emails",
              {
                headers: {
                  Authorization: `Bearer ${tokens.accessToken}`,
                },
              }
            );

            if (!githubUserEmailsResponse.ok) {
              throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "Failed to fetch emails",
              });
            }

            const githubUserEmails: { email: string; primary: boolean }[] =
              await githubUserEmailsResponse.json();

            const primaryEmail = githubUserEmails.find(
              (email) => email.primary
            )?.email;

            const newAccount: NewAccount = {
              provider: "github",
              providerId: githubUser.id,
              userId: userId,
            };

            if (!primaryEmail) {
              throw new Error("No email found");
            }
            // const [firstName, lastName] = githubUser.name.split(" ");

            const newUser: NewUser = {
              id: userId,
              email: primaryEmail,
              emailVerified: new Date(),
              username: githubUser.name,
              image: githubUser.avatar_url,
            };

            await tx.insert(users).values(newUser);
            await tx.insert(accounts).values(newAccount);
          });

          const session = await lucia.createSession(
            userId,
            {},
            { sessionId: uuidv4() }
          );

          const sessionCookie = lucia.createSessionCookie(session.id);

          cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
          );
        } catch (err) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to create user",
          });
        }
      }

      return {
        status: 302,
        location: "/dashboard",
      };
    }),
});
