/**
 * Centralized Portfolio Data for Malla Vijay Sai
 * All information is verified directly from GitHub profile: https://github.com/VIJAY-1326
 * 
 * Instructions to update your resume:
 * Place your resume file inside the /public folder named as 'resume.pdf' (i.e. public/resume.pdf).
 * The button will automatically download it.
 */

export const personalInfo = {
  name: "Malla Vijay Sai",
  preferredName: "Vijay Sai",
  title: "Full-Stack & Frontend Developer",
  subtitle: "B.Tech Data Science Undergraduate • MERN & Modern Web Architecture",
  location: "Tekkali, Srikakulam, Andhra Pradesh, India",
  institution: "Aditya Institute of Technology and Management (AITAM)",
  degree: "B.Tech in Data Science (2024 - 2028)",
  status: "Available for internships & software engineering roles",
  bio: "Passionate web developer and undergraduate student at AITAM with a strong focus on building responsive, high-performance web applications. Experienced in developing full-stack platforms with React, Node.js, Express, and MySQL, with a foundational background in C, C++, and Java. Driven by solving practical problems through clean code, scalable architecture, and intuitive UI/UX design.",
  
  // Contact details verified from public profile & repositories
  email: "vijaysaimalla@gmail.com",
  phone: "+91 8074325649",
  whatsappUrl: "https://wa.me/918074325649",
  github: "https://github.com/VIJAY-1326",
  githubUsername: "VIJAY-1326",
  linkedin: "https://www.linkedin.com/in/vijay-sai-malla-6020453b7/",
  instagram: "https://www.instagram.com/vjaymalla13_/",

  // Resume configuration:
  // Live compiled PDF placed in public/resume.pdf
  resumeUrl: "/resume.pdf",
  hasLocalResume: true
};

export const stats = [
  { label: "Public Repositories", value: "5+", description: "Open source code on GitHub" },
  { label: "Practical Projects", value: "4+", description: "Full-stack & responsive web apps" },
  { label: "Hackathons Participated", value: "5+", description: "Collaborative building & ideation" },
  { label: "Technical Presentations", value: "10+", description: "Project showcases & demos" }
];

export const corePrinciples = [
  {
    title: "Problem Solving",
    description: "Approaching real-world operational challenges with algorithmic thinking and clean, structured logic.",
    icon: "CheckCircle2"
  },
  {
    title: "Scalable Architecture",
    description: "Designing modular frontends, decoupled REST APIs, and normalized database schemas that scale cleanly.",
    icon: "Layers"
  },
  {
    title: "Performance Optimization",
    description: "Focusing on rapid load speeds, semantic HTML, efficient state management, and lightweight responsive design.",
    icon: "Zap"
  },
  {
    title: "Continuous Learning",
    description: "Actively mastering the MERN stack, database design, Docker containerization, and modern UI engineering.",
    icon: "Code2"
  }
];

export const skillCategories = [
  {
    name: "Programming Languages",
    description: "Core languages verified from GitHub profile",
    skills: [
      { name: "C", level: "Foundation", icon: "Terminal", tag: "Procedural Logic" },
      { name: "C++", level: "Intermediate", icon: "Cpu", tag: "Problem Solving" },
      { name: "Java", level: "Intermediate", icon: "Coffee", tag: "OOP & DSA" },
      { name: "JavaScript", level: "Advanced", icon: "Code2", tag: "Web Programming" }
    ]
  },
  {
    name: "Frontend Development",
    description: "Verified frontend libraries and web fundamentals",
    skills: [
      { name: "HTML5", level: "Proficient", icon: "FileCode", tag: "Semantic Markup" },
      { name: "CSS3", level: "Proficient", icon: "Palette", tag: "Responsive Styling" },
      { name: "React.js", level: "Proficient", icon: "Atom", tag: "Component Architecture" }
    ]
  },
  {
    name: "Backend & Database",
    description: "Verified backend runtimes, frameworks, and data stores",
    skills: [
      { name: "Node.js", level: "Intermediate", icon: "Server", tag: "Backend Runtime" },
      { name: "Express.js", level: "Intermediate", icon: "Network", tag: "Server Framework" },
      { name: "MongoDB", level: "Intermediate", icon: "HardDrive", tag: "NoSQL Database" }
    ]
  },
  {
    name: "Development Tools",
    description: "Version control and development environments",
    skills: [
      { name: "Git", level: "Proficient", icon: "GitBranch", tag: "Version Control" },
      { name: "GitHub", level: "Proficient", icon: "Github", tag: "Code Hosting" },
      { name: "Git Bash", level: "Proficient", icon: "Terminal", tag: "CLI & Scripting" },
      { name: "VS Code", level: "Proficient", icon: "Laptop", tag: "Development IDE" }
    ]
  },
  {
    name: "Design & Data Visualization",
    description: "UI/UX design tools and business data dashboards",
    skills: [
      { name: "Figma", level: "Intermediate", icon: "PenTool", tag: "UI/UX Prototyping" },
      { name: "Canva", level: "Proficient", icon: "Image", tag: "Digital Assets" },
      { name: "Power BI", level: "Intermediate", icon: "BarChart3", tag: "Data Visualization" }
    ]
  }
];

export const featuredProjects = [
  {
    id: "restaura",
    title: "Restaura — Full-Stack Gourmet Dining Platform",
    category: "Full-Stack Web App",
    badge: "Flagship Project",
    tagline: "Enterprise-grade restaurant management and customer ordering platform with Docker containerization.",
    description: "A comprehensive full-stack culinary commerce and operations platform. Built with a decoupled architecture featuring a modern React frontend and a robust Node.js/Express REST API backed by MySQL 8.0. Includes executive administration dashboards, dynamic multi-filter food catalogs, persistent cart & wishlist, secure JWT authentication with role authorization, and real-time order lifecycle tracking.",
    technologies: ["React.js", "Vite", "Node.js", "Express.js", "MySQL 8.0", "Tailwind CSS", "Docker", "JWT"],
    githubUrl: "https://github.com/VIJAY-1326/restaura",
    liveDemoUrl: null, // No public hosted URL configured in repo yet, full Docker setup provided
    status: "Production Ready Architecture",
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
    id: "blisswebsite",
    title: "Bliss Business & Corporate Services Showcase",
    category: "Frontend Web Application",
    badge: "Live Deployment",
    tagline: "Modern responsive web portal built for professional corporate and agency service presentation.",
    description: "A clean, modern multi-section website designed for corporate service presentation, agency portfolio showcases, transparent pricing packages, and team member introductions. Employs semantic HTML5 markup, advanced CSS layout techniques (Flexbox & CSS Grid), and smooth user interaction points.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Flexbox & Grid"],
    githubUrl: "https://github.com/VIJAY-1326/blisswebsite.io",
    liveDemoUrl: "https://vijay-1326.github.io/blisswebsite.io/",
    status: "Live on GitHub Pages",
    highlights: [
      "Responsive layout optimized for smartphones, tablets, and desktop displays",
      "Structured services grid with custom SVG graphics and typography hierarchy",
      "Transparent multi-tier pricing table with highlighted featured plans",
      "Interactive team directory with social touchpoints and contact form"
    ]
  },
  {
    id: "hostel-outpass",
    title: "Hostel Outpass Automation System",
    category: "Full-Stack System",
    badge: "In Development",
    tagline: "Automated digital workflow system for student residential permission requests and security approval.",
    description: "A web-based management system created to streamline institutional hostel permission workflows. Replaces manual paper slips with an automated request lifecycle from student submission through faculty/warden digital sign-off to gate security checkout.",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Role-Based Auth"],
    githubUrl: "https://github.com/VIJAY-1326/Hostel_Outpass",
    liveDemoUrl: null,
    status: "Active Repository",
    highlights: [
      "Role-based permission architecture (Student, Warden, Gate Security)",
      "Digital pass generation with timestamp verification",
      "Real-time status tracking for pending, approved, and rejected applications",
      "Designed to reduce institutional paper dependency and speed up clearance"
    ]
  },
  {
    id: "portfolio-v1",
    title: "Developer Portfolio v1.0",
    category: "Web Design & Frontend",
    badge: "Live Deployment",
    tagline: "First-generation responsive personal portfolio exploring dark theme styling and custom CSS.",
    description: "The initial iteration of Vijay's personal portfolio website, featuring custom dark-mode styling, responsive navigation, skills presentation, educational milestones, and social connectivity.",
    technologies: ["HTML5", "CSS3", "JavaScript", "FontAwesome"],
    githubUrl: "https://github.com/VIJAY-1326/portfolio.io",
    liveDemoUrl: "https://vijay-1326.github.io/portfolio.io/",
    status: "Live on GitHub Pages",
    highlights: [
      "Dark theme color palette with glowing borders and glass accents",
      "Custom responsive navigation with mobile hamburger toggle",
      "Timeline-based academic history presentation"
    ]
  }
];

export const educationHistory = [
  {
    id: "intermediate",
    position: "left",
    level: "Higher Secondary (10+2)",
    degree: "Intermediate (MPC)",
    institution: "Narayana Junior College",
    location: "Andhra Pradesh, India",
    course: "Mathematics, Physics & Chemistry",
    period: "2022 - 2024",
    status: "Completed (2024)",
    isCurrent: false,
    badge: "COMPLETED",
    badgeColor: "indigo",
    accentColor: "#6366F1",
    icon: "BookOpen",
    subjects: [
      "Mathematics (Calculus & Algebra)",
      "Physics (Mechanics & Waves)",
      "Chemistry (Physical & Organic)"
    ],
    highlightNote: "State Board • Higher Secondary Qualification"
  },
  {
    id: "btech",
    position: "center", // Main visual focus
    level: "Bachelor of Technology (B.Tech)",
    degree: "B.Tech in Data Science",
    institution: "Aditya Institute of Technology and Management (AITAM)",
    location: "Tekkali, Srikakulam, Andhra Pradesh",
    course: "Data Science & Computing",
    period: "2024 - 2028",
    status: "Active / In Progress",
    isCurrent: true,
    badge: "CURRENT FOCUS",
    badgeColor: "indigo-cyan",
    accentColor: "#4F46E5",
    icon: "GraduationCap",
    subjects: [
      "Data Structures & Algorithms",
      "DBMS & Relational MySQL",
      "OOP with Java & C++",
      "Computer Networks & Architecture"
    ],
    highlightNote: "Autonomous Institute • JNTU-GV Affiliated"
  },
  {
    id: "ssc",
    position: "right",
    level: "Secondary School Certificate (SSC)",
    degree: "Secondary School",
    institution: "Bhashyam High School",
    location: "Andhra Pradesh, India",
    course: "General Sciences & Mathematics",
    status: "Completed (2022)",
    isCurrent: false,
    badge: "DISTINCTION",
    badgeColor: "cyan",
    accentColor: "#0EA5E9",
    icon: "Award",
    subjects: [
      "Foundational Mathematics & Geometry",
      "Physical & Biological Sciences",
      "Computer Literacy & Logic"
    ],
    highlightNote: "Board of Secondary Education • Academic Distinction"
  }
];

/**
 * Fallback repository list for the GitHub Integration section
 * Used when GitHub API hits rate limits or is offline.
 */
export const fallbackRepositories = [
  {
    id: 1,
    name: "restaura",
    full_name: "VIJAY-1326/restaura",
    html_url: "https://github.com/VIJAY-1326/restaura",
    description: "Full-Stack Restaurant Ordering and Management Platform with React, Vite, Node.js, Express, MySQL 8.0, and Docker containerization.",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["react", "vite", "nodejs", "express", "mysql", "docker", "full-stack"],
    updated_at: "2026-10-10T20:07:47Z"
  },
  {
    id: 2,
    name: "blisswebsite.io",
    full_name: "VIJAY-1326/blisswebsite.io",
    html_url: "https://github.com/VIJAY-1326/blisswebsite.io",
    description: "Modern, responsive multi-section commercial website with services showcase, portfolio, and pricing tiers.",
    language: "CSS",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["html5", "css3", "javascript", "responsive-design"],
    updated_at: "2026-08-22T06:09:44Z"
  },
  {
    id: 3,
    name: "Hostel_Outpass",
    full_name: "VIJAY-1326/Hostel_Outpass",
    html_url: "https://github.com/VIJAY-1326/Hostel_Outpass",
    description: "Hostel Outpass management and digital approval workflow system for university residential campuses.",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["mern-stack", "react", "express", "mongodb"],
    updated_at: "2026-10-12T11:19:58Z"
  },
  {
    id: 4,
    name: "portfolio.io",
    full_name: "VIJAY-1326/portfolio.io",
    html_url: "https://github.com/VIJAY-1326/portfolio.io",
    description: "Responsive personal portfolio web application built with HTML, CSS, and modern interactive elements.",
    language: "CSS",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["portfolio", "css", "html5", "javascript"],
    updated_at: "2026-08-06T12:13:34Z"
  },
  {
    id: 5,
    name: "VIJAY-1326",
    full_name: "VIJAY-1326/VIJAY-1326",
    html_url: "https://github.com/VIJAY-1326/VIJAY-1326",
    description: "Special GitHub Profile configuration repository showcasing bio, tech badges, and learning path.",
    language: "Markdown",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["profile", "github-readme"],
    updated_at: "2026-08-26T05:35:39Z"
  }
];
