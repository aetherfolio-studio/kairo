'use client';

import React, { useState } from 'react';
import { Settings, User, Shield, Bell, CreditCard, Key, CheckCircle2, Sparkles } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'workspace' | 'security' | 'billing'>('profile');
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
        <h1 className="text-2xl font-bold text-zinc-100">Settings & Preferences</h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Manage your personal account, team workspace, AI permissions, and security.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 pb-2 border-b border-white/10">
        {(['profile', 'workspace', 'security', 'billing'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-medium capitalize transition-all ${
              activeTab === tab
                ? 'bg-white/15 text-white font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {saved && (
        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Workspace preferences saved successfully.</span>
        </div>
      )}

      {/* Profile Settings */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave} className="flex flex-col gap-6 p-6 rounded-2xl bg-zinc-900/60 border border-white/10">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Elena"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/15"
            />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold text-zinc-100">Elena Rostova</span>
              <span className="text-xs text-zinc-400">Staff Product Designer</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-400">Display Name</label>
              <input
                type="text"
                defaultValue="Elena Rostova"
                className="bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-white/30"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-400">Email Address</label>
              <input
                type="email"
                defaultValue="elena@kairo.design"
                className="bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          <button
            type="submit"
            className="self-start px-5 py-2 rounded-xl bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Save Profile
          </button>
        </form>
      )}

      {/* Workspace Settings */}
      {activeTab === 'workspace' && (
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-bold text-zinc-100">AI Context Graph Indexing</h3>
            <p className="text-xs text-zinc-400">
              Allow ambient background parsing of PRs, meeting notes, and ticket summaries.
            </p>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/80 border border-white/5">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-zinc-200">Neural Workspace Indexing</span>
                <span className="text-[11px] text-zinc-500 font-mono">Status: Enabled (Sub-50ms)</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
              Active
            </span>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col gap-4">
          <h3 className="text-sm font-bold text-zinc-100">API Access & Vector Tokens</h3>
          <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
              <Key className="w-4 h-4 text-amber-400" />
              <span>kairo_live_9f83a02847d9b28a1...</span>
            </div>
            <button className="text-xs text-blue-400 hover:text-blue-300 font-medium cursor-pointer">Roll Key</button>
          </div>
        </div>
      )}

      {/* Billing Tab */}
      {activeTab === 'billing' && (
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-zinc-100">Pro Team Plan</h3>
              <p className="text-xs text-zinc-400">4 Active Seats • Renews Sep 15, 2026</p>
            </div>
            <span className="px-3 py-1 bg-blue-900/40 text-blue-300 border border-blue-500/30 rounded-full text-xs font-mono">
              Active Plan
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
