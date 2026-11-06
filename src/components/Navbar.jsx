import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { 
  Menu, 
  X, 
  FileText, 
  Sun, 
  Moon, 
  Code2, 
  User, 
  FolderGit2, 
  GraduationCap, 
  Mail,
  Layers,
  ArrowUpRight,
  Droplet
} from 'lucide-react';
import './Navbar.css';

// Liquid water drop cascade entrance for each letter in "vijaysai"
const letterDropVariants = {
  hidden: { opacity: 0, y: -16, scaleY: 1.35, scaleX: 0.85 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scaleY: 1,
    scaleX: 1,
    transition: {
      delay: 0.15 + i * 0.045,
      type: 'spring',
      damping: 14,
      stiffness: 320
    }
  })
};

export default function Navbar({ onOpenResumeModal }) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track scroll position for glassmorphism blur and active section indicator
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'projects', 'skills', 'github', 'education', 'contact'];
      const scrollPosition = window.scrollY + 140;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about', icon: User },
    { name: 'Projects', href: '#projects', id: 'projects', icon: FolderGit2 },
    { name: 'Skills', href: '#skills', id: 'skills', icon: Layers },
    { name: 'GitHub', href: '#github', id: 'github', icon: Code2 },
    { name: 'Education', href: '#education', id: 'education', icon: GraduationCap },
    { name: 'Contact', href: '#contact', id: 'contact', icon: Mail }
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`luxury-navbar-root ${scrolled ? 'is-scrolled' : ''}`}
    >
      <div className="container luxury-navbar-container">
        
        {/* ================= 1. Signature Glassmorphic Liquid Drops Branding ================= */}
        <motion.a 
          href="#hero" 
          className="liquid-glass-brand-pill"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          title="Vijay Sai — Full Stack Engineer Portfolio"
        >
          {/* Sweeping Liquid Light Sheen */}
          <div className="liquid-glass-sheen" aria-hidden="true" />

          {/* Morphing Liquid Droplet Orb */}
          <div className="liquid-drop-orb" aria-hidden="true">
            <span className="orb-specular-glint" />
            <span className="orb-sub-glint" />
            <Droplet size={17} className="orb-icon-inner" />
          </div>

          {/* Liquid Drops Stream Name */}
          <div className="liquid-name-wrapper">
            <div className="liquid-letters-stream">
              {['v', 'i', 'j', 'a', 'y', 's', 'a', 'i'].map((char, i) => (
                <motion.span 
                  key={i} 
                  custom={i}
                  variants={letterDropVariants}
                  initial="hidden"
                  animate="visible"
                  className={`liquid-char ${i >= 5 ? 'is-accent' : ''}`}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Glowing Micro Dewdrop Beads */}
            <span className="floating-dewdrop" aria-hidden="true" />
            <span className="floating-dewdrop-micro" aria-hidden="true" />

            {/* Dev Pill Badge */}
            <span className="liquid-tag-badge">
              <span className="badge-dot" />
              .dev
            </span>
          </div>
        </motion.a>

        {/* ================= 2. Central Floating Navigation Links ================= */}
        <nav className="navbar-links-dock" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`navbar-nav-pill ${isActive ? 'is-active' : ''}`}
              >
                <span>{link.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbarActiveIndicator"
                    className="navbar-active-glow-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* ================= 3. Right Utility Actions Cluster (Zero Intro Button) ================= */}
        <div className="navbar-actions-cluster">
          
          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="navbar-theme-btn"
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
          >
            {theme === 'dark' ? (
              <Sun size={17} className="theme-icon sun-icon" />
            ) : (
              <Moon size={17} className="theme-icon moon-icon" />
            )}
          </button>

          {/* Resume Modal Trigger CTA */}
          <button
            type="button"
            onClick={onOpenResumeModal}
            className="navbar-resume-btn"
          >
            <FileText size={15} />
            <span>Resume</span>
            <ArrowUpRight size={14} className="resume-arrow-icon" />
          </button>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="navbar-mobile-toggle"
            aria-label="Toggle Mobile Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* ================= 4. Mobile Glass Drawer Navigation ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="navbar-mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-drawer-inner">
              <div className="mobile-drawer-header">
                <span className="mobile-drawer-label">SYSTEM NAVIGATION</span>
                <span className="mobile-drawer-mode">{theme === 'dark' ? 'Dark Obsidian' : 'Light Mode'}</span>
              </div>

              <div className="mobile-links-list">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`mobile-nav-row ${isActive ? 'is-active' : ''}`}
                    >
                      <div className="mobile-row-left">
                        <Icon size={17} className="mobile-row-icon" />
                        <span>{link.name}</span>
                      </div>
                      <ArrowUpRight size={15} className="mobile-row-arrow" />
                    </a>
                  );
                })}
              </div>

              <div className="mobile-drawer-footer">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResumeModal();
                  }}
                  className="mobile-resume-btn"
                >
                  <FileText size={16} />
                  <span>View & Download Resume</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
