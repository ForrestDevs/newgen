import {
  pgTableCreator,
  varchar,
  timestamp,
  index,
  serial,
  boolean,
  jsonb,
  text,
  pgEnum,
  decimal,
  date,
} from "drizzle-orm/pg-core";
import { DATABASE_PREFIX as prefix } from "@/config/constants";

export const pgTable = pgTableCreator((name) => `${prefix}_${name}`);

export const users = pgTable(
  "users",
  {
    id: varchar("id", { length: 21 }).primaryKey(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    hashedPassword: varchar("hashed_password", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
      () => new Date()
    ),
  },
  (t) => ({
    emailIdx: index("user_email_idx").on(t.email),
  })
);

export const userProfiles = pgTable("user_profiles", {
  userId: varchar("user_id", { length: 21 }).primaryKey(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  birthday: date("birthday", { mode: "date" }),
  location: varchar("location", { length: 255 }),
  hockeyLevel: varchar("hockey_level", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
});

export const userPurchases = pgTable("user_purchases", {
  id: varchar("id", { length: 21 }).primaryKey(),
  userId: varchar("user_id", { length: 21 })
    .notNull()
    .references(() => users.id),
  productId: varchar("product_id", { length: 21 })
    .notNull()
    .references(() => products.id),
  stripeCustomerId: varchar("stripe_customer_id", { length: 191 }).notNull(),
  priceId: varchar("price_id", { length: 255 }).notNull(), // Stripe price ID
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 191 }), // Optional, for recurring products
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end"), // Optional, for recurring products
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
});

export const oneOnOneRequests = pgTable("one_on_one_requests", {
  id: varchar("id", { length: 21 }).primaryKey(),
  userId: varchar("user_id", { length: 21 })
    .notNull()
    .references(() => users.id),
  preferredDate1: varchar("preferred_date_1", { length: 255 }).notNull(),
  preferredDate2: varchar("preferred_date_2", { length: 255 }),
  preferredDate3: varchar("preferred_date_3", { length: 255 }),
  notes: text("message").notNull(),
  accepted: boolean("accepted").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
});

export const userSurveyResponses = pgTable("user_survey_responses", {
  id: varchar("id", { length: 21 }).primaryKey(),
  userId: varchar("user_id", { length: 21 })
    .notNull()
    .references(() => users.id),
  surveyTitle: varchar("survey_title", { length: 255 }).notNull(), // Title of the survey for reference
  responses: jsonb("responses").notNull(), // Store responses as JSON
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
});

export const productType = pgEnum("product_type", ["one-time", "subscription"]);

export const products = pgTable("products", {
  id: varchar("id", { length: 21 }).primaryKey(),
  stripePriceId: varchar("stripe_price_id", { length: 255 }).notNull(), // Stripe price ID
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  type: productType("product_type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
});

export const sessions = pgTable(
  "sessions",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 21 }).notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (t) => ({
    userIdx: index("session_user_idx").on(t.userId),
  })
);

export const emailVerificationCodes = pgTable(
  "email_verification_codes",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 21 }).unique().notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    code: varchar("code", { length: 8 }).notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (t) => ({
    userIdx: index("verification_code_user_idx").on(t.userId),
    emailIdx: index("verification_code_email_idx").on(t.email),
  })
);

export const passwordResetTokens = pgTable(
  "password_reset_tokens",
  {
    id: varchar("id", { length: 40 }).primaryKey(),
    userId: varchar("user_id", { length: 21 }).notNull(),
    expiresAt: timestamp("expires_at", {
      withTimezone: true,
      mode: "date",
    }).notNull(),
  },
  (t) => ({
    userIdx: index("password_token_user_idx").on(t.userId),
  })
);

export const waitlist = pgTable("waitlist", {
  userId: varchar("user_id", { length: 21 }).primaryKey(), // User id
  email: varchar("email", { length: 255 }).unique().notNull(), // User email
  approved: boolean("approved").notNull().default(false), // User approved
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
});

export const courses = pgTable("courses", {
  id: varchar("id", { length: 21 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(), // Changed to text to allow longer descriptions
  productId: varchar("product_id", { length: 21 })
    .notNull()
    .references(() => products.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
});

export const courseUsers = pgTable("course_users", {
  id: varchar("id", { length: 21 }).primaryKey(),
  courseId: varchar("course_id", { length: 21 })
    .notNull()
    .references(() => courses.id),
  userId: varchar("user_id", { length: 21 })
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
});

export const courseVideos = pgTable("course_videos", {
  id: varchar("id", { length: 21 }).primaryKey(),
  courseId: varchar("course_id", { length: 21 })
    .notNull()
    .references(() => courses.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(), // Changed to text to allow longer descriptions
  url: varchar("url", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
});

export const videoMetadata = pgTable("video_metadata", {
  id: varchar("id", { length: 21 }).primaryKey(),
  videoId: varchar("video_id", { length: 21 })
    .notNull()
    .references(() => courseVideos.id),
  metadata: jsonb("metadata").notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type UserProfile = typeof userProfiles.$inferSelect;
export type NewUserProfile = typeof userProfiles.$inferInsert;

export type UserPurchase = typeof userPurchases.$inferSelect;
export type NewUserPurchase = typeof userPurchases.$inferInsert;

export type UserSurveyResponse = typeof userSurveyResponses.$inferSelect;
export type NewUserSurveyResponse = typeof userSurveyResponses.$inferInsert;

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export type EmailVerificationCode = typeof emailVerificationCodes.$inferSelect;
export type NewEmailVerificationCode =
  typeof emailVerificationCodes.$inferInsert;

export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;
export type NewPasswordResetToken = typeof passwordResetTokens.$inferInsert;

export type Waitlist = typeof waitlist.$inferSelect;
export type NewWaitlist = typeof waitlist.$inferInsert;

// export type Course = typeof courses.$inferSelect;
// export type NewCourse = typeof courses.$inferInsert;

// export type CourseUser = typeof courseUsers.$inferSelect;
// export type NewCourseUser = typeof courseUsers.$inferInsert;

// export type CourseVideo = typeof courseVideos.$inferSelect;
// export type NewCourseVideo = typeof courseVideos.$inferInsert;

// export type VideoMetadata = typeof videoMetadata.$inferSelect;
// export type NewVideoMetadata = typeof videoMetadata.$inferInsert;
