import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { EASINGS } from '../utils/animations';

export default function DropdownMenu({ 
  label, 
  icon: TriggerIcon, 
  items = [], 
  align = 'left', 
  active = false,
  customRender = null 
}) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation & Escape-to-close
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div 
      ref={dropdownRef} 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => {
        // Desktop hover open
        if (window.innerWidth > 968) setIsOpen(true);
      }}
      onMouseLeave={() => {
        // Desktop hover close
        if (window.innerWidth > 968) setIsOpen(false);
      }}
    >
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        whileTap={{ scale: 0.97 }}
        style={{
          background: isOpen 
            ? (theme === 'light' 
                ? 'linear-gradient(rgba(241, 245, 249, 0.95), rgba(226, 232, 240, 0.95)) padding-box, linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%) border-box'
                : 'linear-gradient(rgba(16, 21, 37, 0.9), rgba(12, 16, 28, 0.9)) padding-box, linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%) border-box')
            : 'transparent',
          border: isOpen ? '1px solid transparent' : '1px solid transparent',
          borderRadius: 'var(--radius-md)',
          color: isOpen || active 
            ? (theme === 'light' ? '#7C3AED' : '#22D3EE') 
            : (theme === 'light' ? '#475569' : '#A1A9BD'),
          padding: '0.45rem 0.85rem',
          fontSize: '0.925rem',
          fontWeight: isOpen || active ? 600 : 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.45rem',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          outline: 'none'
        }}
        onMouseEnter={(e) => {
          if (!isOpen && !active) e.currentTarget.style.color = theme === 'light' ? '#0F172A' : '#F5F7FF';
        }}
        onMouseLeave={(e) => {
          if (!isOpen && !active) e.currentTarget.style.color = theme === 'light' ? '#475569' : '#A1A9BD';
        }}
      >
        {TriggerIcon && <TriggerIcon size={16} />}
        <span>{label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.22, ease: EASINGS.luxury }}
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <ChevronDown size={14} style={{ opacity: 0.8 }} />
        </motion.div>
      </motion.button>

      {/* Dropdown Menu Panel with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: EASINGS.luxury }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              [align === 'right' ? 'right' : 'left']: 0,
              minWidth: '270px',
              background: theme === 'light'
                ? 'linear-gradient(rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.98)) padding-box, linear-gradient(135deg, rgba(139, 92, 246, 0.4), rgba(34, 211, 238, 0.35)) border-box'
                : 'linear-gradient(rgba(16, 21, 37, 0.98), rgba(10, 14, 26, 0.98)) padding-box, linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(34, 211, 238, 0.45), rgba(232, 213, 181, 0.3)) border-box',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid transparent',
              borderRadius: 'var(--radius-lg)',
              boxShadow: theme === 'light'
                ? '0 20px 45px -10px rgba(15, 23, 42, 0.15), 0 0 20px -5px rgba(139, 92, 246, 0.18)'
                : '0 20px 45px -10px rgba(0, 0, 0, 0.85), 0 0 25px -5px rgba(139, 92, 246, 0.3)',
              padding: '0.65rem',
              zIndex: 150,
              transformOrigin: align === 'right' ? 'top right' : 'top left'
            }}
          >
            {customRender ? (
              customRender(() => setIsOpen(false))
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {items.map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <motion.a
                      key={idx}
                      href={item.href}
                      onClick={(e) => {
                        if (item.onClick) {
                          e.preventDefault();
                          item.onClick();
                        }
                        setIsOpen(false);
                      }}
                      role="menuitem"
                      whileHover={{ 
                        x: 4, 
                        backgroundColor: theme === 'light' ? 'rgba(139, 92, 246, 0.08)' : 'rgba(139, 92, 246, 0.15)' 
                      }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        textDecoration: 'none',
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        color: theme === 'light' ? '#0F172A' : '#F5F7FF',
                        fontSize: '0.88rem',
                        background: 'transparent'
                      }}
                    >
                      {ItemIcon && (
                        <div 
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            background: theme === 'light' ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.12)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: theme === 'light' ? '#7C3AED' : '#c4b5fd',
                            flexShrink: 0
                          }}
                        >
                          <ItemIcon size={15} />
                        </div>
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                          {item.label}
                        </div>
                        {item.description && (
                          <div style={{ 
                            fontSize: '0.75rem', 
                            color: theme === 'light' ? '#64748B' : '#A1A9BD', 
                            marginTop: '0.1rem' 
                          }}>
                            {item.description}
                          </div>
                        )}
                      </div>
                      {item.badge && (
                        <span 
                          style={{
                            fontSize: '0.7rem',
                            padding: '0.15rem 0.45rem',
                            borderRadius: 'var(--radius-full)',
                            background: theme === 'light' ? 'rgba(6, 182, 212, 0.12)' : 'rgba(34, 211, 238, 0.12)',
                            color: theme === 'light' ? '#0891B2' : '#22D3EE',
                            border: theme === 'light' ? '1px solid rgba(6, 182, 212, 0.25)' : '1px solid rgba(34, 211, 238, 0.25)',
                            fontWeight: 600
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </motion.a>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
