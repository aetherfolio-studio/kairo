'use client';

import React, { useState } from 'react';
import { useHospitalStore } from '@/lib/store';
import {
  UserCheck,
  Search,
  Filter,
  Phone,
  Mail,
  Building2,
  Stethoscope,
  Activity,
  CheckCircle2
} from 'lucide-react';

export default function StaffPage() {
  const { staff, updateStaffStatus } = useHospitalStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'On Duty' | 'In Surgery' | 'On Call' | 'Off Duty'>('All');

  const filteredStaff = staff.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810]">Clinical Staff & Physician Roster</h1>
          <p className="text-xs sm:text-sm text-[#7A6258]">
            Real-time on-duty status, surgical assignments, and direct physician paging.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(['All', 'On Duty', 'In Surgery', 'On Call', 'Off Duty'] as const).map((st) => (
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
            placeholder="Search physician, specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FAF6F2] border border-[#EFE5DC] rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-[#2C1810] placeholder-[#A59288] focus:outline-none focus:border-[#E06D53]"
          />
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <div
            key={member.id}
            className="p-6 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col justify-between gap-6"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#EFE5DC]"
                />
                <button
                  onClick={() =>
                    updateStaffStatus(
                      member.id,
                      member.status === 'On Duty'
                        ? 'In Surgery'
                        : member.status === 'In Surgery'
                        ? 'On Call'
                        : 'On Duty'
                    )
                  }
                  className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold border transition-all cursor-pointer ${
                    member.status === 'On Duty'
                      ? 'bg-[#E8F8F0] text-[#065F46] border-[#A7F3D0]'
                      : member.status === 'In Surgery'
                      ? 'bg-[#FEF2F2] text-[#991B1B] border-[#FEE2E2]'
                      : 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                  }`}
                  title="Click to cycle status"
                >
                  {member.status} ▾
                </button>
              </div>

              <div className="flex flex-col">
                <h3 className="text-base font-bold text-[#2C1810]">{member.name}</h3>
                <span className="text-xs text-[#E06D53] font-semibold">{member.role}</span>
                <span className="text-xs text-[#7A6258] mt-0.5">{member.specialty}</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#EFE5DC] text-xs text-[#7A6258] font-mono">
                <span>Location: {member.room}</span>
                <span className="text-[#2C1810] font-bold">{member.patientsAssigned} Patients</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#EFE5DC] text-xs">
              <span className="font-mono text-[#7A6258] text-[11px]">{member.phone}</span>
              <button className="px-3 py-1 bg-[#FAF6F2] hover:bg-[#F6EFE9] text-[#2C1810] font-semibold rounded-lg border border-[#EFE5DC] transition-colors cursor-pointer">
                Page Doctor
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
