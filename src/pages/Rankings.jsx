import { motion } from 'framer-motion';
import { rankings, userStats } from '../data/games';

export default function Rankings() {
  const top3 = rankings.slice(0, 3);
  const rest = rankings.slice(3);

  return (
    <div style={{ padding: '24px 32px 50px', maxWidth: 900, margin: '0 auto' }}>
      <div className="jackpot-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2, marginBottom: 4, textAlign: 'center' }}>
        🏆 LEADERBOARD
      </div>
      <p style={{ color: '#777', fontSize: 14, textAlign: 'center', marginBottom: 32 }}>
        Top players ranked by lifetime winnings
      </p>

      {/* Podium */}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'flex-end', marginBottom: 32 }}>
        {/* 2nd */}
        {top3[1] && (
          <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
            style={{ textAlign: 'center', width: 140 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{top3[1].avatar}</div>
            <div style={{ color: '#C0C0C0', fontSize: 14, fontWeight: 800 }}>#{top3[1].rank}</div>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{top3[1].name}</div>
            <div style={{ color: '#888', fontSize: 11, marginBottom: 8 }}>{top3[1].level}</div>
            <div style={{
              height: 80, background: 'linear-gradient(180deg, #666, #444)',
              borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: '#ccc',
            }}>
              ${(top3[1].winnings / 1000000).toFixed(1)}M
            </div>
          </motion.div>
        )}

        {/* 1st */}
        {top3[0] && (
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0 }}
            style={{ textAlign: 'center', width: 160 }}>
            <div style={{ fontSize: 20, marginBottom: 4, animation: 'neon-pulse 2s ease-in-out infinite' }}>👑</div>
            <div style={{ fontSize: 40, marginBottom: 4, filter: 'drop-shadow(0 0 15px rgba(255,215,0,0.5))' }}>{top3[0].avatar}</div>
            <div style={{ color: '#FFD700', fontSize: 18, fontWeight: 900 }}>#1</div>
            <div style={{ color: '#fff', fontSize: 15, fontWeight: 700 }}>{top3[0].name}</div>
            <div style={{ color: '#FFD700', fontSize: 11, fontWeight: 600, marginBottom: 8 }}>{top3[0].level}</div>
            <div style={{
              height: 110, background: 'var(--gold-gradient)', borderRadius: '8px 8px 0 0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 900, color: '#000',
            }}>
              ${(top3[0].winnings / 1000000).toFixed(1)}M
            </div>
          </motion.div>
        )}

        {/* 3rd */}
        {top3[2] && (
          <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ textAlign: 'center', width: 140 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{top3[2].avatar}</div>
            <div style={{ color: '#CD7F32', fontSize: 14, fontWeight: 800 }}>#{top3[2].rank}</div>
            <div style={{ color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{top3[2].name}</div>
            <div style={{ color: '#888', fontSize: 11, marginBottom: 8 }}>{top3[2].level}</div>
            <div style={{
              height: 60, background: 'linear-gradient(180deg, #8B4513, #5C2E00)',
              borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: '#CD7F32',
            }}>
              ${(top3[2].winnings / 1000000).toFixed(1)}M
            </div>
          </motion.div>
        )}
      </div>

      {/* Rankings list */}
      <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,215,0,0.08)', borderRadius: 14, overflow: 'hidden' }}>
        {rest.map((p, i) => (
          <motion.div key={p.rank} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.03)',
              background: p.name === userStats.username ? 'rgba(255,215,0,0.04)' : 'transparent',
            }}>
            <div style={{ width: 30, color: '#555', fontWeight: 700, fontSize: 14 }}>#{p.rank}</div>
            <div style={{ fontSize: 24 }}>{p.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{p.name}</div>
              <div style={{ color: '#666', fontSize: 11 }}>{p.level}</div>
            </div>
            <div style={{ color: 'var(--gold)', fontWeight: 800, fontSize: 14 }}>
              ${p.winnings.toLocaleString()}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
