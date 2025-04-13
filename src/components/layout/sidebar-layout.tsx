'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarProvider,
} from '@/components/ui/sidebar';
import {Home, ListChecks, BarChart, FileBarGraph, Power} from 'lucide-react';
import {useRouter} from 'next/navigation';

export const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <p className="font-bold text-lg">Nebula</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuButton onClick={() => router.push('/')} >
                  <Home />
                  <span>Home</span>
                </SidebarMenuButton>
                <SidebarMenuButton onClick={() => router.push('/tasks')}>
                  <ListChecks />
                  <span>Tasks</span>
                </SidebarMenuButton>
                <SidebarMenuButton onClick={() => router.push('/dashboard')}>
                  <BarChart />
                  <span>Dashboard</span>
                </SidebarMenuButton>
                <SidebarMenuButton onClick={() => router.push('/reports')}>
                  <FileBarGraph />
                  <span>Reports</span>
                </SidebarMenuButton>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuButton onClick={handleLogout}>
                  <Power />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-4">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};
