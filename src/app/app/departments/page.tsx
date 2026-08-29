'use client';

import React, { useState } from 'react';
import { useHospitalStore } from '@/lib/store';
import {
  Building2,
  Users,
  Clock,
  AlertTriangle,
  Activity,
  BedDouble,
  ShieldCheck,
  Search,
  ArrowRight,
  Filter
} from 'lucide-react';

export default function DepartmentsPage() {
  const { departments } = useHospitalStore();
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Critical Care' | 'Specialty' | 'General' | 'Diagnostic'>('All');
  const [search, setSearch] = useState('');

  const filteredDepts = departments.filter((d) => {
    const matchesCat = categoryFilter === 'All' || d.category === categoryFilter;
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.headDoctor.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#2C1810]">Hospital Clinical Departments</h1>
        <p className="text-xs sm:text-sm text-[#7A6258]">
          Unit capacities, real-time wait times, staffing levels, and active operational alerts.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-[#EFE5DC] shadow-warm-sm">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {(['All', 'Critical Care', 'Specialty', 'General', 'Diagnostic'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-[#E06D53] text-white shadow-warm-sm'
                  : 'text-[#7A6258] hover:text-[#2C1810] bg-[#FAF6F2] border border-[#EFE5DC]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-[#7A6258] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search department, lead physician..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#FAF6F2] border border-[#EFE5DC] rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-[#2C1810] placeholder-[#A59288] focus:outline-none focus:border-[#E06D53]"
          />
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepts.map((dept) => (
          <div
            key={dept.id}
            className="p-6 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-sm hover:shadow-warm-md transition-all flex flex-col justify-between gap-6"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FAF6F2] text-[#E06D53] border border-[#EFE5DC]">
                  {dept.code}
                </span>
                {dept.activeAlerts > 0 ? (
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FEF2F2] text-[#EF4444] border border-[#FEE2E2] flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>{dept.activeAlerts} Active Alert</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#E8F8F0] text-[#065F46] border border-[#A7F3D0]">
                    Status: Optimal
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-[#2C1810]">{dept.name}</h3>
                <span className="text-xs text-[#7A6258]">Unit Director: {dept.headDoctor}</span>
                <p className="text-xs text-[#7A6258] leading-relaxed pt-1">
                  {dept.description}
                </p>
              </div>

              {/* Bed Occupancy Progress Bar */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-[#EFE5DC]">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#7A6258]">Bed Occupancy</span>
                  <span className="font-bold text-[#2C1810]">
                    {dept.occupiedBeds} / {dept.totalBeds} ({dept.occupancyPercent}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FAF6F2] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      dept.occupancyPercent >= 90
                        ? 'bg-[#EF4444]'
                        : dept.occupancyPercent >= 80
                        ? 'bg-[#F59E0B]'
                        : 'bg-[#E06D53]'
                    }`}
                    style={{ width: `${dept.occupancyPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#EFE5DC] text-xs text-[#7A6258] font-mono">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#E06D53]" />
                <span>Wait: ~{dept.waitTimeMinutes} mins</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#7A6258]" />
                <span>{dept.staffOnDuty} Staff On Duty</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
