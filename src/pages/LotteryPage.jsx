import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WinAnimation from '../components/animations/WinAnimation';
import CoinRain from '../components/animations/CoinRain';

const allNums = Array.from({ length: 80 }, (_, i) => i + 1);

function draw() {
  const pool = [...allNums], drawn = [];
  for (let i = 0; i < 20; i++) { const idx = Math.floor(Math.random() * pool.length); drawn.push(pool.splice(idx, 1)[0]); }
  return drawn.sort((a, b) => a - b);
}

export default function LotteryPage() {
  const [selected, setSelected] = useState([]);
  const [drawn, setDrawn] = useState([]);
  const [balance, setBalance] = useState(100000);
  const [bet, setBet] = useState(100);
  const [drawing, setDrawing] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [showCoins, setShowCoins] = useState(false);
  const [matchCount, setMatchCount] = useState(0);
  const [phase, setPhase] = useState('select');
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (phase === 'select') {
      const t = setInterval(() => setTimer(p => Math.max(0, p - 1)), 1000);
      return () => clearInterval(t);
    }
  }, [phase]);

  const toggle = (n) => {
    if (drawing || phase !== 'select') return;
    setSelected(p => p.includes(n) ? p.filter(x => x !== n) : p.length < 10 ? [...p, n] : p);
  };

  const doDraw = () => {
    if (drawing || selected.length === 0 || balance < bet) return;
    setPhase('draw'); setDrawing(true); setBalance(b => b - bet * selected.length);
    const nums = draw();
    let idx = 0;
    const iv = setInterval(() => {
      setDrawn(nums.slice(0, idx + 1)); idx++;
      if (idx >= 20) {
        clearInterval(iv); setDrawing(false);
        const m = selected.filter(n => nums.includes(n)).length;
        setMatchCount(m);
        const mults = { 3: 2, 4: 5, 5: 15, 6: 50, 7: 200, 8: 1000, 9: 5000, 10: 25000 };
        if (m >= 3) { const w = bet * (mults[m] || 0); setLastWin(w); setBalance(b => b + w); setShowWin(true); setShowCoins(true); setTimeout(() => setShowCoins(false), 4000); }
        setTimeout(() => { setPhase('select'); setSelected([]); setDrawn([]); setTimer(60); }, 5000);
      }
    }, 150);
  };

  return (
    <div style={{ padding: '24px 32px 50px', maxWidth: 1000, margin: '0 auto' }}>
      <WinAnimation show={showWin} amount={lastWin} onComplete={() => setShowWin(false)} />
      <CoinRain active={showCoins} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div className="jackpot-text" style={{ fontSize: 32, fontWeight: 900 }}>🎯 INSTANT LOTTERY</div>
          <div style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 600, letterSpacing: 3, marginTop: 2 }}>EVERY MINUTE WINS</div>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.15)', borderRadius: 8, padding: '6px 14px', color: 'var(--gold)', fontWeight: 700, fontSize: 14 }}>
            ⏱ {timer}s
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#666', fontSize: 9, letterSpacing: 1 }}>BALANCE</div>
            <div className="shimmer-text" style={{ fontSize: 18, fontWeight: 900 }}>${balance.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Draw Area */}
      {phase === 'draw' && <div style={{
        background: 'linear-gradient(180deg, #1A1A2E, #0D0D0D)', border: '2px solid rgba(255,215,0,0.2)',
        borderRadius: 20, padding: 28, marginBottom: 20, textAlign: 'center',
      }}>
        <div className="jackpot-text" style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, letterSpacing: 3 }}>DRAWING...</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
          {drawn.map(n => <motion.div key={n} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
            style={{
              width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, border: '2px solid',
              background: selected.includes(n) ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.06)',
              color: selected.includes(n) ? '#000' : '#fff',
              borderColor: selected.includes(n) ? 'var(--gold)' : 'rgba(255,255,255,0.15)',
              boxShadow: selected.includes(n) ? '0 0 15px rgba(255,215,0,0.5)' : 'none',
            }}>{n}</motion.div>)}
          {drawn.length < 20 && <div style={{ width: 40, height: 40, borderRadius: '50%', border: '2px dashed rgba(255,215,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>?</div>}
        </div>
        {!drawing && drawn.length >= 20 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ fontSize: 18, fontWeight: 700 }}>
          MATCHED <span className="jackpot-text" style={{ fontSize: 28 }}>{matchCount}</span>{matchCount >= 3 && <span style={{ color: '#00FF7F', marginLeft: 8 }}>+${lastWin.toLocaleString()}</span>}
        </motion.div>}
      </div>}

      {/* Number Picker */}
      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,215,0,0.08)', borderRadius: 16, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ color: 'var(--gold)', fontWeight: 700 }}>PICK NUMBERS ({selected.length}/10)</div>
          <div style={{ color: '#666', fontSize: 13 }}>TOTAL BET: ${(bet * Math.max(selected.length, 1)).toLocaleString()}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(38px, 1fr))', gap: 5, marginBottom: 20 }}>
          {allNums.map(n => (
            <button key={n} onClick={() => toggle(n)} disabled={drawing || phase !== 'select'} style={{
              width: '100%', aspectRatio: '1', borderRadius: '50%', border: '1px solid',
              fontSize: 11, fontWeight: 600, transition: 'all 0.2s',
              background: selected.includes(n) ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.04)',
              color: selected.includes(n) ? '#000' : '#ccc',
              borderColor: selected.includes(n) ? 'var(--gold)' : 'rgba(255,255,255,0.08)',
            }}>{n}</button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#888', fontSize: 12 }}>PER TICKET:</span>
            <button onClick={() => setBet(Math.max(10, bet - 10))} style={{ width: 32, height: 32, background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: 6, color: 'var(--gold)', fontSize: 14, fontWeight: 700 }}>−</button>
            <div style={{ width: 60, height: 32, background: '#000', border: '1px solid rgba(255,215,0,0.25)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-light)', fontSize: 14, fontWeight: 800 }}>${bet}</div>
            <button onClick={() => setBet(bet + 10)} style={{ width: 32, height: 32, background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: 6, color: 'var(--gold)', fontSize: 14, fontWeight: 700 }}>+</button>
          </div>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            onClick={doDraw} disabled={drawing || selected.length === 0 || balance < bet}
            className="btn-primary" style={{
              padding: '12px 32px', fontSize: 14, letterSpacing: 2,
              opacity: drawing || selected.length === 0 || balance < bet ? 0.5 : 1,
              animation: drawing ? 'none' : 'glow-intense-pulse 2s ease-in-out infinite',
            }}>
            {drawing ? '🎯 DRAWING...' : '🎯 BUY TICKETS'}
          </motion.button>
        </div>
      </div>

      <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,215,0,0.08)', borderRadius: 14, padding: 24 }}>
        <div style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>📖 GAME INFO</div>
        <p style={{ color: '#666', fontSize: 13, lineHeight: 1.7 }}>
          Pick 1-10 numbers from 1-80. Match 3+ of the 20 drawn numbers to win. Better odds with more matches!
          This is a UI demo only — no real gambling or cashouts possible.
        </p>
      </div>
    </div>
  );
}
