import { cn } from '@/utils/cn';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Control 361 Test - Kauan Santos',
  description: 'A simple test to test the knowledge of Kauan Santos',
};

interface RootLayoutProps {
  children: Readonly<ReactNode>;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body
        suppressHydrationWarning
        className={cn(inter.variable, 'antialiased font-sans bg-primary-10')}
      >
        {children}
      </body>
    </html>
  );
}
