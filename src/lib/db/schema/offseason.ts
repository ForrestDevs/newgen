import {
  varchar,
  timestamp,
  text,
  date,
  pgTableCreator,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./user";

import { env } from "@/lib/env.mjs";

const pgTable = pgTableCreator((name) => `${env.DATABASE_PREFIX}_${name}`);

export const offSeasonPlans = pgTable("off_season_plans", {
  id: varchar("id", { length: 21 }).primaryKey(),
  userId: varchar("user_id", { length: 21 })
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  startDate: date("start_date", { mode: "date" }).notNull(),
  endDate: date("end_date", { mode: "date" }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
});

export const offSeasonRecources = pgTable("off_season_resources", {
  id: varchar("id", { length: 21 }).primaryKey(),
  planId: varchar("plan_id", { length: 21 })
    .notNull()
    .references(() => offSeasonPlans.id),
  resources: text("resources")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
});

export const offSeasonPriorities = pgTable("off_season_priorities", {
  id: varchar("id", { length: 21 }).primaryKey(),
  planId: varchar("plan_id", { length: 21 })
    .notNull()
    .references(() => offSeasonPlans.id),
  priorities: text("priorities")
    .array()
    .notNull()
    .default(sql`ARRAY[]::text[]`),
});
