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
DROP TABLE "accounts";--> statement-breakpoint
DROP TABLE "verification_tokens";--> statement-breakpoint
DROP TABLE "subscriptions";--> statement-breakpoint
ALTER TABLE "sessions" RENAME TO "ng1_sessions";--> statement-breakpoint
ALTER TABLE "users" RENAME TO "ng1_users";--> statement-breakpoint
ALTER TABLE "waitlist" RENAME TO "ng1_waitlist";--> statement-breakpoint
ALTER TABLE "ng1_users" RENAME COLUMN "image" TO "avatar";--> statement-breakpoint
ALTER TABLE "ng1_users" DROP CONSTRAINT "users_username_unique";--> statement-breakpoint
ALTER TABLE "ng1_users" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "ng1_waitlist" DROP CONSTRAINT "waitlist_email_unique";--> statement-breakpoint
ALTER TABLE "ng1_sessions" DROP CONSTRAINT "sessions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "ng1_sessions" ALTER COLUMN "id" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "ng1_sessions" ALTER COLUMN "user_id" SET DATA TYPE varchar(21);--> statement-breakpoint
ALTER TABLE "ng1_users" ALTER COLUMN "id" SET DATA TYPE varchar(21);--> statement-breakpoint
ALTER TABLE "ng1_users" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "ng1_users" ALTER COLUMN "email_verified" SET DATA TYPE boolean;--> statement-breakpoint
ALTER TABLE "ng1_users" ALTER COLUMN "email_verified" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "ng1_users" ALTER COLUMN "email_verified" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ng1_users" ALTER COLUMN "hashed_password" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "ng1_users" ALTER COLUMN "avatar" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "ng1_users" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "ng1_users" ALTER COLUMN "updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "ng1_users" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "ng1_users" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'ng1_waitlist'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "ng1_waitlist" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "ng1_waitlist" ALTER COLUMN "user_id" SET DATA TYPE varchar(21);--> statement-breakpoint
ALTER TABLE "ng1_waitlist" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "ng1_waitlist" ALTER COLUMN "updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "ng1_waitlist" ALTER COLUMN "updated_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "ng1_waitlist" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "ng1_users" ADD COLUMN "discord_id" varchar(255);--> statement-breakpoint
ALTER TABLE "ng1_users" ADD COLUMN "stripe_subscription_id" varchar(191);--> statement-breakpoint
ALTER TABLE "ng1_users" ADD COLUMN "stripe_price_id" varchar(191);--> statement-breakpoint
ALTER TABLE "ng1_users" ADD COLUMN "stripe_customer_id" varchar(191);--> statement-breakpoint
ALTER TABLE "ng1_users" ADD COLUMN "stripe_current_period_end" timestamp;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "verification_code_user_idx" ON "ng1_email_verification_codes" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "verification_code_email_idx" ON "ng1_email_verification_codes" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "password_token_user_idx" ON "ng1_password_reset_tokens" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_idx" ON "ng1_sessions" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_email_idx" ON "ng1_users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_discord_idx" ON "ng1_users" ("discord_id");--> statement-breakpoint
ALTER TABLE "ng1_users" DROP COLUMN IF EXISTS "username";--> statement-breakpoint
ALTER TABLE "ng1_users" DROP COLUMN IF EXISTS "first_name";--> statement-breakpoint
ALTER TABLE "ng1_users" DROP COLUMN IF EXISTS "last_name";--> statement-breakpoint
ALTER TABLE "ng1_users" ADD CONSTRAINT "ng1_users_discord_id_unique" UNIQUE("discord_id");--> statement-breakpoint
ALTER TABLE "ng1_users" ADD CONSTRAINT "ng1_users_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "ng1_waitlist" ADD CONSTRAINT "ng1_waitlist_email_unique" UNIQUE("email");