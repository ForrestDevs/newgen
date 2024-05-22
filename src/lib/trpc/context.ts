import { db } from "@/lib/db/index";
import { validateRequest } from "@/lib/auth";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export async function createTRPCContext(opts: { headers: Headers }) {
  const { session, user } = await validateRequest();
  if (!session || !user) {
    throw new Error("Session or User not found");
  }

  return {
    db,
    user,
    session,
    ...opts,
  }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;