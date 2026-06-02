import { motion } from 'framer-motion';
import { seasonPass } from '../data/games';
import { Ticket, Diamond } from '@phosphor-icons/react';

export default function SeasonPass() {
  return (
    <div style={{ padding: '24px 32px 50px', maxWidth: 900, margin: '0 auto' }}>
      <div className="jackpot-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 12 }}>
        <Ticket size={28} color="url(#goldGrad)" /> SEASON PASS
      </div>
      <p style={{ color: '#777', fontSize: 14, marginBottom: 8 }}>
        Season {seasonPass.season}: {seasonPass.name}
      </p>
      <p style={{ color: '#555', fontSize: 12, marginBottom: 28 }}>
        Ends {seasonPass.endDate} • 50 levels to complete
      </p>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1A0A00, #0D0D2D, #1A0A00)',
        border: '1px solid rgba(255,215,0,0.2)', borderRadius: 18, padding: '30px',
        marginBottom: 24, textAlign: 'center', position: 'relative', overflow: 'hidden',
        boxShadow: '0 0 30px rgba(255,215,0,0.08)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(255,215,0,0.04) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Ticket size={48} color="url(#goldGrad)" style={{ marginBottom: 12 }} />
          <div className="shimmer-text" style={{ fontSize: 24, fontWeight: 900, marginBottom: 4 }}>
            {seasonPass.name}
          </div>
          <div style={{ color: '#888', fontSize: 13, marginBottom: 16 }}>Season {seasonPass.season}</div>
          <div style={{ maxWidth: 400, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: 11, marginBottom: 4 }}>
              <span>Level 12</span>
              <span>Level 50</span>
            </div>
            <div style={{ width: '100%', height: 8, background: '#222', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{ width: '24%', height: '100%', background: 'var(--gold-gradient)', borderRadius: 4 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Track */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {seasonPass.tiers.map((tier, i) => (
          <motion.div
            key={tier.level}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
              background: i < 2 ? 'rgba(255,215,0,0.04)' : 'rgba(255,255,255,0.01)',
              border: `1px solid ${i < 2 ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.04)'}`,
              borderRadius: 12,
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: i < 2 ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: i < 2 ? '#000' : '#555', fontWeight: 800, fontSize: 12,
              flexShrink: 0,
            }}>
              {tier.level}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: i < 2 ? '#fff' : '#555', fontWeight: 600, fontSize: 13, marginBottom: 4 }}>
                Level {tier.level}
              </div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ color: '#888', fontSize: 12 }}>
                  FREE <span style={{ color: i < 2 ? '#ccc' : '#555' }}>{tier.free}</span>
                </div>
                <div style={{ color: '#888', fontSize: 12 }}>
                  <Diamond size={14} color="url(#goldGrad)" style={{ verticalAlign: 'middle' }} /> <span style={{ color: i < 2 ? 'var(--gold)' : '#555' }}>{tier.premium}</span>
                </div>
              </div>
            </div>
            <div style={{
              padding: '4px 12px', borderRadius: 6,
              background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.15)',
              color: 'var(--gold)', fontSize: 10, fontWeight: 700, letterSpacing: 1,
              flexShrink: 0,
            }}>
              {i < 2 ? 'UNLOCKED' : 'LOCKED'}
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: 28, textAlign: 'center' }}>
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          className="btn-primary" style={{ padding: '16px 48px', fontSize: 16, letterSpacing: 2, animation: 'glow-intense-pulse 2s ease-in-out infinite', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Diamond size={20} color="url(#goldGrad)" /> UPGRADE TO PREMIUM — $19.99
        </motion.button>
      </div>
    </div>
  );
}
