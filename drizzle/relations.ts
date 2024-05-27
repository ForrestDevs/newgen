import { relations } from "drizzle-orm/relations";
import { users, sessions, verification_tokens, accounts } from "./schema";

export const sessionsRelations = relations(sessions, ({one}) => ({
	user: one(users, {
		fields: [sessions.user_id],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	sessions: many(sessions),
	verification_tokens: many(verification_tokens),
	accounts: many(accounts),
}));

export const verification_tokensRelations = relations(verification_tokens, ({one}) => ({
	user: one(users, {
		fields: [verification_tokens.user_id],
		references: [users.id]
	}),
}));

export const accountsRelations = relations(accounts, ({one}) => ({
	user: one(users, {
		fields: [accounts.user_id],
		references: [users.id]
	}),
}));