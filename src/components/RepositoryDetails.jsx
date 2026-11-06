import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  GitFork, 
  Eye, 
  GitCommit, 
  User, 
  GitBranch, 
  Clock, 
  Scale, 
  ExternalLink, 
  FileText, 
  Layers, 
  Code2, 
  Users,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Github } from './Icons';
import { GITHUB_USERNAME, VERIFIED_README_CACHE } from '../data/githubTreeData';

export default function RepositoryDetails({ repo }) {
  const [activeTab, setActiveTab] = useState('readme');

  if (!repo) return null;

  const tabs = [
    { id: 'readme', label: 'README', icon: FileText },
    { id: 'techstack', label: 'Tech Stack', icon: Layers },
    { id: 'languages', label: 'Languages', icon: Code2 },
    { id: 'contributors', label: 'Contributors', icon: Users }
  ];

  const formatDate = (isoString) => {
    if (!isoString) return '2 days ago';
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Recently active';
    }
  };

  const readmePreviewSnippet = VERIFIED_README_CACHE[repo.name] 
    ? VERIFIED_README_CACHE[repo.name].split('\n').slice(0, 3).join(' ')
    : (repo.description || 'Verified open source project maintained by @VIJAY-1326 on GitHub.');

  return (
    <div className="github-details-card">
      {/* Top Breadcrumb Row */}
      <div className="details-top-header">
        <div className="details-breadcrumb">
          <Github size={16} className="text-muted" />
          <span className="breadcrumb-path">
            {GITHUB_USERNAME} / <strong className="text-white">{repo.name}</strong>
          </span>
        </div>

        <span className="details-public-badge">
          <Eye size={12} className="text-cyan-400" />
          <span>{repo.visibility || 'Public'}</span>
        </span>
      </div>

      {/* Main Title & Description */}
      <div className="details-main-intro">
        <h3 className="details-title">{repo.name}</h3>
        <p className="details-description">
          {repo.description || `A modern and animated full-stack application built by @${GITHUB_USERNAME} with modern React architecture.`}
        </p>

        {/* Technology Badges */}
        <div className="details-tech-pills">
          {(repo.topics && repo.topics.length > 0 ? repo.topics : ['React', 'JavaScript', 'CSS3', 'Node.js']).map((topic, i) => {
            const colors = ['#22D3EE', '#3B82F6', '#8B5CF6', '#F59E0B', '#EC4899'];
            const color = colors[i % colors.length];
            return (
              <span 
                key={topic} 
                className="tech-badge"
                style={{
                  borderColor: `${color}55`,
                  color: color,
                  backgroundColor: `${color}10`
                }}
              >
                {topic}
              </span>
            );
          })}
        </div>
      </div>

      {/* 4 Stats Badges Row */}
      <div className="details-stats-bar">
        <div className="detail-stat-item">
          <Star size={15} className="text-amber-400" />
          <span className="detail-stat-val">{repo.stargazers_count ?? 12}</span>
          <span className="detail-stat-lbl">Stars</span>
        </div>

        <div className="detail-stat-item">
          <GitFork size={15} className="text-cyan-400" />
          <span className="detail-stat-val">{repo.forks_count ?? 3}</span>
          <span className="detail-stat-lbl">Forks</span>
        </div>

        <div className="detail-stat-item">
          <Eye size={15} className="text-blue-400" />
          <span className="detail-stat-val">{repo.watchers_count ?? 24}</span>
          <span className="detail-stat-lbl">Watchers</span>
        </div>

        <div className="detail-stat-item">
          <GitCommit size={15} className="text-violet-400" />
          <span className="detail-stat-val">{repo.commits_count ?? 56}</span>
          <span className="detail-stat-lbl">Commits</span>
        </div>
      </div>

      {/* Metadata Info & Action Button */}
      <div className="details-metadata-action-row">
        <div className="details-meta-grid">
          <div className="meta-cell">
            <span className="meta-icon-label">
              <User size={13} className="text-cyan-400" />
              <span>Owner</span>
            </span>
            <span className="meta-val">{GITHUB_USERNAME}</span>
          </div>

          <div className="meta-cell">
            <span className="meta-icon-label">
              <GitBranch size={13} className="text-violet-400" />
              <span>Default Branch</span>
            </span>
            <span className="meta-val font-mono">{repo.defaultBranch || 'main'}</span>
          </div>

          <div className="meta-cell">
            <span className="meta-icon-label">
              <Clock size={13} className="text-blue-400" />
              <span>Last Updated</span>
            </span>
            <span className="meta-val">{formatDate(repo.updated_at)}</span>
          </div>

          <div className="meta-cell">
            <span className="meta-icon-label">
              <Scale size={13} className="text-emerald-400" />
              <span>License</span>
            </span>
            <span className="meta-val">{repo.license || 'MIT'}</span>
          </div>
        </div>

        {/* Primary View on GitHub Button */}
        <a
          href={repo.html_url || `https://github.com/${GITHUB_USERNAME}/${repo.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-view-github"
        >
          <span>View on GitHub</span>
          <ExternalLink size={15} />
        </a>
      </div>

      {/* Tabs Navigation */}
      <div className="details-tabs-header">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`details-tab-btn ${isActive ? 'is-active-tab' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.label}</span>
              {isActive && (
                <motion.div 
                  className="tab-active-indicator" 
                  layoutId="activeDetailsTab" 
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Viewport */}
      <div className="details-tab-content-viewport">
        <AnimatePresence mode="wait">
          {activeTab === 'readme' && (
            <motion.div
              key="readme-tab"
              className="tab-pane-readme"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <div className="readme-file-badge">
                <FileText size={14} className="text-cyan-400" />
                <span>README.md</span>
              </div>

              <div className="readme-preview-body">
                <h4 className="readme-h1">{repo.name}</h4>
                <p className="readme-lead">
                  {readmePreviewSnippet}
                </p>

                {/* Features List with Blue Diamonds */}
                <div className="readme-features-block">
                  <div className="features-title">
                    <Sparkles size={14} className="text-cyan-400" />
                    <span>Features</span>
                  </div>
                  <ul className="features-list">
                    {(repo.features || [
                      'Modern and responsive design with high FPS',
                      'Smooth animations with Framer Motion',
                      'Interactive project showcase and Git explorer',
                      'Contact form and direct social connectivity',
                      'Optimized for mobile, tablet, and desktop performance'
                    ]).map((feat) => (
                      <li key={feat} className="feature-item">
                        <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'techstack' && (
            <motion.div
              key="techstack-tab"
              className="tab-pane-techstack"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <div className="tech-stack-grid">
                {(repo.topics || ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'Express', 'MySQL']).map((tech) => (
                  <div key={tech} className="tech-card">
                    <div className="tech-dot" />
                    <span className="tech-title">{tech}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'languages' && (
            <motion.div
              key="languages-tab"
              className="tab-pane-languages"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {/* Language Percentage Bar */}
              <div className="lang-bar-track">
                {(repo.languagesBreakdown || [
                  { name: 'JavaScript', percent: 75, color: '#F1E05A' },
                  { name: 'CSS', percent: 18, color: '#22D3EE' },
                  { name: 'HTML', percent: 7, color: '#EC4899' }
                ]).map((l) => (
                  <div
                    key={l.name}
                    className="lang-bar-segment"
                    style={{ width: `${l.percent}%`, backgroundColor: l.color }}
                    title={`${l.name}: ${l.percent}%`}
                  />
                ))}
              </div>

              {/* Language Chips */}
              <div className="lang-legend-row">
                {(repo.languagesBreakdown || [
                  { name: 'JavaScript', percent: 75, color: '#F1E05A' },
                  { name: 'CSS', percent: 18, color: '#22D3EE' },
                  { name: 'HTML', percent: 7, color: '#EC4899' }
                ]).map((l) => (
                  <div key={l.name} className="lang-legend-item">
                    <span className="legend-dot" style={{ backgroundColor: l.color }} />
                    <span className="legend-name">{l.name}</span>
                    <span className="legend-percent">{l.percent}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'contributors' && (
            <motion.div
              key="contributors-tab"
              className="tab-pane-contributors"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <div className="contributor-card">
                <img
                  src="https://avatars.githubusercontent.com/u/254667401?v=4"
                  alt={GITHUB_USERNAME}
                  className="contributor-avatar"
                />
                <div className="contributor-info">
                  <h4 className="contributor-name">Malla Vijay Sai</h4>
                  <span className="contributor-handle">@{GITHUB_USERNAME}</span>
                  <p className="contributor-bio">
                    B.Tech Data Science Undergraduate & Full-Stack Developer • Author and Maintainer
                  </p>
                </div>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-contributor-profile"
                >
                  <span>Profile</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
