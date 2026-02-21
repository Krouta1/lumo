'use client';

import { useQuery } from '@tanstack/react-query';
import { getWorkspace } from '@/actions/workspaces';
import { workspaceKeys } from '@/queries/workspace-keys';

export default function WorkspaceView({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const { data: workspace } = useQuery({
    queryKey: workspaceKeys.detail(workspaceId),
    queryFn: () => getWorkspace(workspaceId),
  });

  if (!workspace) {
    return <div>Workspace not found</div>;
  }

  return <div>{workspace.name}</div>;
}
