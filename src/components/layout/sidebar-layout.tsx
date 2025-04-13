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
  SidebarInput,
} from '@/components/ui/sidebar';
import {ListChecks, BarChart, FileBarChart, Power, Home as HomeIcon} from 'lucide-react';
import {ModeToggle} from '@/components/theme/theme-provider';
import React, {useRef, useEffect, useState} from 'react';

export const SidebarLayout: React.FC<{
  children: React.ReactNode;
  onLogout: () => void;
}> = ({children, onLogout}) => {
  const sidebarRef = useRef(null);
  const [sidebarWidth, setSidebarWidth] = useState('16rem');

  useEffect(() => {
    const updateSidebarWidth = () => {
      if (sidebarRef.current) {
        const element = sidebarRef.current;
        const longestWordWidth = Array.from(element.querySelectorAll('span')).reduce(
          (max, span) => Math.max(max, span.offsetWidth),
          0
        );
        setSidebarWidth(`${Math.max(longestWordWidth + 80, 200)}px`); // Adjust 80px padding and min width
      }
    };

    // Initial width calculation
    updateSidebarWidth();

    // Recalculate width on window resize (optional)
    window.addEventListener('resize', updateSidebarWidth);

    return () => {
      window.removeEventListener('resize', updateSidebarWidth);
    };
  }, []);

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <div className="flex items-center justify-between">
              <p className="font-bold text-lg transition-all duration-200 group-data-[collapsible=icon]:hidden">
                Nebula
              </p>
              <p className="font-bold text-lg transition-all duration-200 hidden group-data-[collapsible=icon]:block text-center">
                N
              </p>
              <SidebarTrigger />
            </div>
            <SidebarInput placeholder="Search..."  />
          </SidebarHeader>
          <SidebarContent ref={sidebarRef}>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuButton onClick={() => (window.location.href = '/')}>
                  <HomeIcon />
                  <span>Home</span>
                </SidebarMenuButton>
                <SidebarMenuButton onClick={() => (window.location.href = '/tasks')}>
                  <ListChecks />
                  <span>Tarefas</span>
                </SidebarMenuButton>
                <SidebarMenuButton onClick={() => (window.location.href = '/dashboard')}>
                  <BarChart />
                  <span>Dashboard</span>
                </SidebarMenuButton>
                <SidebarMenuButton onClick={() => (window.location.href = '/reports')}>
                  <FileBarChart />
                  <span>Reports</span>
                </SidebarMenuButton>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarGroup>
              <SidebarMenu className="group-data-[collapsible=icon]:items-center">
                <ModeToggle />
                <SidebarMenuButton onClick={onLogout}>
                  <Power />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-4">{children}</div>
      </div>
    </SidebarProvider>
  );
};
