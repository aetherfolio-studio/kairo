'use client';

import React from 'react';
import { useHospitalStore } from '@/lib/store';
import {
  Activity,
  BedDouble,
  Receipt,
  Users,
  Clock,
  Radio,
  Sparkles,
  Zap,
  Heart
} from 'lucide-react';

export function LiveTelemetryTicker() {
  const { overallBedOccupancyPercent, totalRevenueToday } = useHospitalStore();

  const tickerItems = [
    {
      icon: Radio,
      label: 'Level 1 Trauma Center',
      value: 'Normal Influx Buffer Active',
      color: 'text-emerald-700',
      badge: 'Live',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      icon: BedDouble,
      label: 'CityCare Bed Capacity',
      value: `${overallBedOccupancyPercent}% Occupied (145/193 Beds)`,
      color: 'text-[#E06D53]',
      badge: 'Telemetry Sync',
      badgeColor: 'bg-[#FDEEE9] text-[#E06D53]'
    },
    {
      icon: Clock,
      label: 'Average ER Door-to-Doctor',
      value: '18 Minutes (Down 34%)',
      color: 'text-[#2C1810]',
      badge: 'Optimal',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      icon: Activity,
      label: 'Operating Theaters Active',
      value: '6 Procedures In Progress',
      color: 'text-[#92400E]',
      badge: 'Sterile Core',
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      icon: Users,
      label: 'Physicians & Specialists On-Duty',
      value: '42 Active Across 8 Wards',
      color: 'text-[#2C1810]',
      badge: 'Shift Active',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      icon: Receipt,
      label: 'Daily Revenue Cleared',
      value: `$${totalRevenueToday.toLocaleString()}`,
      color: 'text-emerald-700',
      badge: '98.4% Clean Claims',
      badgeColor: 'bg-emerald-100 text-emerald-800'
    }
  ];

  return (
    <div className="w-full bg-[#FAF6F2] border-y border-[#EFE5DC] py-2.5 overflow-hidden relative shadow-warm-sm select-none">
      {/* Left and Right Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FAF6F2] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FAF6F2] to-transparent z-10 pointer-events-none" />

      {/* Infinite Seamless Marquee Container */}
      <div className="flex animate-marquee gap-8 items-center whitespace-nowrap">
        {[...tickerItems, ...tickerItems].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white border border-[#EFE5DC] shadow-warm-sm text-xs text-[#2C1810] font-medium hover:border-[#E06D53]/40 transition-colors"
            >
              {/* Equalizer Wave Vitality Bars */}
              <div className="flex items-end gap-0.5 h-3.5 w-3.5">
                <span className="w-0.5 bg-[#E06D53] rounded-full animate-wave-1" />
                <span className="w-0.5 bg-[#E06D53] rounded-full animate-wave-2" />
                <span className="w-0.5 bg-[#E06D53] rounded-full animate-wave-3" />
                <span className="w-0.5 bg-[#E06D53] rounded-full animate-wave-4" />
              </div>

              <span className="text-[#7A6258] font-mono text-[11px]">{item.label}:</span>
              <span className={`font-bold font-mono text-[11px] ${item.color}`}>{item.value}</span>
              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full ${item.badgeColor}`}>
                {item.badge}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
