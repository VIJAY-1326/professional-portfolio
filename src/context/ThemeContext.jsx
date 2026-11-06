import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {}
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);

    if (theme === 'light') {
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
    } else {
      root.classList.add('theme-dark');
      root.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
    }

    try {
      localStorage.setItem('portfolio-theme', theme);
    } catch {
      // Ignore in private browsing
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
