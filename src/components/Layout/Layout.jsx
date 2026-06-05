import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="goldGrad" x1="1" y1="0.16" x2="0" y2="0.84">
            <stop offset="0%" stopColor="#663c00" />
            <stop offset="14%" stopColor="#8b5913" />
            <stop offset="18%" stopColor="#ad6501" />
            <stop offset="26%" stopColor="#e6a800" />
            <stop offset="38%" stopColor="#eccd79" />
            <stop offset="48%" stopColor="#ffffff" />
            <stop offset="65%" stopColor="#fbe198" />
            <stop offset="74%" stopColor="#f3bf4f" />
            <stop offset="100%" stopColor="#945600" />
          </linearGradient>
        </defs>
      </svg>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main style={{ flex: 1, marginLeft: 250, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header onMenuToggle={() => setSidebarOpen(true)} />
        <div style={{ flex: 1, paddingTop: 76, minHeight: '100vh' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              style={{ position: 'relative', zIndex: 1 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
        <Footer />
      </main>
    </div>
  );
}