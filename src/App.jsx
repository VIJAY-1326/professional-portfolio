import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GithubSection from './components/GithubSection';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import CustomCursor from './components/CustomCursor';
import CanvasBackground from './components/CanvasBackground';
import CinematicIntro from './components/CinematicIntro';
import CinematicScrollProgress from './components/CinematicScrollProgress';

export default function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [showCinematicIntro, setShowCinematicIntro] = useState(false);

  const handleCinematicComplete = () => {
    try {
      sessionStorage.setItem('portfolio_cinematic_seen', 'true');
    } catch {}
    setShowCinematicIntro(false);
  };

  const handleReplayIntro = () => {
    setShowCinematicIntro(true);
  };

  return (
    <ThemeProvider>
      <div 
        className="portfolio-app-root"
        style={{ 
          position: 'relative', 
          overflowX: 'clip', 
          minHeight: '100vh', 
          backgroundColor: 'var(--bg-main, #030508)',
          color: 'var(--text-primary, #F8FAFC)',
          transition: 'background-color 0.3s ease, color 0.3s ease'
        }}
      >
        {/* Full-Screen 4K Cinematic Sequence Overlay */}
        {showCinematicIntro && (
          <CinematicIntro onComplete={handleCinematicComplete} />
        )}

        {/* Top-Mounted Cinematic Scroll Progress Bar */}
        <CinematicScrollProgress />

        {/* Full-Application Interactive Neural Network & Orbital Canvas Background */}
        <CanvasBackground />

        {/* Signature Animated Futuristic Cursor */}
        <CustomCursor />

        {/* Sticky Navigation Bar with Dropdown Menus, Theme Toggle & Cinematic Trigger */}
        <Navbar 
          onOpenResumeModal={() => setIsResumeModalOpen(true)} 
          onSelectProject={(project) => setActiveModalProject(project)}
          onPlayIntro={handleReplayIntro}
        />

        {/* Main Content Sections */}
        <main style={{ position: 'relative', zIndex: 1 }}>
          <Hero 
            onOpenResumeModal={() => setIsResumeModalOpen(true)} 
            onPlayIntro={handleReplayIntro}
          />
          <About onOpenResumeModal={() => setIsResumeModalOpen(true)} />
          <Skills />
          <Projects 
            activeModalProject={activeModalProject} 
            setActiveModalProject={setActiveModalProject} 
          />
          <GithubSection />
          <Education />
          <Contact />
        </main>

        {/* Footer */}
        <Footer onPlayIntro={handleReplayIntro} />

        {/* Resume Modal */}
        <ResumeModal 
          isOpen={isResumeModalOpen} 
          onClose={() => setIsResumeModalOpen(false)} 
        />
      </div>
    </ThemeProvider>
  );
}
