import React, { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import './CanvasBackground.css';

/**
 * CanvasBackground Component — Executive Developer Neural & Matrix Architecture
 * Custom built with HTML5 Canvas 2D:
 *  - Interactive Isometric Blueprint Dot Matrix Grid
 *  - Decoupled API Neural Network with live filament routing
 *  - Floating Developer Code Tokens & Micro-Glyphs ({ }, </>, =>, 01, API, SQL)
 *  - Interactive Cursor Data Impulses & Network Filament illumination
 *  - Deep Obsidian Midnight Background (#030508)
 *  - DPR scaling, 60fps performance, auto-pausing when tab is hidden
 */
export default function CanvasBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  const themeRef = useRef(theme);
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let width = 0;
    let height = 0;
    let isVisible = true;
    let time = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Theme Lerp State (1 = Dark, 0 = Light)
    let currentThemeProgress = themeRef.current === 'dark' ? 1.0 : 0.0;
    let targetThemeProgress = themeRef.current === 'dark' ? 1.0 : 0.0;
    const lerp = (a, b, t) => a + (b - a) * t;

    // Mouse Tracking with smooth lerp
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 180,
      isHovering: false
    };

    let scrollY = 0;
    let targetScrollY = 0;

    // -------------------------------------------------------------------------
    // 1. Developer Neural Nodes Setup
    // -------------------------------------------------------------------------
    let nodes = [];
    const initNodes = () => {
      const isMobile = width < 768;
      const count = isMobile ? 45 : Math.min(Math.floor((width * height) / 14000), 110);
      nodes = [];

      for (let i = 0; i < count; i++) {
        const depth = Math.random() * 0.7 + 0.6; // 0.6 (far) to 1.3 (near)
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35 * depth,
          vy: (Math.random() - 0.5) * 0.35 * depth,
          radius: (Math.random() * 1.6 + 1.0) * depth,
          depth,
          alphaBase: lerp(0.25, 0.65, (depth - 0.6) / 0.7),
          colorVariant: i % 3, // 0 = Cyan, 1 = Violet, 2 = Soft Amber/Sky
          pulseOffset: Math.random() * Math.PI * 2
        });
      }
    };

    // -------------------------------------------------------------------------
    // 2. Floating Developer Code Tokens (Subtle Parallax Ambience)
    // -------------------------------------------------------------------------
    const codeTokens = ['{ }', '</>', '=>', 'async', '01', 'git', 'API', 'SQL', '//', 'fn()'];
    let floatingGlyphs = [];
    const initGlyphs = () => {
      const isMobile = width < 768;
      const count = isMobile ? 6 : 14;
      floatingGlyphs = [];

      for (let i = 0; i < count; i++) {
        floatingGlyphs.push({
          text: codeTokens[i % codeTokens.length],
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: -Math.random() * 0.2 - 0.05, // Gentle upward drift
          alpha: Math.random() * 0.12 + 0.05,
          size: Math.floor(Math.random() * 3 + 11), // 11px to 14px
          depth: Math.random() * 0.5 + 0.5
        });
      }
    };

    // -------------------------------------------------------------------------
    // 3. Resize Handler with DPR Scaling
    // -------------------------------------------------------------------------
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initNodes();
      initGlyphs();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse Tracking
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible && !animId && !prefersReducedMotion) {
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // -------------------------------------------------------------------------
    // 4. Main 60FPS Render Loop
    // -------------------------------------------------------------------------
    const render = () => {
      if (!isVisible) {
        animId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Mouse and Scroll Lerp
      mouse.x = lerp(mouse.x, mouse.targetX, 0.08);
      mouse.y = lerp(mouse.y, mouse.targetY, 0.08);
      scrollY = lerp(scrollY, targetScrollY, 0.06);

      // Theme Interpolation
      targetThemeProgress = themeRef.current === 'dark' ? 1.0 : 0.0;
      currentThemeProgress = lerp(currentThemeProgress, targetThemeProgress, 0.07);
      const darkFactor = currentThemeProgress;
      const isDark = darkFactor > 0.5;

      // =======================================================================
      // Layer 1: True Obsidian Midnight Background Fill (#030508)
      // =======================================================================
      const bgR = Math.round(lerp(248, 3, darkFactor));
      const bgG = Math.round(lerp(250, 5, darkFactor));
      const bgB = Math.round(lerp(252, 8, darkFactor));
      ctx.fillStyle = `rgb(${bgR}, ${bgG}, ${bgB})`;
      ctx.fillRect(0, 0, width, height);

      // =======================================================================
      // Layer 2: Subtle Interactive Developer Blueprint Dot Grid
      // =======================================================================
      const gridSpacing = 42;
      const gridDotRadius = 1;
      const baseGridAlpha = lerp(0.04, 0.12, darkFactor);

      for (let x = gridSpacing / 2; x < width; x += gridSpacing) {
        for (let y = gridSpacing / 2; y < height; y += gridSpacing) {
          let dotAlpha = baseGridAlpha;

          // Proximity glow to cursor
          if (mouse.isHovering) {
            const dx = mouse.x - x;
            const dy = mouse.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
              const boost = (1 - dist / mouse.radius) * 0.35;
              dotAlpha += boost;
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, gridDotRadius, 0, Math.PI * 2);
          ctx.fillStyle = isDark 
            ? `rgba(34, 211, 238, ${dotAlpha})` 
            : `rgba(2, 132, 199, ${dotAlpha * 0.8})`;
          ctx.fill();
        }
      }

      // =======================================================================
      // Layer 3: Interactive Cursor Ambient Spotlight
      // =======================================================================
      if (mouse.isHovering && mouse.x > 0 && mouse.y > 0) {
        ctx.save();
        const spotlight = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.6
        );
        const glowCyanAlpha = lerp(0.03, 0.07, darkFactor);
        const glowVioletAlpha = lerp(0.015, 0.04, darkFactor);

        spotlight.addColorStop(0, `rgba(34, 211, 238, ${glowCyanAlpha})`);
        spotlight.addColorStop(0.5, `rgba(139, 92, 246, ${glowVioletAlpha})`);
        spotlight.addColorStop(1, 'transparent');

        ctx.fillStyle = spotlight;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // =======================================================================
      // Layer 4: Floating Developer Code Glyphs (Deep Spatial Parallax)
      // =======================================================================
      ctx.save();
      for (let i = 0; i < floatingGlyphs.length; i++) {
        const g = floatingGlyphs[i];
        if (!prefersReducedMotion) {
          g.x += g.vx;
          g.y += g.vy;
          if (g.y < -30) g.y = height + 20;
          if (g.x < -30) g.x = width + 20;
          if (g.x > width + 30) g.x = -20;
        }

        const glyphY = g.y - scrollY * 0.05 * g.depth;
        ctx.font = `${g.size}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = isDark 
          ? `rgba(34, 211, 238, ${g.alpha * darkFactor * 1.4})` 
          : `rgba(2, 132, 199, ${g.alpha * 0.8})`;
        ctx.fillText(g.text, g.x, glyphY);
      }
      ctx.restore();

      // =======================================================================
      // Layer 5: Neural Architecture Nodes & Dynamic Circuit Filaments
      // =======================================================================
      const maxConnectDist = isDark ? 145 : 125;

      // Update Node Positions
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0) n.x = width;
          if (n.x > width) n.x = 0;
          if (n.y < 0) n.y = height;
          if (n.y > height) n.y = 0;

          // Mouse Interactive Repulsion
          if (mouse.isHovering) {
            const dx = n.x - mouse.x;
            const dy = n.y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius && dist > 1) {
              const force = (1 - dist / mouse.radius) * 1.8;
              n.x += (dx / dist) * force;
              n.y += (dy / dist) * force;
            }
          }
        }
      }

      // Draw Circuit Filaments between nodes
      ctx.save();
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const connectAlpha = (1 - dist / maxConnectDist) * 0.22 * darkFactor;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y - scrollY * 0.08 * n1.depth);
            ctx.lineTo(n2.x, n2.y - scrollY * 0.08 * n2.depth);
            ctx.strokeStyle = isDark
              ? `rgba(34, 211, 238, ${connectAlpha})`
              : `rgba(2, 132, 199, ${connectAlpha * 0.8})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Connect Node to Mouse Cursor
        if (mouse.isHovering) {
          const dx = n1.x - mouse.x;
          const dy = (n1.y - scrollY * 0.08 * n1.depth) - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const mouseConnectAlpha = (1 - dist / mouse.radius) * 0.35 * darkFactor;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y - scrollY * 0.08 * n1.depth);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = isDark
              ? `rgba(139, 92, 246, ${mouseConnectAlpha})`
              : `rgba(124, 58, 237, ${mouseConnectAlpha * 0.8})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = Math.sin(time * 2 + n.pulseOffset) * 0.15;
        const currentAlpha = Math.max(0.1, n.alphaBase + pulse);
        const nodeY = n.y - scrollY * 0.08 * n.depth;

        let nodeColor = isDark
          ? (n.colorVariant === 0 ? `rgba(34, 211, 238, ${currentAlpha})` : `rgba(139, 92, 246, ${currentAlpha})`)
          : `rgba(2, 132, 199, ${currentAlpha * 0.85})`;

        ctx.beginPath();
        ctx.arc(n.x, nodeY, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Node Glow for larger nodes
        if (n.radius > 1.6) {
          ctx.beginPath();
          ctx.arc(n.x, nodeY, n.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? (n.colorVariant === 0 ? 'rgba(34, 211, 238, 0.15)' : 'rgba(139, 92, 246, 0.12)')
            : 'rgba(2, 132, 199, 0.1)';
          ctx.fill();
        }
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div className="canvas-background-container" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="canvas-particle-surface"
      />
      <div className="canvas-cinematic-vignette" />
    </div>
  );
}
