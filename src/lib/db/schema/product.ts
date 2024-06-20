import {
  varchar,
  timestamp,
  jsonb,
  text,
  pgEnum,
  decimal,
  pgTableCreator,
} from "drizzle-orm/pg-core";
import { users } from "./user";

import { env } from "@/lib/env.mjs";

const pgTable = pgTableCreator((name) => `${env.DATABASE_PREFIX}_${name}`);

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

export const courseAccess = pgTable("course_access", {
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

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

// export type Course = typeof courses.$inferSelect;
// export type NewCourse = typeof courses.$inferInsert;

// export type CourseUser = typeof courseUsers.$inferSelect;
// export type NewCourseUser = typeof courseUsers.$inferInsert;

// export type CourseVideo = typeof courseVideos.$inferSelect;
// export type NewCourseVideo = typeof courseVideos.$inferInsert;

// export type VideoMetadata = typeof videoMetadata.$inferSelect;
// export type NewVideoMetadata = typeof videoMetadata.$inferInsert;
