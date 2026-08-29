export interface Project {
  id: string;
  name: string;
  description: string;
  category: 'Product' | 'Engineering' | 'Design' | 'Growth';
  status: 'In Progress' | 'In Review' | 'Planning' | 'Completed';
  progress: number;
  dueDate: string;
  members: { name: string; avatar: string; role: string }[];
  tasksCount: { total: number; completed: number };
  color: string;
  keyGoals: string[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  projectId: string;
  projectName: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: { name: string; avatar: string };
  dueDate: string;
  tags: string[];
  aiGenerated?: boolean;
}

export interface Automation {
  id: string;
  title: string;
  description: string;
  trigger: string;
  action: string;
  enabled: boolean;
  executionsCount: number;
  lastRun: string;
  category: 'AI' | 'Sync' | 'Notify' | 'Review';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  avatar: string;
  status: 'online' | 'busy' | 'offline';
  email: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: { name: string; role: string; avatar: string };
  content: string[];
  keyTakeaways: string[];
}

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'Website Redesign & Brand 2.0',
    description: 'Complete overhaul of the core design system, landing pages, and interactive product demos.',
    category: 'Design',
    status: 'In Progress',
    progress: 74,
    dueDate: 'Sep 15, 2026',
    members: [
      { name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', role: 'Design Lead' },
      { name: 'Marcus Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', role: 'Frontend Engineer' },
      { name: 'Sarah Lin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', role: 'Product Manager' }
    ],
    tasksCount: { total: 18, completed: 13 },
    color: '#6366F1',
    keyGoals: [
      'Finalize unified token system in Figma',
      'Ship fluid WebGL component previews',
      'Optimize Lighthouse performance score to 98+'
    ]
  },
  {
    id: 'proj-2',
    name: 'AI Context Graph Engine',
    description: 'Neural indexing service to auto-summarize cross-channel meetings, code PRs, and team documents.',
    category: 'Engineering',
    status: 'In Progress',
    progress: 60,
    dueDate: 'Oct 01, 2026',
    members: [
      { name: 'David Park', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', role: 'AI Research Lead' },
      { name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', role: 'Design Lead' }
    ],
    tasksCount: { total: 24, completed: 15 },
    color: '#3B82F6',
    keyGoals: [
      'Sub-50ms vector query latency',
      'Context deduplication engine',
      'End-to-end encryption for team workspaces'
    ]
  },
  {
    id: 'proj-3',
    name: 'Mobile iOS & iPad App',
    description: 'Native companion app with gesture-driven task triaging, voice capture, and offline AI sync.',
    category: 'Product',
    status: 'Planning',
    progress: 35,
    dueDate: 'Nov 12, 2026',
    members: [
      { name: 'Sarah Lin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', role: 'Product Manager' },
      { name: 'Marcus Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', role: 'Frontend Engineer' }
    ],
    tasksCount: { total: 14, completed: 5 },
    color: '#10B981',
    keyGoals: [
      'SwiftUI tactile interaction feel',
      'Dynamic Island quick-capture widget',
      'Biometric authentication pipeline'
    ]
  },
  {
    id: 'proj-4',
    name: 'Q3 Developer Growth Engine',
    description: 'Interactive API sandbox, developer documentation overhaul, and community template hub.',
    category: 'Growth',
    status: 'In Review',
    progress: 90,
    dueDate: 'Sep 05, 2026',
    members: [
      { name: 'Marcus Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', role: 'Frontend Engineer' },
      { name: 'David Park', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', role: 'AI Research Lead' }
    ],
    tasksCount: { total: 12, completed: 11 },
    color: '#F59E0B',
    keyGoals: [
      'Interactive TypeScript Playground',
      'Webhook simulation sandbox',
      'One-click CLI template deployments'
    ]
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'Finalize dark-mode contrast tokens in design system',
    description: 'Ensure all zinc/slate border opacities pass WCAG AAA standards on OLED panels.',
    projectId: 'proj-1',
    projectName: 'Website Redesign & Brand 2.0',
    status: 'done',
    priority: 'high',
    assignee: { name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    dueDate: 'Today',
    tags: ['Design', 'Tokens']
  },
  {
    id: 'task-2',
    title: 'Implement vector embedding cache for AI query summarizer',
    description: 'Store semantic chunk hashes in memory to prevent duplicate vector computation.',
    projectId: 'proj-2',
    projectName: 'AI Context Graph Engine',
    status: 'in-progress',
    priority: 'urgent',
    assignee: { name: 'David Park', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    dueDate: 'Tomorrow',
    tags: ['AI', 'Performance'],
    aiGenerated: true
  },
  {
    id: 'task-3',
    title: 'Audit mobile navigation drawer gesture physics',
    description: 'Smooth spring damping and touch-drag dismiss threshold on iPad and mobile safari.',
    projectId: 'proj-3',
    projectName: 'Mobile iOS & iPad App',
    status: 'todo',
    priority: 'medium',
    assignee: { name: 'Marcus Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    dueDate: 'Sep 02',
    tags: ['Mobile', 'UI']
  },
  {
    id: 'task-4',
    title: 'Automated weekly release notes synthesis workflow',
    description: 'Auto-parse closed GitHub PRs and format into customer-facing changelog drafts.',
    projectId: 'proj-4',
    projectName: 'Q3 Developer Growth Engine',
    status: 'review',
    priority: 'high',
    assignee: { name: 'Sarah Lin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' },
    dueDate: 'Sep 04',
    tags: ['Automation', 'Changelog'],
    aiGenerated: true
  },
  {
    id: 'task-5',
    title: 'Benchmark client-side render speed on low-power devices',
    description: 'Profile heap memory consumption and component re-render frequency on throttling.',
    projectId: 'proj-1',
    projectName: 'Website Redesign & Brand 2.0',
    status: 'in-progress',
    priority: 'medium',
    assignee: { name: 'Marcus Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
    dueDate: 'Sep 06',
    tags: ['Optimization']
  }
];

export const INITIAL_AUTOMATIONS: Automation[] = [
  {
    id: 'auto-1',
    title: 'Smart Meeting Synthesis',
    description: 'When a project sync concludes, automatically generate an actionable task digest and assign items to relevant owners.',
    trigger: 'Calendar Event Completed',
    action: 'Generate AI Task Digest',
    enabled: true,
    executionsCount: 142,
    lastRun: '10 mins ago',
    category: 'AI'
  },
  {
    id: 'auto-2',
    title: 'Blocker Escalation Pipeline',
    description: 'If a high-priority task remains in review for more than 24 hours, notify project leads and re-prioritize timeline.',
    trigger: 'Task Stagnant > 24 Hours',
    action: 'Notify Lead & Highlight in Standup',
    enabled: true,
    executionsCount: 38,
    lastRun: '2 hours ago',
    category: 'Review'
  },
  {
    id: 'auto-3',
    title: 'Customer Feedback Auto-Triage',
    description: 'Classify incoming customer feedback into Bug, Feature Request, or UX Improvement, and link to active project roadmaps.',
    trigger: 'New Support Ticket / Survey',
    action: 'Categorize & Route to Backlog',
    enabled: false,
    executionsCount: 890,
    lastRun: 'Yesterday',
    category: 'Sync'
  },
  {
    id: 'auto-4',
    title: 'Weekly Executive Briefing',
    description: 'Every Friday at 4 PM, summarize key milestones reached across all active engineering and design projects.',
    trigger: 'Scheduled: Friday 16:00 UTC',
    action: 'Compile Cross-Project AI Briefing',
    enabled: true,
    executionsCount: 26,
    lastRun: '3 days ago',
    category: 'AI'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'user-1',
    name: 'Elena Rostova',
    role: 'Staff Product Designer',
    department: 'Design',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    email: 'elena@kairo.design'
  },
  {
    id: 'user-2',
    name: 'Marcus Chen',
    role: 'Lead Frontend Architect',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    status: 'online',
    email: 'marcus@kairo.engineering'
  },
  {
    id: 'user-3',
    name: 'Sarah Lin',
    role: 'VP of Product',
    department: 'Product',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    status: 'busy',
    email: 'sarah@kairo.product'
  },
  {
    id: 'user-4',
    name: 'David Park',
    role: 'Principal AI Scientist',
    department: 'Research',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    status: 'offline',
    email: 'david@kairo.ai'
  }
];

export const ARTICLES: Article[] = [
  {
    slug: 'designing-better-team-workflows',
    title: 'Designing Better Team Workflows: Beyond the Kanban Board',
    excerpt: 'How modern engineering and design teams reduce cognitive friction by keeping communication and task execution in the exact same view.',
    category: 'Productivity',
    readTime: '5 min read',
    date: 'Aug 24, 2026',
    author: {
      name: 'Elena Rostova',
      role: 'Staff Product Designer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    keyTakeaways: [
      'Context switching between chat apps and task trackers costs teams up to 40% of productive hours.',
      'Automated status updates reduce the need for synchronous status standup meetings.',
      'Software should feel quiet and calm rather than bombarding users with noisy red badges.'
    ],
    content: [
      'The modern software workplace is drowning in tools. A typical product team switches between a documentation wiki, a task board, a chat platform, a wireframing canvas, and a dozen notification feeds every single morning.',
      'When context is scattered across disparate applications, teams spend more time updating software than actually building products. The solution is not adding another management tool—it is consolidating context into an intelligent, ambient workspace.',
      'At Kairo, our thesis is simple: when an idea is spoken in a meeting or written in a brief, the system should automatically recognize the intent, map the necessary tasks, and connect the relevant engineers without manual triage.'
    ]
  },
  {
    slug: 'the-future-of-ai-assisted-work',
    title: 'The Future of AI-Assisted Work: Moving from Chatbots to Autonomous Agents',
    excerpt: 'Why generic prompt-response chatbots fail at project management, and how ambient workspace intelligence creates real team leverage.',
    category: 'Artificial Intelligence',
    readTime: '6 min read',
    date: 'Aug 18, 2026',
    author: {
      name: 'David Park',
      role: 'Principal AI Scientist',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    keyTakeaways: [
      'LLMs are most powerful when deeply embedded into the data structures of your project graph.',
      'Predictive task scheduling removes repetitive operational overhead.',
      'Trust in AI systems requires absolute transparency and human-in-the-loop controls.'
    ],
    content: [
      'Most attempts at adding AI to productivity software have simply amounted to slapping an open chatbox in the sidebar. While novelty is high initially, users quickly realize that typing out paragraphs of context to an isolated bot is more work than doing the task manually.',
      'True AI leverage happens when the model already understands your project hierarchy, who is responsible for each subsystem, past decision logs, and upcoming sprint deadlines.',
      'Instead of asking you what you want to do, an intelligent workspace continuously resolves ambiguities in the background, preparing summaries and drafts before you even ask.'
    ]
  },
  {
    slug: 'why-context-matters-in-productivity',
    title: 'Why Context Matters in Modern Productivity Software',
    excerpt: 'The hidden cost of fragmented team knowledge and how unified graph architectures preserve strategic alignment.',
    category: 'Architecture',
    readTime: '4 min read',
    date: 'Aug 10, 2026',
    author: {
      name: 'Marcus Chen',
      role: 'Lead Frontend Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    keyTakeaways: [
      'Decisions made in Slack messages get lost within 48 hours without automatic knowledge indexing.',
      'Linking code, design, and roadmap items in a unified graph reduces misaligned implementations.',
      'High-velocity teams thrive when every task contains full historical rationale.'
    ],
    content: [
      'Every engineer has experienced opening a task that simply reads "Fix authentication flow edge case" with zero links to the design mock, customer bug report, or technical RFC. Hours are wasted hunting down the original conversation.',
      'When software maintains an ambient connection between conversations, mockups, and tickets, knowledge debt disappears. Any contributor can jump into any project with complete clarity on why a decision was made.',
      'Building calm, context-aware tooling is not just a cosmetic preference; it is the single greatest competitive advantage for fast-moving engineering teams.'
    ]
  },
  {
    slug: 'building-calm-software',
    title: 'Building Calm Software: The Philosophy of Restraint in Interface Design',
    excerpt: 'Why high-performance tools should prioritize restraint, neutral color scales, and sub-100ms interactions over flashy visual noise.',
    category: 'Philosophy',
    readTime: '5 min read',
    date: 'Jul 28, 2026',
    author: {
      name: 'Sarah Lin',
      role: 'VP of Product',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
    },
    keyTakeaways: [
      'Visual noise in productivity software causes decision fatigue and cognitive strain.',
      'Subtle borders and thoughtful typography scale far better than heavy drop shadows and aggressive gradients.',
      'The best tools get out of your way and let your team focus on the work that matters.'
    ],
    content: [
      'Over the past decade, enterprise software has become increasingly loud. Bright gamified badges, confetti animations for trivial tasks, and aggressive notifications compete constantly for your attention.',
      'At Kairo, we believe that software for serious craft should feel like a precision surgical instrument or an architect’s drafting table. It should be quiet, incredibly fast, and meticulously organized.',
      'When your digital environment is calm, your mind can focus on deep, sustained problem-solving.'
    ]
  }
];

export const PRESET_AI_PROMPTS = [
  {
    label: 'Summarize website redesign progress',
    prompt: 'Summarize the progress on the website redesign and list open blockers.',
    response: {
      title: 'Website Redesign & Brand 2.0 — Status Report',
      summary: 'The project is currently at 74% completion with 13 of 18 key tasks delivered. Design tokens and hero layouts are approved; mobile drawer interaction and performance benchmarks are in active sprint.',
      completed: [
        'Unified Figma color & typography tokens verified',
        'Interactive preview components integrated',
        'Landing page responsive breakpoints tuned for tablet/mobile'
      ],
      inProgress: [
        'Dark-mode contrast audit on OLED test devices',
        'Mobile navigation touch gesture physics tuning'
      ],
      nextSteps: [
        'Conduct cross-browser Lighthouse audit on Wednesday',
        'Review final copy with marketing leads before staging deployment'
      ]
    }
  },
  {
    label: 'Generate sprint tasks from spec',
    prompt: 'Draft sprint tasks for the Mobile App voice capture feature.',
    response: {
      title: 'Generated Task Breakdown: Mobile Voice Capture',
      summary: 'Parsed 3 high-priority engineering tasks and 1 design validation task for upcoming Sprint 14.',
      completed: [],
      inProgress: [],
      nextSteps: [
        'Task: Configure iOS Speech-to-Text streaming buffer with background fallback',
        'Task: Design waveform microphone pulse component in Figma',
        'Task: Implement offline audio caching in local SQLite database',
        'Task: Security audit for audio buffer encryption in transit'
      ]
    }
  },
  {
    label: 'Analyze team workload distribution',
    prompt: 'How is the engineering team capacity looking for next week?',
    response: {
      title: 'Team Workload & Capacity Analysis',
      summary: 'Overall team capacity is healthy at 78% allocation. Marcus Chen is leading 2 active frontend projects; David Park has 4 AI vector indexing tickets in queue.',
      completed: [
        'All Q3 Growth tickets delivered ahead of deadline'
      ],
      inProgress: [
        'AI Context Graph query latency testing (David)',
        'Mobile drawer physics validation (Marcus)'
      ],
      nextSteps: [
        'Recommended: Reassign mobile gesture audit to prevent frontend bottleneck',
        'Schedule brief architectural review for vector embedding cache'
      ]
    }
  }
];
