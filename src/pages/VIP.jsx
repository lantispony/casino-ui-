import { motion } from 'framer-motion';
import { vipTiers } from '../data/games';

export default function VIP() {
  return (
    <div style={{ padding: '24px 32px 50px', maxWidth: 1000, margin: '0 auto' }}>
      <div className="jackpot-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2, marginBottom: 4 }}>
        👑 VIP CLUB
      </div>
      <p style={{ color: '#777', fontSize: 14, marginBottom: 32 }}>
        Exclusive perks, higher cashback, and premium treatment for our top players.
      </p>

      {/* Current status */}
      <div style={{
        background: 'linear-gradient(135deg, #1A0A00, #2D1A00)',
        border: '1px solid rgba(255,215,0,0.2)', borderRadius: 18, padding: '30px',
        marginBottom: 28, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap',
        boxShadow: '0 0 30px rgba(255,215,0,0.08)',
      }}>
        <div style={{ fontSize: 64, filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.5))' }}>👑</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: '#888', fontSize: 10, letterSpacing: 2, marginBottom: 2 }}>YOUR STATUS</div>
          <div style={{ color: '#FFD700', fontSize: 24, fontWeight: 900 }}>Gold VIP</div>
          <div style={{ color: '#666', fontSize: 12, marginTop: 4 }}>Next tier: Platinum — Deposit $200,000 total</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#888', fontSize: 10, letterSpacing: 2, marginBottom: 2 }}>PROGRESS</div>
          <div style={{ width: 180, height: 6, background: '#222', borderRadius: 3, overflow: 'hidden', marginTop: 4 }}>
            <div style={{ width: '25%', height: '100%', background: 'var(--gold-gradient)', borderRadius: 3 }} />
          </div>
          <div style={{ color: '#666', fontSize: 11, marginTop: 4 }}>$50k / $200k</div>
        </div>
      </div>

      {/* VIP Tiers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
        {vipTiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            style={{
              background: i === 2 ? 'linear-gradient(135deg, rgba(255,215,0,0.08), transparent)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${i === 2 ? 'rgba(255,215,0,0.25)' : 'rgba(255,255,255,0.05)'}`,
              borderRadius: 16, padding: '24px 16px', textAlign: 'center',
              boxShadow: i === 2 ? 'var(--glow-gold)' : 'none',
              position: 'relative',
            }}
          >
            {i === 2 && <div style={{
              position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
              background: 'var(--gold-gradient)', color: '#000', fontSize: 9, fontWeight: 800,
              padding: '2px 14px', borderRadius: 10, letterSpacing: 1,
            }}>CURRENT</div>}
            <div style={{ fontSize: 40, marginBottom: 8, filter: `drop-shadow(0 0 10px ${tier.color}44)` }}>{tier.icon}</div>
            <div style={{ color: tier.color, fontSize: 18, fontWeight: 800, marginBottom: 2 }}>{tier.name}</div>
            <div style={{ color: '#666', fontSize: 11, marginBottom: 12 }}>${tier.minDeposit.toLocaleString()}+</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ background: `rgba(0,255,127,0.08)`, border: '1px solid rgba(0,255,127,0.12)', borderRadius: 6, padding: '4px 8px', fontSize: 11, color: '#00FF7F' }}>
                {tier.cashback}% Cashback
              </div>
              <div style={{ background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.1)', borderRadius: 6, padding: '4px 8px', fontSize: 11, color: 'var(--gold)' }}>
                ${tier.bonus.toLocaleString()} Bonus
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* VIP Perks */}
      <div style={{
        marginTop: 32, background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,215,0,0.08)', borderRadius: 14, padding: 24,
      }}>
        <div style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 700, marginBottom: 12 }}>🎁 VIP BENEFITS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {[
            'Personal Account Manager',
            'Higher Daily Limits',
            'Exclusive VIP Events',
            'Birthday Bonus Package',
            'Faster Withdrawals',
            'Special Game Access',
            'Dedicated Support Line',
            'Custom Reward Options',
          ].map(p => (
            <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#888', fontSize: 13 }}>
              <span style={{ color: '#00FF7F' }}>✓</span> {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
