'use client';

import React, { useState } from 'react';
import { useKairoStore } from '@/lib/store';
import { X, Plus, FolderPlus, Zap } from 'lucide-react';

export function NewTaskModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { addTask, projects } = useKairoStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState(projects[0]?.id || 'proj-1');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedProj = projects.find((p) => p.id === projectId);

    addTask({
      title: title.trim(),
      description: description.trim(),
      projectId,
      projectName: selectedProj?.name || 'General Project',
      status: 'todo',
      priority,
      dueDate: 'Sep 10',
      assignee: {
        name: 'Elena Rostova',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      tags: ['Sprint 14']
    });

    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-zinc-950 border border-white/15 rounded-2xl p-6 shadow-2xl flex flex-col gap-5 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-400" />
            <span>Create New Task</span>
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Task Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Verify WebGL contrast tokens on OLED"
              className="bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-white/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-400">Project Roadmap</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-400">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Description (Optional)</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add relevant specifications or links..."
              className="bg-zinc-900 border border-white/10 rounded-xl p-3 text-xs text-zinc-100 focus:outline-none focus:border-white/30 resize-none"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-white text-zinc-950 font-semibold text-xs rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Create Deliverable
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function NewProjectModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { addProject } = useKairoStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Product' | 'Engineering' | 'Design' | 'Growth'>('Product');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addProject({
      name: name.trim(),
      description: description.trim() || 'Active strategic roadmap for team execution.',
      category,
      status: 'In Progress',
      dueDate: 'Oct 30, 2026',
      members: [
        { name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', role: 'Lead' }
      ],
      color: '#3B82F6',
      keyGoals: ['Establish foundational architecture', 'Review launch criteria']
    });

    setName('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-zinc-950 border border-white/15 rounded-2xl p-6 shadow-2xl flex flex-col gap-5 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <FolderPlus className="w-4 h-4 text-indigo-400" />
            <span>Create New Project</span>
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Project Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Design Systems 2.0"
              className="bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-white/30"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Department Vertical</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none"
            >
              <option value="Product">Product</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Growth">Growth</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the strategic objectives and deliverables..."
              className="bg-zinc-900 border border-white/10 rounded-xl p-3 text-xs text-zinc-100 focus:outline-none focus:border-white/30 resize-none"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-white text-zinc-950 font-semibold text-xs rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Launch Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function NewAutomationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { addAutomation } = useKairoStore();
  const [title, setTitle] = useState('');
  const [trigger, setTrigger] = useState('Calendar Sync Completed');
  const [action, setAction] = useState('Compile AI Task Digest');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addAutomation({
      title: title.trim(),
      description: `Autonomous rule triggered upon ${trigger} to ${action}.`,
      trigger,
      action,
      enabled: true,
      category: 'AI'
    });

    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-lg bg-zinc-950 border border-white/15 rounded-2xl p-6 shadow-2xl flex flex-col gap-5 animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Create Automation Rule</span>
          </h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Rule Name</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Auto-notify lead on stagnant review"
              className="bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-white/30"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">When this occurs (Trigger)</label>
            <input
              type="text"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              className="bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-white/30"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">Then take action (Action)</label>
            <input
              type="text"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-zinc-100 focus:outline-none focus:border-white/30"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-white text-zinc-950 font-semibold text-xs rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Enable Rule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
