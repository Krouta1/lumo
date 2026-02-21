import { vi, test, expect, beforeEach } from "vitest";
import { DrizzleWorkspaceRepository } from "@/infrastructure/repositories/drizzle-workspace-repository";

let repo: DrizzleWorkspaceRepository;

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
            name: "X",
            ownerId: "o",
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
              name: "Y",
              ownerId: "o",
            },
          ],
        }),
      }),
    }),
    delete: () => ({ where: async () => undefined }),
  };

  repo = new DrizzleWorkspaceRepository(mockDb);
});

test("create returns mapped workspace", async () => {
  const r = await repo.create({ name: "X", ownerId: "o" });
  expect(r.id).toBe(1);
  expect(r.name).toBe("X");
  expect(r.ownerId).toBe("o");
  expect(r.createdAt).toBeInstanceOf(Date);
});

test("update returns mapped workspace", async () => {
  const r = await repo.update({ id: 1, name: "Y" });
  expect(r.id).toBe(1);
  expect(r.name).toBe("Y");
});

test("delete does not throw", async () => {
  await expect(repo.delete(1)).resolves.toBeUndefined();
});
