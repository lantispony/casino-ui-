import { motion } from 'framer-motion';
import { dailyRewards } from '../data/games';
import { CalendarCheck, Check, Lightbulb } from '@phosphor-icons/react';
import CoinRain from '../components/animations/CoinRain';
import { useState } from 'react';

export default function DailyRewards() {
  const [claimed, setClaimed] = useState(2);
  const [showCoins, setShowCoins] = useState(false);
  const [justClaimed, setJustClaimed] = useState(null);

  const claim = (day) => {
    if (day <= claimed) return;
    setClaimed(day);
    setJustClaimed(day);
    setShowCoins(true);
    setTimeout(() => { setShowCoins(false); setJustClaimed(null); }, 3000);
  };

  return (
    <div style={{ padding: '24px 32px 50px', maxWidth: 900, margin: '0 auto' }}>
      <CoinRain active={showCoins} />

      <div className="jackpot-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2, marginBottom: 4, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <CalendarCheck size={28} color="url(#goldGrad)" /> DAILY REWARDS
      </div>
      <p style={{ color: '#777', fontSize: 14, textAlign: 'center', marginBottom: 32 }}>
        Check in every day — bigger rewards the longer your streak!
      </p>

      {/* Streak counter */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,215,0,0.06), transparent)',
        border: '1px solid rgba(255,215,0,0.12)', borderRadius: 14,
        padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 28,
      }}>
        <div>
          <div style={{ color: '#888', fontSize: 11, letterSpacing: 1 }}>CURRENT STREAK</div>
          <div style={{ color: '#fff', fontSize: 28, fontWeight: 900 }}>{claimed} <span style={{ color: '#666', fontSize: 16 }}>days</span></div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#888', fontSize: 11, letterSpacing: 1 }}>NEXT REWARD</div>
          <div className="shimmer-text" style={{ fontSize: 22, fontWeight: 900 }}>
            ${(dailyRewards[claimed]?.reward || 100).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Calendar grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 12 }}>
        {dailyRewards.map((d, i) => {
          const isClaimed = i < claimed;
          const canClaim = i === claimed;
          const isFuture = i > claimed;
          return (
            <motion.div
              key={d.day}
              whileHover={canClaim ? { scale: 1.05 } : {}}
              style={{
                textAlign: 'center', padding: '20px 12px', borderRadius: 14,
                background: isClaimed ? 'rgba(0,255,127,0.06)' : canClaim ? 'rgba(255,215,0,0.08)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${
                  isClaimed ? 'rgba(0,255,127,0.2)' : canClaim ? 'var(--border-gold-bright)' : 'rgba(255,255,255,0.05)'
                }`,
                boxShadow: canClaim ? 'var(--glow-gold)' : 'none',
                cursor: canClaim ? 'pointer' : 'default',
                transition: 'all 0.3s',
                position: 'relative',
              }}
              onClick={() => canClaim && claim(d.day)}
            >
              {isClaimed && <div style={{ position: 'absolute', top: 6, right: 8, color: '#00FF7F', display: 'flex', alignItems: 'center' }}><Check size={14} color="#00FF7F" /></div>}
              <div style={{ fontSize: 28, marginBottom: 6, filter: canClaim ? 'drop-shadow(0 0 8px rgba(255,215,0,0.5))' : 'none' }}>
                {d.icon}
              </div>
              <div style={{ color: '#666', fontSize: 11, fontWeight: 600, marginBottom: 4 }}>
                DAY {d.day}
              </div>
              <div style={{
                color: isClaimed ? '#00FF7F' : canClaim ? 'var(--gold-light)' : '#555',
                fontSize: 16, fontWeight: 800,
              }}>
                ${d.reward.toLocaleString()}
              </div>
              {justClaimed === d.day && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1, y: -20 }} transition={{ duration: 0.5 }}
                  style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', color: '#FFD700', fontSize: 12, fontWeight: 800 }}>
                  CLAIMED!
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div style={{
        marginTop: 32, background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,215,0,0.08)', borderRadius: 14, padding: 24,
      }}>
        <div style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 700, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}><Lightbulb size={16} color="url(#goldGrad)" /> TIP</div>
        <p style={{ color: '#666', fontSize: 13, lineHeight: 1.6 }}>
          Don't break your streak! Day 7 rewards you with a massive $5,000 bonus.
          Streak resets if you miss a day.
        </p>
      </div>
    </div>
  );
}
