CREATE TABLE IF NOT EXISTS "dev_ng1_email_verification_codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"email" varchar(255) NOT NULL,
	"code" varchar(8) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "dev_ng1_email_verification_codes_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev_ng1_password_reset_tokens" (
	"id" varchar(40) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev_ng1_sessions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev_ng1_off_season_plans" (
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
CREATE TABLE IF NOT EXISTS "dev_ng1_off_season_priorities" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"plan_id" varchar(21) NOT NULL,
	"priorities" text[] DEFAULT ARRAY[]::text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev_ng1_off_season_resources" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"plan_id" varchar(21) NOT NULL,
	"resources" text[] DEFAULT ARRAY[]::text[] NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev_ng1_course_access" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"course_id" varchar(21) NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev_ng1_course_videos" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"course_id" varchar(21) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"url" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev_ng1_courses" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"product_id" varchar(21) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev_ng1_products" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"stripe_price_id" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"product_type" "product_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev_ng1_video_metadata" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"video_id" varchar(21) NOT NULL,
	"metadata" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev_ng1_one_on_one_requests" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"preferred_date_1" varchar(255) NOT NULL,
	"preferred_date_2" varchar(255),
	"preferred_date_3" varchar(255),
	"message" text NOT NULL,
	"accepted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev_ng1_user_profiles" (
	"user_id" varchar(21) PRIMARY KEY NOT NULL,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"birthday" date,
	"location" varchar(255),
	"hockey_level" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev_ng1_user_purchases" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"product_id" varchar(21) NOT NULL,
	"stripe_customer_id" varchar(191) NOT NULL,
	"price_id" varchar(255) NOT NULL,
	"stripe_subscription_id" varchar(191),
	"stripe_current_period_end" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev_ng1_user_survey_responses" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"user_id" varchar(21) NOT NULL,
	"survey_title" varchar(255) NOT NULL,
	"responses" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev_ng1_users" (
	"id" varchar(21) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"hashed_password" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "dev_ng1_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev_ng1_waitlist" (
	"user_id" varchar(21) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"approved" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "dev_ng1_waitlist_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev_ng1_off_season_plans" ADD CONSTRAINT "dev_ng1_off_season_plans_user_id_dev_ng1_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."dev_ng1_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev_ng1_off_season_priorities" ADD CONSTRAINT "dev_ng1_off_season_priorities_plan_id_dev_ng1_off_season_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."dev_ng1_off_season_plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev_ng1_off_season_resources" ADD CONSTRAINT "dev_ng1_off_season_resources_plan_id_dev_ng1_off_season_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."dev_ng1_off_season_plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev_ng1_course_access" ADD CONSTRAINT "dev_ng1_course_access_course_id_dev_ng1_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."dev_ng1_courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev_ng1_course_access" ADD CONSTRAINT "dev_ng1_course_access_user_id_dev_ng1_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."dev_ng1_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev_ng1_course_videos" ADD CONSTRAINT "dev_ng1_course_videos_course_id_dev_ng1_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."dev_ng1_courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev_ng1_courses" ADD CONSTRAINT "dev_ng1_courses_product_id_dev_ng1_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."dev_ng1_products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev_ng1_video_metadata" ADD CONSTRAINT "dev_ng1_video_metadata_video_id_dev_ng1_course_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."dev_ng1_course_videos"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev_ng1_one_on_one_requests" ADD CONSTRAINT "dev_ng1_one_on_one_requests_user_id_dev_ng1_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."dev_ng1_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev_ng1_user_purchases" ADD CONSTRAINT "dev_ng1_user_purchases_user_id_dev_ng1_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."dev_ng1_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev_ng1_user_purchases" ADD CONSTRAINT "dev_ng1_user_purchases_product_id_dev_ng1_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."dev_ng1_products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev_ng1_user_survey_responses" ADD CONSTRAINT "dev_ng1_user_survey_responses_user_id_dev_ng1_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."dev_ng1_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "verification_code_user_idx" ON "dev_ng1_email_verification_codes" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "verification_code_email_idx" ON "dev_ng1_email_verification_codes" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "password_token_user_idx" ON "dev_ng1_password_reset_tokens" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_idx" ON "dev_ng1_sessions" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_email_idx" ON "dev_ng1_users" ("email");