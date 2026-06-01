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
