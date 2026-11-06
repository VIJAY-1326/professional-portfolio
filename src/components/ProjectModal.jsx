import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github } from './Icons';
import { useTheme } from '../context/ThemeContext';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Server, 
  Database, 
  Cpu, 
  Box, 
  Sparkles, 
  ArrowRight,
  Code2
} from 'lucide-react';
import { EASINGS } from '../utils/animations';

export default function ProjectModal({ project, onClose }) {
  const { theme } = useTheme();
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Close on Escape & Prevent Background Scrolling & Focus restoration
  useEffect(() => {
    if (!project) return;

    previousActiveElement.current = document.activeElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Focus the modal container
    if (modalRef.current) {
      modalRef.current.focus();
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (previousActiveElement.current && previousActiveElement.current.focus) {
        previousActiveElement.current.focus();
      }
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <motion.div 
      key="project-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 250,
        backgroundColor: theme === 'light' ? 'rgba(15, 23, 42, 0.45)' : 'rgba(8, 10, 18, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem'
      }}
      onClick={onClose}
    >
      <motion.div 
        ref={modalRef}
        key="project-modal-dialog"
        className="responsive-modal-dialog"
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        transition={{ duration: 0.28, ease: EASINGS.luxury }}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: theme === 'light'
            ? 'linear-gradient(rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.98)) padding-box, linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(34, 211, 238, 0.35)) border-box'
            : 'linear-gradient(rgba(16, 21, 37, 0.98), rgba(10, 14, 26, 0.98)) padding-box, linear-gradient(135deg, rgba(139, 92, 246, 0.55), rgba(34, 211, 238, 0.5), rgba(232, 213, 181, 0.35)) border-box',
          border: '1px solid transparent',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem',
          position: 'relative',
          boxShadow: theme === 'light'
            ? '0 25px 60px -15px rgba(15, 23, 42, 0.18), 0 0 35px rgba(139, 92, 246, 0.15)'
            : '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 50px -10px rgba(139, 92, 246, 0.35)',
          outline: 'none'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          aria-label="Close Project Modal"
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.08)',
            border: theme === 'light' ? '1px solid rgba(15, 23, 42, 0.12)' : '1px solid rgba(255, 255, 255, 0.16)',
            color: theme === 'light' ? '#0F172A' : '#F5F7FF',
            boxShadow: theme === 'light'
              ? 'inset 0 1px 1.5px #FFFFFF, 0 4px 12px rgba(15, 23, 42, 0.08)'
              : 'inset 0 1px 1.5px rgba(255, 255, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '50%',
            width: '38px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={18} />
        </motion.button>

        {/* Modal Header */}
        <div style={{ marginBottom: '1.75rem', paddingRight: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
            <span 
              style={{ 
                fontSize: '0.78rem', 
                color: theme === 'light' ? '#0891B2' : '#22D3EE', 
                background: theme === 'light' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(34, 211, 238, 0.1)', 
                border: theme === 'light' ? '1px solid rgba(6, 182, 212, 0.25)' : '1px solid rgba(34, 211, 238, 0.25)', 
                padding: '0.25rem 0.75rem', 
                borderRadius: 'var(--radius-full)', 
                fontWeight: 700 
              }}
            >
              {project.badge || 'Featured Production Project'}
            </span>
            <span style={{ color: '#475569' }}>•</span>
            <span style={{ fontSize: '0.85rem', color: theme === 'light' ? '#64748B' : '#A1A9BD' }}>
              {project.category}
            </span>
          </div>

          <h3 
            id="modal-project-title"
            style={{ 
              fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', 
              fontWeight: 800, 
              color: theme === 'light' ? '#0F172A' : '#F5F7FF', 
              lineHeight: 1.25, 
              letterSpacing: '-0.02em',
              marginBottom: '0.65rem'
            }}
          >
            {project.title}
          </h3>

          <p style={{ fontSize: '1.025rem', color: theme === 'light' ? '#475569' : '#cbd5e1', lineHeight: 1.7 }}>
            {project.fullDescription || project.description}
          </p>
        </div>

        {/* Key Architectural Highlights List */}
        <div style={{ marginBottom: '2.25rem' }}>
          <h4 style={{ fontSize: '0.85rem', color: theme === 'light' ? '#64748B' : '#A1A9BD', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.85rem' }}>
            Core System Features & Architecture
          </h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', listStyle: 'none', padding: 0, margin: 0 }}>
            {project.highlights.map((highlight, idx) => (
              <li 
                key={idx}
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '0.65rem', 
                  fontSize: '0.925rem', 
                  color: theme === 'light' ? '#334155' : '#A1A9BD', 
                  lineHeight: 1.6 
                }}
              >
                <CheckCircle2 size={16} style={{ color: '#22D3EE', flexShrink: 0, marginTop: '3px' }} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Used Chips */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h4 style={{ fontSize: '0.85rem', color: theme === 'light' ? '#64748B' : '#A1A9BD', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.85rem' }}>
            Technology Stack
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.technologies.map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: '0.82rem',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  background: theme === 'light' ? 'rgba(139, 92, 246, 0.08)' : 'rgba(139, 92, 246, 0.1)',
                  border: theme === 'light' ? '1px solid rgba(139, 92, 246, 0.25)' : '1px solid rgba(139, 92, 246, 0.25)',
                  color: theme === 'light' ? '#7C3AED' : '#F5F7FF',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Modal Actions */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{ padding: '0.85rem 1.6rem' }}
          >
            <Github size={18} />
            <span>View Source on GitHub</span>
          </motion.a>

          {project.liveDemoUrl && (
            <motion.a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{ padding: '0.85rem 1.6rem' }}
            >
              <ExternalLink size={18} />
              <span>Live Demonstration</span>
            </motion.a>
          )}
        </div>

      </motion.div>
    </motion.div>
  );
}
