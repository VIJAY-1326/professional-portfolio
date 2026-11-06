import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Github } from './Icons';

export default function RepositoryCard({
  repo,
  isSelected,
  onSelect,
  cardAnchorRef,
  accentColor = '#22D3EE'
}) {
  return (
    <motion.button
      type="button"
      ref={cardAnchorRef}
      className={`github-repo-card ${isSelected ? 'is-selected-card' : ''}`}
      onClick={() => onSelect(repo)}
      style={{
        '--repo-accent': accentColor,
        borderColor: isSelected ? accentColor : 'rgba(59, 130, 246, 0.22)',
        boxShadow: isSelected 
          ? `0 0 24px -3px ${accentColor}66, inset 0 0 14px ${accentColor}18` 
          : '0 4px 16px -4px rgba(0, 0, 0, 0.5)'
      }}
      whileHover={{ x: 2, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.18 }}
    >
      {/* Left Ingress Connection Point */}
      <span 
        className="repo-connector-point point-left" 
        style={{ 
          backgroundColor: isSelected ? accentColor : 'rgba(255, 255, 255, 0.35)',
          boxShadow: isSelected ? `0 0 8px ${accentColor}` : 'none'
        }} 
      />

      {/* GitHub Octocat Icon */}
      <div className="repo-card-icon-wrap" style={{ color: isSelected ? accentColor : '#94A3B8' }}>
        <Github size={15} />
      </div>

      {/* Repo Details */}
      <div className="repo-card-content">
        <div className="repo-card-header-row">
          <h4 className="repo-card-title" title={repo.name}>{repo.name}</h4>
          <span className="repo-public-pill">
            {repo.visibility || 'Public'}
          </span>
        </div>
        <p className="repo-card-desc" title={repo.description || `Source code repository for ${repo.name}.`}>
          {repo.description || `Source code repository for ${repo.name}.`}
        </p>
      </div>

      {/* Right Arrow Chevron */}
      <div className="repo-card-arrow" style={{ color: isSelected ? accentColor : '#64748B' }}>
        <ChevronRight size={14} />
      </div>
    </motion.button>
  );
}
