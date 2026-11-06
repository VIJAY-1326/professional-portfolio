import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github } from './Icons';
import { 
  Maximize2, 
  CheckCircle2, 
  ShieldCheck, 
  Terminal, 
  Activity, 
  Box, 
  Globe, 
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { EASINGS } from '../utils/animations';
import { use3DTilt } from '../utils/use3DTilt';

const cardRevealVariants = {
  hidden: { 
    opacity: 0, 
    y: 50, 
    scale: 0.96,
    filter: 'blur(4px)'
  },
  visible: (i = 0) => ({
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: 'blur(0px)',
    transition: { 
      duration: 0.75, 
      delay: (i % 2) * 0.14,
      ease: [0.16, 1, 0.3, 1] 
    }
  })
};

export default function ProjectCard({ project, onSelect, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);
  const { tiltProps, glareStyle } = use3DTilt({ maxTilt: 6, perspective: 1100, scale: 1.012 });

  // Render project-specific visual mockup
  const renderPreviewMockup = () => {
    switch (project.previewType) {
      case 'dashboard':
        return (
          <div className="preview-mockup-inner">
            {/* Live Metrics Grid */}
            <div className="preview-metrics-grid">
              <div className="metric-box">
                <span className="metric-lbl">Revenue</span>
                <span className="metric-val text-cyan">$42,850</span>
                <span className="metric-sub text-emerald">+18.4%</span>
              </div>
              <div className="metric-box">
                <span className="metric-lbl">Orders</span>
                <span className="metric-val text-white">1,420</span>
                <span className="metric-sub text-cyan">Real-time</span>
              </div>
              <div className="metric-box">
                <span className="metric-lbl">Docker</span>
                <span className="metric-val text-emerald">99.9%</span>
                <span className="metric-sub text-violet">Port 5005</span>
              </div>
            </div>

            {/* Simulated Live Order Stream */}
            <div className="preview-stream-box">
              <div className="stream-header">
                <span className="font-mono text-muted">active_orders.stream</span>
                <span className="stream-status text-emerald">
                  <span className="pulse-dot bg-emerald" />
                  Live Sync
                </span>
              </div>
              <div className="stream-item">
                <span className="stream-title">Truffle Risotto & Wagyu</span>
                <span className="stream-badge font-mono text-cyan">Kitchen ➔ Delivery</span>
              </div>
            </div>

            {/* Architecture Footer */}
            <div className="preview-arch-footer font-mono">
              <span className="flex items-center gap-1">
                <Box size={11} className="text-cyan-400" />
                <span>docker: client, api, mysql8</span>
              </span>
              <span className="text-muted">REST API v1.2</span>
            </div>
          </div>
        );

      case 'showcase':
        return (
          <div className="preview-mockup-inner">
            <div className="showcase-services-grid">
              <div className="service-card border-cyan">
                <Globe size={13} className="text-cyan-400" />
                <span className="service-title">Digital Strategy</span>
                <span className="service-desc">Modern Web Architecture</span>
              </div>
              <div className="service-card border-violet">
                <Layers size={13} className="text-violet-400" />
                <span className="service-title">Consulting</span>
                <span className="service-desc">Enterprise Operations</span>
              </div>
            </div>

            <div className="showcase-plans-box">
              <span className="plans-label">Featured Commercial Tiers</span>
              <div className="plans-row">
                <span className="plans-text">Starter • Business • Enterprise</span>
                <span className="plans-status font-mono text-cyan">Live on Pages</span>
              </div>
            </div>

            <div className="preview-arch-footer font-mono text-emerald">
              <CheckCircle2 size={11} />
              <span>Fluid CSS Grid • 100% Mobile Responsive</span>
            </div>
          </div>
        );

      case 'workflow':
        return (
          <div className="preview-mockup-inner">
            <div className="workflow-pipeline-box">
              <span className="pipeline-label">Digital Approval Lifecycle</span>
              <div className="pipeline-steps">
                <div className="pipeline-step">
                  <span className="step-circle step-done">✓</span>
                  <span className="step-label">Student</span>
                </div>
                <div className="step-connector gradient-1" />
                <div className="pipeline-step">
                  <span className="step-circle step-done bg-cyan">✓</span>
                  <span className="step-label">Warden</span>
                </div>
                <div className="step-connector gradient-2" />
                <div className="pipeline-step">
                  <span className="step-circle step-pending">3</span>
                  <span className="step-label">Security</span>
                </div>
              </div>
            </div>

            <div className="workflow-pass-card">
              <div>
                <span className="pass-code">PASS #AITAM-2024-884</span>
                <span className="pass-status">Status: Verified for Gate Checkout</span>
              </div>
              <ShieldCheck size={16} className="text-emerald-400" />
            </div>

            <div className="preview-arch-footer font-mono">
              <span>MERN Stack • Zero Institutional Paper Trail</span>
            </div>
          </div>
        );

      case 'portfolio':
      default:
        return (
          <div className="preview-mockup-inner">
            <div className="showcase-services-grid">
              <div className="service-card border-amber">
                <Terminal size={13} className="text-amber-400" />
                <span className="service-title">CSS Custom Engine</span>
                <span className="service-desc">Dark Theme Archetype</span>
              </div>
              <div className="service-card border-violet">
                <Activity size={13} className="text-violet-400" />
                <span className="service-title">Academic Timeline</span>
                <span className="service-desc">Milestone History</span>
              </div>
            </div>

            <div className="showcase-plans-box">
              <span className="plans-label">Foundation Repository</span>
              <span className="plans-text">Initial exploration of responsive layouts & CSS variables</span>
            </div>

            <div className="preview-arch-footer font-mono text-amber">
              <CheckCircle2 size={11} />
              <span>Live on GitHub Pages • Open Source</span>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.article
      {...tiltProps}
      tabIndex={0}
      data-cursor="project"
      aria-label={`${project.title} project card`}
      className="modern-project-card"
      custom={index}
      variants={cardRevealVariants}
      initial="hidden"
      whileInView="visible"
      // Viewport trigger: activates when card enters 20-30% (amount: 0.25)
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -40px 0px" }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: EASINGS.luxury }}
      onMouseEnter={(e) => {
        setIsHovered(true);
        if (tiltProps.onMouseMove) tiltProps.onMouseMove(e);
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        if (tiltProps.onMouseLeave) tiltProps.onMouseLeave(e);
      }}
      style={{
        ...tiltProps.style,
        position: 'relative',
        '--card-accent': project.accentColor,
        '--card-secondary': project.secondaryAccent,
        borderColor: isHovered ? project.accentColor : 'rgba(255, 255, 255, 0.08)',
        boxShadow: isHovered 
          ? `0 22px 50px -10px rgba(0, 0, 0, 0.9), 0 0 30px -4px ${project.accentColor}44` 
          : '0 12px 30px -10px rgba(0, 0, 0, 0.7)'
      }}
    >
      {glareStyle && <div style={glareStyle} />}
      {/* Top 2.5px Gradient Edge Glow */}
      <div 
        className="card-top-accent-line"
        style={{
          background: `linear-gradient(90deg, ${project.accentColor} 0%, ${project.secondaryAccent} 50%, #E8D5B5 100%)`
        }} 
      />

      {/* Card Header Row: [01] • Category • Status */}
      <div className="card-top-meta-row">
        <div className="meta-left-tags">
          <span 
            className="project-index-badge font-mono"
            style={{ 
              color: project.accentColor, 
              backgroundColor: `${project.accentColor}15`,
              borderColor: `${project.accentColor}40`
            }}
          >
            {project.number}
          </span>
          <span className="project-category-tag">{project.category}</span>
        </div>

        <div className="meta-right-status">
          <span 
            className="status-pulse-dot" 
            style={{ 
              backgroundColor: project.liveDemoUrl ? '#10B981' : project.accentColor,
              boxShadow: `0 0 8px ${project.liveDemoUrl ? '#10B981' : project.accentColor}`
            }} 
          />
          <span className="status-label-text">{project.badge || project.status}</span>
        </div>
      </div>

      {/* Embedded Browser/Terminal Mockup Screen */}
      <div className="card-browser-mockup">
        {/* Window Chrome Header Bar */}
        <div className="mockup-chrome-bar">
          <div className="mockup-window-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>

          <div className="mockup-url-pill font-mono">
            {project.liveDemoUrl ? project.liveDemoUrl.replace('https://', '') : `github.com/VIJAY-1326/${project.id}`}
          </div>

          <div className="mockup-spacer" />
        </div>

        {/* Visual Mockup Screen Body */}
        <div className="mockup-screen-body">
          {renderPreviewMockup()}
        </div>
      </div>

      {/* Card Information Body */}
      <div className="card-info-body">
        {/* Title */}
        <h3 className="project-heading-title">
          {project.title}
        </h3>

        {/* Tagline */}
        <div className="project-tagline" style={{ color: project.accentColor }}>
          {project.tagline}
        </div>

        {/* Description */}
        <p className="project-description-paragraph">
          {project.description}
        </p>

        {/* Key Feature Highlights */}
        <div className="project-highlights-list">
          {project.highlights.slice(0, 2).map((hl, i) => (
            <div key={i} className="highlight-row">
              <CheckCircle2 size={13} className="highlight-icon text-cyan" />
              <span>{hl}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Badges */}
        <div className="project-tech-badges-list">
          {project.technologies.slice(0, 6).map((tech) => (
            <span key={tech} className="tech-pill-badge font-mono">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="card-actions-footer">
        {/* Primary CTA: Inspect Architecture / Modal */}
        <motion.button
          type="button"
          className="btn-inspect-architecture"
          onClick={() => onSelect(project)}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: `linear-gradient(135deg, ${project.accentColor} 0%, ${project.secondaryAccent} 100%)`,
            boxShadow: `0 4px 16px -2px ${project.accentColor}66`
          }}
        >
          <Maximize2 size={13} />
          <span>Inspect Architecture</span>
        </motion.button>

        {/* Secondary: GitHub Repo Link */}
        {project.githubUrl && (
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-github-link"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Github size={14} />
            <span>Repository</span>
          </motion.a>
        )}

        {/* Tertiary: Live Demo Link */}
        {project.liveDemoUrl && (
          <motion.a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-live-preview-link"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Live Preview</span>
            <ArrowUpRight size={13} />
          </motion.a>
        )}
      </div>
    </motion.article>
  );
}
