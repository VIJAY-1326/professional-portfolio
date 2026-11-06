/**
 * Dedicated Projects Data for Malla Vijay Sai's Portfolio
 * Directly matching reference image media_1793082644675_80d67fab.png:
 * Card 03: Bliss Website (UI/UX PROJECT, Magenta Accent)
 * Card 01: Restaura (WEB APPLICATION, Cyan Accent)
 * Card 02: Hostel Outpass (FULL STACK PROJECT, Violet Accent)
 * Card 04: Portfolio (DEVELOPER TOOL, Amber Accent)
 */

export const projectsData = [
  {
    id: "blisswebsite",
    number: "03",
    title: "Bliss Website",
    fullTitle: "Bliss Business & Corporate Services Showcase",
    category: "UI/UX PROJECT",
    railLabel: "UI/UX",
    badge: "Live Deployment",
    tagline: "Modern responsive web portal built for professional corporate and agency service presentation.",
    description: "A modern, responsive multi-section corporate website featuring service tiers, portfolios, and pricing.",
    detailedDescription: "A clean, modern multi-section website designed for corporate service presentation, agency portfolio showcases, transparent pricing packages, and team member introductions. Employs semantic HTML5 markup, advanced CSS layout techniques (Flexbox & CSS Grid), and smooth user interaction points.",
    technologies: ["React", "Framer Motion", "Tailwind CSS"],
    modalTechnologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Flexbox & Grid"],
    githubUrl: "https://github.com/VIJAY-1326/blisswebsite.io",
    liveDemoUrl: "https://vijay-1326.github.io/blisswebsite.io/",
    status: "Live on GitHub Pages",
    accentColor: "#EC4899", // Magenta / Hot Pink
    secondaryAccent: "#F43F5E",
    glowColor: "rgba(236, 72, 153, 0.45)",
    previewType: "bliss",
    highlights: [
      "Responsive multi-viewport corporate presentation across smartphones, tablets, and desktops",
      "Structured services grid with custom SVG graphics and typography hierarchy",
      "Transparent multi-tier pricing table with highlighted featured commercial plans",
      "Interactive team directory with social touchpoints and contact forms"
    ],
    architecture: {
      frontend: "HTML5, Modern CSS Grid & Flexbox, JavaScript ES6",
      deployment: "GitHub Pages automated CI/CD pipeline",
      performance: "Optimized SVG assets, mobile-first breakpoints"
    }
  },
  {
    id: "restaura",
    number: "01",
    title: "Restaura",
    fullTitle: "Restaura — Full-Stack Gourmet Dining Platform",
    category: "WEB APPLICATION",
    railLabel: "Web App",
    badge: "Flagship Full-Stack",
    tagline: "Enterprise-grade culinary commerce and dining operations platform with Docker containerization.",
    description: "A full-stack gourmet dining platform with table reservations, menu management, and seamless user experience.",
    detailedDescription: "A comprehensive culinary platform built with a decoupled architecture featuring a modern React frontend and a robust Node.js/Express REST API backed by MySQL 8.0. Includes executive administration dashboards, dynamic multi-filter food catalogs, persistent cart & wishlist, secure JWT authentication with role authorization, and real-time order lifecycle tracking.",
    technologies: ["React", "Node.js", "Express", "MySQL"],
    modalTechnologies: ["React 18", "Vite", "Node.js", "Express.js", "MySQL 8.0", "Tailwind CSS", "Docker", "JWT"],
    githubUrl: "https://github.com/VIJAY-1326/restaura",
    liveDemoUrl: "https://github.com/VIJAY-1326/restaura",
    status: "Production Architecture",
    accentColor: "#00F0FF", // Electric Cyan
    secondaryAccent: "#0072FF",
    glowColor: "rgba(0, 240, 255, 0.5)",
    previewType: "restaura",
    highlights: [
      "Executive Admin Portal with live operational metrics and 30-day velocity analytics",
      "Dynamic gourmet food catalog with search, category filtering, and dietary preferences",
      "Robust REST API with automated MySQL schema migrations and seeding scripts",
      "Secure JWT authentication with role-based access control (Admin & Customer roles)",
      "Persistent cart and wishlist management with real-time tax and delivery calculations",
      "Containerized deployment workflow using Docker and multi-service docker-compose"
    ],
    architecture: {
      frontend: "React 18 + Vite + Tailwind CSS + Lucide React + React Router",
      backend: "Node.js + Express.js REST API on port 5005 with health endpoints",
      database: "MySQL 8.0 relational schema with strict foreign keys & transactions",
      devops: "Docker, Docker Compose, Railway & Render configurations"
    }
  },
  {
    id: "hostel-outpass",
    number: "02",
    title: "Hostel Outpass",
    fullTitle: "Hostel Outpass Automation System",
    category: "FULL STACK PROJECT",
    railLabel: "Full Stack",
    badge: "Active System",
    tagline: "Automated digital workflow system for student residential permission requests and security approval.",
    description: "An institutional hostel permission automation system with student submission and faculty digital clearance.",
    detailedDescription: "A web-based permission workflow platform developed to automate residential clearance slips for university campuses. Eliminates paper gate-passes through an automated three-tier lifecycle: student submission, warden/faculty digital sign-off, and gate security timestamp verification.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    modalTechnologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Role-Based Auth"],
    githubUrl: "https://github.com/VIJAY-1326/Hostel_Outpass",
    liveDemoUrl: "https://github.com/VIJAY-1326/Hostel_Outpass",
    status: "Active Repository",
    accentColor: "#A855F7", // Electric Purple / Violet
    secondaryAccent: "#7C3AED",
    glowColor: "rgba(168, 85, 247, 0.5)",
    previewType: "outpass",
    highlights: [
      "Role-based permission architecture (Student, Warden, Gate Security)",
      "Digital pass generation with timestamp verification and QR checkouts",
      "Real-time status tracking for pending, approved, and rejected applications",
      "Audit trail history logging to completely eliminate paper dependency"
    ],
    architecture: {
      stack: "MERN Stack (MongoDB, Express.js, React.js, Node.js)",
      security: "Role-Based Access Control & Token Authorization",
      workflow: "Three-tier approval pipeline (Student -> Warden -> Security)"
    }
  },
  {
    id: "portfolio-v1",
    number: "04",
    title: "Portfolio",
    fullTitle: "Developer Portfolio Website",
    category: "DEVELOPER TOOL",
    railLabel: "Tools",
    badge: "Live Deployment",
    tagline: "Personal developer showcase exploring dark-mode futuristic styling, glassmorphism, and Framer Motion.",
    description: "A personal portfolio website built with React, Framer Motion and Tailwind CSS, showcasing my skills and projects.",
    detailedDescription: "The flagship portfolio presentation built to showcase high-throughput full-stack engineering, interactive component trees, responsive CSS Grid layouts, and hardware-accelerated animations. Provides deep technical insight into projects, verified GitHub data, and resume downloads.",
    technologies: ["React", "Framer Motion", "Tailwind CSS"],
    modalTechnologies: ["React 19", "Vite", "Framer Motion", "Tailwind CSS", "HTML Canvas API"],
    githubUrl: "https://github.com/VIJAY-1326",
    liveDemoUrl: "https://vijay-1326.github.io/portfolio.io/",
    status: "Live Production",
    accentColor: "#F59E0B", // Amber / Gold
    secondaryAccent: "#EA580C",
    glowColor: "rgba(245, 158, 11, 0.45)",
    previewType: "portfolio",
    highlights: [
      "Dark futuristic palette with neon accent borders and interactive HTML Canvas particles",
      "Sticky progressive stacking cards with Framer Motion spring physics",
      "Live GitHub REST API synchronization for real public repository tree metrics",
      "Interactive code IDE tabs and resume preview modal"
    ],
    architecture: {
      frontend: "React 19 + Vite + Framer Motion + Lucide Icons",
      styling: "Modular CSS + CSS Grid + Sticky Positioning",
      deployment: "Vercel / GitHub Pages with instant edge invalidation"
    }
  }
];
