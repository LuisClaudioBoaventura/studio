'use client';

import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {Toaster} from '@/components/ui/toaster';
import {ThemeProvider} from '@/components/theme/theme-provider';
import {SidebarLayout} from '@/components/layout/sidebar-layout';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Login} from '@/components/auth/login';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, [router]);

  const onLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('token', 'dummytoken');
    router.push('/');
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster />
          {isLoggedIn ? (
            <SidebarLayout onLogout={onLogout}>{children}</SidebarLayout>
          ) : (
            <Login onLogin={onLogin} />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
