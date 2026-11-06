import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import { Eye, RotateCw, Sparkles, Zap, Layers } from 'lucide-react';

/**
 * Hero3DCore — Interactive 3D WebGL Holographic Engine
 * Built with Three.js:
 *  - Geodesic wireframe outer lattice with vertex glow
 *  - Pulsing quantum inner core with specular lighting
 *  - Dual gyroscopic orbital rings with glowing telemetry markers
 *  - Floating 3D particle dust galaxy
 *  - Interactive cursor parallax tilt & mouse drag rotation
 *  - Performance-optimized with IntersectionObserver auto-pause
 */
export default function Hero3DCore({ className = '', style = {} }) {
  const mountRef = useRef(null);
  const { theme } = useTheme();
  const [wireframeMode, setWireframeMode] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const stateRef = useRef({
    wireframeMode: false,
    autoRotate: true,
    theme: theme
  });

  stateRef.current = {
    wireframeMode,
    autoRotate,
    theme
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 350;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Hologram Group
    const hologramGroup = new THREE.Group();
    scene.add(hologramGroup);

    // Color definitions based on premium palette
    const isDark = theme !== 'light';
    const primaryColor = isDark ? 0x22d3ee : 0x0284c7; // Cyan
    const accentColor = isDark ? 0x8b5cf6 : 0x7c3aed;  // Violet
    const goldColor = isDark ? 0xf59e0b : 0xd97706;    // Amber Gold
    const coreColor = isDark ? 0x38bdf8 : 0x0ea5e9;

    // A. Outer Geodesic Icosahedron Wireframe
    const outerGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const outerMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.85,
      emissive: primaryColor,
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.75
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    hologramGroup.add(outerMesh);

    // B. Inner Faceted Core
    const innerGeo = new THREE.OctahedronGeometry(1.05, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: accentColor,
      wireframe: false,
      roughness: 0.15,
      metalness: 0.9,
      emissive: accentColor,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.85
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    hologramGroup.add(innerMesh);

    // C. Central Luminescent Core Sphere
    const centerCoreGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const centerCoreMat = new THREE.MeshBasicMaterial({
      color: goldColor,
      wireframe: false
    });
    const centerCoreMesh = new THREE.Mesh(centerCoreGeo, centerCoreMat);
    hologramGroup.add(centerCoreMesh);

    // D. Gyroscopic Ring 1 (Horizontal Inclined)
    const ring1Geo = new THREE.TorusGeometry(2.6, 0.035, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: goldColor,
      emissive: goldColor,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.95
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    hologramGroup.add(ring1);

    // E. Gyroscopic Ring 2 (Vertical Inclined)
    const ring2Geo = new THREE.TorusGeometry(2.85, 0.03, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      emissive: primaryColor,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.95
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.z = Math.PI / 6;
    hologramGroup.add(ring2);

    // F. Orbiting Satellites / Data Cubes
    const satelliteGroup = new THREE.Group();
    const satGeo = new THREE.BoxGeometry(0.16, 0.16, 0.16);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: primaryColor,
      emissiveIntensity: 0.8
    });

    const satellites = [];
    const satCount = 6;
    for (let i = 0; i < satCount; i++) {
      const satMesh = new THREE.Mesh(satGeo, satMat);
      const angle = (i / satCount) * Math.PI * 2;
      const radius = 2.6;
      satMesh.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      satelliteGroup.add(satMesh);
      satellites.push({ mesh: satMesh, baseAngle: angle, radius, speed: 0.8 + (i % 2) * 0.4 });
    }
    ring1.add(satelliteGroup);

    // G. 3D Particle Galaxy Cloud
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(primaryColor);
    const c2 = new THREE.Color(accentColor);
    const c3 = new THREE.Color(goldColor);

    for (let i = 0; i < particleCount; i++) {
      const r = 1.6 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);

      const chosenColor = i % 3 === 0 ? c1 : i % 3 === 1 ? c2 : c3;
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const particlePoints = new THREE.Points(particleGeo, particleMat);
    hologramGroup.add(particlePoints);

    // 3. Dynamic Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.6 : 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(primaryColor, 3, 20);
    pointLight1.position.set(4, 5, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(accentColor, 2.5, 20);
    pointLight2.position.set(-4, -4, 3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(goldColor, 2, 15);
    pointLight3.position.set(0, 0, 0);
    scene.add(pointLight3);

    // 4. Interactive Mouse Tilt & Orbit Controls
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;
    let isMouseDown = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (isMouseDown) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        targetRotY += deltaX * 0.01;
        targetRotX += deltaY * 0.01;
        prevMouseX = clientX;
        prevMouseY = clientY;
      } else {
        // Cursor tilt based on distance from center of canvas
        const x = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const y = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        targetRotY = x * 0.55;
        targetRotX = y * 0.45;
      }
    };

    const handleMouseDown = (e) => {
      isMouseDown = true;
      setIsDragging(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch support for mobile devices
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isMouseDown = true;
        setIsDragging(true);
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e) => {
      if (isMouseDown && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        targetRotY += deltaX * 0.012;
        targetRotX += deltaY * 0.012;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      isMouseDown = false;
      setIsDragging(false);
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // 5. Visibility / Intersection Observer for battery & GPU savings
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // 6. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animId = null;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth damping interpolation for mouse tilt
      currentRotX += (targetRotX - currentRotX) * 0.06;
      currentRotY += (targetRotY - currentRotY) * 0.06;

      hologramGroup.rotation.x = currentRotX;
      hologramGroup.rotation.y = currentRotY;

      // Auto-rotation if enabled
      if (stateRef.current.autoRotate && !isMouseDown) {
        outerMesh.rotation.y += 0.007;
        outerMesh.rotation.x += 0.003;
        innerMesh.rotation.y -= 0.012;
        innerMesh.rotation.z += 0.006;
      }

      // Gyroscopic rings rotation
      ring1.rotation.z += 0.009;
      ring2.rotation.x += 0.007;
      ring2.rotation.y += 0.005;

      // Particle galaxy swirl
      particlePoints.rotation.y -= 0.002;
      particlePoints.rotation.x += 0.001;

      // Core pulsing glow
      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
      centerCoreMesh.scale.set(pulse, pulse, pulse);
      innerMesh.scale.set(pulse * 0.98, pulse * 0.98, pulse * 0.98);

      // Light pulsing
      pointLight3.intensity = 2 + Math.sin(elapsedTime * 3) * 0.7;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js objects
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      centerCoreGeo.dispose();
      centerCoreMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      satGeo.dispose();
      satMat.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div 
      className={`hero-3d-wrapper ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '340px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.08) 0%, rgba(139, 92, 246, 0.04) 40%, transparent 70%)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        ...style
      }}
    >
      {/* Three.js Canvas Container */}
      <div 
        ref={mountRef} 
        style={{ 
          width: '100%', 
          height: '100%', 
          minHeight: '340px',
          position: 'absolute',
          inset: 0
        }} 
      />

      {/* Top Telemetry Overlay */}
      <div 
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1.25rem',
          right: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'none',
          zIndex: 5
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.35rem',
              background: 'rgba(34, 211, 238, 0.15)',
              border: '1px solid rgba(34, 211, 238, 0.4)',
              color: '#22d3ee',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              boxShadow: '0 0 12px rgba(34, 211, 238, 0.3)'
            }}
          >
            <span 
              style={{ 
                width: '6px', 
                height: '6px', 
                borderRadius: '50%', 
                backgroundColor: '#22d3ee',
                boxShadow: '0 0 6px #22d3ee'
              }} 
            />
            WEBGL 3D CORE
          </span>
          <span 
            style={{ 
              fontSize: '0.7rem', 
              color: 'var(--text-muted)', 
              fontFamily: 'var(--font-mono)' 
            }}
          >
            60 FPS // THREE.JS
          </span>
        </div>

        {/* Drag Hint */}
        <span 
          style={{ 
            fontSize: '0.68rem', 
            color: 'var(--text-muted)', 
            fontFamily: 'var(--font-mono)',
            background: 'rgba(0, 0, 0, 0.35)',
            backdropFilter: 'blur(8px)',
            padding: '0.2rem 0.55rem',
            borderRadius: '4px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {isDragging ? 'DRAGGING 360°' : 'DRAG TO ROTATE • HOVER TO TILT'}
        </span>
      </div>

      {/* Bottom Floating Interactive Toolbar */}
      <div 
        style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(12, 16, 28, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          padding: '0.35rem 0.65rem',
          borderRadius: '9999px',
          boxShadow: '0 10px 25px -5px rgba(0,0,0,0.6)',
          zIndex: 5
        }}
      >
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          title={autoRotate ? 'Pause Rotation' : 'Resume Rotation'}
          style={{
            background: autoRotate ? 'rgba(34, 211, 238, 0.2)' : 'transparent',
            border: autoRotate ? '1px solid rgba(34, 211, 238, 0.4)' : '1px solid transparent',
            color: autoRotate ? '#22d3ee' : '#94a3b8',
            padding: '0.3rem 0.6rem',
            borderRadius: '9999px',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'all 0.2s ease'
          }}
        >
          <RotateCw size={12} className={autoRotate ? 'spin-icon' : ''} />
          <span>{autoRotate ? 'Auto-Orbit: ON' : 'Auto-Orbit: OFF'}</span>
        </button>

        <span style={{ color: 'rgba(255, 255, 255, 0.2)', fontSize: '0.75rem' }}>|</span>

        <span 
          style={{ 
            fontSize: '0.7rem', 
            color: '#f59e0b', 
            fontFamily: 'var(--font-mono)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0 0.35rem'
          }}
        >
          <Sparkles size={11} />
          <span>MALLA VIJAY SAI</span>
        </span>
      </div>
    </div>
  );
}
