'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useHospitalStore } from '@/lib/store';
import {
  Search,
  Users,
  Calendar,
  Building2,
  BedDouble,
  Receipt,
  Sparkles,
  ArrowRight,
  Plus,
  X,
  Stethoscope,
  Activity,
  FileText,
  Command
} from 'lucide-react';

export function CommandPalette() {
  const router = useRouter();
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    patients,
    setSelectedPatient,
    setIsNewPatientOpen,
    setIsNewAppointmentOpen,
    addToast
  } = useHospitalStore();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [category, setCategory] = useState<'All' | 'Patients' | 'Actions' | 'Navigation'>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const quickActions = [
    {
      id: 'act-admit',
      title: 'Admit New Inpatient',
      category: 'Actions',
      sub: 'Register clinical intake & allocate ward bed',
      icon: Plus,
      action: () => {
        setIsCommandPaletteOpen(false);
        setIsNewPatientOpen(true);
      }
    },
    {
      id: 'act-book',
      title: 'Book Consultation / Surgery',
      category: 'Actions',
      sub: 'Add appointment to physician schedule',
      icon: Calendar,
      action: () => {
        setIsCommandPaletteOpen(false);
        setIsNewAppointmentOpen(true);
      }
    },
    {
      id: 'act-ai',
      title: 'Ask Kairo Intelligence Copilot',
      category: 'Actions',
      sub: 'Run hospital capacity & bottleneck prediction',
      icon: Sparkles,
      action: () => {
        setIsCommandPaletteOpen(false);
        router.push('/app/ai');
      }
    },
    {
      id: 'nav-overview',
      title: 'Go to Command Center Overview',
      category: 'Navigation',
      sub: 'Live hospital telemetry & admissions',
      icon: Activity,
      action: () => {
        setIsCommandPaletteOpen(false);
        router.push('/app');
      }
    },
    {
      id: 'nav-patients',
      title: 'Go to Patient Records Directory',
      category: 'Navigation',
      sub: 'Search 32 active admitted charts',
      icon: Users,
      action: () => {
        setIsCommandPaletteOpen(false);
        router.push('/app/patients');
      }
    },
    {
      id: 'nav-beds',
      title: 'Go to Ward & Bed Capacity',
      category: 'Navigation',
      sub: 'ICU, General & Emergency telemetry',
      icon: BedDouble,
      action: () => {
        setIsCommandPaletteOpen(false);
        router.push('/app/beds');
      }
    },
    {
      id: 'nav-billing',
      title: 'Go to Billing & Claims Ledger',
      category: 'Navigation',
      sub: 'ICD-10 coding & insurance reconciliations',
      icon: Receipt,
      action: () => {
        setIsCommandPaletteOpen(false);
        router.push('/app/billing');
      }
    }
  ];

  // Patients as items
  const patientItems = patients.map((p) => ({
    id: `pt-${p.id}`,
    title: `${p.name} (${p.patientId})`,
    category: 'Patients',
    sub: `${p.department} • ${p.status} • Room: ${p.room || 'Outpatient'}`,
    icon: Users,
    action: () => {
      setIsCommandPaletteOpen(false);
      setSelectedPatient(p);
      addToast({
        title: `Opened Chart: ${p.name}`,
        description: `EHR Record loaded with real-time bedside vitals.`,
        type: 'info'
      });
    }
  }));

  const allItems = [...quickActions, ...patientItems];

  const filteredItems = allItems.filter((item) => {
    const matchesCat = category === 'All' || item.category === category;
    const matchesSearch =
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.sub.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-[#2C1810]/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FFFDFC] border border-[#EFE5DC] rounded-3xl shadow-warm-lg overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Search input header */}
        <div className="p-4 border-b border-[#EFE5DC] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#E06D53] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, patient name, doctor, or department..."
            className="flex-1 bg-transparent text-sm text-[#2C1810] placeholder-[#A59288] focus:outline-none"
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 text-[#7A6258] hover:text-[#2C1810] rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#FAF6F2] border-b border-[#EFE5DC] overflow-x-auto text-xs">
          {(['All', 'Actions', 'Patients', 'Navigation'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setSelectedIndex(0);
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                category === cat
                  ? 'bg-[#E06D53] text-white shadow-warm-sm'
                  : 'text-[#7A6258] hover:text-[#2C1810]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 flex flex-col gap-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#A59288] flex flex-col items-center gap-2">
              <Search className="w-6 h-6 text-[#E2D3C7]" />
              <span>No commands or patient records found matching &quot;{query}&quot;.</span>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? 'bg-[#FDEEE9] text-[#E06D53] shadow-warm-sm translate-x-1'
                      : 'hover:bg-[#FAF6F2] text-[#2C1810]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-white text-[#E06D53]' : 'bg-[#FAF6F2] text-[#7A6258]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold truncate">{item.title}</span>
                      <span className="text-[11px] text-[#7A6258] truncate">{item.sub}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white border border-[#EFE5DC] text-[#7A6258]">
                      {item.category}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#E06D53]' : 'text-transparent'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#FAF6F2] border-t border-[#EFE5DC] flex items-center justify-between text-[11px] font-mono text-[#A59288] px-4">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>Kairo Hospital Spotlight</span>
        </div>
      </div>
    </div>
  );
}
