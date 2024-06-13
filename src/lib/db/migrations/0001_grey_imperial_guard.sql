CREATE TABLE IF NOT EXISTS "ng1_one_on_one_requests" (
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
DO $$ BEGIN
 ALTER TABLE "ng1_one_on_one_requests" ADD CONSTRAINT "ng1_one_on_one_requests_user_id_ng1_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ng1_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
