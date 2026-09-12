'use client';

import React, { useState } from 'react';
import { Settings, Shield, User, Building2, Bell, Key, CheckCircle2, BedDouble } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'facility' | 'notifications' | 'security'>('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#2C1810]">Hospital Facility Settings</h1>
        <p className="text-xs sm:text-sm text-[#7A6258]">
          Manage clinical administrator profile, unit bed capacities, and hospital telemetry thresholds.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 pb-2 border-b border-[#EFE5DC] overflow-x-auto w-full">
        {(['profile', 'facility', 'notifications', 'security'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`min-h-[40px] px-4 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-[#E06D53] text-white shadow-warm-sm'
                : 'text-[#7A6258] hover:text-[#2C1810] bg-white border border-[#EFE5DC]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {saved && (
        <div className="p-3 rounded-2xl bg-[#E8F8F0] border border-[#A7F3D0] text-xs text-[#065F46] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Facility preferences updated successfully.</span>
        </div>
      )}

      {/* Profile Settings */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave} className="flex flex-col gap-6 p-6 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-sm">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80"
              alt="Dr. Sarah Chen"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#EFE5DC]"
            />
            <div className="flex flex-col">
              <span className="text-base font-bold text-[#2C1810]">Dr. Sarah Chen, MD</span>
              <span className="text-xs text-[#E06D53] font-semibold">Chief Medical Officer & Administrator</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#2C1810]">Administrator Name</label>
              <input
                type="text"
                defaultValue="Dr. Sarah Chen, MD"
                className="bg-[#FAF6F2] border border-[#EFE5DC] rounded-xl px-3.5 py-2 text-xs text-[#2C1810] focus:outline-none focus:border-[#E06D53]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#2C1810]">Hospital Email</label>
              <input
                type="email"
                defaultValue="sarah.chen@citycare.hospital"
                className="bg-[#FAF6F2] border border-[#EFE5DC] rounded-xl px-3.5 py-2 text-xs text-[#2C1810] focus:outline-none focus:border-[#E06D53]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="self-start px-6 py-2.5 rounded-xl bg-[#E06D53] hover:bg-[#D25C42] text-white text-xs font-semibold transition-all shadow-terracotta cursor-pointer"
          >
            Save Profile
          </button>
        </form>
      )}

      {/* Facility Tab */}
      {activeTab === 'facility' && (
        <div className="p-6 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-4">
          <h3 className="text-sm font-bold text-[#2C1810]">Hospital Facility Setup</h3>
          <div className="p-4 rounded-2xl bg-[#FAF6F2] border border-[#EFE5DC] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#2C1810]">Facility: CityCare Memorial Hospital</span>
              <span className="text-[11px] text-[#7A6258] font-mono">Licensed Bed Capacity: 145 Active Beds</span>
            </div>
            <span className="px-3 py-1 bg-[#E8F8F0] text-[#065F46] border border-[#A7F3D0] rounded-full text-xs font-mono font-semibold">
              Active Facility
            </span>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="p-6 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-4">
          <h3 className="text-sm font-bold text-[#2C1810]">Audit Logs & Protocol Security</h3>
          <div className="p-4 rounded-2xl bg-[#FAF6F2] border border-[#EFE5DC] flex items-center justify-between">
            <div className="flex items-center gap-3 font-mono text-xs text-[#7A6258]">
              <Key className="w-4 h-4 text-[#E06D53]" />
              <span>kairo_hosp_live_9f83a0284...</span>
            </div>
            <button className="text-xs text-[#E06D53] hover:underline font-semibold cursor-pointer">Roll Token</button>
          </div>
        </div>
      )}
    </div>
  );
}
