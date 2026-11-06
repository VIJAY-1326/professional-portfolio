import React, { useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import './CanvasParticleBackground.css';

/**
 * Ultra-Luxury Developer Architecture Canvas
 * Features High-Production Floating Glassmorphic HTML & JSX Tag Capsules:
 *  - Frosted-glass capsule pills with 1px iridescent borders & specular glints
 *  - Authentic multi-token syntax highlighting (<, tag, attribute, "value", >)
 *  - 3-Layer Spatial 3D Parallax: Foreground, Midground, and Deep Background
 *  - Microgravity buoyant drift with natural rotational tilt & wave sway
 *  - Interactive Magnetic Proximity: Tags illuminate & deflect when cursor approaches
 *  - Architect-grade blueprint coordinate grid with intersection crosshairs (+)
 *  - Zero generic dots — pure, clean, award-winning software engineering aesthetic
 */
export default function CanvasParticleBackground() {
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

    // Smooth Theme Interpolation (0.0 = Light, 1.0 = Dark)
    let currentThemeProgress = themeRef.current === 'dark' ? 1.0 : 0.0;
    let targetThemeProgress = themeRef.current === 'dark' ? 1.0 : 0.0;
    const lerp = (a, b, t) => a + (b - a) * t;

    // Mouse Tracking Coordinates with Smooth Lerp
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 170,
      isHovering: false
    };

    const GRID_SIZE = 76;

    // Structured Developer Tags with Syntax Tokenization
    const TAG_PRESETS = [
      {
        tokens: [
          { text: '<', color: 'cyan' },
          { text: 'div', color: 'violet' },
          { text: ' className=', color: 'gold' },
          { text: '"app-root"', color: 'emerald' },
          { text: '>', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '</', color: 'cyan' },
          { text: 'div', color: 'violet' },
          { text: '>', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '<', color: 'cyan' },
          { text: 'section', color: 'violet' },
          { text: ' id=', color: 'gold' },
          { text: '"architecture"', color: 'emerald' },
          { text: '>', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '</', color: 'cyan' },
          { text: 'section', color: 'violet' },
          { text: '>', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '<', color: 'cyan' },
          { text: 'main', color: 'violet' },
          { text: ' role=', color: 'gold' },
          { text: '"main"', color: 'emerald' },
          { text: '>', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '<', color: 'cyan' },
          { text: 'code', color: 'violet' },
          { text: ' lang=', color: 'gold' },
          { text: '"jsx"', color: 'emerald' },
          { text: '>', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '</', color: 'cyan' },
          { text: 'code', color: 'violet' },
          { text: '>', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '<', color: 'cyan' },
          { text: 'React.Fragment', color: 'sky' },
          { text: '>', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '</', color: 'cyan' },
          { text: 'React.Fragment', color: 'sky' },
          { text: '>', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '<', color: 'cyan' },
          { text: 'App', color: 'sky' },
          { text: ' state=', color: 'gold' },
          { text: '{active}', color: 'amber' },
          { text: ' />', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '{ ', color: 'gold' },
          { text: 'children', color: 'white' },
          { text: ' }', color: 'gold' }
        ]
      },
      {
        tokens: [
          { text: '<', color: 'cyan' },
          { text: 'span', color: 'violet' },
          { text: ' glow=', color: 'gold' },
          { text: '{true}', color: 'amber' },
          { text: '>', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '</', color: 'cyan' },
          { text: 'span', color: 'violet' },
          { text: '>', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '<', color: 'cyan' },
          { text: 'canvas', color: 'sky' },
          { text: ' id=', color: 'gold' },
          { text: '"quantum-3d"', color: 'emerald' },
          { text: ' />', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '<', color: 'cyan' },
          { text: 'header', color: 'violet' },
          { text: ' blur=', color: 'gold' },
          { text: '"glass"', color: 'emerald' },
          { text: '>', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '</', color: 'cyan' },
          { text: 'header', color: 'violet' },
          { text: '>', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '<', color: 'cyan' },
          { text: 'button', color: 'violet' },
          { text: ' onClick=', color: 'gold' },
          { text: '{deploy}', color: 'amber' },
          { text: '>', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '</', color: 'cyan' },
          { text: 'button', color: 'violet' },
          { text: '>', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '<!-- ', color: 'slate' },
          { text: 'vijay-sai.portfolio', color: 'slate' },
          { text: ' -->', color: 'slate' }
        ]
      },
      {
        tokens: [
          { text: '<', color: 'cyan' },
          { text: 'style', color: 'violet' },
          { text: ' jsx global', color: 'gold' },
          { text: '>', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '</', color: 'cyan' },
          { text: 'style', color: 'violet' },
          { text: '>', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '<', color: 'cyan' },
          { text: 'h1', color: 'violet' },
          { text: ' className=', color: 'gold' },
          { text: '"hero-heading"', color: 'emerald' },
          { text: '>', color: 'cyan' }
        ]
      },
      {
        tokens: [
          { text: '</', color: 'cyan' },
          { text: 'h1', color: 'violet' },
          { text: '>', color: 'cyan' }
        ]
      }
    ];

    // Floating Glass Tag Capsule Instances
    let glassTags = [];

    const initGlassTags = () => {
      const isMobile = width < 768;
      const count = isMobile ? 12 : 22;
      glassTags = [];

      for (let i = 0; i < count; i++) {
        const preset = TAG_PRESETS[i % TAG_PRESETS.length];
        // 3 Spatial Depth Layers: 0.65 (Far), 0.95 (Mid), 1.25 (Near)
        const depthFactor = (i % 3 === 0) ? 0.65 : (i % 3 === 1) ? 0.95 : 1.25;

        glassTags.push({
          tokens: preset.tokens,
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.22 * depthFactor,
          vy: - (Math.random() * 0.22 + 0.12) * depthFactor, // Buoyant upward float
          tilt: (Math.random() - 0.5) * 0.12, // -0.06 to +0.06 radians
          tiltSpeed: (Math.random() - 0.5) * 0.005,
          depth: depthFactor,
          fontSize: Math.round(11 * depthFactor),
          baseAlpha: lerp(0.12, 0.26, (depthFactor - 0.65) / 0.6),
          wobblePhase: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.015 + 0.008,
          wobbleAmp: Math.random() * 1.5 + 0.8
        });
      }
    };

    // Linear Data Pulses along Grid Lines
    let gridBeams = [];
    const initGridBeams = () => {
      const isMobile = width < 768;
      const count = isMobile ? 6 : 10;
      gridBeams = [];

      for (let i = 0; i < count; i++) {
        const isHorizontal = Math.random() > 0.5;
        const maxIdx = Math.floor((isHorizontal ? height : width) / GRID_SIZE);
        const coord = Math.floor(Math.random() * maxIdx) * GRID_SIZE;

        gridBeams.push({
          isHorizontal,
          coord,
          pos: Math.random() * (isHorizontal ? width : height),
          length: Math.random() * 75 + 50,
          speed: Math.random() * 1.6 + 1.1,
          color: i % 2 === 0 ? 'cyan' : 'violet'
        });
      }
    };

    // Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      initGlassTags();
      initGridBeams();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse Listeners
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

    // Visibility Listener
    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible && !animId && !prefersReducedMotion) {
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Helper: Draw Rounded Rectangle with Fallback
    const drawRoundRect = (context, x, y, w, h, r) => {
      if (context.roundRect) {
        context.roundRect(x, y, w, h, r);
      } else {
        context.beginPath();
        context.moveTo(x + r, y);
        context.lineTo(x + w - r, y);
        context.quadraticCurveTo(x + w, y, x + w, y + r);
        context.lineTo(x + w, y + h - r);
        context.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        context.lineTo(x + r, y + h);
        context.quadraticCurveTo(x, y + h, x, y + h - r);
        context.lineTo(x, y + r);
        context.quadraticCurveTo(x, y, x + r, y);
        context.closePath();
      }
    };

    // Helper: Map Token Color to Hex/RGBA
    const getTokenColor = (type, alpha, isDark) => {
      if (isDark) {
        switch (type) {
          case 'cyan': return `rgba(34, 211, 238, ${alpha})`;
          case 'violet': return `rgba(167, 139, 250, ${alpha})`;
          case 'gold': return `rgba(245, 158, 11, ${alpha})`;
          case 'amber': return `rgba(251, 191, 36, ${alpha})`;
          case 'emerald': return `rgba(52, 211, 153, ${alpha})`;
          case 'sky': return `rgba(56, 189, 248, ${alpha})`;
          case 'slate': return `rgba(148, 163, 184, ${alpha})`;
          case 'white': default: return `rgba(248, 250, 252, ${alpha})`;
        }
      } else {
        switch (type) {
          case 'cyan': return `rgba(2, 132, 199, ${alpha * 0.95})`;
          case 'violet': return `rgba(124, 58, 237, ${alpha * 0.95})`;
          case 'gold': return `rgba(217, 119, 6, ${alpha * 0.95})`;
          case 'amber': return `rgba(180, 83, 9, ${alpha * 0.95})`;
          case 'emerald': return `rgba(16, 185, 129, ${alpha * 0.95})`;
          case 'sky': return `rgba(3, 105, 161, ${alpha * 0.95})`;
          case 'slate': return `rgba(71, 85, 105, ${alpha * 0.85})`;
          case 'white': default: return `rgba(15, 23, 42, ${alpha * 0.95})`;
        }
      }
    };

    // =========================================================================
    // 60FPS Render Loop: Glassmorphic Tag Capsules & 3D Spatial Parallax
    // =========================================================================
    const render = () => {
      if (!isVisible) {
        animId = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Smooth mouse lerp
      mouse.x = lerp(mouse.x, mouse.targetX, 0.12);
      mouse.y = lerp(mouse.y, mouse.targetY, 0.12);

      // Theme interpolation
      targetThemeProgress = themeRef.current === 'dark' ? 1.0 : 0.0;
      currentThemeProgress = lerp(currentThemeProgress, targetThemeProgress, 0.08);
      const darkFactor = currentThemeProgress;
      const isDark = darkFactor > 0.5;

      // -----------------------------------------------------------------------
      // 1. Base Canvas Surface (Matching portfolio --bg-main)
      // -----------------------------------------------------------------------
      const bgR = Math.round(lerp(248, 7, darkFactor));
      const bgG = Math.round(lerp(250, 9, darkFactor));
      const bgB = Math.round(lerp(252, 19, darkFactor));
      ctx.fillStyle = `rgb(${bgR}, ${bgG}, ${bgB})`;
      ctx.fillRect(0, 0, width, height);

      // -----------------------------------------------------------------------
      // 2. Blueprint Architectural Grid Lines
      // -----------------------------------------------------------------------
      ctx.save();
      const baseLineAlpha = lerp(0.026, 0.036, darkFactor);
      ctx.strokeStyle = isDark 
        ? `rgba(255, 255, 255, ${baseLineAlpha})` 
        : `rgba(15, 23, 42, ${baseLineAlpha * 1.2})`;
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();

      // -----------------------------------------------------------------------
      // 3. Grid Intersection Crosshairs (+)
      // -----------------------------------------------------------------------
      ctx.save();
      const crossSize = 3;
      const crossAlphaBase = lerp(0.06, 0.13, darkFactor);

      for (let x = GRID_SIZE; x < width; x += GRID_SIZE * 2) {
        for (let y = GRID_SIZE; y < height; y += GRID_SIZE * 2) {
          let crossAlpha = crossAlphaBase;
          if (mouse.isHovering) {
            const dist = Math.hypot(x - mouse.x, y - mouse.y);
            if (dist < mouse.radius) {
              crossAlpha = lerp(crossAlphaBase, 0.42, 1 - dist / mouse.radius);
            }
          }

          ctx.strokeStyle = isDark
            ? `rgba(34, 211, 238, ${crossAlpha})`
            : `rgba(2, 132, 199, ${crossAlpha * 0.9})`;
          ctx.lineWidth = 1;

          ctx.beginPath();
          ctx.moveTo(x - crossSize, y);
          ctx.lineTo(x + crossSize, y);
          ctx.moveTo(x, y - crossSize);
          ctx.lineTo(x, y + crossSize);
          ctx.stroke();
        }
      }
      ctx.restore();

      // -----------------------------------------------------------------------
      // 4. Linear Data Beams traveling along grid lines
      // -----------------------------------------------------------------------
      ctx.save();
      for (let i = 0; i < gridBeams.length; i++) {
        const b = gridBeams[i];

        if (!prefersReducedMotion) {
          b.pos += b.speed;
          const limit = b.isHorizontal ? width : height;
          if (b.pos > limit + b.length) {
            b.pos = -b.length;
            const maxIdx = Math.floor((b.isHorizontal ? height : width) / GRID_SIZE);
            b.coord = Math.floor(Math.random() * maxIdx) * GRID_SIZE;
          }
        }

        const head = b.pos;
        const tail = b.pos - b.length;

        const beamGrad = ctx.createLinearGradient(
          b.isHorizontal ? tail : b.coord,
          b.isHorizontal ? b.coord : tail,
          b.isHorizontal ? head : b.coord,
          b.isHorizontal ? b.coord : head
        );

        const beamColor = b.color === 'cyan' ? '34, 211, 238' : '139, 92, 246';
        const beamAlpha = lerp(0.3, 0.55, darkFactor);

        beamGrad.addColorStop(0, `rgba(${beamColor}, 0)`);
        beamGrad.addColorStop(0.7, `rgba(${beamColor}, ${beamAlpha * 0.4})`);
        beamGrad.addColorStop(1, `rgba(${beamColor}, ${beamAlpha})`);

        ctx.strokeStyle = beamGrad;
        ctx.lineWidth = 1.3;
        ctx.beginPath();

        if (b.isHorizontal) {
          ctx.moveTo(tail, b.coord);
          ctx.lineTo(head, b.coord);
        } else {
          ctx.moveTo(b.coord, tail);
          ctx.lineTo(b.coord, head);
        }
        ctx.stroke();
      }
      ctx.restore();

      // -----------------------------------------------------------------------
      // 5. Interactive Cursor Blueprint Spotlight
      // -----------------------------------------------------------------------
      if (mouse.isHovering && mouse.x > 0 && mouse.y > 0) {
        ctx.save();
        const spotlight = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.3
        );
        const spotCyan = lerp(0.04, 0.08, darkFactor);
        const spotViolet = lerp(0.02, 0.045, darkFactor);

        spotlight.addColorStop(0, `rgba(34, 211, 238, ${spotCyan})`);
        spotlight.addColorStop(0.5, `rgba(139, 92, 246, ${spotViolet})`);
        spotlight.addColorStop(1, 'transparent');

        ctx.fillStyle = spotlight;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // -----------------------------------------------------------------------
      // 6. Floating Glassmorphic HTML & JSX Tag Capsules
      // -----------------------------------------------------------------------
      ctx.save();
      ctx.textBaseline = 'middle';

      // Sort tags by depth so foreground tags render over background tags
      glassTags.sort((a, b) => a.depth - b.depth);

      for (let i = 0; i < glassTags.length; i++) {
        const tag = glassTags[i];

        if (!prefersReducedMotion) {
          // Floating motion: subtle horizontal sway + upward buoyancy
          tag.wobblePhase += tag.wobbleSpeed;
          const wobbleX = Math.sin(tag.wobblePhase) * tag.wobbleAmp * 0.35;
          tag.x += tag.vx + wobbleX;
          tag.y += tag.vy;
          tag.tilt += tag.tiltSpeed;

          // Interactive Mouse Repulsion & Fluid Magnetic Push
          if (mouse.isHovering) {
            const dx = tag.x - mouse.x;
            const dy = tag.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            if (dist < mouse.radius && dist > 0) {
              const force = (1 - dist / mouse.radius) * 1.6;
              tag.x += (dx / dist) * force;
              tag.y += (dy / dist) * force;
            }
          }

          // Screen Edge Wrapping
          if (tag.y < -50) {
            tag.y = height + 50;
            tag.x = Math.random() * width;
          }
          if (tag.x < -140) tag.x = width + 120;
          else if (tag.x > width + 140) tag.x = -120;
        }

        // 3D Parallax Coordinate Offset based on mouse position
        const parallaxX = mouse.isHovering ? (mouse.x - width / 2) * (tag.depth - 0.95) * 0.05 : 0;
        const parallaxY = mouse.isHovering ? (mouse.y - height / 2) * (tag.depth - 0.95) * 0.05 : 0;
        const renderX = tag.x + parallaxX;
        const renderY = tag.y + parallaxY;

        // Proximity calculation for hover illumination
        let proximityBoost = 0;
        let isHovered = false;
        if (mouse.isHovering) {
          const distToMouse = Math.hypot(renderX - mouse.x, renderY - mouse.y);
          if (distToMouse < mouse.radius * 0.85) {
            proximityBoost = (1 - distToMouse / (mouse.radius * 0.85));
            isHovered = true;
          }
        }

        // Computed Alpha
        const pulse = Math.sin(time * 0.8 + tag.wobblePhase) * 0.02;
        const finalAlpha = Math.min(0.9, Math.max(0.06, tag.baseAlpha + pulse + proximityBoost * 0.5));

        // Measure text tokens width
        ctx.font = `${tag.fontSize}px "JetBrains Mono", "Fira Code", monospace`;
        let totalTextWidth = 0;
        for (let t = 0; t < tag.tokens.length; t++) {
          totalTextWidth += ctx.measureText(tag.tokens[t].text).width;
        }

        const pillPaddingX = 9 * tag.depth;
        const pillHeight = (tag.fontSize + 10) * tag.depth;
        const pillWidth = totalTextWidth + pillPaddingX * 2;
        const cornerRadius = 6 * tag.depth;

        // Transform context for capsule position & natural rotational tilt
        ctx.save();
        ctx.translate(renderX, renderY);
        ctx.rotate(tag.tilt);

        // A. Draw Frosted Glass Capsule Fill
        ctx.beginPath();
        drawRoundRect(ctx, -pillWidth / 2, -pillHeight / 2, pillWidth, pillHeight, cornerRadius);

        const glassBgAlpha = isDark ? lerp(0.18, 0.42, proximityBoost) : lerp(0.5, 0.85, proximityBoost);
        ctx.fillStyle = isDark
          ? `rgba(16, 21, 37, ${glassBgAlpha * tag.depth})`
          : `rgba(255, 255, 255, ${glassBgAlpha * tag.depth})`;
        ctx.fill();

        // B. Draw Frosted Glass 1px Border (Iridescent Cyan/Violet Sheen)
        const borderAlpha = isDark ? lerp(0.18, 0.65, proximityBoost) : lerp(0.15, 0.45, proximityBoost);
        const borderGrad = ctx.createLinearGradient(
          -pillWidth / 2,
          -pillHeight / 2,
          pillWidth / 2,
          pillHeight / 2
        );

        if (isDark) {
          borderGrad.addColorStop(0, `rgba(34, 211, 238, ${borderAlpha})`);
          borderGrad.addColorStop(0.5, `rgba(139, 92, 246, ${borderAlpha * 0.8})`);
          borderGrad.addColorStop(1, `rgba(245, 158, 11, ${borderAlpha * 0.5})`);
        } else {
          borderGrad.addColorStop(0, `rgba(2, 132, 199, ${borderAlpha})`);
          borderGrad.addColorStop(1, `rgba(124, 58, 237, ${borderAlpha})`);
        }

        ctx.strokeStyle = borderGrad;
        ctx.lineWidth = 1;
        ctx.stroke();

        // C. Specular Glint Top Edge Highlight
        ctx.beginPath();
        ctx.moveTo(-pillWidth / 2 + cornerRadius, -pillHeight / 2);
        ctx.lineTo(pillWidth / 2 - cornerRadius, -pillHeight / 2);
        ctx.strokeStyle = isDark 
          ? `rgba(255, 255, 255, ${borderAlpha * 0.6})` 
          : `rgba(255, 255, 255, ${borderAlpha * 0.9})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // D. Draw Syntax-Highlighted Tokens
        let cursorX = -pillWidth / 2 + pillPaddingX;
        for (let t = 0; t < tag.tokens.length; t++) {
          const token = tag.tokens[t];
          ctx.fillStyle = getTokenColor(token.color, finalAlpha, isDark);
          ctx.fillText(token.text, cursorX, 0);
          cursorX += ctx.measureText(token.text).width;
        }

        ctx.restore();
      }
      ctx.restore();

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
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <div className="canvas-background-container" aria-hidden="true">
      <canvas ref={canvasRef} className="canvas-particle-surface" />
      <div className="canvas-blueprint-overlay" />
    </div>
  );
}
