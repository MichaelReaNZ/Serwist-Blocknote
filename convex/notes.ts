import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
	handler: async (ctx) => {
		const allNotes = await ctx.db
			.query("notes")

			.collect();
		return allNotes;
	},
});

export const create = mutation({
	handler: async (ctx) => {
		const newNoteId = await ctx.db.insert("notes", {
			content: "",
		});

		return newNoteId;
	},
});

export const getById = query({
	args: {
		noteId: v.id("notes"),
	},
	handler: async (ctx, args) => {
		const note = await ctx.db.get(args.noteId);

		if (!note) {
			throw new Error("Note not found");
		}

		return note;
	},
});

export const update = mutation({
	args: {
		noteId: v.id("notes"),
		content: v.string(),
	},
	handler: async (ctx, args) => {
		await ctx.db.patch(args.noteId, {
			content: args.content,
		});
	},
});
