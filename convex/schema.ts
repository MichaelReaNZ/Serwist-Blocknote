import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	notes: defineTable({
		content: v.string(),
		editedOffline: v.optional(v.boolean()),
	}),
});
