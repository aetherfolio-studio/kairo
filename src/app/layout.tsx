import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { KairoStoreProvider } from '@/lib/store';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Kairo — AI Workspace for Modern Teams',
    template: '%s | Kairo'
  },
  description: 'Kairo is an intelligent workspace that brings projects, tasks, conversations and AI workflows together.',
  keywords: ['AI workspace', 'project management', 'linear alternative', 'modern productivity', 'developer workflows'],
  authors: [{ name: 'Kairo Team' }],
  creator: 'Kairo Technologies',
  metadataBase: new URL('https://kairo-workspace.vercel.app'),
  openGraph: {
    title: 'Kairo — AI Workspace for Modern Teams',
    description: 'Turn ideas into progress. An intelligent workspace that unifies projects, tasks, conversations, and ambient AI workflows.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Kairo'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kairo — AI Workspace for Modern Teams',
    description: 'Turn ideas into progress. An intelligent workspace that unifies projects, tasks, conversations, and ambient AI workflows.'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark antialiased h-full">
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100 selection:bg-blue-500/30 selection:text-blue-200">
        <KairoStoreProvider>
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
          <CommandPalette />
        </KairoStoreProvider>
      </body>
    </html>
  );
}
