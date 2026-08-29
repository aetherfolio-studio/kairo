'use client';

import React, { useState } from 'react';
import { useKairoStore } from '@/lib/store';
import { Users, UserPlus, Mail, Shield, Circle, Search, CheckCircle2 } from 'lucide-react';

export default function TeamPage() {
  const { teamMembers } = useKairoStore();
  const [search, setSearch] = useState('');
  const [invited, setInvited] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const filteredMembers = teamMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      m.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteEmail) {
      setInvited(true);
      setTimeout(() => setInvited(false), 3000);
      setInviteEmail('');
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Team Directory</h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Manage workspace collaborators, access permissions, and live status.
          </p>
        </div>

        {/* Quick Invite Form */}
        <form onSubmit={handleInvite} className="flex items-center gap-2">
          <input
            type="email"
            required
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="colleague@company.com"
            className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-white/30"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite</span>
          </button>
        </form>
      </div>

      {invited && (
        <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Simulated workspace invite sent!</span>
        </div>
      )}

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-white/20 transition-all flex flex-col items-center text-center gap-4 group"
          >
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-white/10"
              />
              <span
                className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-zinc-950 ${
                  member.status === 'online'
                    ? 'bg-emerald-500'
                    : member.status === 'busy'
                    ? 'bg-amber-500'
                    : 'bg-zinc-600'
                }`}
                title={`Status: ${member.status}`}
              ></span>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-bold text-zinc-100">{member.name}</h3>
              <p className="text-xs text-zinc-400">{member.role}</p>
              <span className="text-[10px] font-mono text-zinc-500">{member.department}</span>
            </div>

            <div className="w-full pt-3 border-t border-white/5 flex items-center justify-center gap-1 text-[11px] text-zinc-400 font-mono">
              <Mail className="w-3 h-3 text-zinc-500" />
              <span>{member.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
