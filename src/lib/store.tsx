'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Project,
  Task,
  Automation,
  TeamMember,
  INITIAL_PROJECTS,
  INITIAL_TASKS,
  INITIAL_AUTOMATIONS,
  TEAM_MEMBERS
} from './mockData';

interface KairoStoreContextType {
  projects: Project[];
  tasks: Task[];
  automations: Automation[];
  teamMembers: TeamMember[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  toggleTaskStatus: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  addProject: (project: Omit<Project, 'id' | 'tasksCount' | 'progress'>) => void;
  toggleAutomation: (automationId: string) => void;
  addAutomation: (automation: Omit<Automation, 'id' | 'executionsCount' | 'lastRun'>) => void;
  completedTasksCount: number;
  totalTasksCount: number;
}

const KairoStoreContext = createContext<KairoStoreContextType | null>(null);

export function KairoStoreProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [automations, setAutomations] = useState<Automation[]>(INITIAL_AUTOMATIONS);
  const [teamMembers] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Global Cmd+K keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addTask = (newTaskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: 'task-' + (tasks.length + 1) + '-' + Math.random().toString(36).substring(2, 6)
    };
    setTasks((prev) => [newTask, ...prev]);

    // Update project count
    if (newTask.projectId) {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id === newTask.projectId) {
            const total = p.tasksCount.total + 1;
            const completed = p.tasksCount.completed + (newTask.status === 'done' ? 1 : 0);
            return {
              ...p,
              tasksCount: { total, completed },
              progress: Math.round((completed / total) * 100)
            };
          }
          return p;
        })
      );
    }
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextStatus: Task['status'] = t.status === 'done' ? 'todo' : 'done';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const addProject = (projectData: Omit<Project, 'id' | 'tasksCount' | 'progress'>) => {
    const newProj: Project = {
      ...projectData,
      id: 'proj-' + (projects.length + 1) + '-' + Math.random().toString(36).substring(2, 6),
      progress: 0,
      tasksCount: { total: 0, completed: 0 }
    };
    setProjects((prev) => [newProj, ...prev]);
  };

  const toggleAutomation = (automationId: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === automationId ? { ...a, enabled: !a.enabled } : a))
    );
  };

  const addAutomation = (autoData: Omit<Automation, 'id' | 'executionsCount' | 'lastRun'>) => {
    const newAuto: Automation = {
      ...autoData,
      id: 'auto-' + (automations.length + 1) + '-' + Math.random().toString(36).substring(2, 6),
      executionsCount: 0,
      lastRun: 'Just now'
    };
    setAutomations((prev) => [newAuto, ...prev]);
  };

  const completedTasksCount = tasks.filter((t) => t.status === 'done').length;
  const totalTasksCount = tasks.length;

  return (
    <KairoStoreContext.Provider
      value={{
        projects,
        tasks,
        automations,
        teamMembers,
        searchQuery,
        setSearchQuery,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        addTask,
        toggleTaskStatus,
        deleteTask,
        addProject,
        toggleAutomation,
        addAutomation,
        completedTasksCount,
        totalTasksCount
      }}
    >
      {children}
    </KairoStoreContext.Provider>
  );
}

export function useKairoStore() {
  const context = useContext(KairoStoreContext);
  if (!context) {
    throw new Error('useKairoStore must be used within a KairoStoreProvider');
  }
  return context;
}
