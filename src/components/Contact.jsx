import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { Github, Linkedin, Instagram } from './Icons';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  MessageSquare, 
  MapPin, 
  Send, 
  Copy, 
  Check, 
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  User,
  FileText
} from 'lucide-react';
import { fadeInUp, defaultViewport, EASINGS } from '../utils/animations';
import './Contact.css';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [activeTopic, setActiveTopic] = useState('');
  const [submittedStatus, setSubmittedStatus] = useState(false);

  const topicPresets = [
    'Software Internship',
    'Full-Stack Project',
    'Hackathon Collaboration',
    'General Inquiry'
  ];

  const handleTopicClick = (topic) => {
    setActiveTopic(topic);
    setFormData((prev) => ({ ...prev, subject: topic }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#00F0FF', '#8B5CF6', '#EC4899']
      });
    } catch {
      // Fallback
    }

    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Compose mailto link with prefilled form details
    const mailtoSubject = encodeURIComponent(formData.subject || `Portfolio Inquiry from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Hello Vijay Sai,\n\nName: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.subject || 'Direct Contact'}\n\nMessage:\n${formData.message}`
    );

    try {
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#00F0FF', '#0072FF', '#8B5CF6', '#10B981']
      });
    } catch {
      // Fallback
    }

    window.open(`mailto:${personalInfo.email}?subject=${mailtoSubject}&body=${mailtoBody}`, '_blank');
    
    setSubmittedStatus(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setActiveTopic('');

    setTimeout(() => {
      setSubmittedStatus(false);
    }, 6000);
  };

  return (
    <section id="contact" className="contact-futuristic-section">
      {/* Ambient Deep Nebula Lighting Orbs */}
      <div className="contact-ambient-orb orb-cyan" aria-hidden="true" />
      <div className="contact-ambient-orb orb-violet" aria-hidden="true" />
      <div className="contact-ambient-orb orb-magenta" aria-hidden="true" />

      {/* =================================================================
          Section Header
          ================================================================= */}
      <div className="contact-header-container">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          {/* Outlined Pill Badge with Cinematic Marker */}
         

          {/* Centered Heading */}
          <h2 className="contact-main-title">
            Let's Build Something <span className="gradient-contact-word">Extraordinary Together</span>
          </h2>

          {/* Subtitle */}

        </motion.div>
      </div>

      {/* =================================================================
          Main Grid Layout: Left Direct Channels + Right Transmission Form
          ================================================================= */}
      <div className="contact-main-container">
        <div className="contact-layout-grid">
          
          {/* =============================================================
              Left Column: Holographic Direct Channels
              ============================================================= */}
          <motion.div 
            className="channels-card-glass"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {/* Cyber Corner HUD Brackets */}
            <div className="hud-corner-bracket bracket-tl" aria-hidden="true" />
            <div className="hud-corner-bracket bracket-tr" aria-hidden="true" />
            <div className="hud-corner-bracket bracket-bl" aria-hidden="true" />
            <div className="hud-corner-bracket bracket-br" aria-hidden="true" />

            {/* Availability Status Bar */}
            <div className="channels-status-bar">
              <div className="online-radar-pill">
                <span className="radar-ping-dot" />
                <span>ONLINE // DIRECT TRANSMISSION</span>
              </div>
              <span className="response-sla-tag">TYPICAL RESPONSE: &lt; 12 HRS</span>
            </div>

            <h3 className="channels-heading">
              Direct Communication Channels
            </h3>
            <p className="channels-description">
              Initiate contact via official email, instant WhatsApp chat, or connect directly on GitHub and LinkedIn.
            </p>

            {/* Direct Channel Rows */}
            <div className="channel-rows-stack">
              
              {/* 1. Email Channel Tile */}
              <div 
                className="channel-item-tile"
                style={{
                  '--tile-accent': '#8B5CF6',
                  '--tile-glow': 'rgba(139, 92, 246, 0.3)',
                  '--tile-bg': 'rgba(139, 92, 246, 0.12)',
                  '--tile-border': 'rgba(139, 92, 246, 0.3)'
                }}
              >
                <div className="channel-left-meta">
                  <div className="channel-icon-avatar">
                    <Mail size={20} />
                  </div>
                  <div className="channel-text-group">
                    <span className="channel-eyebrow-label">OFFICIAL EMAIL</span>
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      className="channel-primary-val"
                      title="Send direct email"
                    >
                      {personalInfo.email}
                    </a>
                    <span className="channel-sub-caption">Primary business & engineering inbox</span>
                  </div>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCopyEmail}
                  className={`channel-action-btn ${copiedEmail ? 'is-copied' : ''}`}
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedEmail ? 'Copied!' : 'Copy'}</span>
                </motion.button>
              </div>

              {/* 2. WhatsApp / Mobile Channel Tile */}
              <div 
                className="channel-item-tile"
                style={{
                  '--tile-accent': '#00F0FF',
                  '--tile-glow': 'rgba(0, 240, 255, 0.3)',
                  '--tile-bg': 'rgba(0, 240, 255, 0.12)',
                  '--tile-border': 'rgba(0, 240, 255, 0.3)'
                }}
              >
                <div className="channel-left-meta">
                  <div className="channel-icon-avatar">
                    <MessageSquare size={20} />
                  </div>
                  <div className="channel-text-group">
                    <span className="channel-eyebrow-label">WHATSAPP / MOBILE</span>
                    <span className="channel-primary-val">
                      {personalInfo.phone}
                    </span>
                    <span className="channel-sub-caption">Instant messaging & direct calls</span>
                  </div>
                </div>

                <motion.a
                  href={personalInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="channel-action-btn"
                  title="Start instant WhatsApp conversation"
                >
                  <span>Chat</span>
                  <ArrowUpRight size={13} />
                </motion.a>
              </div>

              {/* 3. Location & Campus Tile */}
              <div 
                className="channel-item-tile"
                style={{
                  '--tile-accent': '#F59E0B',
                  '--tile-glow': 'rgba(245, 158, 11, 0.3)',
                  '--tile-bg': 'rgba(245, 158, 11, 0.12)',
                  '--tile-border': 'rgba(245, 158, 11, 0.3)'
                }}
              >
                <div className="channel-left-meta">
                  <div className="channel-icon-avatar">
                    <MapPin size={20} />
                  </div>
                  <div className="channel-text-group">
                    <span className="channel-eyebrow-label">CAMPUS & RESIDENCE</span>
                    <span className="channel-primary-val">
                      Tekkali, Srikakulam, AP, India
                    </span>
                    <span className="channel-sub-caption">Aditya Institute of Tech & Management (AITAM)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Social Networks Dock */}
            <div className="social-networks-dock">
              <span className="social-dock-title">VERIFIED PROFESSIONAL NETWORKS</span>
              <div className="social-dock-grid">
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-dock-item linkedin"
                  title="Connect on LinkedIn"
                >
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-dock-item github"
                  title="Inspect repositories on GitHub"
                >
                  <Github size={18} />
                  <span>GitHub</span>
                </a>

                <a
                  href={personalInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-dock-item instagram"
                  title="View on Instagram"
                >
                  <Instagram size={18} />
                  <span>Instagram</span>
                </a>
              </div>
            </div>

          </motion.div>

          {/* =============================================================
              Right Column: Cybernetic Direct Transmission Terminal Form
              ============================================================= */}
          <motion.div 
            className="transmission-card-glass"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {/* Cyber Corner HUD Brackets */}
            <div className="hud-corner-bracket bracket-tl" aria-hidden="true" />
            <div className="hud-corner-bracket bracket-tr" aria-hidden="true" />
            <div className="hud-corner-bracket bracket-bl" aria-hidden="true" />
            <div className="hud-corner-bracket bracket-br" aria-hidden="true" />

            {/* Form Top Bar */}
            <div className="transmission-top-bar">
              <span className="transmission-eyebrow">
                <Send size={13} />
                <span>DIRECT TRANSMISSION PROTOCOL</span>
              </span>
              <span className="terminal-mode-pill">STATUS // READY</span>
            </div>

            <h3 className="transmission-heading">
              Send a Direct Message
            </h3>
            <p className="transmission-subcaption">
              Fill out the parameters below. Transmitting will immediately pre-fill your default email application.
            </p>

            {/* Quick Topic Preset Chips */}
            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748B', fontFamily: 'var(--font-mono, monospace)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.45rem' }}>
                SELECT TOPIC PRESET
              </span>
              <div className="quick-topic-pills-row">
                {topicPresets.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => handleTopicClick(topic)}
                    className={`quick-topic-pill ${activeTopic === topic ? 'is-active' : ''}`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Success Feedback Banner */}
            <AnimatePresence>
              {submittedStatus && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: EASINGS.luxury }}
                  className="transmission-success-banner"
                >
                  <CheckCircle2 size={18} style={{ flexShrink: 0 }} />
                  <span>Email client initiated with prefilled transmission. Thank you for connecting!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="transmission-form">
              
              {/* Field 1: Name */}
              <div className="form-field-group">
                <label className="form-field-label">
                  <span>Your Full Name<span className="field-required-asterisk">*</span></span>
                </label>
                <div className="input-container-shell">
                  <User size={16} className="input-field-icon" />
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="transmission-input-box"
                  />
                </div>
              </div>

              {/* Field 2: Email */}
              <div className="form-field-group">
                <label className="form-field-label">
                  <span>Email Address<span className="field-required-asterisk">*</span></span>
                </label>
                <div className="input-container-shell">
                  <Mail size={16} className="input-field-icon" />
                  <input 
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="transmission-input-box"
                  />
                </div>
              </div>

              {/* Field 3: Subject */}
              <div className="form-field-group">
                <label className="form-field-label">
                  <span>Subject / Inquiry</span>
                </label>
                <div className="input-container-shell">
                  <FileText size={16} className="input-field-icon" />
                  <input 
                    type="text"
                    placeholder="Software Internship / Project Collaboration"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="transmission-input-box"
                  />
                </div>
              </div>

              {/* Field 4: Message */}
              <div className="form-field-group">
                <label className="form-field-label">
                  <span>Message Payload<span className="field-required-asterisk">*</span></span>
                </label>
                <div className="input-container-shell">
                  <MessageSquare size={16} className="input-field-icon textarea-icon-top" />
                  <textarea 
                    required
                    rows={4}
                    placeholder="Describe your engineering inquiry, project scope, or opportunity..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="transmission-textarea-box"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button 
                type="submit" 
                className="btn-transmit-submit"
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.2 }}
              >
                <span>Transmit Message via Mail Client</span>
                <Send size={16} className="submit-arrow-icon" />
              </motion.button>

            </form>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
