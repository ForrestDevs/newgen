import { relations } from "drizzle-orm/relations";
import { ng1_course_videos, ng1_video_metadata, ng1_courses, ng1_course_users, ng1_users, ng1_user_survey_responses, ng1_products, ng1_user_purchases } from "./schema";

export const ng1_video_metadataRelations = relations(ng1_video_metadata, ({one}) => ({
	ng1_course_video: one(ng1_course_videos, {
		fields: [ng1_video_metadata.video_id],
		references: [ng1_course_videos.id]
	}),
}));

export const ng1_course_videosRelations = relations(ng1_course_videos, ({one, many}) => ({
	ng1_video_metadata: many(ng1_video_metadata),
	ng1_course: one(ng1_courses, {
		fields: [ng1_course_videos.course_id],
		references: [ng1_courses.id]
	}),
}));

export const ng1_course_usersRelations = relations(ng1_course_users, ({one}) => ({
	ng1_course: one(ng1_courses, {
		fields: [ng1_course_users.course_id],
		references: [ng1_courses.id]
	}),
	ng1_user: one(ng1_users, {
		fields: [ng1_course_users.user_id],
		references: [ng1_users.id]
	}),
}));

export const ng1_coursesRelations = relations(ng1_courses, ({many}) => ({
	ng1_course_users: many(ng1_course_users),
	ng1_course_videos: many(ng1_course_videos),
}));

export const ng1_usersRelations = relations(ng1_users, ({many}) => ({
	ng1_course_users: many(ng1_course_users),
	ng1_user_survey_responses: many(ng1_user_survey_responses),
	ng1_user_purchases: many(ng1_user_purchases),
}));

export const ng1_user_survey_responsesRelations = relations(ng1_user_survey_responses, ({one}) => ({
	ng1_user: one(ng1_users, {
		fields: [ng1_user_survey_responses.user_id],
		references: [ng1_users.id]
	}),
}));

export const ng1_user_purchasesRelations = relations(ng1_user_purchases, ({one}) => ({
	ng1_product: one(ng1_products, {
		fields: [ng1_user_purchases.product_id],
		references: [ng1_products.id]
	}),
	ng1_user: one(ng1_users, {
		fields: [ng1_user_purchases.user_id],
		references: [ng1_users.id]
	}),
}));

export const ng1_productsRelations = relations(ng1_products, ({many}) => ({
	ng1_user_purchases: many(ng1_user_purchases),
}));