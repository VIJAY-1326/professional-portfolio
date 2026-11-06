import { useState, useRef, useCallback } from 'react';

/**
 * use3DTilt — Custom Hook for high-performance 3D perspective card tilt
 * Computes rotation angles (-maxAngle to +maxAngle) and dynamic light reflection glare
 * based on cursor position relative to the element bounding box.
 */
export function use3DTilt({
  maxTilt = 12,
  perspective = 1000,
  scale = 1.02,
  glare = true
} = {}) {
  const [style, setStyle] = useState({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
  });

  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });
  const elementRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.08s ease-out'
    });

    if (glare) {
      setGlarePosition({
        x: glareX,
        y: glareY,
        opacity: 0.18
      });
    }
  }, [maxTilt, perspective, scale, glare]);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    });

    if (glare) {
      setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [perspective, glare]);

  return {
    ref: elementRef,
    tiltProps: {
      ref: elementRef,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      style: {
        ...style,
        transformStyle: 'preserve-3d'
      }
    },
    glareStyle: glare ? {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      borderRadius: 'inherit',
      background: `radial-gradient(circle 280px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${glarePosition.opacity}), transparent 80%)`,
      transition: 'opacity 0.3s ease',
      zIndex: 10
    } : null
  };
}
