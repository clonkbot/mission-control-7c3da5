import { useState } from 'react';
import './App.css';

interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'working' | 'idle' | 'offline';
  badge?: 'LEAD' | 'SPC' | 'INT';
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignee?: string;
  daysAgo: number;
  tags: string[];
  priority?: number;
}

const agents: Agent[] = [
  { id: '1', name: 'Bhanu', role: 'Founder', avatar: '👤', status: 'working', badge: 'LEAD' },
  { id: '2', name: 'Friday', role: 'Developer Agent', avatar: '🤖', status: 'working', badge: 'INT' },
  { id: '3', name: 'Fury', role: 'Customer Research', avatar: '🔥', status: 'working', badge: 'SPC' },
  { id: '4', name: 'Groot', role: 'Retention Specialist', avatar: '🌱', status: 'working', badge: 'SPC' },
  { id: '5', name: 'Jarvis', role: 'Squad Lead', avatar: '⚡', status: 'working', badge: 'LEAD' },
  { id: '6', name: 'Loki', role: 'Content Writer', avatar: '✍️', status: 'working', badge: 'SPC' },
  { id: '7', name: 'Pepper', role: 'Email Marketing', avatar: '📧', status: 'working', badge: 'INT' },
  { id: '8', name: 'Quill', role: 'Social Media', avatar: '🪶', status: 'working', badge: 'INT' },
  { id: '9', name: 'Rob', role: 'Strategic Advisor', avatar: '📊', status: 'working', badge: 'LEAD' },
  { id: '10', name: 'Shuri', role: 'Product Analyst', avatar: '🔬', status: 'working', badge: 'SPC' },
];

const tasks: { inbox: Task[]; assigned: Task[]; inProgress: Task[]; review: Task[] } = {
  inbox: [],
  assigned: [
    { id: '1', title: 'Product Demo Video Script', description: 'Create full script for SiteGPT product demo video with...', assignee: 'Loki', daysAgo: 5, tags: ['video', 'content', 'demo'], priority: 1 },
    { id: '2', title: 'Tweet Content - Real Stories Only', description: 'Create authentic tweets based on real SiteGPT...', assignee: 'Quill', daysAgo: 2, tags: ['social', 'twitter', 'content'], priority: 1 },
    { id: '3', title: 'Customer Research - Tweet Material', description: 'Pull real customer data and stories from Slack for tweet...', assignee: 'Fury', daysAgo: 2, tags: ['research', 'data', 'social'], priority: 1 },
    { id: '4', title: 'SiteGPT Hero Video - Higgsfield Production', description: 'Produce the 30-45 second hero video using Higgsfield...', assignee: 'Wanda', daysAgo: 5, tags: ['video', 'higgsfield', 'hero'], priority: 1 },
  ],
  inProgress: [
    { id: '5', title: 'Mine Sybill Call Recordings for Customer Insights', description: 'Read through #sybill-notifications in Slack. This...', assignee: 'Fury', daysAgo: 2, tags: ['research', 'customer-insights', 'slack'], priority: 1 },
    { id: '6', title: 'Analyze Trial→Paid Conversions from #customer-tracker', description: 'Read through Slack #customer-tracker channe...', assignee: 'Fury', daysAgo: 2, tags: ['research', 'activation', 'trial-conversion', 'customer-tracker', 'slack'], priority: 1 },
  ],
  review: [],
};

function App() {
  const [selectedAgent, setSelectedAgent] = useState<Agent>(agents[3]);
  const [activeTab, setActiveTab] = useState<'attention' | 'timeline' | 'messages'>('attention');
  const activeAgents = agents.filter(a => a.status === 'working').length;
  const totalTasks = tasks.inbox.length + tasks.assigned.length + tasks.inProgress.length + tasks.review.length;

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-icon">◆</span>
            <span className="logo-text">MISSION CONTROL</span>
          </div>
          <div className="project-badge">SiteGPT</div>
        </div>
        <div className="header-center">
          <div className="stat">
            <span className="stat-value">{activeAgents}</span>
            <span className="stat-label">AGENTS ACTIVE</span>
          </div>
          <div className="stat">
            <span className="stat-value">{totalTasks}</span>
            <span className="stat-label">TASKS IN QUEUE</span>
          </div>
        </div>
        <div className="header-right">
          <button className="header-btn chat-btn">
            <span className="btn-dot green"></span>
            Chat
          </button>
          <button className="header-btn">
            <span className="btn-icon">📡</span>
            Broadcast
          </button>
          <button className="header-btn">
            <span className="btn-icon">📄</span>
            Docs
          </button>
          <div className="time-display">
            <span className="time">02:06:45</span>
            <span className="date">Mon, Feb 2</span>
          </div>
          <div className="status-indicator">
            <span className="status-dot online"></span>
            ONLINE
          </div>
        </div>
      </header>

      <div className="main-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <span className="sidebar-icon">←</span>
            <span className="sidebar-title">AGENTS</span>
            <span className="agent-count">{agents.length}</span>
          </div>

          <div className="all-agents">
            <div className="agent-item all">
              <div className="agent-avatar-wrapper">
                <div className="agent-avatar all-avatar">
                  <span>⊕</span>
                </div>
              </div>
              <div className="agent-info">
                <span className="agent-name">All Agents</span>
                <span className="agent-role">{agents.length} total</span>
              </div>
              <span className="active-badge">● {activeAgents} ACTIVE</span>
            </div>
          </div>

          <div className="agent-list">
            {agents.map((agent, index) => (
              <div
                key={agent.id}
                className={`agent-item ${selectedAgent.id === agent.id ? 'selected' : ''}`}
                onClick={() => setSelectedAgent(agent)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="agent-avatar-wrapper">
                  <div className="agent-avatar">
                    <span>{agent.avatar}</span>
                  </div>
                </div>
                <div className="agent-info">
                  <div className="agent-name-row">
                    <span className="agent-name">{agent.name}</span>
                    {agent.badge && <span className={`badge badge-${agent.badge.toLowerCase()}`}>{agent.badge}</span>}
                  </div>
                  <span className="agent-role">{agent.role}</span>
                </div>
                <span className={`status-badge ${agent.status}`}>● WORKING</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content - Mission Queue */}
        <main className="mission-queue">
          <div className="queue-header">
            <span className="queue-icon">✦</span>
            <span className="queue-title">MISSION QUEUE</span>
          </div>

          <div className="kanban-board">
            <KanbanColumn title="INBOX" count={tasks.inbox.length} tasks={tasks.inbox} color="gray" />
            <KanbanColumn title="ASSIGNED" count={tasks.assigned.length} tasks={tasks.assigned} color="yellow" />
            <KanbanColumn title="IN PROGRESS" count={tasks.inProgress.length} tasks={tasks.inProgress} color="blue" />
            <KanbanColumn title="REVIEW" count={tasks.review.length} tasks={tasks.review} color="purple" />
            <div className="kanban-column bhanu-column">
              <div className="column-header">
                <span className="column-dot bhanu"></span>
                <span>BHANU</span>
              </div>
              <div className="bhanu-indicator">—</div>
            </div>
          </div>
        </main>

        {/* Agent Profile Panel */}
        <aside className="profile-panel">
          <div className="panel-header">
            <span className="panel-label">AGENT PROFILE</span>
            <button className="close-btn">×</button>
          </div>

          <div className="profile-content">
            <div className="profile-avatar">
              <span>{selectedAgent.avatar}</span>
            </div>
            <h2 className="profile-name">{selectedAgent.name}</h2>
            <span className="profile-role-badge">{selectedAgent.role}</span>

            <div className="working-status">
              <span className="working-dot"></span>
              WORKING
            </div>

            <div className="status-reason">
              <span className="reason-label">STATUS REASON:</span>
              <p>Onboarded. Health monitoring framework ready. Coordinating with Fury on churn analysis.</p>
              <span className="time-ago">Since about 1 hour ago</span>
            </div>

            <div className="about-section">
              <h3>ABOUT</h3>
              <p>
                I am Groot. Retention Specialist. Guardian of customers. I catch churn before it happens.
                Every at-risk customer is an opportunity. Every churned customer is a failure I should have prevented.
                My tools: ChartMogul API, Slack monitoring, customer health scores.
                My mission: Get churn below 2.5%. No customer left behind.
              </p>
            </div>

            <div className="skills-section">
              <h3>SKILLS</h3>
              <div className="skill-tags">
                <span className="skill-tag">retention</span>
                <span className="skill-tag">churn-prevention</span>
                <span className="skill-tag">customer-health</span>
                <span className="skill-tag">proactive-outreach</span>
                <span className="skill-tag">win-back</span>
                <span className="skill-tag">onboarding</span>
              </div>
            </div>

            <div className="tabs-section">
              <div className="tabs">
                <button
                  className={`tab ${activeTab === 'attention' ? 'active' : ''}`}
                  onClick={() => setActiveTab('attention')}
                >
                  <span className="tab-icon">⚠️</span>
                  Attention
                  <span className="tab-count">2</span>
                </button>
                <button
                  className={`tab ${activeTab === 'timeline' ? 'active' : ''}`}
                  onClick={() => setActiveTab('timeline')}
                >
                  <span className="tab-icon">📋</span>
                  Timeline
                </button>
                <button
                  className={`tab ${activeTab === 'messages' ? 'active' : ''}`}
                  onClick={() => setActiveTab('messages')}
                >
                  <span className="tab-icon">💬</span>
                  Messages
                </button>
              </div>
              <div className="tab-content">
                <p className="attention-note">Tasks & mentions needing {selectedAgent.name}'s attention</p>
              </div>
            </div>

            <div className="message-section">
              <span className="message-label">SEND MESSAGE TO {selectedAgent.name.toUpperCase()}</span>
              <div className="message-input">
                <input type="text" placeholder={`Message ${selectedAgent.name}... (@ to mention)`} />
              </div>
            </div>
          </div>
        </aside>
      </div>

      <footer className="footer">
        <span>Requested by <a href="https://twitter.com/aiob_me" target="_blank" rel="noopener noreferrer">@aiob_me</a> · Built by <a href="https://twitter.com/clonkbot" target="_blank" rel="noopener noreferrer">@clonkbot</a></span>
      </footer>
    </div>
  );
}

function KanbanColumn({ title, count, tasks, color }: { title: string; count: number; tasks: Task[]; color: string }) {
  return (
    <div className="kanban-column">
      <div className="column-header">
        <span className={`column-dot ${color}`}></span>
        <span>{title}</span>
        <span className="column-count">{count}</span>
      </div>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={task.id} className="task-card" style={{ animationDelay: `${index * 0.1}s` }}>
            {task.priority && <span className="priority-indicator">{task.priority}</span>}
            <h4 className="task-title">{task.title}</h4>
            <p className="task-description">{task.description}</p>
            {task.assignee && (
              <div className="task-assignee">
                <span className="assignee-icon">👤</span>
                <span>{task.assignee}</span>
                <span className="days-ago">{task.daysAgo} days ago</span>
              </div>
            )}
            <div className="task-tags">
              {task.tags.map(tag => (
                <span key={tag} className="task-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
