import { relations } from "drizzle-orm/relations";
import { workspaces, workspaceMembers, pages, blocks, comments, pageSessions, blockVersions } from "./schema";

export const workspaceMembersRelations = relations(workspaceMembers, ({one}) => ({
	workspace: one(workspaces, {
		fields: [workspaceMembers.workspaceId],
		references: [workspaces.id]
	}),
}));

export const workspacesRelations = relations(workspaces, ({many}) => ({
	workspaceMembers: many(workspaceMembers),
	pages: many(pages),
}));

export const pagesRelations = relations(pages, ({one, many}) => ({
	workspace: one(workspaces, {
		fields: [pages.workspaceId],
		references: [workspaces.id]
	}),
	blocks: many(blocks),
	comments: many(comments),
	pageSessions: many(pageSessions),
}));

export const blocksRelations = relations(blocks, ({one, many}) => ({
	page: one(pages, {
		fields: [blocks.pageId],
		references: [pages.id]
	}),
	comments: many(comments),
	blockVersions: many(blockVersions),
}));

export const commentsRelations = relations(comments, ({one}) => ({
	block: one(blocks, {
		fields: [comments.blockId],
		references: [blocks.id]
	}),
	page: one(pages, {
		fields: [comments.pageId],
		references: [pages.id]
	}),
}));

export const pageSessionsRelations = relations(pageSessions, ({one}) => ({
	page: one(pages, {
		fields: [pageSessions.pageId],
		references: [pages.id]
	}),
}));

export const blockVersionsRelations = relations(blockVersions, ({one}) => ({
	block: one(blocks, {
		fields: [blockVersions.blockId],
		references: [blocks.id]
	}),
}));