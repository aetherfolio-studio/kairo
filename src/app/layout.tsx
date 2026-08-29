import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Newsreader } from 'next/font/google';
import './globals.css';
import { HospitalStoreProvider } from '@/lib/store';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CommandPalette } from '@/components/CommandPalette';
import { BookDemoModal, PatientRecordDrawer } from '@/components/Modals';

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const serifFont = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kairo — Hospital operations, intelligently connected.',
  description:
    'Kairo unifies clinical, operational, and administrative workflows in one intelligent platform—empowering hospitals to deliver exceptional care every day.',
  keywords: [
    'Hospital OS',
    'Healthcare Operations',
    'Clinical Workflow Management',
    'Hospital ERP',
    'Patient Scheduling',
    'Bed Management',
    'Medical Inventory'
  ],
  authors: [{ name: 'Kairo Design & Engineering' }],
  creator: 'Kairo Healthcare Systems',
  publisher: 'Kairo Healthcare Systems',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Kairo — Hospital operations, intelligently connected.',
    description:
      'Intelligent care. Seamless operations. Better outcomes. Connected clinical and operational workspace for modern hospitals.',
    url: 'https://kairo-hospital.vercel.app',
    siteName: 'Kairo Hospital OS',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sansFont.variable} ${serifFont.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FBF8F5] text-[#2C1810] selection:bg-[#FDEEE9] selection:text-[#E06D53]">
        <HospitalStoreProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
          <CommandPalette />
          <BookDemoModal />
          <PatientRecordDrawer />
        </HospitalStoreProvider>
      </body>
    </html>
  );
}
