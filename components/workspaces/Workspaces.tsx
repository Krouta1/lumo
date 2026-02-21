'use client';
import { getWorkspaces } from '@/queries/get-workspaces';
import { useQuery } from '@tanstack/react-query';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

export default function Workspaces() {
  const { data: workspaces } = useQuery({
    queryKey: ['workspaces'],
    queryFn: () => getWorkspaces(),
  });

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/login';
  }

  return (
    <div className='h-dvh xl:max-w-3/4 mx-auto px-10 xl:px-0'>
      <div className='h-20 flex justify-between items-center'>
        <span>Workspaces</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <ItemGroup className='xl:max-w-3/4 gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'>
        {workspaces?.map((workspace) => (
          <Item key={workspace.id} variant='outline' asChild>
            <Link href={`/w/${workspace.id}/`}>
              <ItemContent className='gap-1'>
                <ItemTitle>{workspace.name}</ItemTitle>
                <ItemDescription>
                  {new Date(workspace.createdAt).toLocaleDateString('cs-CZ')}
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className='size-4' />
              </ItemActions>
            </Link>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
