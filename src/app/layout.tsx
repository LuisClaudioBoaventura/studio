'use client';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Login } from '@/components/auth/login';
import { useState, useEffect } from 'react';
import { SidebarLayout } from '@/components/layout/sidebar-layout';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast'; // Ensure useToast is imported

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
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast(); // Initialize useToast

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const onLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('token', 'dummytoken');
    toast({
      title: 'Login efetuado com sucesso!',
      description: 'Você será redirecionado para a página inicial.',
    });
    router.push('/');
  };

  const onLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    toast({
      title: 'Logout efetuado com sucesso!',
    });
    router.push('/'); // Redirect to login or home after logout
  };

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster/>
          {isLoading ? (
            <div className="flex items-center justify-center h-screen">Loading...</div>
          ) : isLoggedIn ? (
            <SidebarLayout onLogout={onLogout}>
              {children}
            </SidebarLayout>
          ) : (
            <Login onLogin={onLogin}/>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
