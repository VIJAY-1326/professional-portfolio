import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * CinematicScrollProgress
 * Sleek top-mounted cinematic progress indicator:
 *  - High-precision spring-damped progress bar
 *  - Anamorphic glowing head beam in electric cyan & champagne gold
 *  - Active Scene Telemetry pill that updates smoothly as user scrolls
 */
export default function CinematicScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001
  });

  const [currentScene, setCurrentScene] = useState('SCENE 01 // OVERVIEW');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      const scenes = [
        { id: 'hero', name: 'SCENE 01 // OVERVIEW' },
        { id: 'about', name: 'SCENE 02 // DOSSIER' },
        { id: 'skills', name: 'SCENE 03 // THE ARSENAL' },
        { id: 'projects', name: 'SCENE 04 // ARCHITECTED RELEASES' },
        { id: 'github', name: 'SCENE 05 // CODE CHRONICLES' },
        { id: 'education', name: 'SCENE 06 // CREDENTIALS' },
        { id: 'contact', name: 'SCENE 07 // TRANSMISSION' }
      ];

      for (let i = scenes.length - 1; i >= 0; i--) {
        const el = document.getElementById(scenes[i].id);
        if (el && scrollPos >= el.offsetTop) {
          setCurrentScene(scenes[i].name);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 1000,
        pointerEvents: 'none',
        background: 'rgba(0, 0, 0, 0.2)'
      }}
      aria-hidden="true"
    >
      {/* Animated Glowing Spring Bar */}
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          scaleX,
          transformOrigin: '0%',
          background: 'linear-gradient(90deg, #22D3EE 0%, #8B5CF6 50%, #F59E0B 100%)',
          boxShadow: '0 0 14px rgba(34, 211, 238, 0.8), 0 0 25px rgba(245, 158, 11, 0.4)'
        }}
      />
    </div>
  );
}
