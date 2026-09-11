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
  CheckCircle2,
  Copy,
  Check,
  SlidersHorizontal,
  ArrowUpDown
} from 'lucide-react';

export default function PatientsPage() {
  const { patients, setSelectedPatient, setIsNewPatientOpen, updatePatientStatus, addToast } = useHospitalStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Admitted' | 'Outpatient' | 'In Surgery' | 'Discharged'>('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'age' | 'status' | 'id'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleCopyId = (e: React.MouseEvent, idText: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(idText);
    setCopiedId(idText);
    setTimeout(() => setCopiedId(null), 2000);
    addToast({
      title: 'Patient ID Copied',
      description: `${idText} copied to clipboard for EHR export.`,
      type: 'info'
    });
  };

  const filteredPatients = patients
    .filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.patientId.toLowerCase().includes(search.toLowerCase()) ||
        p.assignedDoctor.toLowerCase().includes(search.toLowerCase()) ||
        p.department.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchesDept = departmentFilter === 'All' || p.department.includes(departmentFilter);
      return matchesSearch && matchesStatus && matchesDept;
    })
    .sort((a, b) => {
      let comp = 0;
      if (sortBy === 'name') comp = a.name.localeCompare(b.name);
      else if (sortBy === 'age') comp = a.age - b.age;
      else if (sortBy === 'status') comp = a.status.localeCompare(b.status);
      else if (sortBy === 'id') comp = a.patientId.localeCompare(b.patientId);
      return sortOrder === 'asc' ? comp : -comp;
    });

  const toggleSort = (field: 'name' | 'age' | 'status' | 'id') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810]">Patient Directory &amp; Health Records</h1>
          <p className="text-xs sm:text-sm text-[#7A6258]">
            Search electronic health records, active ward admissions, bedside telemetry, and physician notes.
          </p>
        </div>

        <button
          onClick={() => setIsNewPatientOpen(true)}
          className="px-4 py-2 bg-[#E06D53] hover:bg-[#D25C42] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shadow-terracotta cursor-pointer self-start sm:self-auto active:scale-95"
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

      {/* Patient Records Display: Mobile Cards + Desktop Table */}
      <div className="rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-sm overflow-hidden">
        {/* VIEW 1: Mobile Card List (< md) */}
        <div className="block md:hidden divide-y divide-[#EFE5DC]/80">
          {filteredPatients.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#A59288]">
              No patient records found matching your filters.
            </div>
          ) : (
            filteredPatients.map((patient) => (
              <div
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className="p-4 flex flex-col gap-3 hover:bg-[#FAF6F2] active:bg-[#F6EFE9] transition-colors cursor-pointer"
              >
                {/* Top Row: ID + Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#E06D53]">
                    <button
                      onClick={(e) => handleCopyId(e, patient.patientId)}
                      className="inline-flex items-center gap-1 hover:underline cursor-pointer"
                      title="Copy Patient ID"
                    >
                      <span>{patient.patientId}</span>
                      {copiedId === patient.patientId ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3 text-[#A59288]" />
                      )}
                    </button>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold border ${
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
                </div>

                {/* Patient Name & Demographics */}
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-base font-bold text-[#2C1810]">
                    {patient.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#7A6258]">
                    <span>{patient.age} yrs • {patient.gender}</span>
                    <span>•</span>
                    <span className="font-mono font-semibold text-[#E06D53]">Blood: {patient.bloodGroup}</span>
                  </div>
                </div>

                {/* Department & Doctor */}
                <div className="flex items-center justify-between text-xs pt-1 border-t border-[#EFE5DC]/60">
                  <span className="font-medium text-[#2C1810]">{patient.department}</span>
                  <span className="text-[#7A6258]">{patient.assignedDoctor}</span>
                </div>

                {/* Vitals & Bed */}
                <div className="flex items-center justify-between bg-[#FAF6F2] p-2.5 rounded-xl border border-[#EFE5DC] text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-[#2C1810]">
                    <Activity className="w-3.5 h-3.5 text-[#E06D53]" />
                    <span className="font-bold">{patient.vitals.heartRate}</span>
                    <span className="text-[#A59288]">•</span>
                    <span>{patient.vitals.bloodPressure}</span>
                  </div>

                  <span className="text-[#7A6258]">
                    {patient.room ? `Room ${patient.room}` : 'Outpatient'}
                  </span>
                </div>

                {/* Action Trigger */}
                <div className="flex items-center justify-end text-xs font-semibold text-[#E06D53] pt-0.5">
                  <span className="flex items-center gap-1">
                    <span>View Medical Chart</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* VIEW 2: Desktop Table (>= md) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-[#EFE5DC] bg-[#FAF6F2] text-[#7A6258] font-mono text-[11px] uppercase">
                <th
                  onClick={() => toggleSort('id')}
                  className="py-3.5 px-4 font-semibold cursor-pointer hover:text-[#2C1810]"
                >
                  <div className="flex items-center gap-1">
                    <span>Patient ID</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => toggleSort('name')}
                  className="py-3.5 px-4 font-semibold cursor-pointer hover:text-[#2C1810]"
                >
                  <div className="flex items-center gap-1">
                    <span>Name &amp; Age</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 font-semibold">Department</th>
                <th className="py-3.5 px-4 font-semibold">Assigned Doctor</th>
                <th
                  onClick={() => toggleSort('status')}
                  className="py-3.5 px-4 font-semibold cursor-pointer hover:text-[#2C1810]"
                >
                  <div className="flex items-center gap-1">
                    <span>Status</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 font-semibold">Bed / Room</th>
                <th className="py-3.5 px-4 font-semibold">Bedside Vitals</th>
                <th className="py-3.5 px-4 font-semibold text-right">Quick Action</th>
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
                      <button
                        onClick={(e) => handleCopyId(e, patient.patientId)}
                        className="inline-flex items-center gap-1 hover:underline cursor-pointer group/copy"
                        title="Click to copy Patient ID"
                      >
                        <span>{patient.patientId}</span>
                        {copiedId === patient.patientId ? (
                          <Check className="w-3 h-3 text-emerald-600 animate-in zoom-in" />
                        ) : (
                          <Copy className="w-3 h-3 text-[#A59288] opacity-0 group-hover/copy:opacity-100 transition-opacity" />
                        )}
                      </button>
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
                    <td className="py-3 px-4 font-mono text-[11px] text-[#7A6258]">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#2C1810] font-bold">{patient.vitals.heartRate}</span>
                        <span>•</span>
                        <span>{patient.vitals.bloodPressure}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-xs font-semibold text-[#E06D53] group-hover:underline flex items-center justify-end gap-1">
                        <span>View Chart</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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
