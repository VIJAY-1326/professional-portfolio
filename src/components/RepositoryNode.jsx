import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, Star } from 'lucide-react';
import { LANGUAGE_COLORS } from '../data/githubTreeData';

export default function RepositoryNode({ 
  repo, 
  isSelected, 
  onSelect, 
  isLast = false, 
  index = 0 
}) {
  const langColor = LANGUAGE_COLORS[repo.language] || '#22D3EE';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(repo);
    }
  };

  return (
    <div className="repo-node-wrapper">
      {/* Precision SVG Connector Line */}
      <svg 
        className="tree-connector-elbow" 
        width="24" 
        height="40" 
        viewBox="0 0 24 40" 
        fill="none"
        aria-hidden="true"
      >
        <motion.path
          d={isLast ? "M 2 0 V 20 H 22" : "M 2 0 V 40 M 2 20 H 22"}
          stroke={isSelected ? "rgba(34, 211, 238, 0.85)" : "rgba(139, 92, 246, 0.3)"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.35, delay: index * 0.04 }}
        />
      </svg>

      {/* Interactive Repository Tree Leaf Button */}
      <motion.button
        type="button"
        role="treeitem"
        aria-selected={isSelected}
        aria-label={`Repository: ${repo.name}, language: ${repo.language || 'Plain text'}`}
        tabIndex={0}
        onClick={() => onSelect(repo)}
        onKeyDown={handleKeyDown}
        className={`repo-node-btn ${isSelected ? 'is-selected' : ''}`}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {/* Left repo icon & name */}
        <div className="repo-node-left">
          <div className="repo-icon-badge">
            <FolderGit2 size={15} className="repo-folder-icon" />
          </div>
          <span className="repo-node-name">{repo.name}</span>
        </div>

        {/* Right language indicator & stats */}
        <div className="repo-node-meta">
          {repo.language && (
            <span className="repo-lang-chip" title={`Primary language: ${repo.language}`}>
              <span 
                className="lang-color-dot" 
                style={{ backgroundColor: langColor, boxShadow: `0 0 8px ${langColor}66` }} 
              />
              <span className="lang-text">{repo.language}</span>
            </span>
          )}

          {repo.stargazers_count > 0 && (
            <span className="repo-star-chip">
              <Star size={11} className="fill-amber-400 text-amber-400" />
              <span>{repo.stargazers_count}</span>
            </span>
          )}

          {/* Active selection glowing pulse pip */}
          {isSelected && (
            <motion.span 
              className="selected-pulse-pip"
              layoutId="selectedNodeIndicator"
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            />
          )}
        </div>
      </motion.button>
    </div>
  );
}
