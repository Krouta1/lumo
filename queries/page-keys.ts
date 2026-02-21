// Query keys for page-related queries
export const pageKeys = {
  all: ["pages"] as const,
  list: (workspaceId: number) => [...pageKeys.all, workspaceId] as const,
  detail: (id: string) => ["pages", id] as const,
};
