import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ExternalLink, 
  Code2, 
  Sparkles, 
  Layers
} from 'lucide-react';
import { 
  Github, 
  ReactIcon, 
  NodeIcon, 
  ExpressIcon, 
  MysqlIcon, 
  MongoIcon, 
  TailwindIcon
} from './Icons';
import ProjectStickyPreview from './ProjectStickyPreview';

const TECH_ICON_MAP = {
  'React': { icon: ReactIcon, color: '#00F0FF' },
  'React.js': { icon: ReactIcon, color: '#00F0FF' },
  'Node.js': { icon: NodeIcon, color: '#22C55E' },
  'Express': { icon: ExpressIcon, color: '#CBD5E1' },
  'Express.js': { icon: ExpressIcon, color: '#CBD5E1' },
  'MySQL': { icon: MysqlIcon, color: '#38BDF8' },
  'MongoDB': { icon: MongoIcon, color: '#4ADE80' },
  'Tailwind CSS': { icon: TailwindIcon, color: '#22D3EE' },
  'Framer Motion': { icon: Sparkles, color: '#C084FC' }
};

export default function ProjectStickyCard({
  project,
  tiltClass = '',
  cardRef,
  onSelect,
  onHoverStart,
  onHoverEnd
}) {
  return (
    <motion.div
      ref={cardRef}
      className={`project-card-3d ${tiltClass}`}
      style={{
        '--card-accent': project.accentColor,
        '--card-glow': project.glowColor,
        '--card-border-glow': project.accentColor
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      tabIndex={0}
      role="article"
      aria-label={`${project.title} — ${project.category}`}
    >
      {/* Top Website UI Application Mockup Frame */}
      <div className="card-preview-frame">
        <ProjectStickyPreview project={project} />
      </div>

      {/* Card Content & Metadata Container */}
      <div className="card-body-meta-container">
        {/* Header Row: Big Numeral + (Category Eyebrow & Title) */}
        <div className="card-header-meta-row">
          <div className="card-numeral-title-group">
            <span 
              className="card-big-numeral"
              style={{ color: project.accentColor }}
            >
              {project.number}
            </span>

            <div className="card-title-stack">
              <span 
                className="card-category-eyebrow"
                style={{ color: project.accentColor }}
              >
                {project.category}
              </span>
              <h3 className="card-main-title">
                {project.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Project Description (Clean 2-line summary matching reference image) */}
        <p className="card-summary-desc">
          {project.description}
        </p>

        {/* Tech Stack Badges Row (Exact pills from reference image) */}
        <div className="card-tech-badges-row">
          {project.technologies.slice(0, 4).map((tech) => {
            const conf = TECH_ICON_MAP[tech] || { icon: Code2, color: project.accentColor };
            const IconComponent = conf.icon;
            return (
              <span key={tech} className="card-tech-pill-item">
                <IconComponent size={12} style={{ color: conf.color }} />
                <span>{tech}</span>
              </span>
            );
          })}
        </div>

        {/* Action Buttons Row: View Code + Live Demo */}
        <div className="card-action-buttons-row">
          {/* 1. Dark Glass Button: View Code */}
          <a
            href={project.githubUrl || 'https://github.com/VIJAY-1326'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-card-action btn-dark-code"
            title="View Source Code on GitHub"
          >
            <Github size={14} />
            <span>View Code</span>
            <ArrowRight size={13} className="btn-arrow-subtle" />
          </a>

          {/* 2. Vibrant Gradient Button: Live Demo */}
          <a
            href={project.liveDemoUrl || project.githubUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-card-action btn-gradient-demo"
            style={{
              background: `linear-gradient(135deg, ${project.accentColor} 0%, ${project.secondaryAccent || '#0072FF'} 100%)`,
              boxShadow: `0 4px 18px ${project.glowColor}`
            }}
            title="Open Live Application or Repository"
            onClick={(e) => {
              if (!project.liveDemoUrl && onSelect) {
                e.preventDefault();
                onSelect(project);
              }
            }}
          >
            <ExternalLink size={13} />
            <span>Live Demo</span>
            <ArrowRight size={13} className="btn-arrow-subtle" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
