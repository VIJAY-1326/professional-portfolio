/**
 * Global Framer Motion Animation System
 * Premium, polished, modern animation variants and easing curves.
 * Configured with 20-30% viewport trigger for elegant scroll reveals.
 */

// Premium Cubic-Bezier Curves
export const EASINGS = {
  luxury: [0.16, 1, 0.3, 1], // Smooth deceleration, snappy start
  gentle: [0.22, 1, 0.36, 1], // Natural, warm feel
  spring: { type: 'spring', damping: 25, stiffness: 300 },
  bouncy: { type: 'spring', damping: 15, stiffness: 200 }
};

// Global scroll-reveal viewport configuration:
// Smooth, responsive trigger as elements approach the viewport
export const defaultViewport = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -60px 0px'
};

// Smooth Card Reveal Variant
export const smoothCard = {
  hidden: { 
    opacity: 0, 
    y: 35,
    scale: 0.97
  },
  visible: (custom = {}) => ({
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: custom.duration || 0.65, 
      delay: custom.delay || 0,
      ease: EASINGS.luxury 
    }
  })
};

// Fade In Up Entrance (40px travel distance, 0.7s duration, refined luxury ease)
export const fadeUp = {
  hidden: { 
    opacity: 0, 
    y: 40 
  },
  visible: (custom = {}) => ({
    opacity: 1, 
    y: 0,
    transition: { 
      duration: custom.duration || 0.7, 
      delay: custom.delay || 0,
      ease: EASINGS.luxury 
    }
  })
};

export const fadeInUp = fadeUp;

// Fade In Down Entrance
export const fadeInDown = {
  hidden: { 
    opacity: 0, 
    y: -30 
  },
  visible: (custom = {}) => ({
    opacity: 1, 
    y: 0,
    transition: { 
      duration: custom.duration || 0.7, 
      delay: custom.delay || 0,
      ease: EASINGS.luxury 
    }
  })
};

// Pure Fade In
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: { 
      duration: custom.duration || 0.6, 
      delay: custom.delay || 0,
      ease: 'easeOut'
    }
  })
};

// Slide In From Left
export const slideFromLeft = {
  hidden: { 
    opacity: 0, 
    x: -40 
  },
  visible: (custom = {}) => ({
    opacity: 1, 
    x: 0,
    transition: { 
      duration: custom.duration || 0.7, 
      delay: custom.delay || 0,
      ease: EASINGS.luxury 
    }
  })
};

export const slideInLeft = slideFromLeft;

// Slide In From Right
export const slideFromRight = {
  hidden: { 
    opacity: 0, 
    x: 40 
  },
  visible: (custom = {}) => ({
    opacity: 1, 
    x: 0,
    transition: { 
      duration: custom.duration || 0.7, 
      delay: custom.delay || 0,
      ease: EASINGS.luxury 
    }
  })
};

export const slideInRight = slideFromRight;

// Scale In (for Modals, Profile Avatars, Cards)
export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.92 
  },
  visible: (custom = {}) => ({
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: custom.duration || 0.55, 
      delay: custom.delay || 0,
      ease: EASINGS.luxury 
    }
  })
};

// Staggered Container for Children
export const staggerContainer = (staggerChildren = 0.12, delayChildren = 0.05) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

// Stagger Item (Child of staggerContainer)
export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: EASINGS.luxury
    }
  }
};

// Button Micro-interactions
export const buttonHover = {
  scale: 1.03,
  y: -2,
  transition: { duration: 0.2, ease: EASINGS.luxury }
};

export const buttonTap = {
  scale: 0.97,
  y: 0,
  transition: { duration: 0.1, ease: 'easeOut' }
};

// Interactive Card Hover
export const cardHover = {
  y: -6,
  transition: { duration: 0.3, ease: EASINGS.luxury }
};
