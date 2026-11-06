import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { educationData } from '../data/educationData';
import { 
  GraduationCap, 
  School, 
  Laptop, 
  BookOpen, 
  Layers, 
  Calendar,
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

// Icon Map for dynamic lookup
const iconMap = {
  GraduationCap,
  School,
  Laptop,
  BookOpen,
  Layers
};

/**
 * Design 02: Premium Curved Education Carousel
 * 
 * - Clean Light Theme palette:
 *   Background: #F8FAFF
 *   Card: #FFFFFF
 *   Primary text: #111827, Secondary text: #64748B
 *   Primary accent: #4F46E5, Secondary accent: #7C3AED, Border: #E2E8F0
 * - 3D Curved arrangement with CSS perspective:
 *   Center: rotateY(0deg) scale(1) with soft violet elevation
 *   Left: rotateY(15deg) scale(0.92) angled toward center
 *   Right: rotateY(-15deg) scale(0.92) angled toward center
 * - Circular navigation arrows & 3-dot pagination
 * - Touch swipe gestures & keyboard arrow navigation
 */
export default function EducationCarousel() {
  // Center card default: index 1 (Intermediate in center, 10th on left, B.Tech on right)
  const [activeIndex, setActiveIndex] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  // Touch swipe support
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = educationData.length;
  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1024;

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Touch event handlers for swipe gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Helper to determine relative 3D carousel slot ('center' | 'left' | 'right')
  const getSlot = (index) => {
    const diff = (index - activeIndex + total) % total;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    return 'left';
  };

  return (
    <div 
      className="education-carousel-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1180px',
        margin: '0 auto',
        padding: '1rem 0 2.5rem'
      }}
    >
      {/* ============================================================
          CAROUSEL STAGE:
          - Left & Right Circular Arrow Buttons
          - 3D Perspective Curved Cards
          - Glowing Floor Pedestal Oval Ring
         ============================================================ */}
      <div 
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: isMobile ? '380px' : '440px'
        }}
      >
        {/* Previous Button (Circular White Glass) */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: '#FFFFFF', borderColor: '#4F46E5', color: '#4F46E5' }}
          whileTap={{ scale: 0.92 }}
          onClick={handlePrev}
          aria-label="Previous education card"
          style={{
            position: 'absolute',
            left: isMobile ? '4px' : '-16px',
            zIndex: 30,
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            color: '#111827',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease',
            outline: 'none'
          }}
        >
          <ChevronLeft size={22} strokeWidth={2.2} />
        </motion.button>

        {/* 3D Curved Cards Stage */}
        <div 
          className="curved-carousel-stage"
          style={{
            position: 'relative',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: isMobile ? '1rem' : isTablet ? '1rem' : '1.75rem',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1200px',
            perspectiveOrigin: '50% 50%',
            transformStyle: 'preserve-3d',
            zIndex: 10
          }}
        >
          {educationData.map((item, index) => {
            const slot = getSlot(index);
            const isCenter = slot === 'center';
            const isLeft = slot === 'left';
            const isRight = slot === 'right';

            // On mobile, only display the active card
            if (isMobile && !isCenter) {
              return null;
            }

            const MainIcon = iconMap[item.icon] || GraduationCap;
            const WatermarkIcon = iconMap[item.watermarkIcon] || BookOpen;
            const isCompleted = item.statusType === 'completed';

            // 3D Curved transforms according to Design 02 spec:
            // Center: rotateY(0deg) scale(1)
            // Left: rotateY(15deg) scale(0.92)
            // Right: rotateY(-15deg) scale(0.92)
            let cardTransform = 'perspective(1200px) rotateY(0deg) scale(1)';
            let transformOrigin = 'center center';
            let opacity = 1;
            let zIndex = 10;
            let cardBorder = '1.5px solid #C7D2FE';
            let cardShadow = '0 20px 45px -12px rgba(79, 70, 229, 0.18), 0 2px 8px rgba(0, 0, 0, 0.04)';

            if (!isMobile) {
              if (isLeft) {
                cardTransform = isTablet 
                  ? 'perspective(1200px) rotateY(10deg) scale(0.94)'
                  : 'perspective(1200px) rotateY(15deg) scale(0.92)';
                transformOrigin = 'right center';
                opacity = 0.9;
                zIndex = 5;
                cardBorder = '1px solid #E2E8F0';
                cardShadow = '0 10px 25px -6px rgba(79, 70, 229, 0.08), 0 4px 10px rgba(0, 0, 0, 0.03)';
              } else if (isRight) {
                cardTransform = isTablet 
                  ? 'perspective(1200px) rotateY(-10deg) scale(0.94)'
                  : 'perspective(1200px) rotateY(-15deg) scale(0.92)';
                transformOrigin = 'left center';
                opacity = 0.9;
                zIndex = 5;
                cardBorder = '1px solid #E2E8F0';
                cardShadow = '0 10px 25px -6px rgba(79, 70, 229, 0.08), 0 4px 10px rgba(0, 0, 0, 0.03)';
              }
            }

            return (
              <motion.article
                key={item.id}
                tabIndex={0}
                role="group"
                aria-label={`${item.qualification} - ${item.institution}`}
                onClick={() => setActiveIndex(index)}
                whileHover={!isMobile ? { scale: isCenter ? 1.02 : 0.96 } : {}}
                style={{
                  position: 'relative',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  border: cardBorder,
                  boxShadow: cardShadow,
                  padding: '1.75rem 1.55rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '350px',
                  cursor: isCenter ? 'default' : 'pointer',
                  transform: cardTransform,
                  transformOrigin,
                  opacity,
                  zIndex,
                  transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.35s ease, border-color 0.35s ease, opacity 0.35s ease',
                  overflow: 'hidden',
                  userSelect: 'none'
                }}
              >
                {/* Background Watermark Icon (matching reference screenshot) */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '18px',
                    right: '18px',
                    color: '#A5B4FC',
                    opacity: isCenter ? 0.45 : 0.25,
                    pointerEvents: 'none',
                    transition: 'opacity 0.3s ease'
                  }}
                >
                  <WatermarkIcon size={56} strokeWidth={1.4} />
                </div>

                {/* ============================================================
                    TOP ROW: Number Badge (Left) + Center Icon
                   ============================================================ */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    {/* Number Badge: 01, 02, 03 */}
                    <span 
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        color: '#4F46E5',
                        backgroundColor: '#EEF2FF',
                        border: '1px solid #C7D2FE',
                        padding: '0.18rem 0.58rem',
                        borderRadius: '999px',
                        letterSpacing: '0.02em'
                      }}
                    >
                      {item.number}
                    </span>

                    {/* Placeholder for layout balance */}
                    <div style={{ width: '32px' }} />
                  </div>

                  {/* Center Prominent Glowing Icon Badge */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-0.35rem', marginBottom: '1.15rem' }}>
                    <div 
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)',
                        border: '1.5px solid #C7D2FE',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#4F46E5',
                        boxShadow: isCenter ? '0 6px 18px rgba(79, 70, 229, 0.2)' : '0 4px 12px rgba(79, 70, 229, 0.1)'
                      }}
                    >
                      <MainIcon size={27} strokeWidth={2.2} />
                    </div>
                  </div>

                  {/* ============================================================
                      CARD CONTENT: Qualification, Institution, Specialization
                     ============================================================ */}
                  <div style={{ textAlign: 'center', padding: '0 0.4rem' }}>
                    
                    {/* Qualification Name */}
                    <h3 
                      style={{ 
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        color: '#111827',
                        margin: '0 0 0.35rem 0',
                        lineHeight: 1.25,
                        letterSpacing: '-0.025em'
                      }}
                    >
                      {item.qualification}
                    </h3>

                    {/* Institution Name */}
                    <div 
                      style={{ 
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: '#4F46E5',
                        lineHeight: 1.35,
                        marginBottom: '0.45rem'
                      }}
                    >
                      {item.institution}
                    </div>

                    {/* Specialization / Stream */}
                    <p 
                      style={{ 
                        fontSize: '0.8rem',
                        color: '#64748B',
                        lineHeight: 1.5,
                        margin: 0
                      }}
                    >
                      {item.specialization}
                    </p>

                  </div>
                </div>

                {/* ============================================================
                    BOTTOM ROW: Duration (Left) + Status Pill (Right)
                   ============================================================ */}
                <div 
                  style={{
                    marginTop: '1.35rem',
                    paddingTop: '0.9rem',
                    borderTop: '1px solid #F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem'
                  }}
                >
                  {/* Calendar Icon + Date */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#475569', fontSize: '0.76rem', fontFamily: 'var(--font-mono)' }}>
                    <Calendar size={13} style={{ color: '#64748B' }} />
                    <span>{item.duration}</span>
                  </div>

                  {/* Status Badge: Completed (Soft Green) / Pursuing (Soft Amber) */}
                  <span 
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      padding: '0.2rem 0.65rem',
                      borderRadius: '999px',
                      backgroundColor: isCompleted ? '#DCFCE7' : '#FEF3C7',
                      border: isCompleted ? '1px solid #86EFAC' : '1px solid #FDE68A',
                      color: isCompleted ? '#15803D' : '#B45309',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                  >
                    <span 
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: isCompleted ? '#16A34A' : '#D97706'
                      }}
                    />
                    {item.status}
                  </span>
                </div>

              </motion.article>
            );
          })}
        </div>

        {/* Next Button (Circular White Glass) */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: '#FFFFFF', borderColor: '#4F46E5', color: '#4F46E5' }}
          whileTap={{ scale: 0.92 }}
          onClick={handleNext}
          aria-label="Next education card"
          style={{
            position: 'absolute',
            right: isMobile ? '4px' : '-16px',
            zIndex: 30,
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            color: '#111827',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease',
            outline: 'none'
          }}
        >
          <ChevronRight size={22} strokeWidth={2.2} />
        </motion.button>

        {/* ============================================================
            GLOWING 3D PEDESTAL / PLATFORM (Matching Reference Image)
            - Soft blue-violet glowing elliptical base on the floor
           ============================================================ */}
        {!isMobile && (
          <div 
            className="curved-stage-pedestal"
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '92%',
              maxWidth: '960px',
              height: '110px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, rgba(124, 58, 237, 0.09) 0%, rgba(79, 70, 229, 0.04) 50%, transparent 75%)',
              border: '2px solid rgba(199, 210, 254, 0.85)',
              boxShadow: '0 0 35px rgba(124, 58, 237, 0.12), inset 0 0 25px rgba(79, 70, 229, 0.08)',
              pointerEvents: 'none',
              zIndex: 1
            }}
          />
        )}
      </div>

      {/* ============================================================
          PAGINATION DOTS: (○ ● ○)
          - 3 dots with active elongated pill
         ============================================================ */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '0.65rem',
          marginTop: '1.75rem',
          position: 'relative',
          zIndex: 15
        }}
      >
        {educationData.map((_, idx) => {
          const isDotActive = idx === activeIndex;
          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Select education card ${idx + 1}`}
              style={{
                width: isDotActive ? '26px' : '9px',
                height: '9px',
                borderRadius: '999px',
                backgroundColor: isDotActive ? '#4F46E5' : '#CBD5E1',
                border: 'none',
                boxShadow: isDotActive ? '0 0 10px rgba(79, 70, 229, 0.45)' : 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
