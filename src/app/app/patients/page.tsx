'use client';

import React, { useState } from 'react';
import { useHospitalStore } from '@/lib/store';
import {
  Users,
  Search,
  Filter,
  Plus,
  ArrowRight,
  Activity,
  Heart,
  Calendar,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function PatientsPage() {
  const { patients, setSelectedPatient, setIsNewPatientOpen } = useHospitalStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Admitted' | 'Outpatient' | 'In Surgery' | 'Discharged'>('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.patientId.toLowerCase().includes(search.toLowerCase()) ||
      p.assignedDoctor.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const matchesDept = departmentFilter === 'All' || p.department.includes(departmentFilter);
    return matchesSearch && matchesStatus && matchesDept;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810]">Patient Directory & Records</h1>
          <p className="text-xs sm:text-sm text-[#7A6258]">
            Search electronic health records, active admissions, bedside vitals, and physician notes.
          </p>
        </div>

        <button
          onClick={() => setIsNewPatientOpen(true)}
          className="px-4 py-2 bg-[#E06D53] hover:bg-[#D25C42] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-terracotta cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Admit Patient</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(['All', 'Admitted', 'Outpatient', 'In Surgery', 'Discharged'] as const).map((st) => (
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
            placeholder="Search name, ID (e.g. PT-8942)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FAF6F2] border border-[#EFE5DC] rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-[#2C1810] placeholder-[#A59288] focus:outline-none focus:border-[#E06D53]"
          />
        </div>
      </div>

      {/* Patient Records Table */}
      <div className="rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#EFE5DC] bg-[#FAF6F2] text-[#7A6258] font-mono text-[11px] uppercase">
                <th className="py-3.5 px-4 font-semibold">Patient ID</th>
                <th className="py-3.5 px-4 font-semibold">Name & Age</th>
                <th className="py-3.5 px-4 font-semibold">Department</th>
                <th className="py-3.5 px-4 font-semibold">Assigned Doctor</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Bed / Room</th>
                <th className="py-3.5 px-4 font-semibold">Last Activity</th>
                <th className="py-3.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE5DC]/60">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#A59288]">
                    No patient records found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className="hover:bg-[#FAF6F2] transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-4 font-mono font-bold text-[#E06D53]">
                      {patient.patientId}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#2C1810] group-hover:text-[#E06D53] transition-colors">
                          {patient.name}
                        </span>
                        <span className="text-[11px] text-[#7A6258]">
                          {patient.age} yrs • {patient.gender} • Blood: {patient.bloodGroup}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#2C1810] font-medium">
                      {patient.department}
                    </td>
                    <td className="py-3 px-4 text-[#7A6258]">
                      {patient.assignedDoctor}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border ${
                          patient.status === 'Admitted'
                            ? 'bg-[#E8F8F0] text-[#065F46] border-[#A7F3D0]'
                            : patient.status === 'In Surgery'
                            ? 'bg-[#FEF2F2] text-[#991B1B] border-[#FEE2E2]'
                            : patient.status === 'Discharged'
                            ? 'bg-[#F3F4F6] text-[#4B5563] border-[#E5E7EB]'
                            : 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[#7A6258]">
                      {patient.room || '—'}
                    </td>
                    <td className="py-3 px-4 font-mono text-[#A59288] text-[11px]">
                      {patient.lastVisit}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-xs font-semibold text-[#E06D53] hover:underline">
                        View Chart →
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
