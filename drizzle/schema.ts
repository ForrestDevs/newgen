import { pgTable, foreignKey, pgEnum, uuid, timestamp, unique, varchar, text, boolean, primaryKey } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const aal_level = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const code_challenge_method = pgEnum("code_challenge_method", ['s256', 'plain'])
export const factor_status = pgEnum("factor_status", ['unverified', 'verified'])
export const factor_type = pgEnum("factor_type", ['totp', 'webauthn'])
export const one_time_token_type = pgEnum("one_time_token_type", ['confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token'])
export const key_status = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const key_type = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])
export const equality_op = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])


export const sessions = pgTable("sessions", {
	id: uuid("id").primaryKey().notNull(),
	user_id: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	expires_at: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
});

export const users = pgTable("users", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	username: varchar("username", { length: 60 }).notNull(),
	first_name: varchar("first_name", { length: 60 }),
	last_name: varchar("last_name", { length: 60 }),
	email: varchar("email", { length: 255 }).notNull(),
	email_verified: timestamp("email_verified", { withTimezone: true, mode: 'string' }),
	hashed_password: text("hashed_password"),
	image: text("image"),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		users_username_unique: unique("users_username_unique").on(table.username),
		users_email_unique: unique("users_email_unique").on(table.email),
	}
});

export const verification_tokens = pgTable("verification_tokens", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	user_id: uuid("user_id").notNull().references(() => users.id),
	token: varchar("token", { length: 8 }).notNull(),
	expires_at: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
});

export const waitlist = pgTable("waitlist", {
	user_id: uuid("user_id").primaryKey().notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	approved: boolean("approved").default(false).notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		waitlist_email_unique: unique("waitlist_email_unique").on(table.email),
	}
});

export const accounts = pgTable("accounts", {
	provider: varchar("provider", { length: 255 }).notNull(),
	provider_id: varchar("provider_id", { length: 255 }).notNull(),
	user_id: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
},
(table) => {
	return {
		accounts_provider_provider_id_pk: primaryKey({ columns: [table.provider, table.provider_id], name: "accounts_provider_provider_id_pk"}),
	}
});

export const subscriptions = pgTable("subscriptions", {
	user_id: varchar("user_id", { length: 255 }).notNull(),
	stripe_customer_id: varchar("stripe_customer_id", { length: 255 }).notNull(),
	stripe_subscription_id: varchar("stripe_subscription_id", { length: 255 }),
	stripe_price_id: varchar("stripe_price_id", { length: 255 }),
	stripe_current_period_end: timestamp("stripe_current_period_end", { mode: 'string' }),
},
(table) => {
	return {
		subscriptions_user_id_stripe_customer_id_pk: primaryKey({ columns: [table.user_id, table.stripe_customer_id], name: "subscriptions_user_id_stripe_customer_id_pk"}),
		subscriptions_user_id_unique: unique("subscriptions_user_id_unique").on(table.user_id),
		subscriptions_stripe_customer_id_unique: unique("subscriptions_stripe_customer_id_unique").on(table.stripe_customer_id),
		subscriptions_stripe_subscription_id_unique: unique("subscriptions_stripe_subscription_id_unique").on(table.stripe_subscription_id),
	}
});