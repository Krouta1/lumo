import { expect, test } from "vitest";
import type { Page, CreatePageDTO } from "../../domain/entities/page";

// Helper function to create a test page
function createPage(input: {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  title: string;
  icon?: string | null;
  parentPageId?: string | null;
  deletedAt?: Date | null;
  workspaceId: number;
}): Page {
  return {
    id: input.id ?? -1,
    createdAt: input.createdAt ?? new Date(),
    updatedAt: input.updatedAt ?? new Date(),
    title: input.title,
    icon: input.icon ?? null,
    parentPageId: input.parentPageId ?? null,
    deletedAt: input.deletedAt ?? null,
    workspaceId: input.workspaceId,
  };
}

test("createPage sets defaults and preserves provided values", () => {
  const page = createPage({ title: "My Page", workspaceId: 1 });
  expect(typeof page.id).toBe("number");
  expect(page.title).toBe("My Page");
  expect(page.workspaceId).toBe(1);
  expect(page.createdAt).toBeInstanceOf(Date);
  expect(page.updatedAt).toBeInstanceOf(Date);
  expect(page.icon).toBeNull();
  expect(page.parentPageId).toBeNull();
  expect(page.deletedAt).toBeNull();
});

test("createPage preserves all provided values", () => {
  const now = new Date(2025, 1, 1);
  const updatedAt = new Date(2025, 1, 2);
  const page = createPage({
    id: 5,
    title: "Custom Page",
    workspaceId: 2,
    createdAt: now,
    updatedAt: updatedAt,
    icon: "📄",
    parentPageId: "parent-123",
  });

  expect(page.id).toBe(5);
  expect(page.title).toBe("Custom Page");
  expect(page.workspaceId).toBe(2);
  expect(page.createdAt).toBe(now);
  expect(page.updatedAt).toBe(updatedAt);
  expect(page.icon).toBe("📄");
  expect(page.parentPageId).toBe("parent-123");
  expect(page.deletedAt).toBeNull();
});

test("createPage handles soft deleted pages", () => {
  const deletedAt = new Date(2025, 1, 3);
  const page = createPage({
    title: "Deleted Page",
    workspaceId: 1,
    deletedAt,
  });

  expect(page.deletedAt).toBe(deletedAt);
});
