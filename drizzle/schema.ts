import {
  pgTable,
  bigint,
  timestamp,
  text,
  uuid,
  index,
  foreignKey,
  jsonb,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const workspaces = pgTable("workspaces", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint({ mode: "number" })
    .primaryKey()
    .generatedByDefaultAsIdentity({
      name: "workspaces_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 9223372036854775807,
      cache: 1,
    }),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  name: text().default("").notNull(),
  ownerId: uuid("owner_id")
    .default(sql`auth.uid()`)
    .notNull(),
});

export const workspaceMembers = pgTable(
  "workspace_members",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: "workspace_members_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
        cache: 1,
      }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    role: text().default("").notNull(),
    userId: uuid("user_id")
      .default(sql`auth.uid()`)
      .notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    workspaceId: bigint("workspace_id", { mode: "number" }).notNull(),
  },
  (table) => [
    index("idx_workspace_members_user").using(
      "btree",
      table.userId.asc().nullsLast().op("uuid_ops"),
    ),
    foreignKey({
      columns: [table.workspaceId],
      foreignColumns: [workspaces.id],
      name: "workspace_members_workspace_id_fkey",
    }),
  ],
);

export const pages = pgTable(
  "pages",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: "pages_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
        cache: 1,
      }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    title: text().default("").notNull(),
    icon: text().default(""),
    parentPageId: uuid("parent_page_id"),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    workspaceId: bigint("workspace_id", { mode: "number" }).notNull(),
  },
  (table) => [
    index("idx_pages_workspace_id").using(
      "btree",
      table.workspaceId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.workspaceId],
      foreignColumns: [workspaces.id],
      name: "pages_workspace_id_fkey",
    }),
  ],
);

export const blocks = pgTable(
  "blocks",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: "blocks_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
        cache: 1,
      }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    type: text().notNull(),
    content: jsonb().notNull(),
    position: text().notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    pageId: bigint("page_id", { mode: "number" }).notNull(),
    deletedAt: timestamp("deleted_at", { mode: "string" }),
  },
  (table) => [
    index("idx_blocks_page_id").using(
      "btree",
      table.pageId.asc().nullsLast().op("int8_ops"),
    ),
    foreignKey({
      columns: [table.pageId],
      foreignColumns: [pages.id],
      name: "blocks_page_id_fkey",
    }),
  ],
);

export const comments = pgTable(
  "comments",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: "comments_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
        cache: 1,
      }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "string" })
      .defaultNow()
      .notNull(),
    content: text().default("").notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    pageId: bigint("page_id", { mode: "number" }).notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    blockId: bigint("block_id", { mode: "number" }),
    authorId: uuid("author_id")
      .default(sql`auth.uid()`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.blockId],
      foreignColumns: [blocks.id],
      name: "comments_block_id_fkey",
    }),
    foreignKey({
      columns: [table.pageId],
      foreignColumns: [pages.id],
      name: "comments_page_id_fkey",
    }),
  ],
);

export const pageSessions = pgTable(
  "page_sessions",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: "page_sessions_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
        cache: 1,
      }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    lastSeen: timestamp("last_seen", { mode: "string" }).defaultNow().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    pageId: bigint("page_id", { mode: "number" }).notNull(),
    userId: uuid("user_id")
      .default(sql`auth.uid()`)
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.pageId],
      foreignColumns: [pages.id],
      name: "page_sessions_page_id_fkey",
    }),
  ],
);

export const blockVersions = pgTable(
  "block_versions",
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" })
      .primaryKey()
      .generatedByDefaultAsIdentity({
        name: "block_versions_id_seq",
        startWith: 1,
        increment: 1,
        minValue: 1,
        maxValue: 9223372036854775807,
        cache: 1,
      }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    content: jsonb().notNull(),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    blockId: bigint("block_id", { mode: "number" }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.blockId],
      foreignColumns: [blocks.id],
      name: "block_versions_block_id_fkey",
    }),
  ],
);
