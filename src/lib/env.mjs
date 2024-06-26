import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (str) => !str.includes("YOUR_DATABASE_URL_HERE"),
        "You forgot to change the default URL"
      ),
    DATABASE_PREFIX: z.string().min(1),
    SMTP_HOST: z.string().trim().min(1),
    SMTP_PORT: z.number().int().min(1),
    SMTP_USER: z.string().trim().min(1),
    SMTP_PASSWORD: z.string().trim().min(1),
    STRIPE_API_KEY: z.string().trim().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().trim().min(1),
    STRIPE_ROCKET_FUEL_PRICE_ID: z.string().trim().min(1),
    ROCKET_FUEL_PRODUCT_ID: z.string().trim().min(1),
    MUX_TOKEN_SECRET: z.string().trim().min(1),
    MUX_TOKEN_ID: z.string().trim().min(1),
    PAYLOAD_SECRET: z.string().trim().min(1),
    RESEND_API_KEY: z.string().min(1),
  },
  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().trim().min(1),
    NEXT_PUBLIC_ROCKET_FUEL_COURSE_ID: z.string().trim().min(1),
  },
  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    // Server-side env vars
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_PREFIX: process.env.DATABASE_PREFIX,
    NODE_ENV: process.env.NODE_ENV,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: parseInt(process.env.SMTP_PORT ?? ""),
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    STRIPE_ROCKET_FUEL_PRICE_ID: process.env.STRIPE_ROCKET_FUEL_PRICE_ID,
    ROCKET_FUEL_PRODUCT_ID: process.env.ROCKET_FUEL_PRODUCT_ID,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    MUX_TOKEN_SECRET: process.env.MUX_TOKEN_SECRET,
    MUX_TOKEN_ID: process.env.MUX_TOKEN_ID,
    // Client-side env vars
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_ROCKET_FUEL_COURSE_ID: process.env.NEXT_PUBLIC_ROCKET_FUEL_COURSE_ID,
  },
  // /**
  //  * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
  //  * useful for Docker builds.
  //  */
  // skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  // /**
  //  * Makes it so that empty strings are treated as undefined.
  //  * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
  //  */
  emptyStringAsUndefined: true,
});
