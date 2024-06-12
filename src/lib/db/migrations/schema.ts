import { pgTable, unique, pgEnum, uuid, varchar, boolean, timestamp, index, serial, foreignKey, jsonb, text, numeric, date } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const aal_level = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const code_challenge_method = pgEnum("code_challenge_method", ['s256', 'plain'])
export const factor_status = pgEnum("factor_status", ['unverified', 'verified'])
export const factor_type = pgEnum("factor_type", ['totp', 'webauthn'])
export const one_time_token_type = pgEnum("one_time_token_type", ['confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token'])
export const key_status = pgEnum("key_status", ['default', 'valid', 'invalid', 'expired'])
export const key_type = pgEnum("key_type", ['aead-ietf', 'aead-det', 'hmacsha512', 'hmacsha256', 'auth', 'shorthash', 'generichash', 'kdf', 'secretbox', 'secretstream', 'stream_xchacha20'])
export const product_type = pgEnum("product_type", ['one-time', 'reoccuring'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])
export const equality_op = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])


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

export const ng1_email_verification_codes = pgTable("ng1_email_verification_codes", {
	id: serial("id").primaryKey().notNull(),
	user_id: varchar("user_id", { length: 21 }).notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	code: varchar("code", { length: 8 }).notNull(),
	expires_at: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
},
(table) => {
	return {
		verification_code_user_idx: index("verification_code_user_idx").on(table.user_id),
		verification_code_email_idx: index("verification_code_email_idx").on(table.email),
		ng1_email_verification_codes_user_id_unique: unique("ng1_email_verification_codes_user_id_unique").on(table.user_id),
	}
});

export const ng1_password_reset_tokens = pgTable("ng1_password_reset_tokens", {
	id: varchar("id", { length: 40 }).primaryKey().notNull(),
	user_id: varchar("user_id", { length: 21 }).notNull(),
	expires_at: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
},
(table) => {
	return {
		password_token_user_idx: index("password_token_user_idx").on(table.user_id),
	}
});

export const ng1_sessions = pgTable("ng1_sessions", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	user_id: varchar("user_id", { length: 21 }).notNull(),
	expires_at: timestamp("expires_at", { withTimezone: true, mode: 'string' }).notNull(),
},
(table) => {
	return {
		session_user_idx: index("session_user_idx").on(table.user_id),
	}
});

export const ng1_users = pgTable("ng1_users", {
	id: varchar("id", { length: 21 }).primaryKey().notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	email_verified: boolean("email_verified").default(false).notNull(),
	hashed_password: varchar("hashed_password", { length: 255 }),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		user_email_idx: index("user_email_idx").on(table.email),
		ng1_users_email_unique: unique("ng1_users_email_unique").on(table.email),
	}
});

export const ng1_waitlist = pgTable("ng1_waitlist", {
	user_id: varchar("user_id", { length: 21 }).primaryKey().notNull(),
	email: varchar("email", { length: 255 }).notNull(),
	approved: boolean("approved").default(false).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		ng1_waitlist_email_unique: unique("ng1_waitlist_email_unique").on(table.email),
	}
});

export const ng1_video_metadata = pgTable("ng1_video_metadata", {
	id: varchar("id", { length: 21 }).primaryKey().notNull(),
	video_id: varchar("video_id", { length: 21 }).notNull().references(() => ng1_course_videos.id),
	metadata: jsonb("metadata").notNull(),
});

export const ng1_course_users = pgTable("ng1_course_users", {
	id: varchar("id", { length: 21 }).primaryKey().notNull(),
	course_id: varchar("course_id", { length: 21 }).notNull().references(() => ng1_courses.id),
	user_id: varchar("user_id", { length: 21 }).notNull().references(() => ng1_users.id),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }),
});

export const ng1_course_videos = pgTable("ng1_course_videos", {
	id: varchar("id", { length: 21 }).primaryKey().notNull(),
	course_id: varchar("course_id", { length: 21 }).notNull().references(() => ng1_courses.id),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").notNull(),
	url: varchar("url", { length: 255 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }),
});

export const ng1_courses = pgTable("ng1_courses", {
	id: varchar("id", { length: 21 }).primaryKey().notNull(),
	title: varchar("title", { length: 255 }).notNull(),
	description: text("description").notNull(),
	price_id: varchar("price_id", { length: 255 }).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }),
});

export const ng1_user_survey_responses = pgTable("ng1_user_survey_responses", {
	id: varchar("id", { length: 21 }).primaryKey().notNull(),
	user_id: varchar("user_id", { length: 21 }).notNull().references(() => ng1_users.id),
	survey_title: varchar("survey_title", { length: 255 }).notNull(),
	responses: jsonb("responses").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }),
});

export const ng1_products = pgTable("ng1_products", {
	id: varchar("id", { length: 21 }).primaryKey().notNull(),
	price_id: varchar("price_id", { length: 255 }).notNull(),
	name: varchar("name", { length: 255 }).notNull(),
	description: text("description").notNull(),
	price: numeric("price", { precision: 10, scale:  2 }).notNull(),
	product_type: product_type("product_type").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }),
});

export const ng1_user_purchases = pgTable("ng1_user_purchases", {
	id: varchar("id", { length: 21 }).primaryKey().notNull(),
	user_id: varchar("user_id", { length: 21 }).notNull().references(() => ng1_users.id),
	product_id: varchar("product_id", { length: 21 }).notNull().references(() => ng1_products.id),
	stripe_customer_id: varchar("stripe_customer_id", { length: 191 }).notNull(),
	price_id: varchar("price_id", { length: 255 }).notNull(),
	stripe_subscription_id: varchar("stripe_subscription_id", { length: 191 }),
	stripe_current_period_end: timestamp("stripe_current_period_end", { mode: 'string' }),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }),
});

export const ng1_user_profiles = pgTable("ng1_user_profiles", {
	user_id: varchar("user_id", { length: 21 }).primaryKey().notNull(),
	first_name: varchar("first_name", { length: 255 }),
	last_name: varchar("last_name", { length: 255 }),
	birthday: date("birthday"),
	location: varchar("location", { length: 255 }),
	hockey_level: varchar("hockey_level", { length: 255 }),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updated_at: timestamp("updated_at", { mode: 'string' }),
});