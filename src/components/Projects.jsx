import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hexagon, ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import ProjectStickyCard from './ProjectStickyCard';
import ProjectModal from './ProjectModal';
import { fadeInUp } from '../utils/animations';
import './Projects.css';

export default function Projects({ activeModalProject, setActiveModalProject }) {
  const [activeIndicator, setActiveIndicator] = useState(0);
  const [hoveredSlotIndex, setHoveredSlotIndex] = useState(null);
  const [mobileProjectIndex, setMobileProjectIndex] = useState(0);
  const [stageDimensions, setStageDimensions] = useState({ 
    width: 1400, 
    dip: 38, 
    cardWidth: 330, 
    gap: 22 
  });

  const sortedProjects = [...projectsData].sort(
    (a, b) => parseInt(a.number, 10) - parseInt(b.number, 10)
  );
  const activeMobileProject = sortedProjects[mobileProjectIndex] || sortedProjects[0];

  const handlePrevMobileProject = () => {
    setMobileProjectIndex((prev) => (prev === 0 ? sortedProjects.length - 1 : prev - 1));
  };

  const handleNextMobileProject = () => {
    setMobileProjectIndex((prev) => (prev === sortedProjects.length - 1 ? 0 : prev + 1));
  };

  const stageRef = useRef(null);
  const slotRefs = useRef([]);
  const canvasRef = useRef(null);
  const dimsRef = useRef(stageDimensions);

  // Animation & Drag physics refs
  const offsetRef = useRef(0);
  const targetOffsetRef = useRef(null);
  const isPausedRef = useRef(false);
  const hoveredSlotRef = useRef(null);
  const hoverPauseTimerRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);

  // 3 duplicate cycles of 4 projects = 12 cards total for seamless infinite ring
  const duplicatedCards = [
    ...projectsData.map((p, idx) => ({ ...p, uniqueKey: `set0-${p.id}`, origIndex: idx })),
    ...projectsData.map((p, idx) => ({ ...p, uniqueKey: `set1-${p.id}`, origIndex: idx })),
    ...projectsData.map((p, idx) => ({ ...p, uniqueKey: `set2-${p.id}`, origIndex: idx }))
  ];

  const totalCards = duplicatedCards.length; // 12

  // Responsive dimension tracking
  useEffect(() => {
    const handleResize = () => {
      const stage = stageRef.current;
      const width = stage ? stage.offsetWidth : window.innerWidth;
      let dip = 38;
      let cardWidth = 330;
      let gap = 22;

      if (width < 768) {
        dip = 0; // Flat, clean horizontal slider on mobile for crystal-clear readability
        cardWidth = Math.min(width - 48, 315);
        gap = 16;
      } else if (width < 1024) {
        dip = 12;
        cardWidth = 325;
        gap = 20;
      }

      const newDims = { width, dip, cardWidth, gap };
      setStageDimensions(newDims);
      dimsRef.current = newDims;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync ref on state change
  useEffect(() => {
    dimsRef.current = stageDimensions;
  }, [stageDimensions]);

  // Lightweight HTML5 Canvas Particle Field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.45 + 0.2,
      color: Math.random() > 0.5 ? '#00F0FF' : '#8B5CF6'
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      ctx.globalAlpha = 0.05;
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 0.75;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // =========================================================================
  // Authentic 3D Panoramic Curve Physics Loop (requestAnimationFrame)
  // Perfectly matching the reference image:
  // - Stops IMMEDIATELY when cursor hovers over any card or over the carousel
  // - Center cards come forward into foreground (Z: +35px) and sit atop curve apex
  // - Outer cards curve back into depth (Z: -40px) and angle inward (rotY: +/-16deg)
  // - Card bottom strictly banks parallel to the curve (rotZ: tangent to curve)
  // =========================================================================
  useEffect(() => {
    let animId;
    let lastTime = performance.now();

    const updateCarousel = (currentTime) => {
      const delta = Math.min(32, currentTime - lastTime);
      lastTime = currentTime;

      const { width: stageWidth, dip, cardWidth, gap } = dimsRef.current;
      const X_mid = stageWidth / 2;
      const stride = cardWidth + gap;
      const totalRingLength = totalCards * stride;
      const halfSpan = totalRingLength / 2;
      const R = X_mid * 0.90; // Effective curve span radius

      // Strict Pause Check: If user is hovering ANY card or the carousel, cards DO NOT move!
      const isPaused = isPausedRef.current || hoveredSlotRef.current !== null;

      // 1. Advance scroll offset or glide to target
      if (targetOffsetRef.current !== null) {
        const diff = targetOffsetRef.current - offsetRef.current;
        if (Math.abs(diff) < 0.5) {
          offsetRef.current = targetOffsetRef.current;
          targetOffsetRef.current = null;
        } else {
          offsetRef.current += diff * 0.08;
        }
      } else if (!isPaused && !isDraggingRef.current) {
        // Continuous smooth cruise (~38px per second at 60fps)
        const cruiseSpeed = 0.65 * (delta / 16.67);
        offsetRef.current = (offsetRef.current + cruiseSpeed) % totalRingLength;
      }

      // 2. Position every card slot along the 3D panoramic curve
      let closestProjectIdx = 0;
      let minCenterDistance = Infinity;

      for (let i = 0; i < totalCards; i++) {
        const slotEl = slotRefs.current[i];
        if (!slotEl) continue;

        // Raw distance along infinite ring
        const rawPos = i * stride - offsetRef.current;
        // Centered relative offset from screen center (-halfSpan to +halfSpan)
        let relX = ((rawPos % totalRingLength) + totalRingLength) % totalRingLength;
        if (relX > halfSpan) relX -= totalRingLength;

        // Performance: hide slots that are far off-screen
        if (Math.abs(relX) > X_mid + cardWidth + 80) {
          slotEl.style.visibility = 'hidden';
          continue;
        } else {
          slotEl.style.visibility = 'visible';
        }

        // Normalized distance from center u in [-1, 1]
        const u = Math.max(-1.3, Math.min(1.3, relX / R));
        const u2 = u * u;

        // 1. Parabolic curve matching reference image:
        // Center card is at apex (posY = -dip), side cards drop down (posY = 0)
        const posY = -dip * (1 - Math.min(1.25, u2));

        // 2. Exact tangent bank angle matching the curve slope:
        // Left side slopes up to the right (rotZ < 0), right side slopes down to the right (rotZ > 0)
        const slope = (2 * dip / R) * u;
        const rotZ = Math.atan(slope) * (180 / Math.PI);

        // 3. Inward panoramic 3D tilt: left cards face center-right (+deg), right cards face center-left (-deg)
        const rotY = -u * 16.0;

        // 4. Depth perspective: center cards pop forward into foreground (+35px), outer cards curve back (-40px)
        const posZ = 35 * (1 - Math.min(1.2, u2)) - 40 * u2;

        // 5. Scale: center card prominent (1.02), outer cards scaled gracefully (0.94)
        const scale = 1.02 - 0.08 * Math.min(1.2, u2);

        // Absolute left coordinate for card center
        const leftCoord = X_mid + relX - cardWidth / 2;

        // Check if hovered
        const isSlotHovered = hoveredSlotRef.current === i;

        // Apply hardware-accelerated 3D transform directly to the DOM slot
        // Note: Slot maintains smooth continuous curve geometry; 
        // silky-smooth hover elevation and glow are handled natively with GPU transitions in CSS
        slotEl.style.transform = `translate3d(${leftCoord.toFixed(2)}px, ${posY.toFixed(2)}px, ${posZ.toFixed(2)}px) rotateZ(${rotZ.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        slotEl.style.zIndex = isSlotHovered ? 999 : Math.round(100 - Math.abs(relX) * 0.1);

        // Track which card is closest to center for indicator dots
        const absDist = Math.abs(relX);
        if (absDist < minCenterDistance) {
          minCenterDistance = absDist;
          closestProjectIdx = duplicatedCards[i].origIndex;
        }
      }

      // Update indicator active dot if changed
      setActiveIndicator((prev) => (prev !== closestProjectIdx ? closestProjectIdx : prev));

      animId = requestAnimationFrame(updateCarousel);
    };

    animId = requestAnimationFrame(updateCarousel);
    return () => {
      cancelAnimationFrame(animId);
      if (hoverPauseTimerRef.current) {
        clearTimeout(hoverPauseTimerRef.current);
      }
    };
  }, [totalCards]);

  // Click indicator node to glide that project into center
  const handleSelectIndicator = useCallback((projectIdx) => {
    setActiveIndicator(projectIdx);
    const { width: stageWidth, cardWidth, gap } = dimsRef.current;
    const stride = cardWidth + gap;
    const totalRingLength = totalCards * stride;
    const halfSpan = totalRingLength / 2;

    // Find the closest instance of this project
    let bestTargetOffset = offsetRef.current;
    let minDelta = Infinity;

    for (let i = 0; i < totalCards; i++) {
      if (duplicatedCards[i].origIndex === projectIdx) {
        const rawPos = i * stride - offsetRef.current;
        let relX = ((rawPos % totalRingLength) + totalRingLength) % totalRingLength;
        if (relX > halfSpan) relX -= totalRingLength;

        if (Math.abs(relX) < minDelta) {
          minDelta = Math.abs(relX);
          bestTargetOffset = offsetRef.current + relX;
        }
      }
    }

    targetOffsetRef.current = bestTargetOffset;
  }, [totalCards]);

  // Bulletproof Card Hover Pause Handlers (Immediate pause, debounced unpause)
  const handleCardMouseEnter = useCallback((index) => {
    if (hoverPauseTimerRef.current) {
      clearTimeout(hoverPauseTimerRef.current);
      hoverPauseTimerRef.current = null;
    }
    isPausedRef.current = true;
    hoveredSlotRef.current = index;
    setHoveredSlotIndex(index);
  }, []);

  const handleCardMouseLeave = useCallback((e, index) => {
    // If pointer moves within card or its child buttons/elements, ignore
    if (e && e.currentTarget && e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
      return;
    }
    if (hoveredSlotRef.current === index) {
      hoveredSlotRef.current = null;
    }
    setHoveredSlotIndex(null);

    // Debounce unpausing (100ms) so moving cursor between adjacent cards or over buttons remains paused
    if (hoverPauseTimerRef.current) clearTimeout(hoverPauseTimerRef.current);
    hoverPauseTimerRef.current = setTimeout(() => {
      if (hoveredSlotRef.current === null) {
        isPausedRef.current = false;
      }
    }, 100);
  }, []);

  // Pointer / Touch drag controls
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    dragStartOffsetRef.current = offsetRef.current;
    targetOffsetRef.current = null;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const deltaX = currentX - dragStartXRef.current;
    offsetRef.current = dragStartOffsetRef.current - deltaX;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Compute laser curve matching reference image:
  // Arches UP in center (yApex: 18px), curves DOWN at sides (yBase: 56px)
  // 100% inside screen margins (xStart: 4%, xEnd: 96%)
  const { width: currentStageWidth, dip: currentDip } = stageDimensions;
  const X_mid = currentStageWidth / 2;
  const xStart = Math.round(currentStageWidth * 0.04);
  const xEnd = Math.round(currentStageWidth * 0.96);
  const yApex = 18;
  const yBase = yApex + currentDip;
  const yControl = yApex - currentDip;
  const laserCurvePath = `M ${xStart},${yBase} Q ${X_mid},${yControl} ${xEnd},${yBase}`;

  return (
    <section id="projects" className="projects-showcase-section">
      {/* Ambient Neon Glow Orbs */}
      <div className="projects-ambient-orb orb-cyan" aria-hidden="true" />
      <div className="projects-ambient-orb orb-violet" aria-hidden="true" />
      <div className="projects-ambient-orb orb-magenta" aria-hidden="true" />

      {/* Lightweight HTML5 Background Canvas */}
      <canvas ref={canvasRef} className="projects-bg-canvas" aria-hidden="true" />

      {/* =================================================================
          Section Header: Tag Badge + Title + Subtitle (Matching Reference Image)
          ================================================================= */}
      <div className="projects-header-container">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* 1. Small Outlined Pill Badge with Cinematic Scene Marker */}
         

          {/* 2. Centered Main Heading Title */}
          <h2 className="projects-main-title">
            Featured <span className="gradient-projects-word">Projects</span>
          </h2>

          {/* 3. Subtitle (Exact text from reference image) */}
         
        </motion.div>
      </div>

      {/* =================================================================
          DESKTOP 3D CURVED PANORAMIC CAROUSEL (Visible on screens > 1024px)
          Cards STOP IMMEDIATELY when hovered by the cursor
          ================================================================= */}
      <div 
        className="projects-desktop-carousel projects-carousel-wrapper"
        onMouseLeave={() => { 
          if (hoverPauseTimerRef.current) clearTimeout(hoverPauseTimerRef.current);
          isPausedRef.current = false; 
          hoveredSlotRef.current = null;
          setHoveredSlotIndex(null); 
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Soft Cinematic Blur & Vignette at Left and Right Edges */}
        <div className="edge-blur-panel left-edge" aria-hidden="true" />
        <div className="edge-blur-panel right-edge" aria-hidden="true" />

        {/* 3D Curved Perspective Stage Container */}
        <div 
          ref={stageRef} 
          className="projects-carousel-stage"
        >
          {duplicatedCards.map((project, i) => (
            <div
              key={project.uniqueKey}
              ref={(el) => (slotRefs.current[i] = el)}
              className={`carousel-card-slot ${hoveredSlotIndex === i ? 'is-hovered' : ''}`}
              onMouseEnter={() => handleCardMouseEnter(i)}
              onMouseLeave={(e) => handleCardMouseLeave(e, i)}
            >
              <ProjectStickyCard
                project={project}
                onSelect={setActiveModalProject}
                onHoverStart={() => handleCardMouseEnter(i)}
                onHoverEnd={(e) => handleCardMouseLeave(e, i)}
              />
            </div>
          ))}
        </div>

        {/* =================================================================
            Curved Neon Laser Beam Arc & Reflective Glossy Floor Stage
            Curved INSIDE the screen ("screen lopala") strictly UNDERNEATH all cards
            Cards ride parallel with bottoms tangent to this exact line
            ================================================================= */}
        <div className="projects-floor-stage" aria-hidden="true">
          {/* Ambient reflective floor light puddle */}
          <div className="floor-ambient-reflection-puddle" />

          {/* Smooth Elliptical Bézier Curve Laser SVG completely inside screen bounds */}
          <svg 
            className="curved-laser-bezier-svg" 
            viewBox={`0 0 ${currentStageWidth} ${yBase + 20}`}
            fill="none" 
            preserveAspectRatio="none"
          >
            <defs>
              {/* Dark Theme Vibrant Laser Gradient */}
              <linearGradient id="neonLaserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EC4899" stopOpacity="0.85" />
                <stop offset="18%" stopColor="#8B5CF6" stopOpacity="0.9" />
                <stop offset="38%" stopColor="#0072FF" stopOpacity="0.98" />
                <stop offset="50%" stopColor="#00F0FF" stopOpacity="1" />
                <stop offset="62%" stopColor="#0072FF" stopOpacity="0.98" />
                <stop offset="82%" stopColor="#8B5CF6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.85" />
              </linearGradient>

              {/* Light Theme Refined Laser Gradient */}
              <linearGradient id="neonLaserGradLight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EC4899" stopOpacity="0.5" />
                <stop offset="22%" stopColor="#8B5CF6" stopOpacity="0.75" />
                <stop offset="50%" stopColor="#0284C7" stopOpacity="0.95" />
                <stop offset="78%" stopColor="#8B5CF6" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.5" />
              </linearGradient>

              {/* Multi-Layered Neon Glow Filter */}
              <filter id="laserGlowFilter" x="-20%" y="-100%" width="140%" height="300%">
                <feGaussianBlur stdDeviation="2.5" result="glow1" />
                <feGaussianBlur stdDeviation="7" result="glow2" />
                <feGaussianBlur stdDeviation="15" result="glow3" />
                <feMerge>
                  <feMergeNode in="glow3" />
                  <feMergeNode in="glow2" />
                  <feMergeNode in="glow1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing Gradient Curved Laser Beam (Outer Ambient Glow) */}
            <path 
              d={laserCurvePath} 
              stroke="url(#neonLaserGrad)" 
              strokeWidth="5" 
              filter="url(#laserGlowFilter)"
              strokeLinecap="round"
              className="laser-glow-path"
            />

            {/* Sharp Neon Center Line */}
            <path 
              d={laserCurvePath} 
              stroke="url(#neonLaserGrad)" 
              strokeWidth="2.8" 
              strokeLinecap="round"
              className="laser-sharp-path"
            />

            {/* Bright Pure White Core Laser Beam */}
            <path 
              d={laserCurvePath} 
              stroke="#FFFFFF" 
              strokeWidth="1.2" 
              opacity="0.95"
              strokeLinecap="round"
              className="laser-core-path"
            />
          </svg>

          {/* Floor Starburst Lens Flares placed right at the curve tips INSIDE the screen */}
          <div 
            className="floor-lens-flare left-flare" 
            style={{ left: `${xStart}px`, top: `${yBase}px` }} 
          />
          <div 
            className="floor-lens-flare right-flare" 
            style={{ left: `${xEnd}px`, top: `${yBase}px` }} 
          />
        </div>

        {/* ===============================================================
            Bottom Indicator Pill Bar (Matching Reference Image)
            =============================================================== */}
        <div 
          className="projects-floor-indicator-pills"
          role="tablist"
          aria-label="Project carousel indicators"
        >
          {projectsData.map((project, idx) => (
            <button
              key={project.id}
              type="button"
              className={`floor-indicator-node ${activeIndicator === idx ? 'is-active' : ''}`}
              onClick={() => handleSelectIndicator(idx)}
              aria-label={`Select project ${project.number}: ${project.title}`}
            />
          ))}
        </div>
      </div>

      {/* =================================================================
          DEDICATED MOBILE & TABLET SHOWCASE (Visible on screens <= 1024px)
          Clean, intuitive, high-resolution, easy to understand & touch
          ================================================================= */}
      <div className="projects-mobile-showcase">
        {/* Project Quick Selector Tabs */}
        <div className="mobile-project-tabs-row" role="tablist">
          {sortedProjects.map((p, idx) => {
            const isSelected = mobileProjectIndex === idx;
            return (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`mobile-project-tab-pill ${isSelected ? 'is-active' : ''}`}
                style={{
                  '--tab-accent': p.accentColor,
                  borderColor: isSelected ? p.accentColor : 'rgba(255, 255, 255, 0.1)',
                  color: isSelected ? '#FFFFFF' : '#94A3B8'
                }}
                onClick={() => setMobileProjectIndex(idx)}
              >
                <span 
                  className="mobile-tab-numeral" 
                  style={{ color: isSelected ? p.accentColor : '#64748B' }}
                >
                  {p.number}
                </span>
                <span className="mobile-tab-title">{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Project Card Display */}
        <div className="mobile-active-card-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMobileProject.id}
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="mobile-project-card-wrapper"
            >
              <ProjectStickyCard
                project={activeMobileProject}
                onSelect={setActiveModalProject}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Pagination & Navigation Bar */}
        <div className="mobile-project-controls-bar">
          <button
            type="button"
            className="mobile-control-nav-btn"
            onClick={handlePrevMobileProject}
            aria-label="Previous Project"
          >
            <ChevronLeft size={16} />
            <span>Prev</span>
          </button>

          {/* Dots Indicator with Project Counter */}
          <div className="mobile-control-center">
            <span className="mobile-counter-text">
              Project <strong style={{ color: activeMobileProject.accentColor }}>{activeMobileProject.number}</strong> of 04
            </span>
            <div className="mobile-control-dots">
              {sortedProjects.map((p, idx) => (
                <button
                  key={p.id}
                  type="button"
                  className={`mobile-dot ${mobileProjectIndex === idx ? 'is-active' : ''}`}
                  style={{
                    backgroundColor: mobileProjectIndex === idx ? p.accentColor : 'rgba(255, 255, 255, 0.2)',
                    boxShadow: mobileProjectIndex === idx ? `0 0 10px ${p.accentColor}` : 'none'
                  }}
                  onClick={() => setMobileProjectIndex(idx)}
                  aria-label={`Go to project ${p.number}: ${p.title}`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            className="mobile-control-nav-btn"
            onClick={handleNextMobileProject}
            aria-label="Next Project"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Global Interactive Project Architecture Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <ProjectModal
            project={activeModalProject}
            onClose={() => setActiveModalProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
