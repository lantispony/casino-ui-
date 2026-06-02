import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { games } from '../../data/games';
import {
  House, Confetti, CalendarCheck, Crown, Ticket,
  ShoppingCart, Target, Trophy, Sword, CurrencyDollar,
  ClockCounterClockwise, User, MagnifyingGlass,
  Coin, Compass, Cards, DiceFive, Fish
} from '@phosphor-icons/react';

const gameIconMap = {
  slots: Coin,
  roulette: Compass,
  baccarat: Cards,
  dice: DiceFive,
  fish: Fish,
  lottery: Target,
};

const navItems = [
  { path: '/', label: 'LOBBY', icon: House },
  ...games.map(g => ({
    path: `/game/${g.id}`,
    label: g.name.toUpperCase(),
    icon: gameIconMap[g.id],
  })),
  { path: '/events', label: 'EVENTS', icon: Confetti },
  { path: '/rewards', label: 'DAILY', icon: CalendarCheck },
  { path: '/vip', label: 'VIP', icon: Crown },
  { path: '/season-pass', label: 'SEASON', icon: Ticket },
  { path: '/shop', label: 'SHOP', icon: ShoppingCart },
  { path: '/missions', label: 'TASKS', icon: Target },
  { path: '/rankings', label: 'RANK', icon: Trophy },
  { path: '/guilds', label: 'GUILD', icon: Sword },
  { path: '/deposit', label: 'DEPOSIT', icon: CurrencyDollar },
  { path: '/records', label: 'HISTORY', icon: ClockCounterClockwise },
  { path: '/user', label: 'PROFILE', icon: User },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const visible = isDesktop || isOpen;

  return (
    <>
      <AnimatePresence>
        {!isDesktop && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
              zIndex: 999, backdropFilter: 'blur(4px)',
            }}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: visible ? 0 : -300 }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
        style={{
          position: 'fixed',
          top: isDesktop ? 76 : 0,
          left: 0,
          height: isDesktop ? 'calc(100vh - 76px)' : '100vh',
          width: 250,
          background: 'linear-gradient(180deg, #080808 0%, #111 50%, #0A0A0A 100%)',
          borderRight: '1px solid rgba(255,215,0,0.15)',
          zIndex: isDesktop ? 50 : 1000,
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden', boxShadow: '4px 0 30px rgba(0,0,0,0.6)',
        }}
      >
        {/* Search Box */}
        <div style={{
          padding: '16px', borderBottom: '1px solid rgba(255,215,0,0.08)',
          background: 'rgba(255,215,0,0.03)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(255,255,255,0.05)', borderRadius: 8,
            padding: '8px 12px', border: '1px solid rgba(255,215,0,0.12)',
          }}>
            <MagnifyingGlass size={16} color="url(#goldGrad)" />
            <input
              type="text"
              placeholder="Search games..."
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                color: '#fff', fontSize: 13, fontWeight: 500,
                fontFamily: 'inherit',
              }}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {navItems.map((item) => {
            const active = isActive(item.path);
            const IconComponent = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={isDesktop ? undefined : onClose}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 20px', textDecoration: 'none',
                  color: active ? 'var(--gold-light)' : '#999',
                  background: active ? 'linear-gradient(90deg, rgba(255,215,0,0.12), transparent)' : 'transparent',
                  borderLeft: active ? '3px solid var(--gold)' : '3px solid transparent',
                  transition: 'var(--transition)', fontSize: 13, fontWeight: active ? 700 : 500,
                  letterSpacing: 0.5,
                }}
              >
                <span style={{ width: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <IconComponent size={18} color="url(#goldGrad)" />
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer badge */}
        <div style={{
          padding: '14px 20px', borderTop: '1px solid rgba(255,215,0,0.08)',
          textAlign: 'center', fontSize: 10, color: '#444', letterSpacing: 1,
        }}>
          MONARCH CASINO™ v1.0.8
        </div>
      </motion.aside>
    </>
  );
}