import { env } from "@/lib/env.mjs";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { pgTableCreator } from "drizzle-orm/pg-core";
import * as authSchema from "./schema/auth";
import * as userSchema from "./schema/user";
import * as productSchema from "./schema/product";
import * as offseasonSchema from "./schema/offseason";

const schema = {
  ...authSchema,
  ...userSchema,
  ...productSchema,
  ...offseasonSchema,
};

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
  schema,
  logger: env.NODE_ENV === "development",
});

export type DBClient = typeof db;
