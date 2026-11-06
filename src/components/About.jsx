import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { 
  User, 
  GraduationCap, 
  MapPin, 
  Sparkles, 
  Layers, 
  Code2, 
  ArrowRight, 
  ArrowUpRight, 
  FileText, 
  Terminal, 
  ShieldCheck 
} from 'lucide-react';
import { fadeInUp, slideInLeft, slideInRight, defaultViewport } from '../utils/animations';
import './About.css';

export default function About({ onOpenResumeModal }) {
  // Toggle between Rich Narrative View and Interactive Developer JSON Spec
  const [activeView, setActiveView] = useState('story'); // 'story' | 'spec'

  // Developer JSON Specification Preview
  const jsonSpec = {
    engineer: "Malla Vijay Sai",
    role: "Full-Stack Web Developer",
    academicStatus: "Undergraduate (B.Tech Data Science '28)",
    institution: "Aditya Institute of Technology and Management (AITAM)",
    location: "Tekkali, Andhra Pradesh, India",
    coreArchitecture: [
      "Decoupled REST Services",
      "Normalized Relational Schemas",
      "Modular Component Systems",
      "Dockerized Application Environments"
    ],
    flagshipSystems: [
      { name: "Restaura", stack: "React, Node.js, Express, MySQL, Docker" },
      { name: "Hostel Outpass", stack: "Full-Stack Web Automation & Permissions" }
    ],
    availability: "Immediate consideration for internships & software roles"
  };

  return (
    <section id="about" className="about-unique-section">
      {/* Ambient Optical Lighting */}
      <div className="about-optics-glow optics-cyan" aria-hidden="true" />
      <div className="about-optics-glow optics-violet" aria-hidden="true" />

      <div className="container about-unique-container">
        
        {/* Section Header */}
        <motion.div 
          className="about-unique-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          

          <h2 className="about-unique-title">
            Architecting Scalable Systems & <span className="gradient-text-accent">Fluid Interfaces</span>
          </h2>

      
        </motion.div>

        {/* =====================================================================
            Upper Bento: Main Identity Console + Telemetry Dashboard
            ===================================================================== */}
        <div className="about-bento-upper-grid">
          
          {/* Left Large Bento: Interactive Developer Console */}
          <motion.div 
            className="about-console-card"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {/* Terminal Window Header Bar */}
            <div className="console-window-bar">
              <div className="console-window-dots">
                <span className="window-dot dot-red" />
                <span className="window-dot dot-yellow" />
                <span className="window-dot dot-green" />
                <span className="console-file-path">vijay@aitam:~/profile/spec.json</span>
              </div>

              {/* View Switcher Controls */}
              <div className="console-view-toggles" role="tablist">
                <button 
                  type="button"
                  className={`console-tab-btn ${activeView === 'story' ? 'is-active' : ''}`}
                  onClick={() => setActiveView('story')}
                  role="tab"
                  aria-selected={activeView === 'story'}
                >
                  <User size={13} />
                  <span>Story</span>
                </button>
                <button 
                  type="button"
                  className={`console-tab-btn ${activeView === 'spec' ? 'is-active' : ''}`}
                  onClick={() => setActiveView('spec')}
                  role="tab"
                  aria-selected={activeView === 'spec'}
                >
                  <Code2 size={13} />
                  <span>JSON Spec</span>
                </button>
              </div>
            </div>

            {/* Console Body Content (Animated Switcher) */}
            <div className="console-body-content">
              <AnimatePresence mode="wait">
                {activeView === 'story' ? (
                  <motion.div 
                    key="story-view"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="console-story-pane"
                  >
                    {/* Live Status Row */}
                    <div className="console-status-strip">
                      <span className="status-radar-ring">
                        <span className="status-radar-core" />
                      </span>
                      <span className="status-label">OPEN FOR SOFTWARE ROLES & INTERNSHIPS</span>
                      <span className="status-badge-code">AITAM '28</span>
                    </div>

                    <h3 className="console-heading">
                      Hi, I'm <span className="text-gradient-cyan">{personalInfo.name}</span>
                    </h3>

                    <div className="console-narrative-paragraphs">
                      <p>
                        I am an undergraduate student at <strong className="text-strong">Aditya Institute of Technology and Management (AITAM)</strong> in Tekkali, pursuing my B.Tech in <strong className="text-strong">Data Science (2024–2028)</strong>.
                      </p>
                      <p>
                        My focus is engineering robust, production-grade applications rather than static prototypes. Through platforms like <strong className="text-strong">Restaura</strong> (a full-stack restaurant management system built with React, Node.js, Express, MySQL, and Docker) and the institutional <strong className="text-strong">Hostel Outpass</strong> automation system, I solve concrete operational challenges with clean, testable code.
                      </p>
                    </div>

                    {/* Architectural Spec Matrix Chips */}
                    <div className="console-specs-matrix">
                      <div className="spec-matrix-tile">
                        <GraduationCap size={15} className="spec-tile-icon" />
                        <div className="spec-tile-details">
                          <span className="spec-tile-label">Academic Program</span>
                          <span className="spec-tile-value">B.Tech Data Science (2024–28)</span>
                        </div>
                      </div>

                      <div className="spec-matrix-tile">
                        <MapPin size={15} className="spec-tile-icon" />
                        <div className="spec-tile-details">
                          <span className="spec-tile-label">Campus Base</span>
                          <span className="spec-tile-value">Tekkali, Andhra Pradesh</span>
                        </div>
                      </div>

                      <div className="spec-matrix-tile">
                        <Sparkles size={15} className="spec-tile-icon" />
                        <div className="spec-tile-details">
                          <span className="spec-tile-label">Flagship System</span>
                          <span className="spec-tile-value">Restaura (Full-Stack)</span>
                        </div>
                      </div>

                      <div className="spec-matrix-tile">
                        <Layers size={15} className="spec-tile-icon" />
                        <div className="spec-tile-details">
                          <span className="spec-tile-label">Primary Stack</span>
                          <span className="spec-tile-value">React • Node • MySQL • Docker</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="spec-view"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="console-spec-pane"
                  >
                    <pre className="console-code-block">
                      <code>{JSON.stringify(jsonSpec, null, 2)}</code>
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom Actions Cluster */}
            <div className="console-footer-actions">
              <button
                type="button"
                onClick={onOpenResumeModal}
                className="console-action-btn-primary"
              >
                <FileText size={16} />
                <span>View Full Resume</span>
                <ArrowRight size={15} className="btn-arrow" />
              </button>

              <a href="#projects" className="console-action-btn-secondary">
                <span>Explore Projects</span>
                <ArrowUpRight size={15} />
              </a>

              <a href="#education" className="console-academic-pill">
                <GraduationCap size={14} />
                <span>AITAM Education</span>
              </a>
            </div>
          </motion.div>

          {/* Right Bento: Telemetry Dashboard & Verified Track Record */}
          <motion.div 
            className="about-telemetry-col"
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {/* Live Telemetry Panel */}
            <div className="telemetry-dashboard-card">
              <div className="telemetry-card-top">
                <div className="telemetry-badge">
                  <span className="telemetry-dot-pulse" />
                  <span>VERIFIED TRACK RECORD</span>
                </div>
                <span className="telemetry-timestamp">2026 AUDITED</span>
              </div>

              <div className="telemetry-metrics-grid">
                {/* Metric 1 */}
                <div className="telemetry-metric-tile">
                  <div className="metric-header-row">
                    <span className="metric-indicator dot-cyan" />
                    <span className="metric-tag">PRODUCTION</span>
                  </div>
                  <div className="metric-hero-val">04+</div>
                  <div className="metric-label">Full-Stack Systems</div>
                  <div className="metric-caption">Shipped with React, Node.js & MySQL</div>
                </div>

                {/* Metric 2 */}
                <div className="telemetry-metric-tile">
                  <div className="metric-header-row">
                    <span className="metric-indicator dot-violet" />
                    <span className="metric-tag">OPEN SOURCE</span>
                  </div>
                  <div className="metric-hero-val">24+</div>
                  <div className="metric-label">GitHub Repositories</div>
                  <div className="metric-caption">Verified public code & commits</div>
                </div>

                {/* Metric 3 */}
                <div className="telemetry-metric-tile">
                  <div className="metric-header-row">
                    <span className="metric-indicator dot-amber" />
                    <span className="metric-tag">DEMOS & DEFENSES</span>
                  </div>
                  <div className="metric-hero-val">10+</div>
                  <div className="metric-label">Technical Presentations</div>
                  <div className="metric-caption">Project showcases & architecture demos</div>
                </div>

                {/* Metric 4 */}
                <div className="telemetry-metric-tile">
                  <div className="metric-header-row">
                    <span className="metric-indicator dot-emerald" />
                    <span className="metric-tag">EXCELLENCE</span>
                  </div>
                  <div className="metric-hero-val">9.15</div>
                  <div className="metric-label">Academic CGPA</div>
                  <div className="metric-caption">B.Tech Data Science honor tier</div>
                </div>
              </div>

              {/* Verified System Assurance Footer */}
              <div className="telemetry-assurance-strip">
                <ShieldCheck size={16} className="assurance-icon" />
                <span>Zero Tutorial Clones • 100% Real-World Engineered Solutions</span>
              </div>
            </div>

            {/* AITAM Academic Fast-Link Card */}
            <a href="#education" className="about-aitam-banner">
              <div className="aitam-banner-content">
                <div className="aitam-crest-icon">
                  <GraduationCap size={22} />
                </div>
                <div className="aitam-text-col">
                  <div className="aitam-univ-name">Aditya Institute of Technology & Management</div>
                  <div className="aitam-deg-batch">B.Tech Data Science • Batch of 2024 – 2028</div>
                </div>
              </div>
              <div className="aitam-action-arrow">
                <span>View Timeline</span>
                <ArrowUpRight size={15} />
              </div>
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
