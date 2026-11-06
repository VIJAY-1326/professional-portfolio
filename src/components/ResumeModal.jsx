import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';
import { 
  X, 
  FileDown, 
  ExternalLink,
  FileText
} from 'lucide-react';
import './ResumeModal.css';

export default function ResumeModal({ isOpen, onClose }) {
  // Close on Escape & Prevent Background Scrolling
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="resume-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="resume-modal-backdrop"
          onClick={onClose}
        >
          <motion.div
            key="resume-dialog"
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="resume-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Malla Vijay Sai Resume"
          >
            {/* 1. High-Tech Control Toolbar */}
            <div className="resume-modal-toolbar">
              <div className="resume-toolbar-left">
                <div className="resume-doc-icon-wrap" aria-hidden="true">
                  <FileText size={20} />
                </div>
                <div className="resume-title-col">
                  <span className="resume-filename">Malla_Vijay_Sai_Resume.pdf</span>
                  <span className="resume-meta-badge">B.Tech Data Science (CSD) • AITAM</span>
                </div>
              </div>

              {/* Action Buttons: Open Tab, Download & Close */}
              <div className="resume-toolbar-actions">
                {/* Open in Native Tab */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-tool-btn"
                  title="Open PDF in Full Browser Window"
                >
                  <ExternalLink size={15} />
                  <span>Open Fullscreen</span>
                </a>

                {/* Direct Download */}
                <a
                  href="/resume.pdf"
                  download="Malla_Vijay_Sai_Resume.pdf"
                  className="resume-tool-btn primary"
                  title="Download PDF to Device"
                >
                  <FileDown size={15} />
                  <span>Download PDF</span>
                </a>

                {/* Close Modal */}
                <button
                  type="button"
                  onClick={onClose}
                  className="resume-close-btn"
                  aria-label="Close Resume Viewer"
                  title="Close (Esc)"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* 2. Full-Resolution Embedded PDF Viewport */}
            <div className="resume-viewer-viewport">
              <iframe
                src="/resume.pdf#view=FitH&toolbar=0&navpanes=0"
                title="Malla Vijay Sai - Developer Resume"
                className="resume-pdf-iframe"
              />
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
