import Workspaces from '@/components/workspaces/Workspaces';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getWorkspaces } from '@/actions/workspaces';
import { workspaceKeys } from '@/queries/workspace-keys';

export default async function WorkspacesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: workspaceKeys.list(),
    queryFn: getWorkspaces,
  });

  return (
    // Neat! Serialization is now as easy as passing props.
    // HydrationBoundary is a Client Component, so hydration will happen there.
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Workspaces />
    </HydrationBoundary>
  );
}
