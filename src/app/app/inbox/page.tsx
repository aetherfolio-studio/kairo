'use client';

import React, { useState } from 'react';
import { Inbox, CheckCircle2, Sparkles, MessageSquare, Clock, Filter, Archive } from 'lucide-react';

export default function InboxPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'AI Task Digest generated for Sprint 14',
      description: 'Synthesized 3 merged PRs into customer-facing release notes.',
      time: '10m ago',
      unread: true,
      type: 'ai'
    },
    {
      id: 'notif-2',
      title: 'Marcus Chen mentioned you in Website Redesign',
      description: 'Verified the WCAG contrast tokens on the OLED panel.',
      time: '45m ago',
      unread: true,
      type: 'mention'
    },
    {
      id: 'notif-3',
      title: 'Automated Blocker Escalation triggered',
      description: 'Vector query latency ticket marked high priority for David Park.',
      time: '2h ago',
      unread: true,
      type: 'system'
    },
    {
      id: 'notif-4',
      title: 'Sarah Lin updated launch milestone date',
      description: 'Mobile App iOS launch target rescheduled to Nov 12, 2026.',
      time: 'Yesterday',
      unread: false,
      type: 'system'
    }
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">Team Inbox</h1>
          <p className="text-xs sm:text-sm text-zinc-400">
            Triage mentions, AI digests, and automated workflow triggers.
          </p>
        </div>

        <button
          onClick={markAllAsRead}
          className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer"
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Mark all as read</span>
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
              n.unread
                ? 'bg-zinc-900/80 border-blue-500/30'
                : 'bg-zinc-950/60 border-white/5 opacity-70'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                  n.type === 'ai'
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : n.type === 'mention'
                    ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {n.type === 'ai' ? (
                  <Sparkles className="w-4 h-4" />
                ) : n.type === 'mention' ? (
                  <MessageSquare className="w-4 h-4" />
                ) : (
                  <Inbox className="w-4 h-4" />
                )}
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold text-zinc-200">{n.title}</span>
                <p className="text-xs text-zinc-400 leading-relaxed">{n.description}</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="text-[10px] font-mono text-zinc-500">{n.time}</span>
              {n.unread && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
