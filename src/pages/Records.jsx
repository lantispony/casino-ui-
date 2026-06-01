import { useState } from 'react';
import { motion } from 'framer-motion';
import { transactions } from '../data/games';

const typeColors = {
  deposit: { bg: 'rgba(0,255,127,0.06)', color: '#00FF7F', label: 'DEPOSIT' },
  withdraw: { bg: 'rgba(255,215,0,0.06)', color: '#FFD700', label: 'WITHDRAW' },
  game: { bg: 'rgba(255,0,0,0.06)', color: '#FF4444', label: 'GAME' },
};

const statusColors = {
  success: { bg: 'rgba(0,255,127,0.08)', color: '#00FF7F', label: 'COMPLETED' },
  pending: { bg: 'rgba(255,215,0,0.08)', color: '#FFD700', label: 'PENDING' },
  failed: { bg: 'rgba(255,0,0,0.08)', color: '#FF4444', label: 'FAILED' },
};

const tabs = [
  { id: 'all', label: 'ALL' }, { id: 'deposit', label: 'DEPOSIT' },
  { id: 'withdraw', label: 'WITHDRAW' }, { id: 'game', label: 'GAME' },
];

export default function Records() {
  const [activeTab, setActiveTab] = useState('all');
  const filtered = transactions.filter(t => activeTab === 'all' || t.type === activeTab);

  return (
    <div style={{ padding: '24px 32px 50px', maxWidth: 1000, margin: '0 auto' }}>
      <div className="jackpot-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2, marginBottom: 4 }}>
        📊 TRANSACTION HISTORY
      </div>
      <p style={{ color: '#777', fontSize: 14, marginBottom: 28 }}>View all your deposits, withdrawals, and game records</p>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'TOTAL DEPOSIT', value: '$560,000', icon: '💰', color: '#00FF7F' },
          { label: 'TOTAL WITHDRAW', value: '$327,000', icon: '💳', color: '#FFD700' },
          { label: 'NET GAMING', value: '-$120,000', icon: '🎮', color: '#FF4444' },
          { label: 'NET PROFIT', value: '+$113,000', icon: '📈', color: '#00FF7F' },
        ].map(s => (
          <div key={s.label} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,215,0,0.06)', borderRadius: 12, padding: '18px', textAlign: 'center' }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ color: s.color, fontSize: 20, fontWeight: 800 }}>{s.value}</div>
            <div style={{ color: '#666', fontSize: 11, marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding: '8px 22px', borderRadius: 20, fontSize: 12, fontWeight: 700, letterSpacing: 1,
            border: `1px solid ${activeTab === t.id ? 'var(--gold)' : 'transparent'}`,
            background: activeTab === t.id ? 'rgba(255,215,0,0.1)' : 'transparent',
            color: activeTab === t.id ? 'var(--gold)' : '#666',
            transition: 'all 0.3s',
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,215,0,0.06)', borderRadius: 14, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,215,0,0.06)' }}>
              {['TYPE', 'AMOUNT', 'METHOD', 'STATUS', 'DATE'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '14px 20px', color: '#555', fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => {
              const tc = typeColors[t.type] || typeColors.game;
              const sc = statusColors[t.status] || statusColors.success;
              return (
                <motion.tr key={t.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ background: tc.bg, color: tc.color, padding: '3px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>{tc.label}</span>
                  </td>
                  <td style={{ padding: '14px 20px', color: t.amount > 0 ? '#00FF7F' : '#FF4444', fontWeight: 700, fontSize: 15 }}>
                    {t.amount > 0 ? '+' : ''}${t.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '14px 20px', color: '#888', fontSize: 13 }}>{t.method}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ background: sc.bg, color: sc.color, padding: '3px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700 }}>{sc.label}</span>
                  </td>
                  <td style={{ padding: '14px 20px', color: '#555', fontSize: 12 }}>{t.date}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: '#555' }}>No records found</div>}
      </div>
    </div>
  );
}
