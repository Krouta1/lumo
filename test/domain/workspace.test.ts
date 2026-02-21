import { expect, test } from "vitest";
import { createWorkspace } from "../../domain/entities/workspace";

test("createWorkspace sets defaults and preserves provided values", () => {
  const w = createWorkspace({ name: "My WS", ownerId: "owner-1" });
  expect(typeof w.id).toBe("number");
  expect(w.name).toBe("My WS");
  expect(w.ownerId).toBe("owner-1");
  expect(w.createdAt).toBeInstanceOf(Date);

  const now = new Date(2020, 1, 1);
  const w2 = createWorkspace({
    id: 5,
    name: "X",
    ownerId: "o",
    createdAt: now,
  });
  expect(w2.id).toBe(5);
  expect(w2.createdAt).toBe(now);
});
