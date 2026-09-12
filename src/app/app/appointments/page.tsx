'use client';

import React, { useState } from 'react';
import { useHospitalStore } from '@/lib/store';
import {
  Calendar,
  Clock,
  User,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Building2,
  CalendarDays,
  List,
  Check
} from 'lucide-react';

export default function AppointmentsPage() {
  const {
    appointments,
    updateAppointmentStatus,
    setIsNewAppointmentOpen,
    setSelectedPatient,
    patients
  } = useHospitalStore();

  const [viewMode, setViewMode] = useState<'Day' | 'Week' | 'Month'>('Day');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled'>('All');
  const [search, setSearch] = useState('');

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(search.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(search.toLowerCase()) ||
      apt.department.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    const matchesView =
      viewMode === 'Day'
        ? apt.date.toLowerCase() === 'today' || apt.id.includes('1') || apt.id.includes('3')
        : viewMode === 'Week'
        ? apt.status !== 'Cancelled'
        : true;
    return matchesSearch && matchesStatus && matchesView;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810]">Smart Clinical Scheduling</h1>
          <p className="text-xs sm:text-sm text-[#7A6258]">
            Dynamic appointment buffers, physician rosters, and predictive queue management.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          {/* Day / Week / Month Switcher */}
          <div className="flex items-center p-1 bg-white border border-[#EFE5DC] rounded-2xl shadow-warm-sm">
            {(['Day', 'Week', 'Month'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`min-h-[40px] px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === mode
                    ? 'bg-[#E06D53] text-white shadow-warm-sm'
                    : 'text-[#7A6258] hover:text-[#2C1810]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsNewAppointmentOpen(true)}
            className="min-h-[40px] px-4 py-2 bg-[#E06D53] hover:bg-[#D25C42] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-terracotta cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Book Consultation</span>
          </button>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-[#E06D53] text-white shadow-warm-sm'
                  : 'text-[#7A6258] hover:text-[#2C1810] bg-[#FAF6F2] border border-[#EFE5DC]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#7A6258] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient, doctor, unit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FAF6F2] border border-[#EFE5DC] rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-[#2C1810] placeholder-[#A59288] focus:outline-none focus:border-[#E06D53]"
          />
        </div>
      </div>

      {/* Appointments List / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAppointments.map((apt) => (
          <div
            key={apt.id}
            onClick={() => {
              const found = patients.find((p) => p.name === apt.patientName);
              if (found) setSelectedPatient(found);
            }}
            className="p-5 rounded-3xl bg-white border border-[#EFE5DC] hover:border-[#E06D53]/40 shadow-warm-sm hover:shadow-warm-md transition-all flex flex-col justify-between gap-4 cursor-pointer group"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-[#FAF6F2] text-[#2C1810] border border-[#EFE5DC] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#E06D53]" />
                  <span>{apt.time}</span>
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateAppointmentStatus(
                      apt.id,
                      apt.status === 'Confirmed'
                        ? 'Completed'
                        : apt.status === 'Completed'
                        ? 'Pending'
                        : 'Confirmed'
                    );
                  }}
                  className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${
                    apt.status === 'Confirmed'
                      ? 'bg-[#E8F8F0] text-[#065F46] border-[#A7F3D0]'
                      : apt.status === 'Completed'
                      ? 'bg-[#EEF2FF] text-[#3730A3] border-[#C7D2FE]'
                      : 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                  }`}
                  title="Click to cycle status"
                >
                  {apt.status} ▾
                </button>
              </div>

              <div className="flex flex-col">
                <h3 className="text-base font-bold text-[#2C1810] group-hover:text-[#E06D53] transition-colors">
                  {apt.patientName}
                </h3>
                <span className="text-xs text-[#7A6258] font-mono">{apt.patientId} • {apt.type}</span>
              </div>

              <p className="text-xs text-[#7A6258] leading-relaxed line-clamp-2">
                {apt.notes}
              </p>
            </div>

            <div className="pt-3 border-t border-[#EFE5DC] flex items-center justify-between text-xs text-[#7A6258]">
              <span className="font-semibold text-[#2C1810]">{apt.doctor}</span>
              <span className="font-mono text-[11px] px-2 py-0.5 rounded-md bg-[#FAF6F2] border border-[#EFE5DC]">
                {apt.room}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
