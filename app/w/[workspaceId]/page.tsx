import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getWorkspace } from '@/actions/workspaces';
import WorkspaceView from '@/components/workspaces/WorkspaceView';
import { workspaceKeys } from '@/queries/workspace-keys';

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: workspaceKeys.detail(workspaceId),
    queryFn: () => getWorkspace(workspaceId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WorkspaceView workspaceId={workspaceId} />
    </HydrationBoundary>
  );
}
