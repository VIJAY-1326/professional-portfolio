import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { educationHistory } from '../data/portfolioData';
import EducationCard from './EducationCard';
import { GraduationCap, Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer, defaultViewport } from '../utils/animations';
import './Education.css';

/**
 * Premium Interactive Glassmorphism 3D Education Section
 * - Luxury Dark Futuristic Theme (#080A12, #101525, rgba(255, 255, 255, 0.08))
 * - Exactly THREE education cards aligned horizontally on desktop in a 3D Triptych
 * - Ultra-premium frosted glass with specular highlight, ambient orbs, and neon glows
 */
export default function Education() {
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1024;

  return (
    <section 
      id="education" 
      className="section-wrapper education-section-viewport"
    >
      {/* Background ambient futuristic neon gradient orbs for glass refraction */}
      <div className="edu-ambient-glow glow-violet" aria-hidden="true" />
      <div className="edu-ambient-glow glow-cyan" aria-hidden="true" />
      <div className="edu-ambient-glow glow-center" aria-hidden="true" />

      <div className="education-container-viewport">

        {/* Section Header with Skew Tag & Gradient Heading */}
        <motion.div 
          className="section-header education-header-compact" 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
         

          <h2 
            className="section-title education-title-compact"
            style={{
              fontSize: 'clamp(2.1rem, 3.4vw, 3rem)',
              marginBottom: '0.65rem',
              lineHeight: 1.2
            }}
          >
            Education &{' '}
            <span className="gradient-text-accent">
              Academic Milestones
            </span>
          </h2>

        

        </motion.div>

        {/* ============================================================
            3D PERSPECTIVE ROW STAGE (TRIPTYCH GLASS CARDS)
            - Center: Straight (Main Focus with neon violet aura, B.Tech Data Science)
            - Left: Bent inward (rotateY: 8deg, Intermediate MPC)
            - Right: Bent inward (rotateY: -8deg, Secondary School SSC)
           ============================================================ */}
        <div className="education-3d-stage">
          <motion.div 
            className="education-cards-grid"
            variants={staggerContainer(0.14)}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
          >
            {educationHistory.map((item, index) => (
              <EducationCard 
                key={item.id} 
                item={item} 
                index={index}
                isMobile={isMobile}
                isTablet={isTablet}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom Verified Institutional Accreditation Pill with Liquid Glass */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
          style={{
            marginTop: '3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          
        </motion.div>

      </div>
    </section>
  );
}
