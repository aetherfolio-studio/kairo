'use client';

import React, { useState } from 'react';
import { MessageSquare, CheckCircle2, Clock, Sparkles, Building2, User, Send } from 'lucide-react';

export default function MessagesPage() {
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'Dr. Marcus Vance (ER Director)',
      subject: 'Trauma Bay 2 Resuscitation Team Ready',
      preview: 'Inbound emergency transport arriving in 6 minutes. Respiratory therapist assigned.',
      time: '12m ago',
      unread: true,
      department: 'Emergency'
    },
    {
      id: 'msg-2',
      sender: 'Nurse Supervisor Grace Lee, RN',
      subject: 'ICU Step-down Clearance for Bed 12',
      preview: 'Patient PT-8821 vitals stable for 24h. Transfer approval ready for Dr. Chen sign-off.',
      time: '45m ago',
      unread: true,
      department: 'ICU'
    },
    {
      id: 'msg-3',
      sender: 'Central Pharmacy Dispatch',
      subject: 'Omniscan MRI Contrast Agent Restock Delivered',
      preview: '60 units transferred to Radiology Supply Room A shelf 3.',
      time: '2h ago',
      unread: false,
      department: 'Pharmacy'
    }
  ]);

  const markAllRead = () => {
    setMessages((prev) => prev.map((m) => ({ ...m, unread: false })));
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810]">Hospital Clinical Communications</h1>
          <p className="text-xs sm:text-sm text-[#7A6258]">
            Direct inter-department messaging, nurse station alerts, and emergency team paging.
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="px-4 py-2 bg-white hover:bg-[#FAF6F2] text-[#2C1810] border border-[#EFE5DC] text-xs font-semibold rounded-xl shadow-warm-sm flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-[#E06D53]" />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex flex-col gap-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-5 rounded-3xl border transition-all flex items-start justify-between gap-4 ${
              m.unread
                ? 'bg-white border-[#E06D53]/40 shadow-warm-md'
                : 'bg-[#FFFDFC] border-[#EFE5DC] opacity-75'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                  m.unread ? 'bg-[#FDEEE9] text-[#E06D53]' : 'bg-[#FAF6F2] text-[#7A6258]'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#2C1810]">{m.sender}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FAF6F2] text-[#7A6258] border border-[#EFE5DC]">
                    {m.department}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-[#2C1810]">{m.subject}</h4>
                <p className="text-xs text-[#7A6258] leading-relaxed">{m.preview}</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="text-[10px] font-mono text-[#A59288]">{m.time}</span>
              {m.unread && <span className="w-2 h-2 rounded-full bg-[#E06D53]"></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
