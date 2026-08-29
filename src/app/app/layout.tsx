'use client';

import React, { useState } from 'react';
import { AppSidebar } from '@/components/AppSidebar';
import { AppHeader } from '@/components/AppHeader';
import { NewPatientModal, NewAppointmentModal } from '@/components/Modals';
import { useHospitalStore } from '@/lib/store';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const {
    isNewPatientOpen,
    setIsNewPatientOpen,
    isNewAppointmentOpen,
    setIsNewAppointmentOpen
  } = useHospitalStore();

  return (
    <div className="flex h-screen w-full bg-[#FAF6F2] text-[#2C1810] overflow-hidden">
      {/* Sidebar Navigation */}
      <AppSidebar
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        onOpenNewPatient={() => setIsNewPatientOpen(true)}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <AppHeader
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
          onOpenNewPatient={() => setIsNewPatientOpen(true)}
          onOpenNewAppointment={() => setIsNewAppointmentOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#FAF6F2]">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Hospital Modals */}
      <NewPatientModal
        isOpen={isNewPatientOpen}
        onClose={() => setIsNewPatientOpen(false)}
      />
      <NewAppointmentModal
        isOpen={isNewAppointmentOpen}
        onClose={() => setIsNewAppointmentOpen(false)}
      />
    </div>
  );
}
