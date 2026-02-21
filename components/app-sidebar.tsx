'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { FileText, Settings, Users } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function AppSidebar() {
  const params = useParams();
  const workspaceId = params?.workspaceId as string;

  const menuItems = [
    {
      title: 'Pages',
      icon: FileText,
      href: `/w/${workspaceId}/p`,
    },
    {
      title: 'Members',
      icon: Users,
      href: `/w/${workspaceId}/members`,
    },
    {
      title: 'Settings',
      icon: Settings,
      href: `/w/${workspaceId}/settings`,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href={`/w/${workspaceId}`}
          className='flex items-center gap-2 px-2 py-2'
        >
          <h2 className='text-lg font-semibold'>Workspace</h2>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.href} className='flex items-center gap-2'>
                    <item.icon className='h-4 w-4' />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
