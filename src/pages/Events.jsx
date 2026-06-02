import { motion } from 'framer-motion';
import { events } from '../data/games';
import { Confetti, Crown, Diamond, Star } from '@phosphor-icons/react';

export default function Events() {
  return (
    <div style={{ padding: '24px 32px 50px', maxWidth: 1000, margin: '0 auto' }}>
      <div className="jackpot-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2, marginBottom: 4, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <Confetti size={28} color="url(#goldGrad)" /> EVENTS
      </div>
      <p style={{ color: '#777', fontSize: 14, textAlign: 'center', marginBottom: 32 }}>
        Limited-time promotions and tournaments with massive prizes
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 16, marginBottom: 40 }}>
        {events.map((ev, i) => (
          <motion.div key={ev.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            style={{
              background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,215,0,0.08)',
              borderRadius: 14, padding: 24, position: 'relative', overflow: 'hidden',
            }}>
            <div style={{
              display: 'inline-block', padding: '3px 14px', borderRadius: 6,
              background: ev.color + '18', color: ev.color, border: `1px solid ${ev.color}33`,
              fontSize: 10, fontWeight: 800, letterSpacing: 1, marginBottom: 12,
            }}>
              {ev.tag}
            </div>
            <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{ev.title}</h3>
            <p style={{ color: '#888', fontSize: 13, lineHeight: 1.5, marginBottom: 16 }}>{ev.desc}</p>
            <button style={{
              color: 'var(--gold)', fontSize: 12, fontWeight: 700, letterSpacing: 1,
              background: 'none', padding: 0, transition: 'all 0.3s',
            }}>
              LEARN MORE →
            </button>
          </motion.div>
        ))}
      </div>

      {/* VIP */}
      <div style={{
        background: 'linear-gradient(135deg, #1A0A00, #0D0D0D)',
        border: '1px solid rgba(255,215,0,0.15)', borderRadius: 20, padding: '40px',
        textAlign: 'center', position: 'relative', overflow: 'hidden',
        boxShadow: '0 0 30px rgba(255,215,0,0.06)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(255,215,0,0.04) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="shimmer-text" style={{ fontSize: 26, fontWeight: 900, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}><Crown size={24} color="url(#goldGrad)" /> VIP PROGRAM</h2>
          <p style={{ color: '#888', fontSize: 13, marginBottom: 28, maxWidth: 500, margin: '0 auto 28px' }}>
            Exclusive VIP tiers with increasing cashback, bonuses, and personal account manager
          </p>

          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { name: 'Gold', icon: <Crown size={32} color="url(#goldGrad)" />, deposit: 'From $50k', color: '#FFD700', perks: '5% cashback • $2k bonus' },
              { name: 'Platinum', icon: <Diamond size={32} color="url(#goldGrad)" />, deposit: 'From $200k', color: '#E5E4E2', perks: '8% cashback • $10k bonus' },
              { name: 'Diamond', icon: <Star size={32} color="url(#goldGrad)" />, deposit: 'From $500k', color: '#00BFFF', perks: '12% cashback • $50k bonus' },
            ].map(t => (
              <div key={t.name} style={{
                background: 'rgba(255,255,255,0.02)', border: `1px solid ${t.color}22`,
                borderRadius: 14, padding: '24px 20px', width: 200,
              }}>
                <div style={{ fontSize: 36, marginBottom: 8 }}>{t.icon}</div>
                <div style={{ color: t.color, fontSize: 16, fontWeight: 800 }}>{t.name}</div>
                <div style={{ color: '#666', fontSize: 11, marginBottom: 8 }}>{t.deposit}</div>
                <div style={{ color: '#888', fontSize: 11 }}>{t.perks}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
