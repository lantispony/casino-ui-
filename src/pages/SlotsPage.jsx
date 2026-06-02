import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WinAnimation from '../components/animations/WinAnimation';
import CoinRain from '../components/animations/CoinRain';
import { Coin, Book } from '@phosphor-icons/react';

const symbols = ['🍒', '🍀', '👑', '💎', '🪙', '7️⃣', '⭐', '🔔', '💰'];

function randSym() { return symbols[Math.floor(Math.random() * symbols.length)]; }
function genReels() { return [randSym(), randSym(), randSym()]; }

function checkWin(r) {
  if (r.every(s => s === r[0])) return { win: true, mult: 10 };
  if (r.filter(s => s === '👑').length >= 2) return { win: true, mult: 4 };
  if (r.filter(s => s === '💎').length >= 2) return { win: true, mult: 3 };
  if (r.filter(s => s === '7️⃣').length >= 2) return { win: true, mult: 5 };
  return { win: false, mult: 0 };
}

export default function SlotsPage() {
  const [reels, setReels] = useState(['🍒', '🍀', '👑']);
  const [spinning, setSpinning] = useState(false);
  const [balance, setBalance] = useState(100000);
  const [bet, setBet] = useState(1000);
  const [lastWin, setLastWin] = useState(0);
  const [showWin, setShowWin] = useState(false);
  const [showCoins, setShowCoins] = useState(false);
  const [spinPhase, setSpinPhase] = useState([false, false, false]);

  const spin = useCallback(() => {
    if (spinning || balance < bet) return;
    setSpinning(true);
    setLastWin(0);
    setBalance(b => b - bet);

    const stop1 = setTimeout(() => {
      let c = 0; const i1 = setInterval(() => { setReels(p => [randSym(), p[1], p[2]]); c++; if (c > 15) { clearInterval(i1); setSpinPhase([false, true, false]); } }, 70);
      setSpinPhase([true, false, false]);
      const stop2 = setTimeout(() => {
        let c2 = 0; const i2 = setInterval(() => { setReels(p => [p[0], randSym(), p[2]]); c2++; if (c2 > 15) { clearInterval(i2); setSpinPhase([false, false, true]); } }, 70);
        const stop3 = setTimeout(() => {
          let c3 = 0; const i3 = setInterval(() => { setReels(p => [p[0], p[1], randSym()]); c3++; if (c3 > 15) { clearInterval(i3); const f = genReels(); setReels(f); setSpinPhase([false, false, false]); setSpinning(false); const r = checkWin(f); if (r.win) { const w = bet * r.mult; setLastWin(w); setBalance(b => b + w); setShowWin(true); setShowCoins(true); setTimeout(() => setShowCoins(false), 4000); } } }, 70);
        }, 1400);
      }, 1400);
    }, 200);
  }, [spinning, balance, bet]);

  const paylines = [
    ['🍒', '🍒', '🍒', 'x5'], ['👑', '👑', '👑', 'x10'],
    ['💎', '💎', '💎', 'x8'], ['7️⃣', '7️⃣', '7️⃣', 'x15'],
    ['⭐', '⭐', '⭐', 'x6'], ['💰', '💰', '💰', 'x12'],
  ];

  return (
    <div style={{ padding: '24px 32px 50px', maxWidth: 960, margin: '0 auto' }}>
      <WinAnimation show={showWin} amount={lastWin} onComplete={() => setShowWin(false)} />
      <CoinRain active={showCoins} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div className="jackpot-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 12 }}><Coin size={32} color="url(#goldGrad)" /> GOLDEN SLOTS</div>
          <div style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 600, letterSpacing: 3, marginTop: 2 }}>SPIN & WIN BIG</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#666', fontSize: 10, letterSpacing: 1 }}>BALANCE</div>
          <div className="shimmer-text" style={{ fontSize: 24, fontWeight: 900 }}>${balance.toLocaleString()}</div>
        </div>
      </div>

      {/* Machine */}
      <div style={{
        background: 'linear-gradient(180deg, #1A1A2E, #0D0D0D)',
        border: '2px solid rgba(255,215,0,0.3)', borderRadius: 22, padding: '30px 40px',
        boxShadow: '0 0 40px rgba(255,215,0,0.15), inset 0 0 60px rgba(255,215,0,0.03)',
        marginBottom: 24,
      }}>
        {/* Top accent */}
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <div style={{
            fontSize: 12, fontWeight: 900, color: 'var(--gold)', letterSpacing: 8,
            animation: 'neon-pulse 2s ease-in-out infinite, flicker 3s ease-in-out infinite',
          }}>
            ★ JACKPOT ★
          </div>
        </div>

        {/* Reels */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 20 }}>
          {reels.map((sym, i) => (
            <div key={i} style={{
              width: 110, height: 130, background: '#000',
              border: `2px solid ${spinPhase[i] ? 'rgba(255,69,0,0.6)' : 'rgba(255,215,0,0.35)'}`,
              borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', boxShadow: spinPhase[i] ? '0 0 20px rgba(255,69,0,0.3)' : 'inset 0 0 20px rgba(255,215,0,0.05)',
            }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={sym + (spinPhase[i] ? Math.random() : '')}
                  initial={spinPhase[i] ? { y: -80, opacity: 0 } : false}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 80, opacity: 0 }}
                  transition={{ duration: 0.06 }}
                  style={{ fontSize: 52, filter: 'drop-shadow(0 0 8px rgba(255,215,0,0.3))' }}
                >
                  {sym}
                </motion.span>
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Paylines */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
          {paylines.map(([a, b, c, m]) => (
            <div key={a} style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.1)',
              borderRadius: 6, padding: '3px 10px', fontSize: 13,
            }}>
              <span>{a}</span><span style={{ color: '#555' }}>{b}</span><span>{c}</span>
              <span style={{ color: 'var(--gold)', fontSize: 10, fontWeight: 700, marginLeft: 4 }}>{m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ color: '#888', fontSize: 12, marginBottom: 8, letterSpacing: 1 }}>BET AMOUNT</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
            <button onClick={() => setBet(Math.max(100, bet - 500))} style={{
              width: 40, height: 40, background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)',
              borderRadius: 8, color: 'var(--gold)', fontSize: 18, fontWeight: 700,
            }}>−</button>
            <div style={{
              flex: 1, height: 40, background: '#000', border: '1px solid rgba(255,215,0,0.25)',
              borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--gold-light)', fontSize: 18, fontWeight: 800,
            }}>
              ${bet.toLocaleString()}
            </div>
            <button onClick={() => setBet(bet + 500)} style={{
              width: 40, height: 40, background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.2)',
              borderRadius: 8, color: 'var(--gold)', fontSize: 18, fontWeight: 700,
            }}>+</button>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[500, 1000, 5000, 10000].map(a => (
              <button key={a} onClick={() => setBet(a)} style={{
                flex: 1, padding: '6px 4px', fontSize: 11, borderRadius: 6, fontWeight: 600,
                border: `1px solid ${bet === a ? 'var(--gold)' : 'rgba(255,215,0,0.15)'}`,
                background: bet === a ? 'rgba(255,215,0,0.12)' : 'transparent',
                color: bet === a ? 'var(--gold)' : '#888', transition: 'all 0.3s',
              }}>
                ${a.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div style={{ width: 240 }}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={spin}
            disabled={spinning || balance < bet}
            className="btn-primary"
            style={{
              width: '100%', padding: '18px', fontSize: 16, letterSpacing: 2,
              opacity: spinning || balance < bet ? 0.5 : 1,
              animation: spinning ? 'none' : 'glow-intense-pulse 2s ease-in-out infinite',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}><Coin size={20} color="url(#goldGrad)" />{spinning ? 'SPINNING...' : 'SPIN'}</span>
          </motion.button>

          {lastWin > 0 && (
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              style={{
                marginTop: 12, textAlign: 'center', padding: '10px',
                background: 'rgba(0,255,127,0.06)', border: '1px solid rgba(0,255,127,0.15)',
                borderRadius: 8, fontSize: 13,
              }}
            >
              <span style={{ color: '#888' }}>LAST WIN: </span>
              <span style={{ color: '#00FF7F', fontWeight: 800, fontSize: 18 }}>+${lastWin.toLocaleString()}</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Info */}
      <div style={{
        marginTop: 32, background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,215,0,0.08)', borderRadius: 14, padding: 24,
      }}>
        <div style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}><Book size={20} color="url(#goldGrad)" /> GAME INFO</div>
        <p style={{ color: '#666', fontSize: 13, lineHeight: 1.7 }}>
          Golden Slots is a classic 3-reel slot machine. Match all three symbols to win big!
          This is a UI demo only — no real gambling or cashouts possible.
        </p>
      </div>
    </div>
  );
}
