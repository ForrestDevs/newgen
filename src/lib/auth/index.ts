import { db } from "@/lib/db";
import { users, sessions, type User as DbUser } from "@/lib/db/schema";
import { Lucia, TimeSpan, type User, type Session } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { env } from "@/lib/env.mjs";

const IS_DEV = env.NODE_ENV === "development" ? "DEV" : "PROD";

const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

interface DatabaseUserAttributes extends Omit<DbUser, "hashedPassword"> {}
interface DatabaseSessionAttributes {}

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

export const lucia = new Lucia(adapter, {
  getSessionAttributes: () => {
    return {};
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      email: attributes.email,
      emailVerified: attributes.emailVerified,
      avatar: attributes.avatar,
      createdAt: attributes.createdAt,
      updatedAt: attributes.updatedAt,
    };
  },
  sessionExpiresIn: new TimeSpan(30, "d"), // 30 days
  sessionCookie: {
    name: "session",
    expires: false, // session cookies have very long lifespan (2 years)
    attributes: {
      secure: !IS_DEV,
    },
  },
});
