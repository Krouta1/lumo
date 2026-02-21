'use client';

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';
import { ChevronRightIcon, FileTextIcon, icons } from 'lucide-react';
import Link from 'next/link';
import CreatePageForm from '../forms/CreatePageForm';
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/ui/empty';
import { Skeleton } from '@/components/ui/skeleton';
import { useParams } from 'next/navigation';
import { usePages } from '@/queries/use-pages';
import type { LucideIcon } from 'lucide-react';

function getIconComponent(iconName?: string | null): LucideIcon {
  if (!iconName) return FileTextIcon;

  // Get the icon from lucide-react's icons object
  const IconComponent = icons[iconName as keyof typeof icons];
  return IconComponent && typeof IconComponent === 'object'
    ? (IconComponent as LucideIcon)
    : FileTextIcon;
}

export default function Pages() {
  const params = useParams();
  const workspaceId = Number(params.workspaceId);
  const { data: pages, isLoading } = usePages(workspaceId);

  return (
    <div className='min-h-dvh bg-linear-to-r from-background via-background to-muted/20'>
      <div className='max-w-7xl mx-auto px-6 py-8 sm:px-8 lg:px-10'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12'>
          <div className='space-y-2'>
            <h1 className='text-4xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent'>
              Pages
            </h1>
            <p className='text-muted-foreground text-lg'>
              Select a page to edit or create a new one
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <CreatePageForm />
          </div>
        </div>

        {/* Pages Grid */}
        {isLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className='h-32 rounded-lg' />
            ))}
          </div>
        ) : pages && pages.length > 0 ? (
          <ItemGroup className='gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {pages.map((page) => {
              const IconComponent = getIconComponent(page.icon);

              return (
                <Item
                  key={page.id}
                  variant='outline'
                  asChild
                  className='group hover:shadow-lg hover:border-primary/50 transition-all duration-200 hover:scale-[1.02] cursor-pointer'
                >
                  <Link href={`/w/${workspaceId}/p/${page.id}`}>
                    <div className='mr-4 p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center'>
                      <IconComponent className='size-5 text-primary' />
                    </div>
                    <ItemContent className='gap-1 flex-1'>
                      <ItemTitle className='text-lg font-semibold group-hover:text-primary transition-colors'>
                        {page.title}
                      </ItemTitle>
                      <ItemDescription className='text-sm'>
                        Updated{' '}
                        {new Date(page.updatedAt).toLocaleDateString('cs-CZ')}
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                      <ChevronRightIcon className='size-4 group-hover:translate-x-1 transition-transform' />
                    </ItemActions>
                  </Link>
                </Item>
              );
            })}
          </ItemGroup>
        ) : (
          <Empty className='py-20 px-4'>
            <EmptyMedia
              variant='icon'
              className='rounded-full bg-muted p-6 mb-6'
            >
              <FileTextIcon className='size-12 text-muted-foreground' />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>No pages yet</EmptyTitle>
              <EmptyDescription>
                Get started by creating your first page. Pages help you organize
                your content and ideas.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <CreatePageForm />
            </EmptyContent>
          </Empty>
        )}
      </div>
    </div>
  );
}
