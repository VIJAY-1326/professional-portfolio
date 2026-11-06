import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { Github, Linkedin, Instagram } from './Icons';
import { 
  Code2, 
  ArrowUp, 
  Mail,
  Sparkles
} from 'lucide-react';
import { fadeInUp, defaultViewport, EASINGS } from '../utils/animations';

export default function Footer({ onPlayIntro }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer 
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      style={{ 
        borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))', 
        background: 'var(--bg-main, #080A12)',
        paddingTop: '4.5rem',
        paddingBottom: '2.75rem',
        position: 'relative'
      }}
    >
      <div className="container">
        
        {/* Top Footer Section */}
        <div 
          className="footer-top-row"
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '2.5rem',
            paddingBottom: '3.25rem',
            borderBottom: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.06))'
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(34, 211, 238, 0.2) 100%)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan, #22D3EE)'
                }}
              >
                <Code2 size={20} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary, #F5F7FF)' }}>
                {personalInfo.name}
              </span>
            </div>
            
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary, #A1A9BD)', maxWidth: '440px', lineHeight: 1.6 }}>
              Full-Stack & Frontend Developer • B.Tech Data Science student at Aditya Institute of Technology and Management (AITAM).
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <motion.a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'var(--bg-card, rgba(255, 255, 255, 0.04))',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.09))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary, #F5F7FF)',
                textDecoration: 'none'
              }}
            >
              <Github size={18} />
            </motion.a>

            <motion.a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'var(--bg-card, rgba(255, 255, 255, 0.04))',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.09))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary, #F5F7FF)',
                textDecoration: 'none'
              }}
            >
              <Linkedin size={18} />
            </motion.a>

            <motion.a
              href={personalInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'var(--bg-card, rgba(255, 255, 255, 0.04))',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.09))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary, #F5F7FF)',
                textDecoration: 'none'
              }}
            >
              <Instagram size={18} />
            </motion.a>

            <motion.a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'var(--bg-card, rgba(255, 255, 255, 0.04))',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.09))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary, #F5F7FF)',
                textDecoration: 'none'
              }}
            >
              <Mail size={18} />
            </motion.a>

            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              title="Back to Top"
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'var(--bg-card, rgba(139, 92, 246, 0.12))',
                border: '1px solid var(--border-glow, rgba(139, 92, 246, 0.35))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-violet, #c4b5fd)',
                cursor: 'pointer',
                marginLeft: '0.85rem'
              }}
            >
              <ArrowUp size={18} />
            </motion.button>
          </div>
        </div>

        {/* Bottom Navigation Links & Copyright */}
        <div 
          className="footer-bottom-row"
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '1.5rem',
            paddingTop: '2rem',
            fontSize: '0.84rem',
            color: 'var(--text-secondary, #A1A9BD)'
          }}
        >
          <div>
            © {new Date().getFullYear()} {personalInfo.name}. All verified projects & rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a 
              href="#hero" 
              style={{ color: 'var(--text-secondary, #A1A9BD)', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent-cyan, #22D3EE)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary, #A1A9BD)'}
            >
              Home
            </a>
            <a 
              href="#projects" 
              style={{ color: 'var(--text-secondary, #A1A9BD)', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent-cyan, #22D3EE)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary, #A1A9BD)'}
            >
              Projects
            </a>
            <a 
              href="#skills" 
              style={{ color: 'var(--text-secondary, #A1A9BD)', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent-cyan, #22D3EE)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary, #A1A9BD)'}
            >
              Skills
            </a>
            <a 
              href="#education" 
              style={{ color: 'var(--text-secondary, #A1A9BD)', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent-cyan, #22D3EE)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary, #A1A9BD)'}
            >
              Education
            </a>
            <a 
              href="#contact" 
              style={{ color: 'var(--text-secondary, #A1A9BD)', textDecoration: 'none', transition: 'color 0.2s ease' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent-cyan, #22D3EE)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary, #A1A9BD)'}
            >
              Contact
            </a>
          </div>
        </div>

      </div>
    </motion.footer>
  );
}