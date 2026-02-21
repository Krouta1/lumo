'use client';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';
import { ChevronRightIcon, LogOutIcon, FolderIcon } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import CreateWorkspaceForm from '../forms/CreateWorkspaceForm';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useWorkspaces } from '@/queries/use-workspaces';

export default function Workspaces() {
  const router = useRouter();
  const { data: workspaces, isLoading } = useWorkspaces();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  }

  return (
    <div className='min-h-dvh bg-gradient-to-br from-background via-background to-muted/20'>
      <div className='max-w-7xl mx-auto px-6 py-8 sm:px-8 lg:px-10'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12'>
          <div className='space-y-2'>
            <h1 className='text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
              Your Workspaces
            </h1>
            <p className='text-muted-foreground text-lg'>
              Select a workspace to get started or create a new one
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <CreateWorkspaceForm />
            <Button onClick={handleLogout} variant='outline' size='default'>
              <LogOutIcon className='size-4' />
              Logout
            </Button>
          </div>
        </div>

        {/* Workspaces Grid */}
        {isLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className='h-32 rounded-lg' />
            ))}
          </div>
        ) : workspaces && workspaces.length > 0 ? (
          <ItemGroup className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {workspaces.map((workspace) => (
              <Item
                key={workspace.id}
                variant='outline'
                asChild
                className='group hover:shadow-lg hover:border-primary/50 transition-all duration-200 hover:scale-[1.02] cursor-pointer'
              >
                <Link href={`/w/${workspace.id}/`}>
                  <div className='mr-4 p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors'>
                    <FolderIcon className='size-5 text-primary' />
                  </div>
                  <ItemContent className='gap-1 flex-1'>
                    <ItemTitle className='text-lg font-semibold group-hover:text-primary transition-colors'>
                      {workspace.name}
                    </ItemTitle>
                    <ItemDescription className='text-sm'>
                      Created{' '}
                      {new Date(workspace.createdAt).toLocaleDateString(
                        'cs-CZ',
                      )}
                    </ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <ChevronRightIcon className='size-4 group-hover:translate-x-1 transition-transform' />
                  </ItemActions>
                </Link>
              </Item>
            ))}
          </ItemGroup>
        ) : (
          <div className='flex flex-col items-center justify-center py-20 px-4'>
            <div className='rounded-full bg-muted p-6 mb-6'>
              <FolderIcon className='size-12 text-muted-foreground' />
            </div>
            <h2 className='text-2xl font-semibold mb-2'>No workspaces yet</h2>
            <p className='text-muted-foreground text-center max-w-md mb-6'>
              Get started by creating your first workspace. Workspaces help you
              organize your projects and collaborate with your team.
            </p>
            <CreateWorkspaceForm />
          </div>
        )}
      </div>
    </div>
  );
}
