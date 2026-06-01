import { motion } from 'framer-motion';
import { userStats } from '../data/games';

export default function UserCenter() {
  const stats = [
    { label: 'Total Deposit', value: userStats.totalDeposit, icon: '💰', color: '#00FF7F' },
    { label: 'Total Withdraw', value: userStats.totalWithdraw, icon: '💳', color: '#FFD700' },
    { label: "Today's Profit", value: userStats.todayProfit, icon: '📈', color: userStats.todayProfit >= 0 ? '#00FF7F' : '#FF0000' },
    { label: 'Member Since', value: userStats.memberSince, icon: '📅', color: '#888' },
  ];

  return (
    <div style={{ padding: '24px 32px 50px', maxWidth: 1000, margin: '0 auto' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1A0A00, #2D1A00, #1A0A00)',
        border: '1px solid rgba(255,215,0,0.2)', borderRadius: 20, padding: '36px 32px',
        marginBottom: 24, position: 'relative', overflow: 'hidden',
        boxShadow: '0 0 30px rgba(255,215,0,0.08)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(255,215,0,0.06) 0%, transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'var(--gold-gradient)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 32, fontWeight: 800, color: '#000',
            boxShadow: 'var(--glow-gold)', flexShrink: 0,
          }}>
            {userStats.username[0]}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 2 }}>{userStats.username}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>{userStats.levelIcon}</span>
              <span style={{ color: '#FFD700', fontWeight: 700, fontSize: 14 }}>{userStats.level}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#888', fontSize: 10, letterSpacing: 2 }}>BALANCE</div>
            <div className="shimmer-text" style={{ fontSize: 32, fontWeight: 900 }}>
              ${userStats.balance.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14, marginBottom: 30 }}>
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,215,0,0.08)',
              borderRadius: 12, padding: '20px', textAlign: 'center',
            }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ color: s.color, fontSize: 22, fontWeight: 800 }}>
              {typeof s.value === 'number' ? `$${s.value.toLocaleString()}` : s.value}
            </div>
            <div style={{ color: '#888', fontSize: 12, marginTop: 4 }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Settings */}
      <div style={{
        background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,215,0,0.08)',
        borderRadius: 14, overflow: 'hidden',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,215,0,0.06)', color: 'var(--gold)', fontWeight: 700, fontSize: 14, letterSpacing: 1 }}>
          ⚙️ ACCOUNT SETTINGS
        </div>
        {[
          { icon: '👤', label: 'Profile', desc: 'Edit username, avatar, personal info' },
          { icon: '🔒', label: 'Security', desc: 'Password, 2FA, login history' },
          { icon: '💳', label: 'Payment Methods', desc: 'Bank accounts, USDT wallet' },
          { icon: '🔔', label: 'Notifications', desc: 'Promotions, win alerts, updates' },
          { icon: '🌐', label: 'Language', desc: 'English / 中文 / 日本語 / 한국어' },
          { icon: '📊', label: 'Game History', desc: 'View your complete betting history' },
        ].map((s) => (
          <div key={s.label} style={{
            display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.03)', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            <span style={{ fontSize: 22 }}>{s.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{s.label}</div>
              <div style={{ color: '#666', fontSize: 12, marginTop: 2 }}>{s.desc}</div>
            </div>
            <span style={{ color: '#444' }}>→</span>
          </div>
        ))}
      </div>
    </div>
  );
}
