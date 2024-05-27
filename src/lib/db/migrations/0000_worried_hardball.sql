CREATE TABLE IF NOT EXISTS "ng1_email_verification_codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"email" varchar(255) NOT NULL,
	"code" varchar(8) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "ng1_email_verification_codes_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ng1_password_reset_tokens" (
	"id" varchar(40) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ng1_sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ng1_users" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"discord_id" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"hashed_password" varchar(255),
	"avatar" varchar(255),
	"stripe_subscription_id" varchar(191),
	"stripe_price_id" varchar(191),
	"stripe_customer_id" varchar(191),
	"stripe_current_period_end" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "ng1_users_discord_id_unique" UNIQUE("discord_id"),
	CONSTRAINT "ng1_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ng1_waitlist" (
	"user_id" varchar(21) NOT NULL,
	"email" varchar(255) NOT NULL,
	"approved" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "ng1_waitlist_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "verification_code_user_idx" ON "ng1_email_verification_codes" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "verification_code_email_idx" ON "ng1_email_verification_codes" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "password_token_user_idx" ON "ng1_password_reset_tokens" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_idx" ON "ng1_sessions" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_email_idx" ON "ng1_users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_discord_idx" ON "ng1_users" ("discord_id");