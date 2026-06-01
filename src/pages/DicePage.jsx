import { useState } from 'react';
import { motion } from 'framer-motion';
import WinAnimation from '../components/animations/WinAnimation';
import CoinRain from '../components/animations/CoinRain';

const faces = { 1: '⚀', 2: '⚁', 3: '⚂', 4: '⚃', 5: '⚄', 6: '⚅' };

function roll() {
  return [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
}

export default function DicePage() {
  const [dice, setDice] = useState([1, 3, 5]);
  const [balance, setBalance] = useState(100000);
  const [bet, setBet] = useState(500);
  const [showWin, setShowWin] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [showCoins, setShowCoins] = useState(false);
  const [rolling, setRolling] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const rollDice = (pred) => {
    if (rolling || balance < bet) return;
    setPrediction(pred); setRolling(true); setBalance(b => b - bet);
    let c = 0;
    const iv = setInterval(() => { setDice(roll()); c++; if (c > 15) {
      clearInterval(iv);
      const f = roll(); setDice(f); setRolling(false);
      const sum = f.reduce((a, b) => a + b, 0);
      const isBig = sum >= 11, isSmall = sum <= 10, triple = f[0] === f[1] && f[1] === f[2];
      let win = false, mult = 1;
      if (pred === 'big' && isBig) { win = true; mult = 2; }
      if (pred === 'small' && isSmall) { win = true; mult = 2; }
      if (pred === 'triple' && triple) { win = true; mult = 24; }
      if (win) { const w = bet * mult; setLastWin(w); setBalance(b => b + w); setShowWin(true); setShowCoins(true); setTimeout(() => setShowCoins(false), 4000); }
    } }, 100);
  };

  return (
    <div style={{ padding: '24px 32px 50px', maxWidth: 900, margin: '0 auto' }}>
      <WinAnimation show={showWin} amount={lastWin} onComplete={() => setShowWin(false)} />
      <CoinRain active={showCoins} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <div className="jackpot-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2 }}>🎲 SIC BO</div>
          <div style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 600, letterSpacing: 3, marginTop: 2 }}>ROLL THE BONES</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#666', fontSize: 10, letterSpacing: 1 }}>BALANCE</div>
          <div className="shimmer-text" style={{ fontSize: 24, fontWeight: 900 }}>${balance.toLocaleString()}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}>
        <div style={{
          flex: 1, minWidth: 280, background: 'linear-gradient(180deg, #1A1A2E, #0D0D0D)',
          border: '2px solid rgba(255,215,0,0.25)', borderRadius: 22, padding: '50px 30px',
          textAlign: 'center', boxShadow: '0 0 40px rgba(255,215,0,0.1)',
        }}>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 20 }}>
            {dice.map((v, i) => (
              <motion.div key={i}
                animate={rolling ? { rotateX: 360, rotateY: 360 } : {}}
                transition={{ duration: 0.3, repeat: rolling ? Infinity : 0 }}
                style={{
                  width: 90, height: 90, background: '#000',
                  border: '2px solid rgba(255,215,0,0.35)', borderRadius: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: 'inset 0 0 20px rgba(255,215,0,0.05)',
                }}>
                <span style={{ fontSize: 44 }}>{faces[v]}</span>
              </motion.div>
            ))}
          </div>
          {!rolling && <div style={{ color: '#888', fontSize: 15 }}>TOTAL: <span className="shimmer-text" style={{ fontSize: 26, fontWeight: 900 }}>{dice.reduce((a, b) => a + b, 0)}</span></div>}
        </div>

        <div style={{ width: 280 }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: '#888', fontSize: 12, marginBottom: 8, letterSpacing: 1 }}>BET AMOUNT</div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button onClick={() => setBet(Math.max(100, bet - 100))} style={{
                width: 40, height: 40, background: 'rgba(255,215,0,0.08)',
                border: '1px solid rgba(255,215,0,0.2)', borderRadius: 8,
                color: 'var(--gold)', fontSize: 18, fontWeight: 700,
              }}>−</button>
              <div style={{
                flex: 1, height: 40, background: '#000', border: '1px solid rgba(255,215,0,0.25)',
                borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--gold-light)', fontSize: 18, fontWeight: 800,
              }}>${bet.toLocaleString()}</div>
              <button onClick={() => setBet(bet + 100)} style={{
                width: 40, height: 40, background: 'rgba(255,215,0,0.08)',
                border: '1px solid rgba(255,215,0,0.2)', borderRadius: 8,
                color: 'var(--gold)', fontSize: 18, fontWeight: 700,
              }}>+</button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {[
              { key: 'big', label: 'BIG', sub: '11-18', icon: '📈', odds: 'x2' },
              { key: 'small', label: 'SMALL', sub: '4-10', icon: '📉', odds: 'x2' },
              { key: 'triple', label: 'TRIPLE', sub: 'All Same', icon: '🎯', odds: 'x24' },
            ].map(p => (
              <motion.button key={p.key} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={() => rollDice(p.key)}
                disabled={rolling || balance < bet}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  padding: '14px 8px', borderRadius: 10,
                  border: `1px solid ${prediction === p.key && !rolling ? 'var(--gold)' : 'rgba(255,215,0,0.12)'}`,
                  background: prediction === p.key && !rolling ? 'rgba(255,215,0,0.1)' : 'transparent',
                  color: 'var(--gold)', transition: 'all 0.3s',
                }}>
                <span style={{ fontSize: 20 }}>{p.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{p.label}</span>
                <span style={{ fontSize: 9, color: '#666' }}>{p.sub}</span>
                <span style={{ fontSize: 10, color: '#FFD700', fontWeight: 700 }}>{p.odds}</span>
              </motion.button>
            ))}
          </div>

          {lastWin > 0 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{
            marginTop: 12, textAlign: 'center', padding: '8px',
            background: 'rgba(0,255,127,0.06)', border: '1px solid rgba(0,255,127,0.15)',
            borderRadius: 8, fontSize: 12,
          }}>WIN <span style={{ color: '#00FF7F', fontWeight: 800, fontSize: 16 }}>+${lastWin.toLocaleString()}</span></motion.div>}
        </div>
      </div>

      <div style={{
        marginTop: 32, background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,215,0,0.08)', borderRadius: 14, padding: 24,
      }}>
        <div style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>📖 GAME INFO</div>
        <p style={{ color: '#666', fontSize: 13, lineHeight: 1.7 }}>
          Three dice, endless possibilities. Bet Big (11-18), Small (4-10), or Triple (all three match).
          This is a UI demo only — no real gambling or cashouts possible.
        </p>
      </div>
    </div>
  );
}
