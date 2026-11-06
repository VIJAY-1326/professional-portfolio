import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, RotateCw, ExternalLink } from 'lucide-react';
import './CustomCursor.css';

/**
 * Ultra-Modern Kinetic Developer Cursor
 * Built for Malla Vijay Sai's Portfolio:
 *  - Precision Luminous Quantum Core (Instant 1:1 Response)
 *  - Fluid Kinetic Glass Halo with Velocity-Based Directional Stretch
 *  - Precision Architectural Reticle Corner Ticks (HUD Crosshair Accent)
 *  - Dynamic Morphing Context States: 'default' | 'button' | 'project' | 'threed' | 'link' | 'text'
 *  - Subtle Magnetic Target Attraction on Interactive Buttons
 *  - Tactile Click Shockwave Compression & Laser Ripple Wave
 *  - Ethereal Neon Starlight Dust Trail
 *  - Full Dark/Light Theme Cross-Compatibility & Reduced Motion Safety
 */
export default function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();

  // Fine pointer & viewport check
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState('default');
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Click shockwave ripples
  const [ripples, setRipples] = useState([]);
  // Ethereal starlight dust particles
  const [dustParticles, setDustParticles] = useState([]);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Halo target coordinates with magnetic offset
  const haloTargetX = useMotionValue(-100);
  const haloTargetY = useMotionValue(-100);

  // Velocity tracking coordinates
  const lastPos = useRef({ x: -100, y: -100, time: 0 });
  const velocityAngle = useMotionValue(0);
  const velocityStretch = useMotionValue(1);

  // Core Pointer: Ultra-fast precision tracking
  const springCoreX = useSpring(mouseX, { stiffness: 1200, damping: 55, mass: 0.08 });
  const springCoreY = useSpring(mouseY, { stiffness: 1200, damping: 55, mass: 0.08 });

  // Trailing Halo: Kinetic fluid lag with luxury damping
  const springHaloX = useSpring(haloTargetX, { stiffness: 280, damping: 25, mass: 0.35 });
  const springHaloY = useSpring(haloTargetY, { stiffness: 280, damping: 25, mass: 0.35 });

  // Velocity springs for fluid squash & stretch
  const springAngle = useSpring(velocityAngle, { stiffness: 350, damping: 30 });
  const springStretch = useSpring(velocityStretch, { stiffness: 320, damping: 28 });

  // Detect fine pointer (desktop with mouse/trackpad)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkPointer = () => {
      const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
      const isDesktopWidth = window.innerWidth >= 1024;
      setIsFinePointer(hasFinePointer && isDesktopWidth && !shouldReduceMotion);
    };

    checkPointer();
    window.addEventListener('resize', checkPointer);
    return () => window.removeEventListener('resize', checkPointer);
  }, [shouldReduceMotion]);

  // Enable/disable cursor-none on body
  useEffect(() => {
    if (!isFinePointer) return;

    document.body.classList.add('custom-cursor-enabled');
    return () => {
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, [isFinePointer]);

  // Global Mouse Movement & Velocity Handling
  const lastDustTime = useRef(0);

  const handleMouseMove = useCallback((e) => {
    const { clientX: x, clientY: y } = e;
    const now = performance.now();

    mouseX.set(x);
    mouseY.set(y);

    if (!isVisible) setIsVisible(true);

    // Calculate dynamic velocity & movement angle
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy);

    if (speed > 2) {
      const angleRad = Math.atan2(dy, dx);
      velocityAngle.set(angleRad * (180 / Math.PI));
      const stretchFactor = 1 + Math.min(0.48, speed / 55);
      velocityStretch.set(stretchFactor);
    } else {
      velocityStretch.set(1);
    }

    lastPos.current = { x, y, time: now };

    // Emit subtle ethereal starlight dust (once every ~55ms while moving)
    if (now - lastDustTime.current > 55 && speed > 5) {
      lastDustTime.current = now;
      const newDust = {
        id: `${now}-${Math.random()}`,
        x: x + (Math.random() * 6 - 3),
        y: y + (Math.random() * 6 - 3),
        size: Math.random() * 3 + 2,
        color: Math.random() > 0.5 ? '#22D3EE' : '#8B5CF6'
      };
      setDustParticles((prev) => [...prev.slice(-6), newDust]);
    }

    // Inspect hovered target element for context states
    const target = e.target;
    if (!target) return;

    // 1. 3D WebGL Canvas / 3D Hologram Area
    const threedCanvas = target.closest('.hero-3d-wrapper, [data-cursor="3d"], canvas');
    if (threedCanvas) {
      setCursorState('threed');
      haloTargetX.set(x);
      haloTargetY.set(y);
      return;
    }

    // 2. Project Showcase Cards
    const projectCard = target.closest('[data-cursor="project"], .stacked-project-card, .project-card, .project-preview-mockup-wrapper');
    if (projectCard) {
      setCursorState('project');
      haloTargetX.set(x);
      haloTargetY.set(y);
      return;
    }

    // 3. Interactive Buttons with subtle magnetic attraction
    const buttonElement = target.closest('button, [role="button"], .interactive-btn, .threed-tab-btn, .dock-btn, .hero-mode-pill');
    if (buttonElement) {
      setCursorState('button');
      const rect = buttonElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const pullX = (centerX - x) * 0.18;
      const pullY = (centerY - y) * 0.18;
      haloTargetX.set(x + pullX);
      haloTargetY.set(y + pullY);
      return;
    }

    // 4. Navigation Links
    const linkElement = target.closest('a, .nav-link, .specs-cta-link');
    if (linkElement) {
      setCursorState('link');
      haloTargetX.set(x);
      haloTargetY.set(y);
      return;
    }

    // 5. Text Input Fields
    const textElement = target.closest('input, textarea, [contenteditable="true"]');
    if (textElement) {
      setCursorState('text');
      haloTargetX.set(x);
      haloTargetY.set(y);
      return;
    }

    // Default State
    setCursorState('default');
    haloTargetX.set(x);
    haloTargetY.set(y);
  }, [isVisible, mouseX, mouseY, haloTargetX, haloTargetY, velocityAngle, velocityStretch]);

  // Click Shockwave Handler
  const handleMouseDown = useCallback((e) => {
    setIsMouseDown(true);
    const ripple = {
      id: `${Date.now()}-${Math.random()}`,
      x: e.clientX,
      y: e.clientY
    };
    setRipples((prev) => [...prev.slice(-3), ripple]);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  const handleMouseLeaveWindow = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnterWindow = useCallback(() => {
    setIsVisible(true);
  }, []);

  // Set up window listeners
  useEffect(() => {
    if (!isFinePointer) return;

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [isFinePointer, handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeaveWindow, handleMouseEnterWindow]);

  // Clean up expired ripples
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 450);
    return () => clearTimeout(timer);
  }, [ripples]);

  // Clean up expired dust particles
  useEffect(() => {
    if (dustParticles.length === 0) return;
    const timer = setTimeout(() => {
      setDustParticles((prev) => prev.slice(1));
    }, 380);
    return () => clearTimeout(timer);
  }, [dustParticles]);

  if (!isFinePointer) {
    return null;
  }

  // Halo sizing & state configuration
  const haloBaseSize = 
    cursorState === 'threed' ? 56 :
    cursorState === 'project' ? 52 :
    cursorState === 'button' ? 48 :
    cursorState === 'link' ? 44 : 34;

  const isText = cursorState === 'text';

  return (
    <div 
      className="custom-cursor-root" 
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.25s ease' }}
    >
      
      {/* ============================================================
          1. ETHEREAL STARLIGHT DUST TRAIL
         ============================================================ */}
      <AnimatePresence>
        {dustParticles.map((dust) => (
          <motion.div
            key={dust.id}
            className="custom-cursor-dust"
            initial={{ opacity: 0.8, scale: 1, x: dust.x, y: dust.y }}
            animate={{ opacity: 0, scale: 0.25, y: dust.y - 10 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              width: dust.size,
              height: dust.size,
              backgroundColor: dust.color,
              boxShadow: `0 0 8px ${dust.color}`
            }}
          />
        ))}
      </AnimatePresence>

      {/* ============================================================
          2. LASER SHOCKWAVE WAVES (On Click)
         ============================================================ */}
      <AnimatePresence>
        {ripples.map((rip) => (
          <motion.div
            key={rip.id}
            className="custom-cursor-shockwave"
            initial={{ 
              width: 12, 
              height: 12, 
              x: rip.x - 6, 
              y: rip.y - 6, 
              opacity: 0.95, 
              scale: 0.5 
            }}
            animate={{ 
              width: 68, 
              height: 68, 
              x: rip.x - 34, 
              y: rip.y - 34, 
              opacity: 0, 
              scale: 2.1 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.42, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* ============================================================
          3. TRAILING KINETIC GLASS HALO (With Velocity Stretch & Reticles)
         ============================================================ */}
      {!isText && (
        <motion.div
          className={`custom-cursor-halo state-${cursorState}`}
          style={{
            x: springHaloX,
            y: springHaloY,
            width: haloBaseSize,
            height: haloBaseSize,
            scale: isMouseDown ? 0.76 : 1,
            rotate: cursorState === 'default' ? springAngle : 0,
            scaleX: cursorState === 'default' ? springStretch : 1
          }}
        >
          {/* Architectural HUD Reticle Ticks */}
          <div className="halo-reticle-tick tick-t" />
          <div className="halo-reticle-tick tick-b" />
          <div className="halo-reticle-tick tick-l" />
          <div className="halo-reticle-tick tick-r" />

          {/* Context Pill Badges */}
          <AnimatePresence>
            {cursorState === 'project' && (
              <motion.div
                className="cursor-pill-badge"
                initial={{ opacity: 0, scale: 0.85, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                <ArrowUpRight size={12} className="badge-icon" />
                <span>EXPLORE</span>
              </motion.div>
            )}

            {cursorState === 'threed' && (
              <motion.div
                className="cursor-pill-badge"
                initial={{ opacity: 0, scale: 0.85, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                <RotateCw size={11} className="badge-icon" />
                <span>DRAG 360°</span>
              </motion.div>
            )}

            {cursorState === 'link' && (
              <motion.div
                className="cursor-pill-badge"
                initial={{ opacity: 0, scale: 0.85, y: -4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                <ExternalLink size={11} className="badge-icon" />
                <span>OPEN</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* ============================================================
          4. CENTRAL PRECISION CORE (1:1 Instant Tracking)
         ============================================================ */}
      <motion.div
        className="custom-cursor-core"
        style={{
          x: springCoreX,
          y: springCoreY
        }}
      >
        {isText ? (
          <div className="core-text-caret" />
        ) : (
          <div className={`core-dot ${cursorState === 'button' ? 'is-active-btn' : ''}`} />
        )}
      </motion.div>

    </div>
  );
}
