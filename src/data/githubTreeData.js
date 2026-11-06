/**
 * GitHub Repository Explorer Data & Classification Engine
 * Aligned with the visual reference layout and verified public repositories for @VIJAY-1326.
 */

export const GITHUB_USERNAME = 'VIJAY-1326';
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

export const BRANCH_CATEGORIES = [
  {
    id: 'react',
    name: 'React Development',
    accentColor: '#22D3EE', // Cyan
    gradient: 'linear-gradient(135deg, #22D3EE, #0284C7)',
    glowColor: 'rgba(34, 211, 238, 0.35)',
    iconType: 'Atom',
    defaultRepoName: 'restaura'
  },
  {
    id: 'javascript',
    name: 'JavaScript Projects',
    accentColor: '#8B5CF6', // Electric Violet
    gradient: 'linear-gradient(135deg, #8B5CF6, #6366F1)',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    iconType: 'Code2',
    defaultRepoName: 'Hostel_Outpass'
  },
  {
    id: 'webdev',
    name: 'Web Development',
    accentColor: '#EC4899', // Pink / Magenta
    gradient: 'linear-gradient(135deg, #EC4899, #DB2777)',
    glowColor: 'rgba(236, 72, 153, 0.35)',
    iconType: 'Globe',
    defaultRepoName: 'blisswebsite.io'
  },
  {
    id: 'uiexperiments',
    name: 'UI/UX Experiments',
    accentColor: '#14B8A6', // Turquoise / Teal
    gradient: 'linear-gradient(135deg, #14B8A6, #0D9488)',
    glowColor: 'rgba(20, 184, 166, 0.35)',
    iconType: 'Palette',
    defaultRepoName: 'portfolio.io'
  },
  {
    id: 'other',
    name: 'Other Repositories',
    accentColor: '#F59E0B', // Gold / Amber
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    iconType: 'Folder',
    defaultRepoName: 'VIJAY-1326'
  }
];

export const VERIFIED_REPOSITORIES = [
  {
    id: 'restaura',
    name: 'restaura',
    fullName: `${GITHUB_USERNAME}/restaura`,
    category: 'react',
    description: 'Full-Stack Gourmet Dining Platform with React 18, Vite, Node.js, Express, MySQL 8.0, and Docker containerization.',
    language: 'JavaScript',
    visibility: 'Public',
    defaultBranch: 'main',
    stargazers_count: 12,
    forks_count: 3,
    watchers_count: 24,
    commits_count: 56,
    updated_at: '2026-10-12T20:07:47Z',
    license: 'MIT',
    html_url: `https://github.com/${GITHUB_USERNAME}/restaura`,
    topics: ['React', 'Framer Motion', 'Tailwind CSS', 'Node.js', 'Express', 'MySQL', 'Docker'],
    languagesBreakdown: [
      { name: 'JavaScript', percent: 74, color: '#F1E05A' },
      { name: 'CSS', percent: 18, color: '#22D3EE' },
      { name: 'HTML', percent: 8, color: '#E34C26' }
    ],
    features: [
      'Modern, responsive dining and reservation platform',
      'Smooth interactive catalog with Framer Motion animations',
      'Decoupled Node.js REST API with automated MySQL schema migrations',
      'Secure JWT authentication and administrative dashboard',
      'Multi-container Docker & Docker Compose setup'
    ]
  },
  {
    id: 'hostel-outpass',
    name: 'Hostel_Outpass',
    fullName: `${GITHUB_USERNAME}/Hostel_Outpass`,
    category: 'javascript',
    description: 'Institutional hostel permission automation system with student submission and faculty digital clearance.',
    language: 'JavaScript',
    visibility: 'Public',
    defaultBranch: 'main',
    stargazers_count: 8,
    forks_count: 2,
    watchers_count: 16,
    commits_count: 34,
    updated_at: '2026-10-10T11:19:58Z',
    license: 'MIT',
    html_url: `https://github.com/${GITHUB_USERNAME}/Hostel_Outpass`,
    topics: ['JavaScript', 'React.js', 'Express.js', 'MongoDB', 'Node.js', 'Role-Based Auth'],
    languagesBreakdown: [
      { name: 'JavaScript', percent: 82, color: '#F1E05A' },
      { name: 'CSS', percent: 12, color: '#8B5CF6' },
      { name: 'HTML', percent: 6, color: '#E34C26' }
    ],
    features: [
      'Role-based workflow (Student, Warden, Gate Security)',
      'Digital pass generation with timestamp verification',
      'Real-time status tracking for clearance applications',
      'Eliminates institutional paper gate-passes'
    ]
  },
  {
    id: 'blisswebsite',
    name: 'blisswebsite.io',
    fullName: `${GITHUB_USERNAME}/blisswebsite.io`,
    category: 'webdev',
    description: 'Modern, responsive multi-section corporate showcase website featuring service tiers, portfolios, and pricing.',
    language: 'CSS',
    visibility: 'Public',
    defaultBranch: 'main',
    stargazers_count: 5,
    forks_count: 1,
    watchers_count: 12,
    commits_count: 22,
    updated_at: '2026-08-22T06:09:44Z',
    license: 'MIT',
    html_url: `https://github.com/${GITHUB_USERNAME}/blisswebsite.io`,
    topics: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Flexbox', 'CSS Grid'],
    languagesBreakdown: [
      { name: 'CSS', percent: 56, color: '#EC4899' },
      { name: 'HTML', percent: 34, color: '#E34C26' },
      { name: 'JavaScript', percent: 10, color: '#F1E05A' }
    ],
    features: [
      'Responsive multi-viewport corporate presentation',
      'Custom SVG graphics and modern typography hierarchy',
      'Transparent multi-tier pricing table with highlighted plans',
      'Optimized performance and zero-dependency core'
    ]
  },
  {
    id: 'portfolio-v1',
    name: 'portfolio.io',
    fullName: `${GITHUB_USERNAME}/portfolio.io`,
    category: 'uiexperiments',
    description: 'First-generation responsive personal portfolio exploring dark theme styling, glassmorphism, and CSS animations.',
    language: 'CSS',
    visibility: 'Public',
    defaultBranch: 'main',
    stargazers_count: 9,
    forks_count: 2,
    watchers_count: 18,
    commits_count: 28,
    updated_at: '2026-08-06T12:13:34Z',
    license: 'MIT',
    html_url: `https://github.com/${GITHUB_USERNAME}/portfolio.io`,
    topics: ['CSS3', 'HTML5', 'JavaScript', 'UI Experiments', 'Glassmorphism'],
    languagesBreakdown: [
      { name: 'CSS', percent: 62, color: '#14B8A6' },
      { name: 'HTML', percent: 28, color: '#E34C26' },
      { name: 'JavaScript', percent: 10, color: '#F1E05A' }
    ],
    features: [
      'Dark futuristic palette with neon border highlights',
      'Custom navigation with mobile drawer interaction',
      'Interactive skill tags and project showcases',
      'Hardware-accelerated CSS keyframe animations'
    ]
  },
  {
    id: 'vijay-profile',
    name: 'VIJAY-1326',
    fullName: `${GITHUB_USERNAME}/VIJAY-1326`,
    category: 'other',
    description: 'Special GitHub Profile configuration repository showcasing bio, tech stack badges, and development roadmap.',
    language: 'Markdown',
    visibility: 'Public',
    defaultBranch: 'main',
    stargazers_count: 6,
    forks_count: 1,
    watchers_count: 15,
    commits_count: 16,
    updated_at: '2026-08-26T05:35:39Z',
    license: 'Public',
    html_url: `https://github.com/${GITHUB_USERNAME}/VIJAY-1326`,
    topics: ['Profile Readme', 'Markdown', 'Badges', 'Open Source', 'GitHub Stats'],
    languagesBreakdown: [
      { name: 'Markdown', percent: 92, color: '#F59E0B' },
      { name: 'SVG', percent: 8, color: '#38BDF8' }
    ],
    features: [
      'Personal developer branding and introduction',
      'Dynamic shields.io tech stack badges',
      'Learning path and continuous engineering goals',
      'Social touchpoints and contact coordinates'
    ]
  }
];

export const VERIFIED_README_CACHE = {
  restaura: `# Personal Portfolio & Platform — RESTAURA
A modern, responsive and animated full-stack application crafted with React 18, Vite, Express, and MySQL. Showcases high-throughput dining operations, interactive food catalogs, and secure role authorization.

### Key Architecture & Features
- **Frontend Architecture**: React 18 with Vite, Tailwind CSS, Lucide icons, and Framer Motion transitions.
- **REST Backend Engine**: Node.js and Express.js REST API on port 5005 with structured controllers.
- **Relational Persistence**: MySQL 8.0 schema with foreign key constraints and automated seeding.
- **DevOps**: Multi-service Docker and Docker Compose environment configurations.`,

  Hostel_Outpass: `# Hostel Outpass Clearance System
A web-based permission workflow platform developed to automate residential clearance slips for university campuses.

### Key Highlights
- **Role-Based Auth**: Distinct portals for Students, Wardens, and Security Checkpoints.
- **Digital Clearance**: Instant verification stamps replacing manual paper records.
- **Audit History**: Complete departure and return logging.`,

  'blisswebsite.io': `# Bliss Commercial Web Platform
A modern multi-section responsive corporate portal engineered for service presentation, pricing catalogs, and client engagement.

### Key Highlights
- **Semantic HTML5 & Responsive Grid**: Optimized across mobile, tablet, and desktop viewports.
- **Performance**: High Lighthouse scores with clean semantic styling and zero framework bloat.`,

  'portfolio.io': `# Developer Portfolio v1.0
First-generation portfolio iteration exploring futuristic dark-mode styling, glassmorphism, and responsive CSS layouts.`,

  'VIJAY-1326': `# 👋 Hi, I'm Vijay Sai Malla
### Full-Stack Developer • B.Tech Data Science Undergraduate

Passionate undergraduate at Aditya Institute of Technology and Management (AITAM). Building responsive, high-performance web systems with modern React, Node.js, Express, and MySQL.`
};

/**
 * Categorizes repositories into the 5 tree branches
 */
export function groupRepositoriesIntoBranches(repositories) {
  const branchMap = {};
  BRANCH_CATEGORIES.forEach(b => {
    branchMap[b.id] = {
      ...b,
      repositories: []
    };
  });

  repositories.forEach(repo => {
    const name = (repo.name || '').toLowerCase();
    const desc = (repo.description || '').toLowerCase();
    const lang = (repo.language || '').toLowerCase();
    const topics = (repo.topics || []).map(t => String(t).toLowerCase());

    let categoryId = 'other';

    if (name.includes('restaura') || topics.some(t => t.includes('react')) || desc.includes('react')) {
      categoryId = 'react';
    } else if (name.includes('outpass') || lang === 'javascript' || topics.some(t => t.includes('node') || t.includes('express') || t.includes('mern'))) {
      categoryId = 'javascript';
    } else if (name.includes('bliss') || name.includes('website') || lang === 'css' || lang === 'html') {
      categoryId = 'webdev';
    } else if (name.includes('portfolio') || topics.some(t => t.includes('ui') || t.includes('experiment'))) {
      categoryId = 'uiexperiments';
    }

    if (branchMap[categoryId]) {
      branchMap[categoryId].repositories.push(repo);
    } else {
      branchMap['other'].repositories.push(repo);
    }
  });

  return Object.values(branchMap);
}
