import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { games, userStats } from '../../data/games';

const navItems = [
  { path: '/', label: 'LOBBY', icon: '🏠' },
  ...games.map(g => ({ path: `/game/${g.id}`, label: g.name.toUpperCase(), icon: g.icon })),
  { path: '/events', label: 'EVENTS', icon: '🎉' },
  { path: '/rewards', label: 'DAILY', icon: '📅' },
  { path: '/vip', label: 'VIP', icon: '👑' },
  { path: '/season-pass', label: 'SEASON', icon: '🎫' },
  { path: '/shop', label: 'SHOP', icon: '🛒' },
  { path: '/missions', label: 'TASKS', icon: '🎯' },
  { path: '/rankings', label: 'RANK', icon: '🏆' },
  { path: '/guilds', label: 'GUILD', icon: '⚔️' },
  { path: '/deposit', label: 'DEPOSIT', icon: '💎' },
  { path: '/records', label: 'HISTORY', icon: '📊' },
  { path: '/user', label: 'PROFILE', icon: '👤' },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
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
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        style={{
          position: 'fixed', top: 0, left: 0, height: '100vh', width: 250,
          background: 'linear-gradient(180deg, #080808 0%, #111 50%, #0A0A0A 100%)',
          borderRight: '1px solid rgba(255,215,0,0.15)',
          zIndex: 1000, display: 'flex', flexDirection: 'column',
          overflow: 'hidden', boxShadow: '4px 0 30px rgba(0,0,0,0.6)',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px 16px', borderBottom: '1px solid rgba(255,215,0,0.12)',
          textDecoration: 'none',
        }}>
          <img src="/images/logo_horizontal.png" alt="Monarch Casino"
            style={{ height: 36, maxWidth: 160, objectFit: 'contain' }} />
        </Link>

        {/* User Badge */}
        <Link to="/user" style={{
          display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px',
          borderBottom: '1px solid rgba(255,215,0,0.08)', textDecoration: 'none',
          background: 'rgba(255,215,0,0.03)',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'var(--gold-gradient)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontWeight: 800, fontSize: 18, color: '#000',
            boxShadow: 'var(--glow-gold)', flexShrink: 0,
          }}>
            {userStats.username[0]}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: '#fff', fontSize: 14, fontWeight: 700 }}>{userStats.username}</div>
            <div style={{ color: 'var(--gold)', fontSize: 11, fontWeight: 600, display: 'flex', gap: 4 }}>
              <span>{userStats.levelIcon}</span>
              <span>{userStats.level}</span>
            </div>
          </div>
          <div style={{
            background: 'rgba(255,215,0,0.1)', border: '1px solid rgba(255,215,0,0.2)',
            borderRadius: 6, padding: '4px 10px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 9, color: '#888' }}>BALANCE</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--gold-light)' }}>
              {userStats.balance.toLocaleString()}
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
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
                <span style={{ fontSize: 16, width: 22, textAlign: 'center', flexShrink: 0 }}>
                  {item.icon}
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
          MONARCH CASINO™ v1.0.4
        </div>
      </motion.aside>
    </>
  );
}
