import { vi, test, expect, beforeEach } from "vitest";
import { DrizzlePageRepository } from "@/infrastructure/repositories/drizzle-page-repository";

let repo: DrizzlePageRepository;

beforeEach(() => {
  vi.resetAllMocks();

  // Create a mock `db` implementing the methods the repository calls.
  const mockDb: any = {
    select: () => ({
      from: () => ({ where: () => ({ limit: async () => [] }) }),
    }),
    insert: () => ({
      values: () => ({
        returning: async () => [
          {
            id: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            title: "Test Page",
            icon: null,
            parentPageId: null,
            deletedAt: null,
            workspaceId: 1,
          },
        ],
      }),
    }),
    update: () => ({
      set: () => ({
        where: () => ({
          returning: async () => [
            {
              id: 1,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              title: "Updated Page",
              icon: "📄",
              parentPageId: null,
              deletedAt: null,
              workspaceId: 1,
            },
          ],
        }),
      }),
    }),
    delete: () => ({ where: async () => undefined }),
  };

  repo = new DrizzlePageRepository(mockDb);
});

test("create returns mapped page", async () => {
  const r = await repo.create({
    title: "Test Page",
    workspaceId: 1,
  });
  expect(r.id).toBe(1);
  expect(r.title).toBe("Test Page");
  expect(r.workspaceId).toBe(1);
  expect(r.createdAt).toBeInstanceOf(Date);
  expect(r.updatedAt).toBeInstanceOf(Date);
});

test("create with icon and parent page ID", async () => {
  const mockDb: any = {
    insert: () => ({
      values: () => ({
        returning: async () => [
          {
            id: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            title: "Child Page",
            icon: "📑",
            parentPageId: "parent-123",
            deletedAt: null,
            workspaceId: 1,
          },
        ],
      }),
    }),
  };

  repo = new DrizzlePageRepository(mockDb);

  const r = await repo.create({
    title: "Child Page",
    workspaceId: 1,
    icon: "📑",
    parentPageId: "parent-123",
  });

  expect(r.id).toBe(2);
  expect(r.title).toBe("Child Page");
  expect(r.icon).toBe("📑");
  expect(r.parentPageId).toBe("parent-123");
});

test("update returns mapped page", async () => {
  const r = await repo.update({ id: 1, title: "Updated Page", icon: "📄" });
  expect(r.id).toBe(1);
  expect(r.title).toBe("Updated Page");
  expect(r.icon).toBe("📄");
});

test("delete does not throw", async () => {
  await expect(repo.delete(1)).resolves.toBeUndefined();
});

test("softDelete does not throw", async () => {
  const mockDb: any = {
    update: () => ({
      set: () => ({
        where: async () => undefined,
      }),
    }),
  };

  repo = new DrizzlePageRepository(mockDb);
  await expect(repo.softDelete(1)).resolves.toBeUndefined();
});

test("findByWorkspaceId returns pages", async () => {
  const mockDb: any = {
    select: () => ({
      from: () => ({
        where: async () => [
          {
            id: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            title: "Page 1",
            icon: null,
            parentPageId: null,
            deletedAt: null,
            workspaceId: 1,
          },
          {
            id: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            title: "Page 2",
            icon: null,
            parentPageId: null,
            deletedAt: null,
            workspaceId: 1,
          },
        ],
      }),
    }),
  };

  repo = new DrizzlePageRepository(mockDb);
  const pages = await repo.findByWorkspaceId(1);

  expect(pages).toHaveLength(2);
  expect(pages[0].title).toBe("Page 1");
  expect(pages[1].title).toBe("Page 2");
  expect(pages[0].workspaceId).toBe(1);
});

test("findByParentPageId returns child pages", async () => {
  const mockDb: any = {
    select: () => ({
      from: () => ({
        where: async () => [
          {
            id: 3,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            title: "Child Page 1",
            icon: null,
            parentPageId: "parent-123",
            deletedAt: null,
            workspaceId: 1,
          },
        ],
      }),
    }),
  };

  repo = new DrizzlePageRepository(mockDb);
  const pages = await repo.findByParentPageId("parent-123");

  expect(pages).toHaveLength(1);
  expect(pages[0].title).toBe("Child Page 1");
  expect(pages[0].parentPageId).toBe("parent-123");
});
