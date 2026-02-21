"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getWorkspaces,
  getWorkspace,
  createWorkspace,
} from "@/actions/workspaces";
import { workspaceKeys } from "./workspace-keys";

/**
 * Hook to fetch all workspaces for the current user
 */
export function useWorkspaces() {
  return useQuery({
    queryKey: workspaceKeys.list(),
    queryFn: () => getWorkspaces(),
  });
}

/**
 * Hook to fetch a single workspace by ID
 */
export function useWorkspace(id: string) {
  return useQuery({
    queryKey: workspaceKeys.detail(id),
    queryFn: () => getWorkspace(id),
    enabled: !!id,
  });
}

/**
 * Hook to create a new workspace with optimistic updates
 */
export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: string) => createWorkspace(name),
    onSuccess: (data) => {
      // Only invalidate if the creation was successful
      if (data && !("error" in data)) {
        // Invalidate the workspaces list to refetch
        queryClient.invalidateQueries({ queryKey: workspaceKeys.list() });
      }
    },
  });
}
