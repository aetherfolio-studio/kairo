import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Newsreader } from 'next/font/google';
import './globals.css';
import { HospitalStoreProvider } from '@/lib/store';
import { BookDemoModal, PatientRecordDrawer } from '@/components/Modals';
import { CommandPalette } from '@/components/CommandPalette';
import { ToastContainer } from '@/components/ToastContainer';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kairo — Hospital Operating System | Healthcare Operations Platform',
  description:
    'An intelligent, calm operating system connecting hospital patients, clinical schedules, bed management, departments, billing, and operational intelligence.',
  keywords: [
    'Hospital OS',
    'Healthcare Operations Platform',
    'Clinical Scheduling',
    'Bed Capacity Management',
    'Hospital ERP',
    'Patient Records',
    'EHR Workflow',
    'Kairo'
  ],
  authors: [{ name: 'Kairo Systems' }],
  openGraph: {
    title: 'Kairo — Hospital Operating System',
    description:
      'Intelligent care. Seamless operations. Better outcomes. The modern hospital operating system.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${newsreader.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#FBF8F5] text-[#2C1810] antialiased flex flex-col justify-between">
        <HospitalStoreProvider>
          {/* Global Modals & Drawers */}
          <CommandPalette />
          <BookDemoModal />
          <PatientRecordDrawer />
          <ToastContainer />

          <Navbar />
          <div className="flex-1 w-full">{children}</div>
          <Footer />
        </HospitalStoreProvider>
      </body>
    </html>
  );
}
