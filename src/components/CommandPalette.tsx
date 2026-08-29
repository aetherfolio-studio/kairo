'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useHospitalStore } from '@/lib/store';
import {
  Search,
  Users,
  Calendar,
  Building2,
  Receipt,
  BarChart3,
  UserCheck,
  Package,
  Sparkles,
  ArrowRight,
  X,
  Activity,
  BedDouble
} from 'lucide-react';

interface PaletteItem {
  label: string;
  category: 'Navigation' | 'Patient' | 'Department' | 'Physician' | 'Action';
  href?: string;
  icon: any;
  subtitle?: string;
  onSelect?: () => void;
}

export function CommandPalette() {
  const router = useRouter();
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    patients,
    departments,
    setSelectedPatient,
    setIsNewPatientOpen,
    setIsNewAppointmentOpen,
    setIsBookDemoOpen
  } = useHospitalStore();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isCommandPaletteOpen]);

  const quickNav: PaletteItem[] = [
    { label: 'Hospital Overview Dashboard', category: 'Navigation', href: '/app', icon: Activity, subtitle: 'Live admissions, metrics & schedule' },
    { label: 'Patient Directory & Records', category: 'Navigation', href: '/app/patients', icon: Users, subtitle: 'Search medical histories' },
    { label: 'Smart Appointment Scheduling', category: 'Navigation', href: '/app/appointments', icon: Calendar, subtitle: 'Day, week & month calendar' },
    { label: 'Bed & Ward Occupancy', category: 'Navigation', href: '/app/beds', icon: BedDouble, subtitle: 'ICU, General, ER & Private capacity' },
    { label: 'Department Clinical Operations', category: 'Navigation', href: '/app/departments', icon: Building2, subtitle: '8 specialized clinical units' },
    { label: 'Billing & Invoices', category: 'Navigation', href: '/app/billing', icon: Receipt, subtitle: 'Revenue, claims & payments' },
    { label: 'Hospital Analytics & Reports', category: 'Navigation', href: '/app/reports', icon: BarChart3, subtitle: 'Turnover & volume trends' },
    { label: 'Kairo Intelligence AI', category: 'Navigation', href: '/app/ai', icon: Sparkles, subtitle: 'Operational bottleneck assistant' },
    {
      label: 'Admit New Patient (+)',
      category: 'Action',
      icon: Users,
      subtitle: 'Open clinical intake form',
      onSelect: () => {
        setIsCommandPaletteOpen(false);
        setIsNewPatientOpen(true);
      }
    },
    {
      label: 'Schedule New Consultation (+)',
      category: 'Action',
      icon: Calendar,
      subtitle: 'Book physician time slot',
      onSelect: () => {
        setIsCommandPaletteOpen(false);
        setIsNewAppointmentOpen(true);
      }
    },
    {
      label: 'Book Platform Demo Walkthrough',
      category: 'Action',
      icon: Sparkles,
      subtitle: 'Schedule 30-min architect call',
      onSelect: () => {
        setIsCommandPaletteOpen(false);
        setIsBookDemoOpen(true);
      }
    }
  ];

  const patientResults: PaletteItem[] = patients
    .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || p.patientId.toLowerCase().includes(query.toLowerCase()))
    .map((p) => ({
      label: p.name,
      category: 'Patient',
      icon: Users,
      subtitle: `${p.patientId} • ${p.department} • ${p.status}`,
      onSelect: () => {
        setIsCommandPaletteOpen(false);
        setSelectedPatient(p);
      }
    }));

  const departmentResults: PaletteItem[] = departments
    .filter((d) => d.name.toLowerCase().includes(query.toLowerCase()) || d.code.toLowerCase().includes(query.toLowerCase()))
    .map((d) => ({
      label: d.name,
      category: 'Department',
      href: `/app/departments`,
      icon: Building2,
      subtitle: `${d.code} • ${d.occupancyPercent}% Occupancy • Lead: ${d.headDoctor}`
    }));

  const combinedItems: PaletteItem[] = query.trim() === ''
    ? quickNav
    : [
        ...quickNav.filter((n) => n.label.toLowerCase().includes(query.toLowerCase())),
        ...patientResults,
        ...departmentResults,
      ];

  const handleSelect = (item: PaletteItem) => {
    if (item.onSelect) {
      item.onSelect();
    } else if (item.href) {
      setIsCommandPaletteOpen(false);
      router.push(item.href);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isCommandPaletteOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (combinedItems.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + combinedItems.length) % (combinedItems.length || 1));
      } else if (e.key === 'Enter' && combinedItems[selectedIndex]) {
        e.preventDefault();
        handleSelect(combinedItems[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, selectedIndex, combinedItems]);

  if (!isCommandPaletteOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-[#2C1810]/50 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-[#FFFDFC] border border-[#EFE5DC] rounded-3xl shadow-warm-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#EFE5DC] gap-3">
          <Search className="w-4 h-4 text-[#7A6258] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search patients, doctors, departments, or jump to pages..."
            className="w-full bg-transparent text-sm text-[#2C1810] placeholder-[#A59288] focus:outline-none"
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded-md text-[#7A6258] hover:text-[#2C1810] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 flex flex-col gap-0.5">
          {combinedItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#A59288]">
              No hospital records found matching &quot;{query}&quot;
            </div>
          ) : (
            combinedItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs transition-colors text-left cursor-pointer ${
                    isSelected
                      ? 'bg-[#E06D53] text-white font-medium shadow-warm-sm'
                      : 'text-[#2C1810] hover:bg-[#F8F3ED]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isSelected ? 'text-white' : 'text-[#E06D53]'
                      }`}
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="truncate">{item.label}</span>
                      {item.subtitle && (
                        <span
                          className={`text-[10px] truncate ${
                            isSelected ? 'text-[#FDEEE9]' : 'text-[#7A6258]'
                          }`}
                        >
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-[#C54E35] text-white'
                          : 'bg-[#FAF6F2] text-[#7A6258] border border-[#EFE5DC]'
                      }`}
                    >
                      {item.category}
                    </span>
                    <ArrowRight
                      className={`w-3.5 h-3.5 ${
                        isSelected ? 'text-white' : 'text-[#A59288]'
                      }`}
                    />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-2.5 bg-[#FAF6F2] border-t border-[#EFE5DC] flex items-center justify-between text-[11px] text-[#7A6258] font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>Kairo Hospital Spotlight</span>
        </div>
      </div>
    </div>
  );
}
