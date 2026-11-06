import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { Github, Linkedin } from './Icons';
import HeroPhoto3D from './HeroPhoto3D';
import './Hero.css';
import { 
  ArrowRight, 
  FileText, 
  Sparkles, 
  MapPin, 
  Mail, 
  Layers, 
  Database,
  ExternalLink,
  Code2
} from 'lucide-react';

export default function Hero({ onOpenResumeModal }) {
  const coreTags = [
    { name: 'React', color: '#22D3EE' },
    { name: 'Node.js', color: '#10B981' },
    { name: 'Express', color: '#8B5CF6' },
    { name: 'MySQL', color: '#38BDF8' },
    { name: 'Docker', color: '#60A5FA' },
    { name: 'JavaScript', color: '#FACC15' }
  ];

  return (
    <section id="hero" className="hero-unique-section">
      {/* Dynamic ambient optical lighting */}
      <div className="hero-optics-glow optics-cyan" aria-hidden="true" />
      <div className="hero-optics-glow optics-violet" aria-hidden="true" />

      <div className="container hero-unique-container">
        <div className="hero-unique-grid">
          
          {/* ================= Left: Bespoke Typographic Column ================= */}
          <motion.div 
            className="hero-copy-column"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Live Availability Badge */}
            <div className="hero-live-beacon">
              <span className="beacon-pulse-ring">
                <span className="beacon-core-dot" />
              </span>
              <span className="beacon-title">Available for Roles & Internships</span>
              <span className="beacon-sep">/</span>
              <span className="beacon-college">AITAM '28</span>
            </div>

            {/* Signature Headline */}
            <h1 className="hero-signature-heading">
              <span className="heading-pre">Hi, I'm</span>
              <span className="heading-name-gradient">{personalInfo.name}</span>
              <span className="heading-role">Full-Stack & Frontend Developer</span>
            </h1>

            {/* Clean, Impactful Narrative Bio */}
            <p className="hero-refined-bio">
              Undergraduate Data Science student at <strong className="bio-highlight">AITAM</strong>. I engineer scalable, high-performance web systems and decoupled backends with <strong className="bio-highlight">React, Node.js, Express & MySQL</strong>.
            </p>

            {/* Modern Linear Metric Ribbon */}
            <div className="hero-metric-ribbon">
              <div className="ribbon-unit">
                <span className="ribbon-value">04+</span>
                <span className="ribbon-label">Full-Stack Apps</span>
              </div>
              <div className="ribbon-divider" />
              <div className="ribbon-unit">
                <span className="ribbon-value">24+</span>
                <span className="ribbon-label">GitHub Repos</span>
              </div>
              <div className="ribbon-divider" />
              <div className="ribbon-unit">
                <span className="ribbon-value">MERN</span>
                <span className="ribbon-label">+ MySQL & Docker</span>
              </div>
            </div>

            {/* Streamlined Action CTAs (No Intro Button) */}
            <div className="hero-actions-cluster">
              <a href="#projects" className="hero-cta-main">
                <span>Explore Work</span>
                <ArrowRight size={16} className="cta-arrow" />
              </a>

              <button 
                type="button" 
                onClick={onOpenResumeModal} 
                className="hero-cta-outline"
              >
                <FileText size={16} />
                <span>Resume</span>
              </button>

              {/* Connected Socials */}
              <div className="hero-social-dock">
                <a 
                  href={personalInfo.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-pill-btn"
                  aria-label="GitHub"
                  title="GitHub: VIJAY-1326"
                >
                  <Github size={17} />
                </a>

                <a 
                  href={personalInfo.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-pill-btn"
                  aria-label="LinkedIn"
                  title="LinkedIn: Vijay Sai Malla"
                >
                  <Linkedin size={17} />
                </a>

                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="social-pill-btn"
                  aria-label="Email"
                  title={personalInfo.email}
                >
                  <Mail size={17} />
                </a>
              </div>
            </div>

            {/* Minimalist Tech Badges Strip */}
            <div className="hero-tech-row">
              <span className="tech-row-caption">Core Stack</span>
              <div className="tech-chips-group">
                {coreTags.map((t) => (
                  <span key={t.name} className="tech-micro-chip">
                    <span className="chip-color-dot" style={{ backgroundColor: t.color }} />
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>

          {/* ================= Right: Interactive 3D WebGL Holographic Portal (Zero Text Overlays) ================= */}
          <motion.div 
            className="hero-visual-column"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroPhoto3D />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
