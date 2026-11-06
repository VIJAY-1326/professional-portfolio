import React from 'react';
import { motion } from 'framer-motion';
import { Atom, Code2, Globe, Palette, Folder, ChevronRight } from 'lucide-react';

const ICON_MAP = {
  Atom,
  Code2,
  Globe,
  Palette,
  Folder
};

export default function GitHubBranch({
  branch,
  isSelected,
  isExpanded = true,
  repoCount,
  branchAnchorRef,
  onClick
}) {
  const IconComponent = ICON_MAP[branch.iconType] || Folder;

  return (
    <motion.button
      type="button"
      ref={branchAnchorRef}
      className={`github-branch-card ${isSelected ? 'is-active-branch' : ''}`}
      onClick={onClick}
      style={{
        '--branch-accent': branch.accentColor,
        '--branch-glow': branch.glowColor,
        borderColor: isSelected ? branch.accentColor : 'rgba(255, 255, 255, 0.1)',
        boxShadow: isSelected ? `0 0 25px -4px ${branch.glowColor}` : '0 4px 18px -4px rgba(0, 0, 0, 0.5)'
      }}
      whileHover={{ scale: 1.015, x: 2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18 }}
    >
      {/* Left Ingress Connection Point */}
      <span className="branch-connector-point point-left" style={{ backgroundColor: branch.accentColor }} />

      {/* Icon Badge */}
      <div 
        className="branch-icon-box"
        style={{
          color: branch.accentColor,
          backgroundColor: `${branch.accentColor}18`,
          borderColor: `${branch.accentColor}44`
        }}
      >
        <IconComponent size={17} />
      </div>

      {/* Title & Repos Count */}
      <div className="branch-meta">
        <h4 className="branch-name" title={branch.name}>{branch.name}</h4>
        <span className="branch-count-text">
          {repoCount} {repoCount === 1 ? 'Repository' : 'Repositories'}
        </span>
      </div>

      {/* Subtle Expansion Chevron */}
      <motion.span
        className="branch-chevron-indicator"
        animate={{ rotate: isExpanded ? 90 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ color: isSelected ? branch.accentColor : '#64748B', marginLeft: 'auto', paddingLeft: '0.4rem' }}
      >
        <ChevronRight size={14} />
      </motion.span>

      {/* Right Egress Connection Point */}
      <span className="branch-connector-point point-right" style={{ backgroundColor: branch.accentColor }} />
    </motion.button>
  );
}
