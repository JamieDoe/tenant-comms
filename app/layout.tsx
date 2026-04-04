import type { Metadata } from 'next';
import { Inter, Source_Serif_4, JetBrains_Mono } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

import { cn } from '@/lib/utils/utils';

import { ThemeProvider } from '@/components/providers/theme-provider';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Tenant Comms',
  description:
    'Tenant communication platform built with Next.js and Tailwind CSS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        fontSans.variable,
        fontMono.variable,
        'font-sans',
        fontSerif.variable
      )}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
