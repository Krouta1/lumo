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

const people = [
  {
    username: 'shadcn',
    avatar: 'https://github.com/shadcn.png',
    email: 'shadcn@vercel.com',
  },
  {
    username: 'maxleiter',
    avatar: 'https://github.com/maxleiter.png',
    email: 'maxleiter@vercel.com',
  },
  {
    username: 'evilrabbit',
    avatar: 'https://github.com/evilrabbit.png',
    email: 'evilrabbit@vercel.com',
  },
];

export default function WorkspacesPage() {
  return (
    <div className='h-dvh xl:max-w-3/4 mx-auto px-10 xl:px-0'>
      <div className='h-20'>Workspaces</div>
      <ItemGroup className='xl:max-w-3/4 gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3'>
        {people.map((person) => (
          <Item key={person.username} variant='outline' asChild>
            <Link href={`/w/${person.username}/`}>
              <ItemContent className='gap-1'>
                <ItemTitle>{person.username}</ItemTitle>
                <ItemDescription>{person.email}</ItemDescription>
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
