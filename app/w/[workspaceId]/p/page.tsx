import Pages from '@/components/pages/Pages';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getPages } from '@/actions/pages';
import { pageKeys } from '@/queries/page-keys';

type Props = {
  params: Promise<{ workspaceId: string }>;
};

export default async function WorkspacePages({ params }: Props) {
  const { workspaceId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: pageKeys.list(Number(workspaceId)),
    queryFn: () => getPages(Number(workspaceId)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Pages />
    </HydrationBoundary>
  );
}
