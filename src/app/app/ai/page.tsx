'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useHospitalStore } from '@/lib/store';
import {
  Sparkles,
  Send,
  Bot,
  User,
  CheckCircle2,
  Building2,
  Clock,
  AlertTriangle,
  RefreshCw,
  Activity,
  BedDouble
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  insights?: { title: string; desc: string; action: string }[];
}

export default function AiIntelligencePage() {
  const { patients, departments, wards, appointments } = useHospitalStore();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: 'Good day, Dr. Sarah. I am Kairo Intelligence, connected to CityCare Hospital\'s operational telemetry (8 clinical wards, 128 daily appointments, 32 admitted patients). How can I assist your operational decisions today?',
      timestamp: '08:00 AM'
    },
    {
      id: 'm-2',
      sender: 'user',
      text: 'Summarize today\'s hospital operations and potential bottlenecks.',
      timestamp: '08:02 AM'
    },
    {
      id: 'm-3',
      sender: 'ai',
      text: 'Here is the executive operational briefing: Overall facility occupancy is at 75%. The Emergency Department is nearing 90% capacity due to incoming seasonal respiratory volume. ICU has 6 open beds with 2 scheduled surgical transfers this afternoon. Recommended operational mitigations are listed below:',
      timestamp: '08:02 AM',
      insights: [
        {
          title: 'Emergency Surge Mitigation',
          desc: 'Activate 4 swing beds in Ward 2A and page on-call respiratory therapists.',
          action: 'Pre-allocate Swing Beds'
        },
        {
          title: 'ICU Step-down Clearance',
          desc: 'Review discharge criteria for 2 stable post-op cardiac patients to telemetry.',
          action: 'Review Step-down Checklist'
        }
      ]
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Summarize today\'s hospital operations.',
    'What departments need attention?',
    'Show today\'s appointment bottlenecks.',
    'Summarize bed occupancy across ICU and General.'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = 'I analyzed the hospital telemetry graph.';
      let generatedInsights: { title: string; desc: string; action: string }[] | undefined = undefined;

      const q = query.toLowerCase();
      if (q.includes('department') || q.includes('attention') || q.includes('emergency')) {
        replyText = 'Department Attention Summary: Emergency Medicine is at 90% bed utilization (18/20 beds). Radiology has 8-minute scan turnaround times, and Cardiology is operating smoothly with 18 staff members on duty.';
        generatedInsights = [
          {
            title: 'ER Triage Buffer',
            desc: 'Average wait time is 18 mins. Recommend opening Fast-Track Bay 3.',
            action: 'Notify Charge Nurse'
          }
        ];
      } else if (q.includes('bed') || q.includes('occupancy') || q.includes('icu')) {
        replyText = 'Bed & Ward Occupancy Summary: ICU is at 80% (24/30 beds occupied), General Ward is at 75% (45/60 beds), Emergency Stabilization is at 90% (18/20 beds). Total available beds across the hospital: 29 beds.';
      } else if (q.includes('bottleneck') || q.includes('appointment')) {
        replyText = 'Appointment Flow Analysis: 128 consultations scheduled today. 3 orthopedic surgery consultations around 10:00 AM require confirmation to avoid OR suite idle time.';
      } else {
        replyText = `Cross-referenced query "${query}" with CityCare Hospital records. All 8 departments are monitored and aligned with the morning operational plan.`;
      }

      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        insights: generatedInsights
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#EFE5DC] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FDEEE9] border border-[#F7D5CA] flex items-center justify-center text-[#E06D53]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#2C1810] flex items-center gap-2">
              Kairo Intelligence
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E8F8F0] text-[#065F46] border border-[#A7F3D0]">
                Hospital Operational AI
              </span>
            </h1>
            <p className="text-xs text-[#7A6258]">
              Predictive bed turnover, schedule bottleneck warnings, and staffing capacity intelligence.
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'm-init',
                sender: 'ai',
                text: 'Hospital context graph refreshed. What operational question can I answer for you?',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ])
          }
          className="p-2 rounded-xl text-[#7A6258] hover:text-[#2C1810] bg-white border border-[#EFE5DC] shadow-warm-sm transition-all text-xs flex items-center gap-1 cursor-pointer"
          title="Reset Conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Session</span>
        </button>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex flex-wrap gap-2 shrink-0">
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3.5 py-1.5 rounded-full text-xs bg-white hover:bg-[#FAF6F2] text-[#2C1810] border border-[#EFE5DC] shadow-warm-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-[#E06D53]" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 rounded-3xl bg-white border border-[#EFE5DC] shadow-warm-sm flex flex-col gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 max-w-2xl ${
              msg.sender === 'user'
                ? 'self-end bg-[#FAF6F2] border border-[#EFE5DC] rounded-2xl rounded-tr-sm p-4'
                : 'self-start bg-[#FFFDFC] border border-[#EFE5DC] rounded-2xl rounded-tl-sm p-4 shadow-warm-sm'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                msg.sender === 'user' ? 'bg-[#2C1810] text-white' : 'bg-[#FDEEE9] text-[#E06D53]'
              }`}
            >
              {msg.sender === 'user' ? (
                <User className="w-3.5 h-3.5" />
              ) : (
                <Bot className="w-4 h-4" />
              )}
            </div>

            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className={msg.sender === 'user' ? 'text-[#7A6258] font-bold' : 'text-[#E06D53] font-bold'}>
                  {msg.sender === 'user' ? 'Dr. Sarah Chen' : 'Kairo Hospital Intelligence'}
                </span>
                <span className="text-[#A59288]">{msg.timestamp}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#2C1810] leading-relaxed font-sans">{msg.text}</p>

              {/* Actionable Insights */}
              {msg.insights && msg.insights.length > 0 && (
                <div className="mt-2 flex flex-col gap-2 pt-2 border-t border-[#EFE5DC]">
                  {msg.insights.map((ins, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#FAF6F2] border border-[#EFE5DC] flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#2C1810]">{ins.title}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E06D53] text-white">
                          Action
                        </span>
                      </div>
                      <p className="text-xs text-[#7A6258]">{ins.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="self-start flex items-center gap-3 bg-white border border-[#EFE5DC] rounded-2xl p-4 shadow-warm-sm">
            <Bot className="w-4 h-4 text-[#E06D53] animate-spin" />
            <span className="text-xs text-[#7A6258] font-mono">Analyzing hospital telemetry graph...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 p-2 bg-white border border-[#EFE5DC] rounded-2xl shadow-warm-sm shrink-0"
      >
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Ask Kairo about bed capacity, appointment bottlenecks, or hospital throughput..."
          className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-[#2C1810] placeholder-[#A59288] focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputPrompt.trim() || isTyping}
          className="p-2.5 bg-[#E06D53] hover:bg-[#D25C42] disabled:opacity-30 text-white rounded-xl transition-all shadow-terracotta cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
