import type { Config } from "drizzle-kit";
import { env } from "@/lib/env.mjs";

export default {
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  driver: "d1",
  dbCredentials: {
    connectionString: env.DATABASE_URL.concat("?sslmode=require"),
  }
} satisfies Config;