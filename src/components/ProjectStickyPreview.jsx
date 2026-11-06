import React from 'react';
import { Search, ShieldCheck } from 'lucide-react';

export default function ProjectStickyPreview({ project }) {
  switch (project.previewType) {
    case 'bliss':
      return (
        <div className="preview-screen-card preview-bliss">
          {/* Corporate Header */}
          <div className="preview-chrome-nav">
            <div className="preview-brand-group">
              <span className="brand-dot bg-pink" />
              <span className="preview-brand-title">Bliss</span>
            </div>
            <div className="preview-nav-links">
              <span className="nav-item is-active">Home</span>
              <span className="nav-item">Services</span>
              <span className="nav-item">Portfolio</span>
              <span className="nav-item">Pricing</span>
              <span className="nav-item">Contact</span>
            </div>
            <button type="button" className="preview-nav-cta cta-pink">Get Started</button>
          </div>

          {/* Hero Area */}
          <div className="preview-hero-layout">
            <div className="preview-hero-text">
              <h4 className="preview-hero-title">
                Transforming <br />
                Ideas Into <span className="gradient-pink-text">Digital Experiences</span>
              </h4>
              <p className="preview-hero-sub">
                We build modern websites that help businesses grow and make a lasting impression.
              </p>
              <div className="preview-cta-row">
                <span className="preview-btn-primary btn-pink">Get Started</span>
                <span className="preview-btn-ghost">View Portfolio</span>
              </div>
            </div>

            {/* Glowing 3D Wireframe Globe Visual */}
            <div className="preview-3d-visual">
              <div className="torus-ambient-orb" />
              <div className="torus-sphere-core">
                <div className="torus-inner-glow" />
                <div className="torus-orbital-ring" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'restaura':
      return (
        <div className="preview-screen-card preview-restaura">
          {/* Mock Web Application Navigation */}
          <div className="preview-chrome-nav">
            <div className="preview-brand-group">
              <span className="brand-dot bg-cyan" />
              <span className="preview-brand-title">Restaura</span>
            </div>
            <div className="preview-nav-links">
              <span className="nav-item is-active">Home</span>
              <span className="nav-item">Menu</span>
              <span className="nav-item">About</span>
              <span className="nav-item">Reservations</span>
              <span className="nav-item">Contact</span>
            </div>
            <button type="button" className="preview-nav-cta">Book A Table</button>
          </div>

          {/* Hero Dining Presentation Area */}
          <div className="preview-hero-layout">
            <div className="preview-hero-text">
              <h4 className="preview-hero-title">
                Fine Dining <br />
                <span className="gradient-gold-text">Redefined</span>
              </h4>
              <p className="preview-hero-sub">Exceptional food. Memorable experiences.</p>
              <div className="preview-cta-row">
                <span className="preview-btn-primary">Explore Menu</span>
                <span className="preview-btn-ghost">Book A Table</span>
              </div>
            </div>

            {/* Gourmet Plate Imagery Presentation */}
            <div className="preview-gourmet-visual">
              <div className="gourmet-image-wrap">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80" 
                  alt="Fine dining culinary dish"
                  className="gourmet-img"
                  loading="lazy"
                />
                <div className="gourmet-ambient-glare" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'outpass':
      return (
        <div className="preview-screen-card preview-outpass">
          {/* Top Admin Header */}
          <div className="preview-chrome-nav outpass-nav">
            <div className="preview-brand-group">
              <ShieldCheck size={14} className="text-violet-400" />
              <span className="preview-brand-title">Hostel Outpass</span>
            </div>

            <div className="preview-search-input">
              <Search size={10} className="text-slate-400" />
              <span>Search by student, roll number...</span>
            </div>

            <div className="admin-profile-pill">
              <span className="avatar-circle">👨‍💼</span>
              <div className="admin-meta">
                <span className="admin-name">Admin</span>
                <span className="admin-role">Approved</span>
              </div>
            </div>
          </div>

          {/* Main Dashboard Layout */}
          <div className="outpass-dashboard-layout">
            {/* Sidebar */}
            <div className="outpass-sidebar">
              <span className="sidebar-item is-active">
                <span className="sidebar-icon">📊</span>
                Dashboard
              </span>
              <span className="sidebar-item">
                <span className="sidebar-icon">👥</span>
                Students
              </span>
              <span className="sidebar-item">
                <span className="sidebar-icon">📝</span>
                Pending Requests
              </span>
              <span className="sidebar-item">
                <span className="sidebar-icon">🛡️</span>
                Security Gates
              </span>
              <span className="sidebar-item">
                <span className="sidebar-icon">⚙️</span>
                Settings
              </span>
            </div>

            {/* Dashboard Content */}
            <div className="outpass-main-view">
              <div className="outpass-view-header">
                <span className="view-title">Dashboard Overview</span>
              </div>

              {/* 4 Stat Cards */}
              <div className="outpass-stat-grid">
                <div className="op-stat-card border-blue">
                  <span className="op-stat-lbl">TOTAL REQUESTS</span>
                  <span className="op-stat-val text-white">48</span>
                </div>
                <div className="op-stat-card border-amber">
                  <span className="op-stat-lbl">PENDING</span>
                  <span className="op-stat-val text-amber-400">12</span>
                </div>
                <div className="op-stat-card border-emerald">
                  <span className="op-stat-lbl">APPROVED</span>
                  <span className="op-stat-val text-emerald-400">32</span>
                </div>
                <div className="op-stat-card border-rose">
                  <span className="op-stat-lbl">REJECTED</span>
                  <span className="op-stat-val text-rose-400">4</span>
                </div>
              </div>

              {/* Recent Requests Table */}
              <div className="outpass-table-card">
                <div className="table-header-row">
                  <span className="th-title">Recent Requests</span>
                  <span className="th-link">View All</span>
                </div>
                <div className="table-data-list">
                  <div className="table-row-item">
                    <span className="st-name">Rahul Kumar</span>
                    <span className="st-reason">Medical Checkup</span>
                    <span className="st-badge badge-approved">Approved</span>
                    <span className="st-date">Oct 12, 2024</span>
                  </div>
                  <div className="table-row-item">
                    <span className="st-name">Priya Sharma</span>
                    <span className="st-reason">Family Visit</span>
                    <span className="st-badge badge-pending">Pending</span>
                    <span className="st-date">Oct 11, 2024</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'portfolio':
    default:
      return (
        <div className="preview-screen-card preview-portfolio">
          {/* Portfolio Header */}
          <div className="preview-chrome-nav">
            <div className="preview-brand-group">
              <span className="vj-logo-badge">VJ</span>
            </div>
            <div className="preview-nav-links">
              <span className="nav-item">Home</span>
              <span className="nav-item">About</span>
              <span className="nav-item is-active">Projects</span>
              <span className="nav-item">Skills</span>
              <span className="nav-item">Contact</span>
            </div>
            <button type="button" className="preview-nav-cta cta-amber">Download CV</button>
          </div>

          {/* Hero Area */}
          <div className="preview-hero-layout">
            <div className="preview-hero-text">
              <span className="portfolio-subheading">Hi, I'm</span>
              <h4 className="portfolio-hero-name">
                <span className="gradient-gold-text">Vijay</span>
              </h4>
              <span className="portfolio-role-title">Frontend Developer</span>
              <p className="preview-hero-sub">
                I build modern web experiences with React, Framer Motion and clean UI/UX.
              </p>
              <div className="preview-cta-row">
                <span className="preview-btn-primary btn-amber">View Projects</span>
                <span className="preview-btn-ghost">Contact Me</span>
              </div>
            </div>

            {/* Cosmic Celestial Sphere Visual */}
            <div className="preview-cosmic-visual">
              <div className="cosmic-planet-sphere">
                <div className="planet-atmosphere-halo" />
                <div className="planet-orbital-orbit" />
                <div className="planet-orbital-orbit ring-2" />
                <div className="planet-core-texture" />
              </div>
            </div>
          </div>
        </div>
      );
  }
}
