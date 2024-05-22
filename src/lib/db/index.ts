import { env } from "@/lib/env.mjs";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as auth from "./schema/auth";
import * as waitlist from "./schema/waitlist";

let connection: postgres.Sql;

if (env.NODE_ENV === "production") {
  connection = postgres(env.DATABASE_URL, { prepare: false });
} else {
  const globalConnection = global as typeof globalThis & {
    connection: postgres.Sql;
  };
  if (!globalConnection.connection) {
    globalConnection.connection = postgres(env.DATABASE_URL, {
      prepare: false,
    });
  }
  connection = globalConnection.connection;
}

export const db = drizzle(connection, {
  schema: {
    ...auth,
    ...waitlist,
  },
  logger: env.NODE_ENV === "development",
});

export type DBClient = typeof db;
