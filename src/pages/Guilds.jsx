import { motion } from 'framer-motion';
import { guilds } from '../data/games';

export default function Guilds() {
  return (
    <div style={{ padding: '24px 32px 50px', maxWidth: 900, margin: '0 auto' }}>
      <div className="jackpot-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2, marginBottom: 4 }}>
        ⚔️ GUILDS
      </div>
      <p style={{ color: '#777', fontSize: 14, marginBottom: 32 }}>
        Join a guild, compete together, earn exclusive guild rewards.
      </p>

      {/* User's guild */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,215,0,0.04), transparent)',
        border: '1px solid rgba(255,215,0,0.15)', borderRadius: 16, padding: '20px 24px',
        marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20,
        boxShadow: 'var(--glow-soft)',
      }}>
        <div style={{ fontSize: 48 }}>🦁</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#888', fontSize: 10, letterSpacing: 2, marginBottom: 2 }}>YOUR GUILD</div>
          <div style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>Golden Legion</div>
          <div style={{ color: '#666', fontSize: 12 }}>Level 12 • 152 members • Rank #1</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#888', fontSize: 10, letterSpacing: 1 }}>GUILD TOKENS</div>
          <div className="shimmer-text" style={{ fontSize: 20, fontWeight: 900 }}>12,450</div>
        </div>
      </div>

      {/* Guild list */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {guilds.map((g, i) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            style={{
              background: i === 0 ? 'rgba(255,215,0,0.03)' : 'rgba(255,255,255,0.01)',
              border: `1px solid ${i === 0 ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.05)'}`,
              borderRadius: 14, padding: '20px',
              boxShadow: i === 0 ? 'var(--glow-soft)' : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ fontSize: 36, filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.3))' }}>{g.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{g.name}</div>
                <div style={{ color: '#888', fontSize: 11 }}>Level {g.level} • {g.members} members</div>
              </div>
              <div style={{
                background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.12)',
                borderRadius: 6, padding: '2px 10px', color: 'var(--gold)', fontSize: 11, fontWeight: 700,
              }}>
                #{g.rank}
              </div>
            </div>
            <p style={{ color: '#666', fontSize: 12, lineHeight: 1.5, marginBottom: 14 }}>{g.desc}</p>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className={i === 0 ? "btn-primary" : ''}
              style={{
                width: '100%', padding: '8px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                background: i === 0 ? undefined : 'rgba(255,255,255,0.03)',
                color: i === 0 ? '#000' : '#888',
                border: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                letterSpacing: 1,
              }}>
              {i === 0 ? 'ACTIVE' : 'VIEW →'}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
