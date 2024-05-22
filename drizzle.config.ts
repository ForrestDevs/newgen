import { env } from "@/lib/env.mjs";
import { defineConfig } from "drizzle-kit"


export default defineConfig({
    dialect: "postgresql", // "postgresql" | "mysql"
    dbCredentials: {
        url: env.DATABASE_URL.concat("?sslmode=require")
    }
})