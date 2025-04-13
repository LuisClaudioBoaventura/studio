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
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {Home, ListChecks, BarChart, FileBarChart, Power} from 'lucide-react';
import {ModeToggle} from '@/components/theme/theme-provider';

export const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarTrigger/>
            <p className="font-bold text-lg">Nebula</p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuButton onClick={() => window.location.href = '/'} >
                  <Home />
                  <span>Home</span>
                </SidebarMenuButton>
                <SidebarMenuButton onClick={() => window.location.href = '/tasks'}>
                  <ListChecks />
                  <span>Tasks</span>
                </SidebarMenuButton>
                <SidebarMenuButton onClick={() => window.location.href = '/dashboard'}>
                  <BarChart />
                  <span>Dashboard</span>
                </SidebarMenuButton>
                <SidebarMenuButton onClick={() => window.location.href = '/reports'}>
                  <FileBarChart />
                  <span>Reports</span>
                </SidebarMenuButton>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuButton onClick={() => { localStorage.removeItem('token'); window.location.href = '/';}}>
                  <Power />
                  <span>Logout</span>
                </SidebarMenuButton>
                <ModeToggle />
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

