import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export default function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-full h-dvh'>
        <div className='flex items-center gap-2 border-b p-4'>
          <SidebarTrigger />
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
