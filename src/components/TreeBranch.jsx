import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Folder, 
  FolderOpen, 
  Atom, 
  Code2, 
  Globe, 
  Sparkles, 
  FolderArchive,
  Info
} from 'lucide-react';
import RepositoryNode from './RepositoryNode';

const BRANCH_ICONS = {
  react: Atom,
  javascript: Code2,
  webdev: Globe,
  uiexperiments: Sparkles,
  other: FolderArchive
};

export default function TreeBranch({
  branch,
  isExpanded,
  onToggle,
  selectedRepo,
  onSelectRepo,
  isLastBranch = false,
  index = 0
}) {
  const IconComponent = BRANCH_ICONS[branch.id] || Folder;
  const count = branch.repositories.length;
  const hasSelectedRepo = branch.repositories.some(r => r.name === selectedRepo?.name);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggle(branch.id);
    }
  };

  return (
    <div className="tree-branch-group" role="treeitem" aria-expanded={isExpanded}>
      <div className="branch-header-wrapper">
        {/* SVG Connector from Root Trunk to Branch */}
        <svg 
          className="branch-connector-svg" 
          width="20" 
          height="38" 
          viewBox="0 0 20 38" 
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            d={isLastBranch ? "M 2 0 V 19 H 18" : "M 2 0 V 38 M 2 19 H 18"}
            stroke={hasSelectedRepo ? "rgba(34, 211, 238, 0.7)" : "rgba(139, 92, 246, 0.35)"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          />
        </svg>

        {/* Branch Toggle Button */}
        <button
          type="button"
          className={`branch-toggle-btn ${isExpanded ? 'is-expanded' : ''} ${hasSelectedRepo ? 'contains-selected' : ''}`}
          onClick={() => onToggle(branch.id)}
          onKeyDown={handleKeyDown}
          aria-label={`${branch.name} branch with ${count} ${count === 1 ? 'repository' : 'repositories'}, currently ${isExpanded ? 'expanded' : 'collapsed'}`}
        >
          {/* Chevron with rotation animation */}
          <motion.span
            className="branch-chevron"
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <ChevronRight size={14} />
          </motion.span>

          {/* Folder Icon (Open vs Closed) */}
          <div 
            className="branch-folder-icon"
            style={{ color: branch.accentColor || '#3B82F6' }}
          >
            {isExpanded ? <FolderOpen size={16} /> : <IconComponent size={16} />}
          </div>

          {/* Branch Title */}
          <span className="branch-title">{branch.name}</span>

          {/* Repositories Count Pill */}
          <span className="branch-count-pill">
            {count}
          </span>
        </button>
      </div>

      {/* Child Repository Nodes Container with Smooth Expansion Animation */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`branch-group-${branch.id}`}
            role="group"
            className="branch-children-container"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1,
              transition: { 
                height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.25, delay: 0.05 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: { 
                height: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.15 }
              }
            }}
          >
            {branch.repositories.length === 0 ? (
              <div className="empty-branch-fallback">
                <svg 
                  className="tree-connector-elbow" 
                  width="24" 
                  height="36" 
                  viewBox="0 0 24 36" 
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 2 0 V 18 H 20"
                    stroke="rgba(148, 163, 184, 0.25)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="empty-branch-card">
                  <Info size={13} className="text-muted" />
                  <span>No public repositories currently in this category</span>
                </div>
              </div>
            ) : (
              branch.repositories.map((repo, i) => (
                <RepositoryNode
                  key={repo.name}
                  repo={repo}
                  isSelected={selectedRepo?.name === repo.name}
                  onSelect={onSelectRepo}
                  isLast={i === branch.repositories.length - 1}
                  index={i}
                />
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
