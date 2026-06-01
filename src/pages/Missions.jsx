import { motion } from 'framer-motion';
import { missions } from '../data/games';

export default function Missions() {
  return (
    <div style={{ padding: '24px 32px 50px', maxWidth: 900, margin: '0 auto' }}>
      <div className="jackpot-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2, marginBottom: 4 }}>
        🎯 MISSIONS
      </div>
      <p style={{ color: '#777', fontSize: 14, marginBottom: 32 }}>
        Complete missions to earn bonus coins and climb the ranks.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {missions.map((m, i) => {
          const progress = Math.round((m.progress / m.total) * 100);
          const done = m.progress >= m.total;
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 18, padding: '20px 24px',
                background: done ? 'rgba(0,255,127,0.03)' : 'rgba(255,255,255,0.01)',
                border: `1px solid ${done ? 'rgba(0,255,127,0.12)' : 'rgba(255,215,0,0.08)'}`,
                borderRadius: 14,
                opacity: done ? 0.6 : 1,
              }}
            >
              <div style={{
                fontSize: 32, width: 50, textAlign: 'center',
                filter: done ? 'none' : 'drop-shadow(0 0 8px rgba(255,215,0,0.3))',
              }}>
                {m.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: done ? '#666' : '#fff', fontWeight: 700, fontSize: 15 }}>{m.title}</span>
                  <span className="shimmer-text" style={{ fontWeight: 800, fontSize: 14 }}>
                    ${m.reward.toLocaleString()}
                  </span>
                </div>
                <div style={{ color: '#888', fontSize: 12, marginBottom: 8 }}>{m.desc}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, height: 6, background: '#222', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{
                      width: `${progress}%`, height: '100%',
                      background: done ? 'var(--accent-green)' : 'var(--gold-gradient)',
                      borderRadius: 3, transition: 'width 0.5s',
                    }} />
                  </div>
                  <span style={{ color: '#666', fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {m.progress}/{m.total}
                  </span>
                </div>
              </div>
              {done ? (
                <div style={{ color: '#00FF7F', fontSize: 12, fontWeight: 700 }}>DONE ✓</div>
              ) : (
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="btn-primary" style={{
                    padding: '8px 20px', fontSize: 11, letterSpacing: 1, flexShrink: 0,
                  }}>
                  CLAIM
                </motion.button>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
