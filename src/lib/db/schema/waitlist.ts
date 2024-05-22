import {
  pgTable,
  varchar,
  timestamp,
  uuid,
  boolean,
} from "drizzle-orm/pg-core";

export const waitlist = pgTable("waitlist", {
  userId: uuid("user_id").notNull().primaryKey(), // User id
  email: varchar("email", { length: 255 }).unique().notNull(), // User email
  approved: boolean("approved").notNull().default(false), // User email
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
});

export type Waitlist = typeof waitlist.$inferSelect;
export type NewWaitlist = typeof waitlist.$inferInsert;
