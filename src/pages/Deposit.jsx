import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bank, Diamond, CreditCard, Gift, CheckCircle, CurrencyDollar, Check } from '@phosphor-icons/react';

const methods = [
  { id: 'bank', name: 'Bank Transfer', icon: Bank, desc: 'Free • 1-3 min processing' },
  { id: 'usdt', name: 'USDT (TRC20)', icon: Diamond, desc: 'Instant • Min 100 USDT' },
  { id: 'card', name: 'Credit Card', icon: CreditCard, desc: 'Visa / MasterCard / Amex' },
  { id: 'crypto', name: 'Cryptocurrency', icon: '₿', desc: 'BTC • ETH • SOL • USDC' },
];

const amounts = [1000, 5000, 10000, 50000, 100000, 500000];

export default function Deposit() {
  const [method, setMethod] = useState('usdt');
  const [amount, setAmount] = useState(10000);
  const [showSuccess, setShowSuccess] = useState(false);
  const [custom, setCustom] = useState('');

  const handleDeposit = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div style={{ padding: '24px 32px 50px', maxWidth: 900, margin: '0 auto' }}>
      <div className="jackpot-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2, marginBottom: 4 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><CurrencyDollar size={28} color="url(#goldGrad)" /> DEPOSIT</span>
      </div>
      <p style={{ color: '#777', fontSize: 14, marginBottom: 28 }}>Choose your payment method and amount to top up</p>

      {/* Methods */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ color: '#888', fontSize: 12, letterSpacing: 1, marginBottom: 12, fontWeight: 600 }}>PAYMENT METHOD</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
          {methods.map((m) => (
            <motion.button key={m.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setMethod(m.id)}
              style={{
                border: `1px solid ${method === m.id ? 'var(--gold)' : 'rgba(255,215,0,0.08)'}`,
                background: method === m.id ? 'rgba(255,215,0,0.08)' : 'rgba(255,255,255,0.02)',
                borderRadius: 12, padding: '20px', textAlign: 'center', transition: 'all 0.3s',
                position: 'relative',
              }}>
              <div style={{ fontSize: 32, marginBottom: 8, display: 'flex', justifyContent: 'center' }}>{typeof m.icon === 'function' ? <m.icon size={32} color="url(#goldGrad)" /> : m.icon}</div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{m.name}</div>
              <div style={{ color: '#666', fontSize: 11 }}>{m.desc}</div>
              {method === m.id && <div style={{
                position: 'absolute', top: 8, right: 8, width: 20, height: 20, borderRadius: '50%',
                background: 'var(--gold-gradient)', color: '#000', fontWeight: 700, fontSize: 11,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Check size={12} color="#000" weight="bold" /></div>}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Amount */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ color: '#888', fontSize: 12, letterSpacing: 1, marginBottom: 12, fontWeight: 600 }}>AMOUNT</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10, marginBottom: 14 }}>
          {amounts.map((a) => (
            <button key={a} onClick={() => { setAmount(a); setCustom(''); }}
              style={{
                border: `1px solid ${amount === a ? 'var(--gold)' : 'rgba(255,215,0,0.08)'}`,
                background: amount === a ? 'rgba(255,215,0,0.08)' : 'rgba(255,255,255,0.02)',
                borderRadius: 10, padding: '14px', textAlign: 'center', transition: 'all 0.3s',
              }}>
              <div style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>${a.toLocaleString()}</div>
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#888', fontSize: 13 }}>Custom:</span>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', maxWidth: 240,
            background: '#000', border: '1px solid rgba(255,215,0,0.2)', borderRadius: 8, overflow: 'hidden',
          }}>
            <input type="number" value={custom} onChange={e => { setCustom(e.target.value); setAmount(0); }}
              placeholder="Enter amount" style={{
                flex: 1, height: 40, background: 'transparent', border: 'none',
                color: 'var(--gold-light)', fontSize: 16, fontWeight: 700, padding: '0 12px',
              }} />
            <span style={{ padding: '0 12px', color: '#666', fontSize: 13 }}>$</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div style={{
        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,215,0,0.1)',
        borderRadius: 14, padding: 24,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
          <span style={{ color: '#888', fontSize: 13 }}>Method</span>
          <span style={{ color: 'var(--gold)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {(() => { const m = methods.find(x => x.id === method); return m ? (typeof m.icon === 'function' ? <m.icon size={16} color="url(#goldGrad)" /> : <span style={{fontSize: 14}}>{m.icon}</span>) : null; })()}
            {methods.find(m => m.id === method)?.name}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <span style={{ color: '#888', fontSize: 13 }}>Amount</span>
          <span className="shimmer-text" style={{ fontWeight: 800, fontSize: 24 }}>
            ${(custom ? parseInt(custom) : amount).toLocaleString()}
          </span>
        </div>
        <div style={{
          marginTop: 12, padding: '10px 16px',
          background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.12)',
          borderRadius: 8, color: 'var(--gold)', fontSize: 13, textAlign: 'center',
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Gift size={14} color="var(--gold)" /> Welcome bonus: +<strong>${(custom ? parseInt(custom) : amount).toLocaleString()}</strong> free with first deposit!</span>
        </div>

        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={handleDeposit}
          className="btn-primary"
          style={{ width: '100%', padding: '16px', fontSize: 18, fontWeight: 800, letterSpacing: 2, marginTop: 20 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}><Diamond size={18} color="#000" /> DEPOSIT NOW</span>
        </motion.button>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
          style={{
            position: 'fixed', bottom: 30, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(0,255,127,0.95)', color: '#000', fontWeight: 800,
            padding: '16px 32px', borderRadius: 12, zIndex: 10000,
            boxShadow: '0 4px 30px rgba(0,255,127,0.4)',
          }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><CheckCircle size={16} color="#000" weight="fill" /> ${(custom ? parseInt(custom) : amount).toLocaleString()} deposited successfully!</span>
        </motion.div>
      )}
    </div>
  );
}
