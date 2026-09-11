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
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
        <button
          onClick={onOpenMobileMenu}
          aria-label="Open Navigation Drawer"
          className="lg:hidden w-10 h-10 flex items-center justify-center text-[#7A6258] hover:text-[#2C1810] rounded-xl border border-[#EFE5DC] bg-white shadow-warm-sm active:scale-95 cursor-pointer shrink-0"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs min-w-0">
          <span className="text-[#A59288] font-mono hidden sm:inline shrink-0">Hospital OS</span>
          <ChevronRight className="w-3.5 h-3.5 text-[#E2D3C7] hidden sm:inline shrink-0" />
          <h1 className="text-sm sm:text-base font-bold text-[#2C1810] truncate max-w-[130px] xs:max-w-[190px] sm:max-w-none">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Mobile Search trigger */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          aria-label="Quick Search"
          className="sm:hidden w-9 h-9 flex items-center justify-center text-[#7A6258] hover:text-[#2C1810] bg-white border border-[#EFE5DC] rounded-xl shadow-warm-sm active:scale-95 cursor-pointer"
        >
          <Search className="w-4 h-4 text-[#7A6258]" />
        </button>

        {/* Desktop Search trigger */}
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
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF6F2] text-[#2C1810] text-xs font-semibold border border-[#EFE5DC] shadow-warm-sm transition-all cursor-pointer active:scale-95"
        >
          <Calendar className="w-3.5 h-3.5 text-[#E06D53]" />
          <span>Book Appointment</span>
        </button>

        {/* Admit Patient action */}
        <button
          onClick={onOpenNewPatient}
          className="flex items-center gap-1 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-[#E06D53] hover:bg-[#D25C42] text-white text-xs font-semibold shadow-terracotta transition-all cursor-pointer active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Admit</span>
          <span className="hidden xs:inline"> Patient</span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-1.5 sm:pl-2 border-l border-[#EFE5DC]">
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
