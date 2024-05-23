import { z } from "zod";

import {
  pgTable,
  varchar,
  text,
  timestamp,
  primaryKey,
  uuid,
} from "drizzle-orm/pg-core";

export const accounts = pgTable(
  "accounts",
  {
    provider: varchar("provider", { length: 255 }).notNull(), // Provider name
    providerId: varchar("provider_id", { length: 255 }).notNull(), // Provider id
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
      .notNull(), // User id
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
  },
  (t) => {
    return {
      pk: primaryKey({ columns: [t.provider, t.providerId] }),
    };
  }
);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  username: varchar("username", { length: 60 }).unique().notNull(), // User username
  firstName: varchar("first_name", { length: 60 }), // User first name
  lastName: varchar("last_name", { length: 60 }), // User last name
  email: varchar("email", { length: 255 }).unique().notNull(), // User email
  emailVerified: timestamp("email_verified", {
    withTimezone: true,
    mode: "date",
  }), // Email verification date
  hashedPassword: text("hashed_password"), // User hashed password
  image: text("image"), // User image
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
});

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" })
    .notNull(),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(), // Session expiration
});

export const verificationTokens = pgTable("verification_tokens", {
  id: uuid("id").defaultRandom().primaryKey().notNull(), // Verification token id
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull(), // User id
  token: varchar("token", { length: 8 }).notNull(), // Verification token
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
});

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export type VerificationToken = typeof verificationTokens.$inferSelect;
export type NewVerificationToken = typeof verificationTokens.$inferInsert;
