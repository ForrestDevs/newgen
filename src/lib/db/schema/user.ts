import {
  varchar,
  timestamp,
  index,
  boolean,
  jsonb,
  text,
  date,
  pgTableCreator,
} from "drizzle-orm/pg-core";
import { products } from "./product";

import { env } from "@/lib/env.mjs";

const pgTable = pgTableCreator((name) => `${env.DATABASE_PREFIX}_${name}`);

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

export const waitlist = pgTable("waitlist", {
  userId: varchar("user_id", { length: 21 }).primaryKey(), // User id
  email: varchar("email", { length: 255 }).unique().notNull(), // User email
  approved: boolean("approved").notNull().default(false), // User approved
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type UserProfile = typeof userProfiles.$inferSelect;
export type NewUserProfile = typeof userProfiles.$inferInsert;

export type UserPurchase = typeof userPurchases.$inferSelect;
export type NewUserPurchase = typeof userPurchases.$inferInsert;

export type UserSurveyResponse = typeof userSurveyResponses.$inferSelect;
export type NewUserSurveyResponse = typeof userSurveyResponses.$inferInsert;

export type Waitlist = typeof waitlist.$inferSelect;
export type NewWaitlist = typeof waitlist.$inferInsert;
