import { env } from "@/lib/env.mjs";
import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  schema: "./src/lib/db/schema/*",
  dbCredentials: {
    url: env.DATABASE_URL, 
  },
  verbose: true,
  strict: true,
} satisfies Config;
