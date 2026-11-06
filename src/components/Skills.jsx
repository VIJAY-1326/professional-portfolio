import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, defaultViewport, EASINGS } from '../utils/animations';
import { 
  Code2, 
  Terminal, 
  Database, 
  Cpu, 
  Box, 
  PenTool, 
  Search, 
  ChevronRight, 
  Copy, 
  Check, 
  Sparkles,
  Layers,
  FileCode,
  Laptop
} from 'lucide-react';

/**
 * Developer IDE / Code Editor Skills Section
 * Modeled after modern VS Code / JetBrains developer interfaces.
 * Features:
 * - Left Sidebar: File Tree Explorer that remains STICKY / FIXED throughout the section scroll,
 *   and naturally scrolls away once the section completes.
 * - Active ScrollSpy: As the user scrolls through the categories on the right, the sidebar
 *   automatically highlights the active category.
 * - Right Area: Code Editor with sticky Tab Bar, verified GitHub skills chips, and copy-import syntax.
 */
export default function Skills() {
  const [activeFileId, setActiveFileId] = useState('languages');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedImportId, setCopiedImportId] = useState(null);
  const categoryRefs = useRef({});
  const isClickScrolling = useRef(false);

  // IDE Categories & Files mapping strictly verified from Vijay Sai's GitHub Profile (github.com/VIJAY-1326)
  const ideCategories = [
    {
      id: 'languages',
      label: 'LANGUAGES',
      fileName: 'languages.cpp',
      icon: Cpu,
      accentColor: '#F59E0B', // Amber
      badgeCount: 4,
      importStatement: "import { C, C_PlusPlus, Java, JavaScript } from './languages.cpp';",
      description: 'Foundational logic, OOP principles, and web programming from GitHub profile',
      skills: [
        { name: 'C', tag: 'Procedural Logic' },
        { name: 'C++', tag: 'Problem Solving' },
        { name: 'Java', tag: 'OOP & DSA' },
        { name: 'JavaScript', tag: 'Web Programming' }
      ]
    },
    {
      id: 'frontend',
      label: 'FRONTEND',
      fileName: 'frontend.jsx',
      icon: Code2,
      accentColor: '#22D3EE', // Cyan
      badgeCount: 3,
      importStatement: "import { HTML5, CSS3, React_js } from './frontend.jsx';",
      description: 'Verified frontend libraries and web fundamentals from GitHub profile',
      skills: [
        { name: 'HTML5', tag: 'Semantic Markup' },
        { name: 'CSS3', tag: 'Responsive Styling' },
        { name: 'React.js', tag: 'Component Architecture' }
      ]
    },
    {
      id: 'backend',
      label: 'BACKEND_DB',
      fileName: 'backend.js',
      icon: Terminal,
      accentColor: '#8B5CF6', // Electric Violet
      badgeCount: 3,
      importStatement: "import { Node_js, Express_js, MongoDB } from './backend.js';",
      description: 'Server runtimes, REST frameworks, and NoSQL document store from GitHub profile',
      skills: [
        { name: 'Node.js', tag: 'Backend Runtime' },
        { name: 'Express.js', tag: 'Server Framework' },
        { name: 'MongoDB', tag: 'NoSQL Database' }
      ]
    },
    {
      id: 'devtools',
      label: 'DEV_TOOLS',
      fileName: 'devtools.sh',
      icon: Box,
      accentColor: '#38BDF8', // Sky Blue
      badgeCount: 4,
      importStatement: "import { Git, GitHub, Git_Bash, VS_Code } from './devtools.sh';",
      description: 'Version control, cloud collaboration, shell CLI, and modern IDE from GitHub profile',
      skills: [
        { name: 'Git', tag: 'Version Control' },
        { name: 'GitHub', tag: 'Code Hosting' },
        { name: 'Git Bash', tag: 'CLI & Scripting' },
        { name: 'VS Code', tag: 'Development IDE' }
      ]
    },
    {
      id: 'design',
      label: 'DESIGN_VIZ',
      fileName: 'design.fig',
      icon: PenTool,
      accentColor: '#F43F5E', // Rose
      badgeCount: 3,
      importStatement: "import { Figma, Canva, Power_BI } from './design.fig';",
      description: 'UI/UX prototyping, digital graphics, and business data analytics from GitHub profile',
      skills: [
        { name: 'Figma', tag: 'UI/UX Prototyping' },
        { name: 'Canva', tag: 'Digital Assets' },
        { name: 'Power BI', tag: 'Data Visualization' }
      ]
    }
  ];

  // Calculate total verified skills count (exactly 17)
  const totalSkillsCount = ideCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  // Active Category Object
  const currentCategory = ideCategories.find(c => c.id === activeFileId) || ideCategories[0];

  // ScrollSpy: Update active category in the sticky sidebar as user scrolls the section
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const triggerPoint = window.scrollY + 220; // viewport trigger zone

      for (let i = ideCategories.length - 1; i >= 0; i--) {
        const cat = ideCategories[i];
        const el = categoryRefs.current[cat.id];
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementTop = rect.top + window.pageYOffset;
          if (triggerPoint >= elementTop) {
            setActiveFileId(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ideCategories]);

  // Handle clicking a file in explorer sidebar or tabs
  const handleSelectFile = (fileId) => {
    setActiveFileId(fileId);
    isClickScrolling.current = true;

    const el = categoryRefs.current[fileId];
    if (el) {
      const topOffset = 160; // Offset for sticky navbar (74px) + sticky editor tabs (50px) + breathing room
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: 'smooth'
      });
    }

    setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);
  };

  // Copy synthetic import statement to clipboard
  const handleCopyImport = (id, statement) => {
    navigator.clipboard.writeText(statement);
    setCopiedImportId(id);
    setTimeout(() => setCopiedImportId(null), 2200);
  };

  // Filter skills based on user search query
  const displayedCategories = ideCategories.map(cat => {
    if (!searchQuery.trim()) return cat;

    const matchedSkills = cat.skills.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const matchesCategoryName = cat.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                cat.fileName.toLowerCase().includes(searchQuery.toLowerCase());

    if (matchedSkills.length === 0 && !matchesCategoryName) return null;

    return {
      ...cat,
      skills: matchedSkills.length > 0 ? matchedSkills : cat.skills
    };
  }).filter(Boolean);

  return (
    <section id="skills" className="section-wrapper" style={{ position: 'relative' }}>
      <div className="container">

        {/* Section Header */}
        <motion.div 
          className="section-header" 
          style={{ marginBottom: '2.5rem' }}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={defaultViewport}
        >
          
          <h2 className="section-title">
            Interactive <span className="gradient-text-accent">IDE Architecture</span>
          </h2>
        </motion.div>

        {/* ============================================================
            THE VS CODE / DEVELOPER IDE WINDOW
            - overflow: visible to allow child position: sticky to stick to window scroll
           ============================================================ */}
        <motion.div 
          className="ide-window"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 0.65, ease: EASINGS.luxury }}
          style={{
            background: 'rgba(12, 16, 28, 0.45)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 35px -5px rgba(34, 211, 238, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          {/* Top Window Control & Title Bar */}
          <div 
            style={{
              background: 'rgba(9, 12, 22, 0.55)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '0.75rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px'
            }}
          >
            {/* macOS Window Controls */}
           

            {/* Quick Stats Pill */}
            
          </div>

          {/* ============================================================
              MAIN IDE SPLIT CONTAINER
              - alignItems: flex-start gives the sticky sidebar room to stick
                as the right editor expands to full height!
             ============================================================ */}
          <div 
            className="ide-split-container" 
            style={{ 
              display: 'flex', 
              alignItems: 'flex-start',
              position: 'relative',
              minHeight: '620px' 
            }}
          >
            
            {/* ============================================================
                LEFT PANEL: FULL-SCREEN HEIGHT STICKY EXPLORER SIDEBAR
                - position: sticky
                - top: 74px (stays fixed right under the sticky navbar)
                - height: calc(100vh - 74px) fills the full viewport height!
                - Sticks while scrolling through skills, then scrolls away
                  when the section completes!
               ============================================================ */}
            <aside 
              className="ide-sidebar sticky-ide-sidebar"
              style={{
                width: '280px',
                background: 'rgba(9, 12, 22, 0.40)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRight: '1px solid rgba(255, 255, 255, 0.08)',
                borderBottomLeftRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexShrink: 0,
                position: 'sticky',
                top: '74px',
                height: 'calc(100vh - 74px)',
                minHeight: 'calc(100vh - 74px)',
                zIndex: 30,
                alignSelf: 'flex-start',
                boxShadow: '4px 0 24px rgba(0, 0, 0, 0.35)'
              }}
            >
              {/* Explorer File Tree */}
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {/* Explorer Section Title */}
                <div 
                  style={{
                    padding: '0.85rem 1.25rem',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#94A3B8',
                    textTransform: 'uppercase',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Layers size={13} style={{ color: '#22D3EE' }} />
                    <span>EXPLORER</span>
                  </div>
                  <span style={{ fontSize: '0.7rem', color: '#64748B' }}>SRC</span>
                </div>

                {/* File Items List */}
                <div style={{ padding: '0.5rem 0' }}>
                  {ideCategories.map((cat) => {
                    const isActive = activeFileId === cat.id;
                    const CatIcon = cat.icon;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleSelectFile(cat.id)}
                        className={`ide-file-item ${isActive ? 'active' : ''}`}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          background: isActive ? 'rgba(34, 211, 238, 0.08)' : 'transparent',
                          border: 'none',
                          borderLeft: isActive ? `3px solid ${cat.accentColor}` : '3px solid transparent',
                          padding: '0.75rem 1.15rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          outline: 'none'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                          <CatIcon size={16} style={{ color: cat.accentColor, flexShrink: 0 }} />
                          <div style={{ minWidth: 0 }}>
                            <div 
                              style={{ 
                                fontSize: '0.88rem', 
                                fontWeight: isActive ? 700 : 600, 
                                color: isActive ? '#FFFFFF' : '#CBD5E1',
                                letterSpacing: '0.02em',
                                lineHeight: 1.2
                              }}
                            >
                              {cat.label}
                            </div>
                            <div 
                              style={{ 
                                fontSize: '0.72rem', 
                                fontFamily: 'var(--font-mono, monospace)', 
                                color: isActive ? cat.accentColor : '#64748B',
                                marginTop: '0.15rem' 
                              }}
                            >
                              {cat.fileName}
                            </div>
                          </div>
                        </div>

                        {/* File Badge Count */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <span 
                            style={{
                              fontSize: '0.72rem',
                              fontFamily: 'var(--font-mono, monospace)',
                              fontWeight: 700,
                              color: isActive ? '#FFFFFF' : '#64748B',
                              background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.04)',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '4px'
                            }}
                          >
                            {cat.badgeCount}
                          </span>
                          {isActive && <ChevronRight size={13} style={{ color: cat.accentColor }} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sidebar Footer: Active File & Loaded Exports Status */}
              <div 
                style={{
                  padding: '1.15rem 1.25rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  background: 'rgba(7, 10, 18, 0.45)',
                  borderBottomLeftRadius: '16px'
                }}
              >
                <div style={{ fontSize: '0.7rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700, marginBottom: '0.4rem' }}>
                  ACTIVE MODULE
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: currentCategory.accentColor, boxShadow: `0 0 8px ${currentCategory.accentColor}` }} />
                  <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#F5F7FF' }}>
                    {currentCategory.label}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono, monospace)', color: '#94A3B8' }}>
                  {currentCategory.fileName}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#22D3EE', marginTop: '0.35rem', fontFamily: 'var(--font-mono, monospace)' }}>
                  ✓ {currentCategory.skills.length} exports loaded
                </div>
              </div>

            </aside>

            {/* ============================================================
                RIGHT PANEL: CODE EDITOR AREA
               ============================================================ */}
            <main 
              className="ide-editor"
              style={{
                flex: 1,
                background: 'rgba(11, 15, 27, 0.35)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderBottomRightRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                minWidth: 0
              }}
            >
              {/* Sticky Editor Tabs Bar */}
              <div 
                className="ide-tabs-bar"
                style={{
                  background: 'rgba(9, 12, 22, 0.50)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  overflowX: 'auto',
                  gap: '0.5rem',
                  paddingRight: '1rem',
                  position: 'sticky',
                  top: '88px',
                  zIndex: 15,
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)'
                }}
              >
                {/* File Tabs */}
                <div style={{ display: 'flex', alignItems: 'center', overflowX: 'auto' }}>
                  {ideCategories.map((cat) => {
                    const isTabActive = activeFileId === cat.id;

                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleSelectFile(cat.id)}
                        style={{
                          background: isTabActive ? 'rgba(11, 15, 27, 0.65)' : 'transparent',
                          border: 'none',
                          borderTop: isTabActive ? `2px solid ${cat.accentColor}` : '2px solid transparent',
                          borderRight: '1px solid rgba(255, 255, 255, 0.06)',
                          color: isTabActive ? '#F5F7FF' : '#64748B',
                          padding: '0.75rem 1.15rem',
                          fontSize: '0.8rem',
                          fontFamily: 'var(--font-mono, monospace)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.2s ease',
                          outline: 'none'
                        }}
                      >
                        <cat.icon size={14} style={{ color: isTabActive ? cat.accentColor : '#64748B' }} />
                        <span>{cat.fileName}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Quick In-Editor Search Filter */}
                
              </div>

              {/* Editor Workspace: Stack of Categories (matching user screenshot) */}
              <div 
                className="ide-editor-workspace"
                style={{
                  padding: '2.5rem 2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '3.5rem'
                }}
              >
                {displayedCategories.map((cat) => {
                  const CatIcon = cat.icon;
                  const isCurrent = activeFileId === cat.id;

                  return (
                    <div 
                      key={cat.id}
                      ref={(el) => (categoryRefs.current[cat.id] = el)}
                      style={{
                        position: 'relative',
                        transition: 'opacity 0.3s ease'
                      }}
                    >
                      {/* Category Header Row: [ TAG ] ----------------------- filename.ext */}
                      <div 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1.25rem',
                          marginBottom: '1rem'
                        }}
                      >
                        {/* IDE Bracket Badge: e.g. [ </> FRONTEND ] */}
                        <div 
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.35rem 0.95rem',
                            borderRadius: '4px',
                            background: `${cat.accentColor}15`,
                            border: `1px solid ${cat.accentColor}`,
                            color: cat.accentColor,
                            fontSize: '0.82rem',
                            fontFamily: 'var(--font-mono, monospace)',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            boxShadow: `0 0 14px ${cat.accentColor}33`,
                            flexShrink: 0
                          }}
                        >
                          <CatIcon size={14} />
                          <span>{cat.label}</span>
                        </div>

                        {/* Thin Connecting Rule Line */}
                        <div 
                          style={{
                            flex: 1,
                            height: '1px',
                            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 100%)'
                          }} 
                        />

                        {/* Filename Label on far right */}
                        <div 
                          style={{
                            fontSize: '0.78rem',
                            fontFamily: 'var(--font-mono, monospace)',
                            color: '#475569',
                            flexShrink: 0
                          }}
                        >
                          {cat.fileName}
                        </div>
                      </div>

                      {/* Synthetic Syntax Highlighted Import Statement */}
                      <div 
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1rem',
                          background: 'rgba(0, 0, 0, 0.25)',
                          padding: '0.65rem 1rem',
                          borderRadius: '8px',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          marginBottom: '1.35rem'
                        }}
                      >
                        <div 
                          style={{
                            fontFamily: 'var(--font-mono, monospace)',
                            fontSize: '0.86rem',
                            color: '#E2E8F0',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          <span style={{ color: '#818CF8', fontWeight: 600 }}>import </span>
                          <span style={{ color: cat.accentColor }}>
                            &#123; {cat.skills.map(s => s.name.replace(/\+\+/g, '_PlusPlus').replace(/[^a-zA-Z0-9]/g, '_')).join(', ')} &#125;
                          </span>
                          <span style={{ color: '#818CF8', fontWeight: 600 }}> from </span>
                          <span style={{ color: '#F59E0B' }}>'./{cat.fileName}'</span>;
                        </div>

                        {/* Copy Import Button */}
                        <button
                          onClick={() => handleCopyImport(cat.id, cat.importStatement)}
                          title="Copy import syntax"
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: copiedImportId === cat.id ? '#10B981' : '#64748B',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            fontSize: '0.74rem',
                            fontFamily: 'var(--font-mono, monospace)',
                            transition: 'color 0.2s ease',
                            outline: 'none',
                            flexShrink: 0
                          }}
                        >
                          {copiedImportId === cat.id ? <Check size={13} /> : <Copy size={13} />}
                          <span>{copiedImportId === cat.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      {/* ============================================================
                          IDE SKILLS CHIPS (Pill format matching user screenshot)
                          Format: | Skill Name |
                         ============================================================ */}
                      <div 
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.75rem'
                        }}
                      >
                        {cat.skills.map((skill, sIdx) => (
                          <div
                            key={sIdx}
                            className="ide-skill-chip"
                            style={{
                              background: 'rgba(14, 19, 36, 0.45)',
                              backdropFilter: 'blur(12px)',
                              WebkitBackdropFilter: 'blur(12px)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              borderRadius: '6px',
                              padding: '0.55rem 1.05rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.65rem',
                              cursor: 'default',
                              transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = cat.accentColor;
                              e.currentTarget.style.boxShadow = `0 0 16px -2px ${cat.accentColor}66, 0 8px 20px -4px rgba(0, 0, 0, 0.6)`;
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.background = 'rgba(20, 28, 50, 0.65)';
                              const bar = e.currentTarget.querySelector('.chip-vertical-bar');
                              if (bar) bar.style.opacity = '1';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.25)';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.background = 'rgba(14, 19, 36, 0.45)';
                              const bar = e.currentTarget.querySelector('.chip-vertical-bar');
                              if (bar) bar.style.opacity = '0.75';
                            }}
                          >
                            {/* Vertical Accent Separator Bar "|" */}
                            <span 
                              className="chip-vertical-bar"
                              style={{
                                color: cat.accentColor,
                                fontWeight: 800,
                                fontSize: '0.9rem',
                                opacity: 0.75,
                                transition: 'opacity 0.2s ease',
                                userSelect: 'none'
                              }}
                            >
                              |
                            </span>

                            {/* Skill Name */}
                            <span 
                              style={{
                                fontSize: '0.88rem',
                                fontWeight: 600,
                                color: '#F5F7FF',
                                letterSpacing: '0.01em'
                              }}
                            >
                              {skill.name}
                            </span>

                            {/* Small Specialty Tag Pill */}
                            <span 
                              style={{
                                fontSize: '0.68rem',
                                color: '#94A3B8',
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.06)',
                                padding: '0.1rem 0.45rem',
                                borderRadius: '4px',
                                marginLeft: '0.15rem'
                              }}
                            >
                              {skill.tag}
                            </span>
                          </div>
                        ))}
                      </div>

                    </div>
                  );
                })}
              </div>

            </main>

          </div>

        </motion.div>

      </div>

      <style>{`
        /* =====================================================================
           SKILLS IDE RESPONSIVE MEDIA QUERIES (TABLET & MOBILE)
           ===================================================================== */

        /* ---------------------------------------------------------------------
           1. DESKTOP & TABLET LANDSCAPE (>= 1025px)
           --------------------------------------------------------------------- */
        @media (min-width: 1025px) {
          .ide-split-container {
            display: flex !important;
            align-items: flex-start !important;
            position: relative !important;
          }

          .sticky-ide-sidebar {
            position: -webkit-sticky !important;
            position: sticky !important;
            top: 82px !important;
            align-self: flex-start !important;
            z-index: 30 !important;
            height: auto !important;
            max-height: calc(100vh - 96px) !important;
          }

          .ide-tabs-bar {
            position: -webkit-sticky !important;
            position: sticky !important;
            top: 82px !important;
            z-index: 25 !important;
          }
        }

        /* ---------------------------------------------------------------------
           2. TABLET VIEW (768px to 1024px)
           iPad Pro, iPad Air, Surface tablets
           --------------------------------------------------------------------- */
        @media (max-width: 1024px) {
          .ide-split-container {
            display: flex !important;
            flex-direction: column !important;
            border-radius: 20px !important;
          }

          /* Hide redundant tree sidebar on tablet & mobile for crystal clarity */
          .sticky-ide-sidebar {
            display: none !important;
          }

          .ide-editor {
            width: 100% !important;
            border-radius: 20px !important;
          }

          .ide-tabs-bar {
            position: -webkit-sticky !important;
            position: sticky !important;
            top: 72px !important;
            z-index: 25 !important;
            border-radius: 20px 20px 0 0 !important;
            padding: 0.6rem 0.85rem !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
          }

          .ide-tabs-bar::-webkit-scrollbar {
            height: 4px;
          }

          .ide-editor-workspace {
            padding: 1.75rem 1.5rem !important;
            gap: 2.25rem !important;
          }
        }

        /* ---------------------------------------------------------------------
           3. MOBILE VIEW (<= 767px)
           Smartphones in portrait (Clean, attractive & instantly readable)
           --------------------------------------------------------------------- */
        @media (max-width: 767px) {
          .ide-split-container {
            flex-direction: column !important;
            border-radius: 18px !important;
          }

          .sticky-ide-sidebar {
            display: none !important;
          }

          .ide-editor {
            border-radius: 18px !important;
          }

          .ide-tabs-bar {
            top: 70px !important;
            padding: 0.5rem 0.65rem !important;
            border-radius: 18px 18px 0 0 !important;
          }

          .ide-editor-workspace {
            padding: 1.25rem 1rem !important;
            gap: 1.75rem !important;
          }

          .ide-skills-grid {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }

          .ide-skill-chip {
            padding: 0.7rem 0.95rem !important;
            font-size: 0.88rem !important;
            border-radius: 12px !important;
            justify-content: space-between !important;
            width: 100% !important;
          }

          .ide-code-import-banner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.65rem !important;
            padding: 0.75rem !important;
            overflow-x: auto !important;
          }
        }

        /* ---------------------------------------------------------------------
           4. COMPACT MOBILE VIEW (<= 480px)
           Small smartphones (<= 480px)
           --------------------------------------------------------------------- */
        @media (max-width: 480px) {
          .ide-editor-workspace {
            padding: 1rem 0.75rem !important;
            gap: 1.5rem !important;
          }

          .ide-skill-chip {
            padding: 0.6rem 0.85rem !important;
            font-size: 0.84rem !important;
          }
        }
      `}</style>
    </section>
  );
}
