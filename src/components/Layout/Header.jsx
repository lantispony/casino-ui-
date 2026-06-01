import { Link } from 'react-router-dom';
import { userStats } from '../../data/games';

export default function Header({ onMenuToggle }) {
  return (
    <header style={{
      position: 'fixed', top: 0, left: 250, right: 0, height: 76,
      background: 'rgba(5,5,5,0.92)', backdropFilter: 'blur(24px)',
      borderBottom: '1px solid rgba(255,215,0,0.1)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px', zIndex: 100,
    }}>
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={onMenuToggle} className="menuBtn" style={{
          display: 'none', background: 'none', color: 'var(--gold)',
          fontSize: 24, padding: 4,
        }}>
          ☰
        </button>
        <div>
          <div style={{ fontSize: 13, color: '#555', letterSpacing: 3, fontWeight: 500 }}>
            WELCOME BACK
          </div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>
            {userStats.username}
            <span style={{ color: 'var(--gold-dark)', fontSize: 14, marginLeft: 8, fontWeight: 400 }}>
              • {userStats.level}
            </span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* Balance */}
        <div style={{
          background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.15)',
          borderRadius: 10, padding: '8px 18px', textAlign: 'center',
        }}>
          <div style={{ fontSize: 9, color: '#888', letterSpacing: 1 }}>BALANCE</div>
          <div style={{
            fontSize: 20, fontWeight: 900, background: 'var(--gold-gradient)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            ${userStats.balance.toLocaleString()}
          </div>
        </div>

        {/* Deposit CTA */}
        <Link to="/deposit" style={{
          background: 'var(--gold-gradient)', color: '#000', fontWeight: 800,
          fontSize: 13, padding: '12px 26px', borderRadius: 10, textDecoration: 'none',
          boxShadow: 'var(--glow-gold)', transition: 'var(--transition)',
          letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 8,
        }}>
          💎 DEPOSIT
        </Link>

        {/* Profile */}
        <Link to="/user" style={{
          width: 42, height: 42, borderRadius: '50%',
          background: 'var(--gold-gradient)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontWeight: 800, fontSize: 16, color: '#000',
          boxShadow: 'var(--glow-soft)', textDecoration: 'none',
        }}>
          {userStats.username[0]}
        </Link>
      </div>
    </header>
  );
}
