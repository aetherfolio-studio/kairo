'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useHospitalStore } from '@/lib/store';
import {
  Menu,
  Search,
  Bell,
  Calendar,
  Plus,
  SlidersHorizontal,
  ChevronRight,
  UserCheck
} from 'lucide-react';

interface AppHeaderProps {
  onOpenMobileMenu: () => void;
  onOpenNewPatient: () => void;
  onOpenNewAppointment: () => void;
}

export function AppHeader({
  onOpenMobileMenu,
  onOpenNewPatient,
  onOpenNewAppointment
}: AppHeaderProps) {
  const pathname = usePathname();
  const { setIsCommandPaletteOpen } = useHospitalStore();

  const getPageTitle = () => {
    if (pathname === '/app') return 'Overview Dashboard';
    if (pathname.startsWith('/app/patients')) return 'Patient Management';
    if (pathname.startsWith('/app/appointments')) return 'Appointment Scheduling';
    if (pathname.startsWith('/app/departments')) return 'Clinical Departments';
    if (pathname.startsWith('/app/beds')) return 'Bed & Capacity Management';
    if (pathname.startsWith('/app/billing')) return 'Billing & Financial Ledger';
    if (pathname.startsWith('/app/reports')) return 'Hospital Analytics & Reports';
    if (pathname.startsWith('/app/staff')) return 'Clinical Staff Directory';
    if (pathname.startsWith('/app/inventory')) return 'Pharmacy & Medical Inventory';
    if (pathname.startsWith('/app/ai')) return 'Kairo Intelligence AI';
    if (pathname.startsWith('/app/messages')) return 'Hospital Communication';
    if (pathname.startsWith('/app/settings')) return 'Hospital Settings';
    return 'Hospital OS';
  };

  return (
    <header className="h-16 border-b border-[#EFE5DC] bg-[#FFFDFC]/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 text-[#7A6258] hover:text-[#2C1810] rounded-xl border border-[#EFE5DC] bg-white shadow-warm-sm cursor-pointer"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#A59288] font-mono hidden sm:inline">Hospital OS</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#E2D3C7] hidden sm:inline" />
          <h1 className="text-sm sm:text-base font-bold text-[#2C1810]">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search trigger */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs text-[#7A6258] hover:text-[#2C1810] bg-white border border-[#EFE5DC] rounded-xl transition-all shadow-warm-sm cursor-pointer"
          title="Search hospital records (Cmd+K)"
        >
          <Search className="w-3.5 h-3.5 text-[#7A6258]" />
          <span>Quick search...</span>
          <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-[#FAF6F2] border border-[#E2D3C7] rounded text-[#7A6258]">
            ⌘K
          </kbd>
        </button>

        {/* Schedule Consultation action */}
        <button
          onClick={onOpenNewAppointment}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF6F2] text-[#2C1810] text-xs font-semibold border border-[#EFE5DC] shadow-warm-sm transition-all cursor-pointer"
        >
          <Calendar className="w-3.5 h-3.5 text-[#E06D53]" />
          <span>Book Appointment</span>
        </button>

        {/* Admit Patient action */}
        <button
          onClick={onOpenNewPatient}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#E06D53] hover:bg-[#D25C42] text-white text-xs font-semibold shadow-terracotta transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Admit Patient</span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#EFE5DC]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
            alt="Dr. Sarah Chen"
            className="w-8 h-8 rounded-full object-cover border border-[#E2D3C7]"
          />
        </div>
      </div>
    </header>
  );
}
