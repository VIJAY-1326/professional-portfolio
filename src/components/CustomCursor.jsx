import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import './CustomCursor.css';

/**
 * Signature Premium Animated Futuristic Cursor
 * Inspired directly by user reference images:
 * - Cyan-to-Electric-Violet glowing arrow pointer
 * - Luminous center core
 * - Fluid orbital trailing ring with satellite spark
 * - Context-aware interactive states (Button, Link, Project Card, Text, Click)
 * - Lightweight particle trail
 * - Full Dark/Light theme cross-compatibility
 */
export default function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();

  // Fine pointer & viewport check
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'button' | 'link' | 'project' | 'text' | 'disabled'
  
  // Click ripple effects array
  const [ripples, setRipples] = useState([]);
  // Lightweight particle trail (max 6 particles)
  const [particles, setParticles] = useState([]);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Magnetic attraction offset
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);

  // Physics springs for ultra-smooth natural motion
  // Main Pointer: high responsiveness with slight natural elasticity
  const springPointerX = useSpring(mouseX, { stiffness: 900, damping: 50, mass: 0.1 });
  const springPointerY = useSpring(mouseY, { stiffness: 900, damping: 50, mass: 0.1 });

  // Outer Ring: elegant, fluid trailing physics with gentle follow delay
  const springRingX = useSpring(mouseX, { stiffness: 240, damping: 24, mass: 0.4 });
  const springRingY = useSpring(mouseY, { stiffness: 240, damping: 24, mass: 0.4 });

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

  // Global mouse move and hover element detection
  const lastParticleTime = useRef(0);

  const handleMouseMove = useCallback((e) => {
    const { clientX: x, clientY: y } = e;
    mouseX.set(x);
    mouseY.set(y);

    if (!isVisible) setIsVisible(true);

    // Emit lightweight particle trail (max once every 65ms while moving)
    const now = performance.now();
    if (now - lastParticleTime.current > 65) {
      lastParticleTime.current = now;
      const newParticle = {
        id: `${now}-${Math.random()}`,
        x: x + (Math.random() * 8 - 4),
        y: y + (Math.random() * 8 - 4),
        size: Math.random() * 3.5 + 2.5,
        color: Math.random() > 0.5 ? '#22D3EE' : '#8B5CF6'
      };

      setParticles((prev) => [...prev.slice(-5), newParticle]);
    }

    // Inspect hovered element to trigger context-aware cursor states
    const target = e.target;
    if (!target) return;

    // Check for special project card state
    const projectCard = target.closest('[data-cursor="project"], .stacked-project-card, .project-preview-mockup-wrapper');
    if (projectCard) {
      setCursorState('project');
      magneticX.set(0);
      magneticY.set(0);
      return;
    }

    // Check for buttons / interactive controls (with subtle magnetic attraction)
    const buttonElement = target.closest('button, [role="button"], .interactive-btn, .btn-primary, .btn-secondary');
    if (buttonElement) {
      setCursorState('button');
      
      // Calculate gentle magnetic pull towards button center
      const rect = buttonElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const pullX = (centerX - x) * 0.22;
      const pullY = (centerY - y) * 0.22;
      magneticX.set(pullX);
      magneticY.set(pullY);
      return;
    }

    // Check for links
    const linkElement = target.closest('a, .nav-link, .tab-btn');
    if (linkElement) {
      setCursorState('link');
      magneticX.set(0);
      magneticY.set(0);
      return;
    }

    // Check for text selection areas (inputs, textareas, headers, paragraphs)
    const textElement = target.closest('input, textarea, [contenteditable="true"]');
    if (textElement) {
      setCursorState('text');
      magneticX.set(0);
      magneticY.set(0);
      return;
    }

    // Check for disabled elements
    if (target.closest('[disabled], .disabled')) {
      setCursorState('disabled');
      magneticX.set(0);
      magneticY.set(0);
      return;
    }

    // Default state
    setCursorState('default');
    magneticX.set(0);
    magneticY.set(0);
  }, [isVisible, mouseX, mouseY, magneticX, magneticY]);

  // Click ripple handler
  const handleMouseDown = useCallback((e) => {
    const ripple = {
      id: `${Date.now()}-${Math.random()}`,
      x: e.clientX,
      y: e.clientY
    };

    setRipples((prev) => [...prev.slice(-3), ripple]);
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
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, [isFinePointer, handleMouseMove, handleMouseDown, handleMouseLeaveWindow, handleMouseEnterWindow]);

  // Clean up expired ripples
  useEffect(() => {
    if (ripples.length === 0) return;
    const timer = setTimeout(() => {
      setRipples((prev) => prev.slice(1));
    }, 450);
    return () => clearTimeout(timer);
  }, [ripples]);

  // Clean up expired particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 400);
    return () => clearTimeout(timer);
  }, [particles]);

  if (!isFinePointer) {
    return null;
  }

  // Ring dimension configuration based on cursor state
  const ringSize = cursorState === 'button' ? 56 : cursorState === 'project' ? 48 : cursorState === 'link' ? 44 : 40;
  const isTextState = cursorState === 'text';

  return (
    <div className="custom-cursor-root" style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.25s ease' }}>
      
      {/* ============================================================
          1. LIGHTWEIGHT SPARKLE PARTICLE TRAIL (Fades quickly)
         ============================================================ */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="custom-cursor-particle"
            initial={{ opacity: 0.75, scale: 1, x: particle.x, y: particle.y }}
            animate={{ opacity: 0, scale: 0.2, y: particle.y - 12 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 6px ${particle.color}`
            }}
          />
        ))}
      </AnimatePresence>

      {/* ============================================================
          2. CLICK RIPPLE WAVES
         ============================================================ */}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="custom-cursor-ripple"
            initial={{ 
              width: 14, 
              height: 14, 
              x: ripple.x - 7, 
              y: ripple.y - 7, 
              opacity: 0.9, 
              scale: 0.6 
            }}
            animate={{ 
              width: 65, 
              height: 65, 
              x: ripple.x - 32.5, 
              y: ripple.y - 32.5, 
              opacity: 0, 
              scale: 2.2 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      {/* ============================================================
          3. OUTER ORBITAL SPRING RING WITH SATELLITE SPARK
         ============================================================ */}
      {!isTextState && (
        <motion.div
          className="custom-cursor-ring"
          style={{
            x: springRingX,
            y: springRingY,
            translateX: -ringSize / 2,
            translateY: -ringSize / 2,
            width: ringSize,
            height: ringSize,
            borderColor: cursorState === 'button' ? '#22D3EE' : cursorState === 'project' ? '#8B5CF6' : 'rgba(139, 92, 246, 0.45)'
          }}
          animate={{
            rotate: 360
          }}
          transition={{
            rotate: { duration: 9, repeat: Infinity, ease: 'linear' }
          }}
        >
          {/* Orbiting Satellite Dot */}
          <div className="custom-cursor-satellite" />

          {/* Special State Badges inside or attached to Ring */}
          {cursorState === 'link' && (
            <div className="custom-cursor-link-badge">
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </div>
          )}
        </motion.div>
      )}

      {/* ============================================================
          4. MAIN POINTER ARROW (Signature Cyan-Violet Neon Vector)
             Matches exact visual reference from media_1792662268123_995731b9.png
         ============================================================ */}
      <motion.div
        className="custom-cursor-pointer"
        style={{
          x: springPointerX,
          y: springPointerY
        }}
      >
        {isTextState ? (
          // Text Mode: Minimal glowing vertical I-beam indicator
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            style={{
              width: '2.5px',
              height: '22px',
              background: 'linear-gradient(180deg, #22D3EE 0%, #8B5CF6 100%)',
              borderRadius: '2px',
              boxShadow: '0 0 8px #22D3EE'
            }}
          />
        ) : (
          // Standard / Interactive Mode: Futuristic Glowing Arrow Pointer
          <motion.div
            animate={{
              scale: cursorState === 'button' ? 1.15 : cursorState === 'project' ? 1.05 : 1,
              rotate: cursorState === 'button' ? -8 : 0
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            style={{ position: 'relative' }}
          >
            <svg 
              width="28" 
              height="28" 
              viewBox="0 0 28 28" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: 'block', overflow: 'visible' }}
            >
              <defs>
                {/* Cyan to Electric Violet & Magenta Gradient */}
                <linearGradient id="cursorNeonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22D3EE" />
                  <stop offset="55%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#D946EF" />
                </linearGradient>

                {/* Layered Neon Glow Filter */}
                <filter id="cursorNeonFilter" x="-40%" y="-40%" width="180%" height="180%">
                  <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#22D3EE" floodOpacity="0.85" />
                  <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#8B5CF6" floodOpacity="0.65" />
                </filter>
              </defs>

              {/* Futuristic Arrow Path (Matching Reference Image) */}
              <path
                d="M3.5 3.5 L10.8 24.5 L14.5 16.5 L22.8 14.8 L3.5 3.5 Z"
                fill="rgba(10, 14, 28, 0.88)"
                stroke="url(#cursorNeonGradient)"
                strokeWidth="1.8"
                strokeLinejoin="round"
                strokeLinecap="round"
                filter="url(#cursorNeonFilter)"
              />

              {/* Luminous Core Dot */}
              <circle cx="11" cy="11" r="1.6" fill="#FFFFFF" />
              <circle cx="11" cy="11" r="3" fill="#22D3EE" opacity="0.6" />
            </svg>

            {/* Context Badge: "VIEW PROJECT" on project card hover */}
            <AnimatePresence>
              {cursorState === 'project' && (
                <motion.div
                  className="custom-cursor-badge"
                  initial={{ opacity: 0, scale: 0.85, x: -8 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.85, x: -8 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <span className="custom-cursor-badge-dot" />
                  <span>VIEW PROJECT</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>

    </div>
  );
}
