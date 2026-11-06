import React, { useRef, useState, useCallback } from 'react';
import heroImg from '../assets/vijay-hero.jpg';
import './HeroPhoto3D.css';

/**
 * HeroPhoto3D — Executive Architectural Developer Showcase
 * Professional & Premium Luxury Design:
 *  - Symmetrical, high-status glassmorphism frame with bevel illumination
 *  - Natural, unclipped high-definition portrait framing
 *  - Interactive 3D Parallax Tilt with cursor-following physics (rotateX, rotateY)
 *  - Dynamic cursor specular light sheen (glass reflection)
 *  - Precision architectural corner reticles (+) & ambient studio optical aura
 *  - ZERO text overlays on the image (Clean, Pure, Professional)
 */
export default function HeroPhoto3D() {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, glareX: 50, glareY: 50, isHovered: false });

  // Smooth Interactive 3D Parallax Tilt Handler
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    const x = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    // Subtle, executive tilt angles (max +/- 8.5 degrees)
    const rotY = Math.max(-10, Math.min(10, x * 8.5));
    const rotX = Math.max(-10, Math.min(10, -y * 8.5));
    const glareX = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const glareY = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));

    setTilt({ rotX, rotY, glareX, glareY, isHovered: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotX: 0, rotY: 0, glareX: 50, glareY: 50, isHovered: false });
  }, []);

  return (
    <div 
      className="hero-exec-stage" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Deep Optical Studio Ambient Backlight Aura */}
      <div className="hero-exec-ambient-aura" aria-hidden="true" />

      {/* 2. Precision Architectural Corner Reticles (Minimalist & High-Tech) */}
      <div className="exec-corner-mark mark-tl" aria-hidden="true" />
      <div className="exec-corner-mark mark-tr" aria-hidden="true" />
      <div className="exec-corner-mark mark-bl" aria-hidden="true" />
      <div className="exec-corner-mark mark-br" aria-hidden="true" />

      {/* 3. The Executive 3D Glass Portrait Showcase (Pure Photo, Zero Clutter) */}
      <div 
        className={`hero-exec-glass-card ${tilt.isHovered ? 'is-active' : ''}`}
        style={{
          transform: `perspective(1200px) rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale3d(${tilt.isHovered ? 1.018 : 1}, ${tilt.isHovered ? 1.018 : 1}, 1)`
        }}
      >
        {/* Luxury Multi-layer Illuminated Bevel */}
        <div className="exec-glass-border-glow" aria-hidden="true" />

        {/* Unclipped High-Definition Portrait */}
        <div className="exec-portrait-frame">
          <img 
            src={heroImg} 
            alt="Malla Vijay Sai - Full-Stack Developer" 
            className="exec-portrait-image" 
          />

          {/* Natural Atmospheric Gradient Depth */}
          <div className="exec-atmosphere-gradient" aria-hidden="true" />

          {/* Interactive Specular Glare Sheen */}
          <div 
            className="exec-specular-glare" 
            style={{
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.05) 35%, transparent 65%)`,
              opacity: tilt.isHovered ? 1 : 0
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* 4. Minimalist Engineering Status Bar */}
      <div className="hero-exec-status-row" aria-hidden="true">
        <span className="status-dot-pulse" />
        <span className="status-label-code">SYSTEM // VERIFIED FULL-STACK DEVELOPER</span>
      </div>
    </div>
  );
}
