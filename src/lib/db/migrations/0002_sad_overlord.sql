CREATE TABLE IF NOT EXISTS "prod_ng1_off_season_plans" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prod_ng1_off_season_priorities" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"plan_id" varchar(21) NOT NULL,
	"priorities" text[] DEFAULT ARRAY[]::text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prod_ng1_off_season_resources" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"plan_id" varchar(21) NOT NULL,
	"resources" text[] DEFAULT ARRAY[]::text[] NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ng1_email_verification_codes" RENAME TO "prod_ng1_email_verification_codes";--> statement-breakpoint
ALTER TABLE "ng1_password_reset_tokens" RENAME TO "prod_ng1_password_reset_tokens";--> statement-breakpoint
ALTER TABLE "ng1_sessions" RENAME TO "prod_ng1_sessions";--> statement-breakpoint
ALTER TABLE "ng1_course_users" RENAME TO "prod_ng1_course_access";--> statement-breakpoint
ALTER TABLE "ng1_course_videos" RENAME TO "prod_ng1_course_videos";--> statement-breakpoint
ALTER TABLE "ng1_courses" RENAME TO "prod_ng1_courses";--> statement-breakpoint
ALTER TABLE "ng1_products" RENAME TO "prod_ng1_products";--> statement-breakpoint
ALTER TABLE "ng1_video_metadata" RENAME TO "prod_ng1_video_metadata";--> statement-breakpoint
ALTER TABLE "ng1_one_on_one_requests" RENAME TO "prod_ng1_one_on_one_requests";--> statement-breakpoint
ALTER TABLE "ng1_user_profiles" RENAME TO "prod_ng1_user_profiles";--> statement-breakpoint
ALTER TABLE "ng1_user_purchases" RENAME TO "prod_ng1_user_purchases";--> statement-breakpoint
ALTER TABLE "ng1_user_survey_responses" RENAME TO "prod_ng1_user_survey_responses";--> statement-breakpoint
ALTER TABLE "ng1_users" RENAME TO "prod_ng1_users";--> statement-breakpoint
ALTER TABLE "ng1_waitlist" RENAME TO "prod_ng1_waitlist";--> statement-breakpoint
ALTER TABLE "prod_ng1_email_verification_codes" DROP CONSTRAINT "ng1_email_verification_codes_user_id_unique";--> statement-breakpoint
ALTER TABLE "prod_ng1_users" DROP CONSTRAINT "ng1_users_email_unique";--> statement-breakpoint
ALTER TABLE "prod_ng1_waitlist" DROP CONSTRAINT "ng1_waitlist_email_unique";--> statement-breakpoint
ALTER TABLE "prod_ng1_course_access" DROP CONSTRAINT "ng1_course_users_course_id_ng1_courses_id_fk";
--> statement-breakpoint
ALTER TABLE "prod_ng1_course_access" DROP CONSTRAINT "ng1_course_users_user_id_ng1_users_id_fk";
--> statement-breakpoint
ALTER TABLE "prod_ng1_course_videos" DROP CONSTRAINT "ng1_course_videos_course_id_ng1_courses_id_fk";
--> statement-breakpoint
ALTER TABLE "prod_ng1_courses" DROP CONSTRAINT "ng1_courses_product_id_ng1_products_id_fk";
--> statement-breakpoint
ALTER TABLE "prod_ng1_one_on_one_requests" DROP CONSTRAINT "ng1_one_on_one_requests_user_id_ng1_users_id_fk";
--> statement-breakpoint
ALTER TABLE "prod_ng1_user_purchases" DROP CONSTRAINT "ng1_user_purchases_user_id_ng1_users_id_fk";
--> statement-breakpoint
ALTER TABLE "prod_ng1_user_purchases" DROP CONSTRAINT "ng1_user_purchases_product_id_ng1_products_id_fk";
--> statement-breakpoint
ALTER TABLE "prod_ng1_user_survey_responses" DROP CONSTRAINT "ng1_user_survey_responses_user_id_ng1_users_id_fk";
--> statement-breakpoint
ALTER TABLE "prod_ng1_video_metadata" DROP CONSTRAINT "ng1_video_metadata_video_id_ng1_course_videos_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod_ng1_off_season_plans" ADD CONSTRAINT "prod_ng1_off_season_plans_user_id_prod_ng1_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."prod_ng1_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod_ng1_off_season_priorities" ADD CONSTRAINT "prod_ng1_off_season_priorities_plan_id_prod_ng1_off_season_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."prod_ng1_off_season_plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod_ng1_off_season_resources" ADD CONSTRAINT "prod_ng1_off_season_resources_plan_id_prod_ng1_off_season_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."prod_ng1_off_season_plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod_ng1_course_access" ADD CONSTRAINT "prod_ng1_course_access_course_id_prod_ng1_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."prod_ng1_courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod_ng1_course_access" ADD CONSTRAINT "prod_ng1_course_access_user_id_prod_ng1_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."prod_ng1_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod_ng1_course_videos" ADD CONSTRAINT "prod_ng1_course_videos_course_id_prod_ng1_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."prod_ng1_courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod_ng1_courses" ADD CONSTRAINT "prod_ng1_courses_product_id_prod_ng1_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."prod_ng1_products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod_ng1_one_on_one_requests" ADD CONSTRAINT "prod_ng1_one_on_one_requests_user_id_prod_ng1_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."prod_ng1_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod_ng1_user_purchases" ADD CONSTRAINT "prod_ng1_user_purchases_user_id_prod_ng1_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."prod_ng1_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod_ng1_user_purchases" ADD CONSTRAINT "prod_ng1_user_purchases_product_id_prod_ng1_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."prod_ng1_products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod_ng1_user_survey_responses" ADD CONSTRAINT "prod_ng1_user_survey_responses_user_id_prod_ng1_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."prod_ng1_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod_ng1_video_metadata" ADD CONSTRAINT "prod_ng1_video_metadata_video_id_prod_ng1_course_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."prod_ng1_course_videos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "prod_ng1_email_verification_codes" ADD CONSTRAINT "prod_ng1_email_verification_codes_user_id_unique" UNIQUE("user_id");--> statement-breakpoint
ALTER TABLE "prod_ng1_users" ADD CONSTRAINT "prod_ng1_users_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "prod_ng1_waitlist" ADD CONSTRAINT "prod_ng1_waitlist_email_unique" UNIQUE("email");