// Query keys for workspace-related queries
// Can be used in both server and client components
export const workspaceKeys = {
  all: ["workspaces"] as const,
  list: () => [...workspaceKeys.all] as const,
  detail: (id: string) => ["workspaces", id] as const,
};
