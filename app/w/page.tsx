import Workspaces from '@/components/workspaces/Workspaces';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getWorkspaces } from '@/queries/get-workspaces';

export default async function WorkspacesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['workspaces'],
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
