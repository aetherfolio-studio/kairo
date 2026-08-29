'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useKairoStore } from '@/lib/store';
import {
  Sparkles,
  Send,
  Bot,
  User,
  CheckCircle2,
  Plus,
  RefreshCw
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  generatedTasks?: string[];
}

export default function AiWorkspacePage() {
  const { addTask, projects } = useKairoStore();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: 'Hello Elena. I am Kairo AI, connected to your team graph (4 active projects, 18 sprint tasks). How can I assist your workflow today?',
      timestamp: '10:00 AM'
    },
    {
      id: 'm-2',
      sender: 'user',
      text: 'Summarize the website redesign blockers and suggest next deliverables.',
      timestamp: '10:01 AM'
    },
    {
      id: 'm-3',
      sender: 'ai',
      text: 'Here is the current status: The Website Redesign is at 74% progress. Design tokens and hero previews are approved. The primary open item is testing OLED dark-mode contrast. I have prepared 2 actionable sprint tickets below.',
      timestamp: '10:01 AM',
      generatedTasks: [
        'Run Lighthouse accessibility audit on staging build',
        'Verify spring physics damping on mobile drawer'
      ]
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [addedTasksMap, setAddedTasksMap] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Generate sprint tasks for Mobile App voice notes',
    'Summarize closed PRs for weekly team changelog',
    'Analyze engineering workload capacity for next week',
    'Draft a technical brief for vector caching'
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
      let replyText = 'I analyzed your project context graph. All active milestones are synchronized.';
      let tasksList: string[] | undefined = undefined;

      if (query.toLowerCase().includes('voice') || query.toLowerCase().includes('mobile')) {
        replyText = 'Parsed Mobile App voice feature specification. Created 2 suggested engineering deliverables:';
        tasksList = [
          'Configure iOS Speech-to-Text streaming buffer with background fallback',
          'Implement offline audio cache in local SQLite database'
        ];
      } else if (query.toLowerCase().includes('changelog') || query.toLowerCase().includes('pr')) {
        replyText = 'Synthesized 4 merged GitHub PRs into customer-facing changelog highlights:';
        tasksList = [
          'Draft release notes: Design token WCAG AAA upgrade',
          'Draft release notes: Vector query latency 50ms optimization'
        ];
      } else {
        replyText = `Understood: "${query}". Cross-referenced with 4 active projects and 18 tasks. Everything is updated and aligned with your team roadmap.`;
      }

      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        generatedTasks: tasksList
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  };

  const handleAddGeneratedTask = (taskTitle: string) => {
    addTask({
      title: taskTitle,
      description: 'Auto-generated deliverable created via Ask Kairo AI workspace.',
      projectId: projects[0]?.id || 'proj-1',
      projectName: projects[0]?.name || 'Website Redesign',
      status: 'todo',
      priority: 'high',
      dueDate: 'Next Sprint',
      assignee: {
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      tags: ['AI Generated'],
      aiGenerated: true
    });

    setAddedTasksMap((prev) => ({ ...prev, [taskTitle]: true }));
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
              Kairo AI Workspace
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 text-blue-300 border border-blue-500/20">
                Connected to Workspace Graph
              </span>
            </h1>
            <p className="text-xs text-zinc-400">
              Query project status, generate sprint tasks from specs, or draft changelog notes.
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'm-init',
                sender: 'ai',
                text: 'Workspace context refreshed. Ready for your next query.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ])
          }
          className="p-2 rounded-xl text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-white/10 hover:border-white/20 transition-all text-xs flex items-center gap-1 cursor-pointer"
          title="Clear Conversation"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Session</span>
        </button>
      </div>

      {/* Suggested Prompts Strip */}
      <div className="flex flex-wrap gap-2 shrink-0">
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1.5 rounded-full text-xs bg-zinc-900/80 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Main Chat Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 rounded-2xl bg-zinc-900/40 border border-white/10 flex flex-col gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 max-w-2xl ${
              msg.sender === 'user'
                ? 'self-end bg-zinc-800/90 border border-white/10 rounded-2xl rounded-tr-sm p-4'
                : 'self-start bg-zinc-950 border border-blue-500/20 rounded-2xl rounded-tl-sm p-4'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                msg.sender === 'user' ? 'bg-zinc-700' : 'bg-blue-600/20 border border-blue-500/40'
              }`}
            >
              {msg.sender === 'user' ? (
                <User className="w-3.5 h-3.5 text-zinc-200" />
              ) : (
                <Bot className="w-4 h-4 text-blue-400" />
              )}
            </div>

            <div className="flex flex-col gap-2 flex-1 min-w-0">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className={msg.sender === 'user' ? 'text-zinc-400' : 'text-blue-400 font-semibold'}>
                  {msg.sender === 'user' ? 'Elena Rostova' : 'Kairo Neural Engine'}
                </span>
                <span className="text-zinc-500">{msg.timestamp}</span>
              </div>

              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">{msg.text}</p>

              {/* Actionable Generated Tasks Box */}
              {msg.generatedTasks && msg.generatedTasks.length > 0 && (
                <div className="mt-2 p-3 rounded-xl bg-zinc-900 border border-white/10 flex flex-col gap-2">
                  <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider font-mono">
                    Generated Action Deliverables:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {msg.generatedTasks.map((tTitle, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded-lg bg-zinc-950/70 border border-white/5 text-xs"
                      >
                        <span className="text-zinc-300 truncate mr-2">{tTitle}</span>
                        {addedTasksMap[tTitle] ? (
                          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 shrink-0">
                            <CheckCircle2 className="w-3 h-3" /> Added to Backlog
                          </span>
                        ) : (
                          <button
                            onClick={() => handleAddGeneratedTask(tTitle)}
                            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-[11px] font-semibold flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Add Task</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="self-start flex items-center gap-3 bg-zinc-950 border border-blue-500/20 rounded-2xl p-4">
            <Bot className="w-4 h-4 text-blue-400 animate-spin" />
            <span className="text-xs text-zinc-400 font-mono">Analyzing project context graph...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 p-2 bg-zinc-900 border border-white/10 rounded-2xl shrink-0 focus-within:border-white/30 transition-all"
      >
        <input
          type="text"
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Ask Kairo anything about your projects, tasks, or request AI generation..."
          className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputPrompt.trim() || isTyping}
          className="p-2.5 bg-white disabled:opacity-30 text-zinc-950 hover:bg-zinc-200 rounded-xl transition-all shrink-0 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
