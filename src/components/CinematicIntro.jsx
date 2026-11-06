import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';
import './CinematicIntro.css';

/**
 * Award-Winning Cinematic Intro Sequence
 * Minimalist Luxury • Kinetic Typography • 3D Three.js Warp
 *  - 0-100% digital progress counter
 *  - Cycling kinetic role titles (Creative Engineer -> Data Scientist -> Full Stack Architect)
 *  - Monumental typographic reveal: MALLA VIJAY SAI
 *  - Interactive 3D particle universe reacting to mouse motion
 *  - Click anywhere or press space to instantly enter with lightspeed warp
 *  - Fast 3.2s automatic reveal
 */
export default function CinematicIntro({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isWarping, setIsWarping] = useState(false);

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const isWarpingRef = useRef(false);

  const roles = [
    'SOFTWARE ARCHITECT',
    'DATA SCIENTIST',
    'FULL STACK ENGINEER',
    'SYSTEM DESIGNER'
  ];

  // Trigger Warp Exit and transition to Portfolio
  const handleWarp = () => {
    if (isWarpingRef.current) return;
    isWarpingRef.current = true;
    setIsWarping(true);

    setTimeout(() => {
      if (onComplete) onComplete();
    }, 550);
  };

  // 1. Three.js 3D Interactive WebGL Starfield & Holographic Rings
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // Particle Starfield
    const starCount = 550;
    const starPositions = new Float32Array(starCount * 3);
    const starVelocities = new Float32Array(starCount);
    const starColors = new Float32Array(starCount * 3);

    const cCyan = new THREE.Color(0x22d3ee);
    const cViolet = new THREE.Color(0x8b5cf6);
    const cWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 30;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 35;
      starVelocities[i] = 0.04 + Math.random() * 0.08;

      const c = i % 3 === 0 ? cCyan : i % 3 === 1 ? cViolet : cWhite;
      starColors[i * 3] = c.r;
      starColors[i * 3 + 1] = c.g;
      starColors[i * 3 + 2] = c.b;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // Floating 3D Geometric Ring
    const ringGeo = new THREE.TorusGeometry(3.6, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.25
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);

    // Mouse Tracking Parallax
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      targetX = ((e.clientX - width / 2) / width) * 1.5;
      targetY = ((e.clientY - height / 2) / height) * 1.5;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Animation Loop with Warp Acceleration
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      ring.rotation.z += 0.005;
      ring.rotation.y += 0.003;

      const positions = starGeo.attributes.position.array;
      const speedMultiplier = isWarpingRef.current ? 35 : 1.2;

      for (let i = 0; i < starCount; i++) {
        positions[i * 3 + 2] += starVelocities[i] * speedMultiplier;
        if (positions[i * 3 + 2] > 10) {
          positions[i * 3 + 2] = -25;
          positions[i * 3] = (Math.random() - 0.5) * 28;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 28;
        }
      }
      starGeo.attributes.position.needsUpdate = true;

      // Camera motion
      camera.position.x = currentX;
      camera.position.y = -currentY;

      if (isWarpingRef.current) {
        camera.position.z -= 0.25;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      starGeo.dispose();
      starMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  // 2. Timeline Orchestration & Counter (Fast 3.2s sequence)
  useEffect(() => {
    // Progress counter 0 to 100%
    const progressInterval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 45);

    // Fast cycling roles
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 800);

    // Auto Warp into portfolio at 3.2s
    const autoEnterTimer = setTimeout(() => {
      handleWarp();
    }, 3200);

    // Keyboard support: Escape / Space / Enter
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.code === 'Space' || e.key === 'Enter') {
        e.preventDefault();
        handleWarp();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(progressInterval);
      clearInterval(roleInterval);
      clearTimeout(autoEnterTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div 
      className={`cinematic-voyage-root ${isWarping ? 'is-warping' : ''}`}
      onClick={handleWarp}
      title="Click anywhere to enter portfolio"
    >
      {/* Three.js 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="voyage-webgl-canvas" />

      {/* Ambient Lighting Glow */}
      <div className="voyage-ambient-glow" />

      {/* Top Meta Bar */}
      <div className="voyage-top-meta">
        <div className="voyage-counter-badge">
          <span className="voyage-counter-dot" />
          <span>INITIALIZING // {percent < 10 ? `0${percent}` : percent}%</span>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleWarp();
          }}
          className="voyage-skip-hint"
        >
          <span>PRESS SPACE OR CLICK</span>
          <span>➔</span>
        </button>
      </div>

      {/* Center Cinematic Stage */}
      <main className="voyage-center-content">
        {/* Kinetic Eyebrow Role */}
        <AnimatePresence mode="wait">
          <motion.div
            key={roleIndex}
            initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="voyage-eyebrow-stream"
          >
            <Sparkles size={13} />
            <span>{roles[roleIndex]}</span>
          </motion.div>
        </AnimatePresence>

        {/* Monumental Hero Name Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="voyage-hero-title"
        >
          MALLA <span className="title-accent">VIJAY SAI</span>
        </motion.h1>

        {/* High-Impact Executive Statement */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="voyage-statement"
        >
          BUILDING SCALABLE WEB ARCHITECTURE • B.TECH DATA SCIENCE @ AITAM
        </motion.p>

        {/* Magnetic Interactive Enter Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="voyage-enter-pill"
        >
          <span className="voyage-enter-spark" />
          <span>ENTER PORTFOLIO</span>
          <ArrowRight size={14} />
        </motion.div>
      </main>

      {/* Bottom Progress Hairline */}
      <div className="voyage-bottom-hairline">
        <div 
          className="voyage-bottom-hairline-fill" 
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Bottom Telemetry */}
      <div className="voyage-bottom-telemetry">
        <span>AITAM // TEKKALI, AP</span>
        <span>FLAGSHIP: RESTAURA PLATFORM</span>
      </div>
    </div>
  );
}
