import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github } from './Icons';
import { FolderGit2, Star, GitFork, Layers, ExternalLink } from 'lucide-react';
import GitHubBranch from './GitHubBranch';
import RepositoryCard from './RepositoryCard';
import RepositoryDetails from './RepositoryDetails';
import { GITHUB_USERNAME, GITHUB_PROFILE_URL } from '../data/githubTreeData';

export default function GitHubTree({
  branches,
  selectedRepo,
  onSelectRepo,
  selectedBranchId,
  onSelectBranch
}) {
  const containerRef = useRef(null);
  const rootAnchorRef = useRef(null);
  const branchRefs = useRef({});
  const repoRefs = useRef({});

  // Expansion state for each category branch (all open by default)
  const [expandedBranches, setExpandedBranches] = useState({
    react: true,
    javascript: true,
    webdev: true,
    uiexperiments: true,
    other: true
  });

  const [connectors, setConnectors] = useState({
    rootToBranches: [],
    branchesToRepos: []
  });

  const toggleBranchExpansion = (branch) => {
    setExpandedBranches((prev) => ({
      ...prev,
      [branch.id]: !prev[branch.id]
    }));
    onSelectBranch(branch);
  };

  // Calculate SVG Bezier curve paths between nodes
  const updateConnectorPaths = useCallback(() => {
    if (!containerRef.current || !rootAnchorRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const rootRect = rootAnchorRef.current.getBoundingClientRect();

    if (!containerRect || containerRect.width === 0 || !rootRect || rootRect.width === 0) {
      return;
    }

    const rootPoint = {
      x: rootRect.left - containerRect.left + rootRect.width / 2,
      y: rootRect.top - containerRect.top + rootRect.height / 2
    };

    const newRootToBranches = [];
    const newBranchesToRepos = [];

    branches.forEach((branch) => {
      const branchEl = branchRefs.current[branch.id];
      if (!branchEl) return;

      const branchRect = branchEl.getBoundingClientRect();
      if (!branchRect || branchRect.width === 0) return;

      const branchLeft = {
        x: branchRect.left - containerRect.left,
        y: branchRect.top - containerRect.top + branchRect.height / 2
      };
      const branchRight = {
        x: branchRect.right - containerRect.left,
        y: branchRect.top - containerRect.top + branchRect.height / 2
      };

      // Root -> Branch curve
      const dx1 = branchLeft.x - rootPoint.x;
      if (dx1 > 8) {
        const c1x = rootPoint.x + dx1 * 0.45;
        const c2x = branchLeft.x - dx1 * 0.45;
        const path1 = `M ${rootPoint.x} ${rootPoint.y} C ${c1x} ${rootPoint.y}, ${c2x} ${branchLeft.y}, ${branchLeft.x} ${branchLeft.y}`;

        newRootToBranches.push({
          branchId: branch.id,
          path: path1,
          color: branch.accentColor,
          startX: rootPoint.x,
          startY: rootPoint.y,
          endX: branchLeft.x,
          endY: branchLeft.y,
          isActive: selectedBranchId === branch.id
        });
      }

      // Branch -> Repositories curves (only if branch is expanded)
      if (expandedBranches[branch.id]) {
        (branch.repositories || []).forEach((repo) => {
          const repoEl = repoRefs.current[repo.name];
          if (!repoEl) return;

          const repoRect = repoEl.getBoundingClientRect();
          if (!repoRect || repoRect.width === 0) return;

          const repoLeft = {
            x: repoRect.left - containerRect.left,
            y: repoRect.top - containerRect.top + repoRect.height / 2
          };

          const dx2 = repoLeft.x - branchRight.x;
          if (dx2 > 8) {
            const c1x = branchRight.x + dx2 * 0.45;
            const c2x = repoLeft.x - dx2 * 0.45;
            const path2 = `M ${branchRight.x} ${branchRight.y} C ${c1x} ${branchRight.y}, ${c2x} ${repoLeft.y}, ${repoLeft.x} ${repoLeft.y}`;

            newBranchesToRepos.push({
              repoName: repo.name,
              branchId: branch.id,
              path: path2,
              color: branch.accentColor,
              startX: branchRight.x,
              startY: branchRight.y,
              endX: repoLeft.x,
              endY: repoLeft.y,
              isActive: selectedRepo?.name === repo.name
            });
          }
        });
      }
    });

    setConnectors({
      rootToBranches: newRootToBranches,
      branchesToRepos: newBranchesToRepos
    });
  }, [branches, selectedBranchId, selectedRepo, expandedBranches]);

  useEffect(() => {
    // Initial calculation and listeners
    updateConnectorPaths();
    const handleResize = () => updateConnectorPaths();
    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(() => updateConnectorPaths());
    if (containerRef.current) observer.observe(containerRef.current);

    // Multi-frame debounced timers to guarantee stabilization after Framer Motion layout transitions
    const t1 = setTimeout(updateConnectorPaths, 60);
    const t2 = setTimeout(updateConnectorPaths, 160);
    const t3 = setTimeout(updateConnectorPaths, 320);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [updateConnectorPaths]);

  const currentActiveBranch = branches.find((b) => b.id === selectedBranchId) || branches[0];
  const currentActiveRepos = currentActiveBranch ? currentActiveBranch.repositories || [] : [];

  return (
    <div className="github-explorer-main-canvas" ref={containerRef}>
      {/* ===============================================================
          DESKTOP 3-COLUMN TREE WITH SVG BEZIER CURVES (Visible on > 1024px)
          =============================================================== */}
      <div className="desktop-github-tree-content">
        {/* SVG Connectors Canvas Overlay */}
        <svg className="tree-svg-canvas" aria-hidden="true">
          <defs>
            <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* 1. Root to Branch Category Lines */}
          {connectors.rootToBranches.map((conn) => (
            <g key={`root-${conn.branchId}`}>
              {/* Background track line */}
              <path
                className="connector-track-line"
                d={conn.path}
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Illuminated active path */}
              <motion.path
                d={conn.path}
                stroke={conn.color}
                strokeWidth={conn.isActive ? 2.5 : 1.5}
                strokeOpacity={conn.isActive ? 1 : 0.35}
                fill="none"
                filter={conn.isActive ? 'url(#glow-filter)' : undefined}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              {/* Moving light pulse beam along active branch */}
              {conn.isActive && (
                <motion.path
                  className="connector-pulse-beam"
                  d={conn.path}
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray="12 45"
                  animate={{ strokeDashoffset: [0, -57] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                  filter="url(#glow-filter)"
                />
              )}
              {/* Junction Dots */}
              <circle cx={conn.endX} cy={conn.endY} r="3.5" fill={conn.color} />
              {conn.isActive && (
                <circle cx={conn.endX} cy={conn.endY} r="7" fill={conn.color} fillOpacity="0.3" />
              )}
            </g>
          ))}

          {/* 2. Branch to Repository Lines */}
          {connectors.branchesToRepos.map((conn) => (
            <g key={`repo-${conn.repoName}`}>
              {/* Background track line */}
              <path
                className="connector-track-line"
                d={conn.path}
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Illuminated active path */}
              <motion.path
                d={conn.path}
                stroke={conn.color}
                strokeWidth={conn.isActive ? 2.5 : 1.5}
                strokeOpacity={conn.isActive ? 1 : 0.3}
                fill="none"
                filter={conn.isActive ? 'url(#glow-filter)' : undefined}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />
              {/* Moving light pulse beam to selected repository */}
              {conn.isActive && (
                <motion.path
                  className="connector-pulse-beam"
                  d={conn.path}
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  fill="none"
                  strokeDasharray="10 35"
                  animate={{ strokeDashoffset: [0, -45] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                  filter="url(#glow-filter)"
                />
              )}
              {/* Junction Dots */}
              <circle cx={conn.startX} cy={conn.startY} r="3" fill={conn.color} />
              <circle cx={conn.endX} cy={conn.endY} r="3.5" fill={conn.color} />
              {conn.isActive && (
                <circle cx={conn.endX} cy={conn.endY} r="7" fill={conn.color} fillOpacity="0.35" />
              )}
            </g>
          ))}
        </svg>

        {/* COLUMN 1 (Left): GitHub Root Node & Profile Mini Stats */}
        <div className="github-col-root">
          <div className="root-circle-slot">
            <motion.a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="central-github-root"
              title={`View @${GITHUB_USERNAME} on GitHub`}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="root-circle-halo" />
              <div className="root-circle-core">
                <Github size={32} className="root-github-icon" />
                <span className="root-username">{GITHUB_USERNAME}</span>
                <span className="root-sublabel">GitHub</span>
              </div>
              <span ref={rootAnchorRef} className="root-origin-anchor" />
            </motion.a>
          </div>

          <div className="root-mini-stats-card">
            <div className="mini-stat-row text-cyan">
              <FolderGit2 size={13} />
              <span>7 Repositories</span>
            </div>
            <div className="mini-stat-row text-amber">
              <Star size={13} />
              <span>15+ Stars</span>
            </div>
            <div className="mini-stat-row text-violet">
              <GitFork size={13} />
              <span>8+ Forks</span>
            </div>
            <div className="mini-stat-row text-emerald">
              <Layers size={13} />
              <span>5 Categories</span>
            </div>
          </div>
        </div>

        {/* COLUMN 2 (Middle): Category Branches & Repositories Stack */}
        <div className="github-col-tree">
          {branches.map((branch) => {
            const isBranchActive = selectedBranchId === branch.id;
            const isExpanded = Boolean(expandedBranches[branch.id]);
            const repos = branch.repositories || [];

            return (
              <div key={branch.id} className="tree-branch-cluster-row">
                <div className="cluster-branch-slot">
                  <GitHubBranch
                    branch={branch}
                    isSelected={isBranchActive}
                    isExpanded={isExpanded}
                    repoCount={repos.length}
                    branchAnchorRef={(el) => (branchRefs.current[branch.id] = el)}
                    onClick={() => toggleBranchExpansion(branch)}
                  />
                </div>

                <div className="cluster-repos-slot">
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        className="repos-stack-motion-wrapper"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                      >
                        {repos.map((repo) => (
                          <RepositoryCard
                            key={repo.name}
                            repo={repo}
                            isSelected={selectedRepo?.name === repo.name}
                            onSelect={onSelectRepo}
                            cardAnchorRef={(el) => (repoRefs.current[repo.name] = el)}
                            accentColor={branch.accentColor}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* COLUMN 3 (Right): Dedicated Repository Details Panel */}
        <div className="github-col-details">
          <RepositoryDetails repo={selectedRepo} />
        </div>
      </div>

      {/* ===============================================================
          DEDICATED MOBILE & TABLET GITHUB EXPLORER (Visible on <= 1024px)
          Crystal-clear, easy to understand & 100% responsive
          =============================================================== */}
      <div className="mobile-github-explorer-view">
        {/* 1. Mobile Author Profile & Quick Stat Card */}
        <div className="mobile-github-author-card">
          <div className="mobile-author-left">
            <div className="mobile-octocat-avatar">
              <Github size={22} />
            </div>
            <div className="mobile-author-meta">
              <div className="mobile-author-name">Malla Vijay Sai</div>
              <a 
                href={GITHUB_PROFILE_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mobile-author-handle"
              >
                @{GITHUB_USERNAME}
              </a>
            </div>
          </div>

          <div className="mobile-author-stats">
            <span className="mobile-stat-chip text-cyan">7 Repos</span>
            <span className="mobile-stat-chip text-amber">15+ Stars</span>
          </div>
        </div>

        {/* 2. Mobile Category Selector Pills Bar */}
        <div className="mobile-github-categories-bar" role="tablist">
          {branches.map((branch) => {
            const isBranchActive = selectedBranchId === branch.id;
            const repos = branch.repositories || [];
            return (
              <button
                key={branch.id}
                type="button"
                role="tab"
                aria-selected={isBranchActive}
                className={`mobile-branch-pill ${isBranchActive ? 'is-active' : ''}`}
                style={{
                  '--branch-accent': branch.accentColor,
                  borderColor: isBranchActive ? branch.accentColor : undefined
                }}
                onClick={() => {
                  onSelectBranch(branch);
                  if (repos.length > 0) onSelectRepo(repos[0]);
                }}
              >
                <span 
                  className="mobile-branch-dot" 
                  style={{ backgroundColor: branch.accentColor }} 
                />
                <span className="mobile-branch-name">{branch.name}</span>
                <span className="mobile-branch-count">({repos.length})</span>
              </button>
            );
          })}
        </div>

        {/* 3. Repositories List for Active Category */}
        <div className="mobile-github-repos-section">
          <div className="mobile-repos-header">
            <span className="mobile-repos-label">
              Category: <strong style={{ color: currentActiveBranch?.accentColor || '#0284C7' }}>{currentActiveBranch?.name || 'Repositories'}</strong>
            </span>
            <span className="mobile-repos-count-badge">
              {currentActiveRepos.length} Repos
            </span>
          </div>

          <div className="mobile-repos-cards-grid">
            {currentActiveRepos.map((repo) => {
              const repoUrl = repo.html_url || `https://github.com/${GITHUB_USERNAME}/${repo.name}`;
              return (
                <a
                  key={repo.name}
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-repo-card-box"
                  style={{
                    textDecoration: 'none'
                  }}
                  title={`View ${repo.name} on GitHub`}
                >
                  <div className="mobile-repo-card-top">
                    <div className="mobile-repo-title-wrap">
                      <Github size={15} style={{ color: currentActiveBranch?.accentColor || '#0284C7' }} />
                      <h4 className="mobile-repo-name">{repo.name}</h4>
                    </div>
                    <span className="mobile-repo-visibility-pill">
                      {repo.visibility || 'Public'}
                    </span>
                  </div>

                  <p className="mobile-repo-desc">
                    {repo.description || `Source code repository for ${repo.name}.`}
                  </p>

                  <div className="mobile-repo-card-bottom">
                    <div className="mobile-repo-tags">
                      <span className="mobile-repo-lang">
                        <span className="lang-color-dot" style={{ backgroundColor: currentActiveBranch?.accentColor || '#0284C7' }} />
                        {repo.language || 'Code'}
                      </span>
                      <span className="mobile-repo-metric">
                        <Star size={12} className="text-amber" />
                        {repo.stargazers_count ?? 12}
                      </span>
                      <span className="mobile-repo-metric">
                        <GitFork size={12} className="text-cyan" />
                        {repo.forks_count ?? 3}
                      </span>
                    </div>

                    <span 
                      className="mobile-repo-view-prompt" 
                      style={{ 
                        color: currentActiveBranch?.accentColor || '#0284C7',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>Open</span>
                      <ExternalLink size={12} />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
