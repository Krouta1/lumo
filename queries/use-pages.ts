"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPages, getPage, createPage } from "@/actions/pages";
import { pageKeys } from "./page-keys";

export function usePages(workspaceId: number | null | undefined) {
  return useQuery({
    queryKey: pageKeys.list(Number(workspaceId ?? 0)),
    queryFn: () => getPages(Number(workspaceId)),
    enabled: !!workspaceId,
  });
}

export function usePage(id: string | null | undefined) {
  return useQuery({
    queryKey: pageKeys.detail(String(id)),
    queryFn: () => getPage(String(id)),
    enabled: !!id,
  });
}

export function useCreatePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: {
      title: string;
      workspaceId: number;
      icon?: string;
      parentPageId?: string;
    }) =>
      createPage(
        input.title,
        input.workspaceId,
        input.icon,
        input.parentPageId,
      ),
    onSuccess: (data, variables) => {
      if (data && !("error" in data)) {
        queryClient.invalidateQueries({
          queryKey: pageKeys.list(variables.workspaceId),
        });
      }
    },
  });
}
