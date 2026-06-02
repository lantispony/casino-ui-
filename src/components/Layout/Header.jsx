import { Link } from 'react-router-dom';
import { CurrencyDollar } from '@phosphor-icons/react';
import { userStats } from '../../data/games';

export default function Header({ onMenuToggle }) {
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 76,
      background: '#000',
      borderBottom: '1px solid rgba(255,215,0,0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px', zIndex: 100,
    }}>
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <button onClick={onMenuToggle} className="menuBtn" style={{
          display: 'none', background: 'none', color: 'var(--gold)',
          fontSize: 24, padding: 4,
        }}>
          ☰
        </button>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src="/images/logo_horizontal.png" alt="Monarch Casino"
            style={{ height: 36, maxWidth: 160, objectFit: 'contain' }} />
        </Link>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* Balance */}
        <div style={{
          height: 40, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.15)',
          borderRadius: 10, padding: '0 24px', minWidth: 190,
        }}>
          <div style={{ fontSize: 9, color: '#888', letterSpacing: 1, lineHeight: 1.2 }}>BALANCE</div>
          <div style={{
            fontSize: 20, fontWeight: 700, fontFamily: "'Rajdhani', sans-serif",
            background: 'var(--gold-gradient)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            lineHeight: 1.2,
          }}>
            ${userStats.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        {/* Deposit CTA */}
        <Link to="/deposit" style={{
          height: 40, display: 'flex', alignItems: 'center',
          background: 'var(--gold-gradient)', color: '#000', fontWeight: 800,
          fontSize: 13, padding: '0 26px', borderRadius: 10, textDecoration: 'none',
          boxShadow: 'var(--glow-gold)', transition: 'var(--transition)',
          letterSpacing: 1, gap: 8,
        }}>
          <CurrencyDollar size={16} color="#000" weight="bold" /> DEPOSIT
        </Link>

        {/* Avatar + Welcome */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Link to="/user" style={{
            width: 42, height: 42, borderRadius: '50%',
            overflow: 'hidden', border: '2px solid var(--gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--glow-soft)', textDecoration: 'none', flexShrink: 0,
          }}>
            <img
              src="https://i.pravatar.cc/150?img=11"
              alt={userStats.username}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Link>
          <div>
            <div style={{ fontSize: 13, color: '#555', letterSpacing: 3, fontWeight: 500 }}>
              WELCOME BACK
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', fontFamily: "'Inter', sans-serif" }}>
              {userStats.username}
              <span style={{ color: 'var(--gold-dark)', fontSize: 14, marginLeft: 8, fontWeight: 400 }}>
                • {userStats.level}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
