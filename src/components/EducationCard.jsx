import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Sparkles,
  School,
  Laptop
} from 'lucide-react';
import { EASINGS } from '../utils/animations';

// Icon dictionary for education levels
const iconMap = {
  GraduationCap,
  BookOpen,
  Award,
  School,
  Laptop
};

export default function EducationCard({ 
  item, 
  isMobile = false, 
  isTablet = false 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = iconMap[item.icon] || GraduationCap;

  // Transform origins for 3D curved triptych folding
  const getTransformOrigin = () => {
    if (isMobile) return 'center center';
    if (item.position === 'left') return 'right center';
    if (item.position === 'right') return 'left center';
    return 'center center';
  };

  // 3D Entrance & Settled Variants with Enhanced Bend Arc
  const getCardVariants = () => {
    if (isMobile) {
      return {
        hidden: { opacity: 0, y: 35, scale: 0.96 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { duration: 0.65, ease: EASINGS.luxury } 
        }
      };
    }

    if (isTablet) {
      const targetRotateY = item.position === 'left' ? 8 : item.position === 'right' ? -8 : 0;
      return {
        hidden: { opacity: 0, y: 40, rotateY: targetRotateY * 1.5, scale: 0.95 },
        visible: { 
          opacity: 1, 
          y: 0, 
          rotateY: targetRotateY,
          scale: 1,
          transition: { duration: 0.75, ease: EASINGS.luxury } 
        }
      };
    }

    // Desktop: 3D inward curved bend with all cards perfectly LEVEL at y: 0
    const settledRotateY = item.position === 'left' ? 15 : item.position === 'right' ? -15 : 0;
    const settledTranslateZ = item.isCurrent ? 12 : -8;
    const settledTranslateY = 0; // Perfectly level with side cards

    return {
      hidden: { 
        opacity: 0, 
        y: 40, 
        rotateY: settledRotateY * 1.3,
        z: -25,
        scale: 0.96
      },
      visible: { 
        opacity: 1, 
        y: settledTranslateY, 
        rotateY: settledRotateY,
        z: settledTranslateZ,
        scale: 1,
        transition: { duration: 0.85, ease: EASINGS.luxury } 
      }
    };
  };

  // Organic liquid hover lift: straightens in 3D and pops forward
  const hoverAnimation = {
    y: isMobile ? -4 : -8,
    rotateY: 0,
    z: 35,
    scale: 1.025,
    transition: { duration: 0.35, ease: EASINGS.luxury }
  };

  const cardGlow = item.isCurrent 
    ? 'rgba(0, 240, 255, 0.45)' 
    : item.position === 'left'
      ? 'rgba(124, 58, 237, 0.4)'
      : 'rgba(14, 165, 233, 0.4)';

  return (
    <motion.div
      tabIndex={0}
      role="article"
      aria-label={`${item.degree} at ${item.institution}`}
      variants={getCardVariants()}
      whileHover={hoverAnimation}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`education-liquid-card ${item.isCurrent ? 'is-current-card' : ''} ${item.position ? `card-pos-${item.position}` : ''}`}
      style={{
        '--card-glow': cardGlow,
        transformOrigin: getTransformOrigin(),
        zIndex: isHovered ? 25 : item.isCurrent ? 10 : 2
      }}
    >
      {/* Top Gradient Laser Water Accent Strip */}
      <div 
        className="liquid-top-laser"
        style={{
          background: item.isCurrent
            ? 'linear-gradient(90deg, #00F0FF 0%, #8B5CF6 50%, #EC4899 100%)'
            : item.position === 'left'
              ? 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 60%, #00F0FF 100%)'
              : 'linear-gradient(90deg, #0EA5E9 0%, #00F0FF 60%, #10B981 100%)',
          boxShadow: item.isCurrent 
            ? '0 0 18px rgba(0, 240, 255, 0.75)' 
            : '0 0 12px rgba(99, 102, 241, 0.5)'
        }}
      />

      {/* Floating 3D Micro-Dewdrops */}
      <div className="card-floating-dewdrop" />
      <div className="card-floating-dewdrop-micro" />

      {/* Main Card Content Container */}
      <div className="edu-card-inner-content">
        
        {/* Top Header Row: Liquid Droplet Orb + Sleek Liquid Status Badge */}
        <div className="edu-card-top-row">
          
          {/* Organic Liquid Droplet Orb Icon */}
          <div className={`liquid-drop-orb-card ${item.position === 'left' ? 'orb-indigo' : item.position === 'right' ? 'orb-cyan' : 'orb-current'}`}>
            <div className="orb-specular-glint-card" />
            <div className="orb-sub-glint-card" />
            <IconComponent size={20} className="orb-icon-inner-card" />
          </div>

          {/* Clean Modern Liquid Glass Badge */}
          <div className="edu-badge-wrapper">
            {item.isCurrent ? (
              <span className="edu-status-pill pill-active">
                <span className="pulse-indicator-core" />
                <span>{item.badge}</span>
              </span>
            ) : item.position === 'left' ? (
              <span className="edu-status-pill pill-completed">
                <span className="static-indicator-dot dot-violet" />
                <span>{item.badge}</span>
              </span>
            ) : (
              <span className="edu-status-pill pill-distinction">
                <span className="static-indicator-dot dot-cyan" />
                <span>{item.badge}</span>
              </span>
            )}
          </div>
        </div>

        {/* Qualification Level Eyebrow */}
        <div className="edu-level-eyebrow">
          {item.level}
        </div>

        {/* Liquid Degree Title with Shimmering Gradient */}
        <h3 className={`liquid-degree-title ${item.isCurrent ? 'title-highlight-current' : ''}`}>
          {item.isCurrent ? (
            <>
              B.Tech in <span className="gradient-cyan-violet-text">Data Science</span>
            </>
          ) : (
            item.degree
          )}
        </h3>

        {/* Institution Name */}
        <div className="edu-institution-title">
          {item.institution}
        </div>

        {/* Location & Institution Accreditation Tag */}
        <div className="edu-meta-group">
          <div className="edu-location-line">
            <MapPin size={13} className="edu-pin-icon" />
            <span>{item.location}</span>
          </div>
          
          {item.highlightNote && (
            <div className="edu-accreditation-tag">
              <span>{item.highlightNote}</span>
            </div>
          )}
        </div>

        {/* Core Focus & Coursework Chips */}
        <div className="edu-coursework-section">
          <div className="edu-coursework-heading">
            Key Academic Focus
          </div>
          <div className="edu-chips-container">
            {item.subjects.map((sub, sIdx) => (
              <span key={sIdx} className="liquid-coursework-chip">
                <span className="chip-bullet" />
                <span>{sub}</span>
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Card Footer: Duration & Status Pill */}
      <div className="liquid-card-footer">
        <span className="edu-duration-label">
          <Calendar size={13} className="edu-cal-icon" />
          <span>{item.period || '2021 - 2022'}</span>
        </span>

        <span className={`edu-footer-pill ${item.isCurrent ? 'footer-pill-active' : ''}`}>
          {item.isCurrent ? (
            <Sparkles size={12} className="text-cyan-400" />
          ) : (
            <CheckCircle2 size={12} className="text-emerald-400" />
          )}
          <span>{item.status.split('(')[0].trim()}</span>
        </span>
      </div>

      {/* Sweeping Liquid Light Sheen Beam on Hover */}
      <div className="liquid-card-sheen" />
    </motion.div>
  );
}