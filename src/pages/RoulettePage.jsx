import { useState } from 'react';
import { motion } from 'framer-motion';
import WinAnimation from '../components/animations/WinAnimation';
import CoinRain from '../components/animations/CoinRain';

const numbers = Array.from({ length: 37 }, (_, i) => i);
const reds = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
const blacks = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];

function color(n) { return n === 0 ? '#00FF7F' : reds.includes(n) ? '#FF0000' : '#1A1A1A'; }

function describeArc(cx, cy, r, sa, ea) {
  const sr = ((sa - 90) * Math.PI) / 180;
  const er = ((ea - 90) * Math.PI) / 180;
  const x1 = cx + r * Math.cos(sr), y1 = cy + r * Math.sin(sr);
  const x2 = cx + r * Math.cos(er), y2 = cy + r * Math.sin(er);
  const l = ea - sa > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${l} 1 ${x2} ${y2} Z`;
}

export default function RoulettePage() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [angle, setAngle] = useState(0);
  const [balance, setBalance] = useState(100000);
  const [bet, setBet] = useState(500);
  const [showWin, setShowWin] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [showCoins, setShowCoins] = useState(false);

  const spin = () => {
    if (spinning || balance < bet) return;
    setSpinning(true);
    setResult(null);
    setBalance(b => b - bet);

    const target = Math.floor(Math.random() * 37);
    const spins = 4 + Math.floor(Math.random() * 4);
    const targetAngle = spins * 360 - target * (360 / 37);
    setAngle(p => p + targetAngle + 3600);

    setTimeout(() => {
      setResult(target);
      setSpinning(false);
      if (target !== 0) {
        const w = bet * 2;
        setLastWin(w);
        setBalance(b => b + w);
        setShowWin(true);
        setShowCoins(true);
        setTimeout(() => setShowCoins(false), 4000);
      }
    }, 4000);
  };

  return (
    <div style={{ padding: '24px 32px 50px', maxWidth: 960, margin: '0 auto' }}>
      <WinAnimation show={showWin} amount={lastWin} onComplete={() => setShowWin(false)} />
      <CoinRain active={showCoins} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <div className="jackpot-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2 }}>🎡 ROYAL ROULETTE</div>
          <div style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 600, letterSpacing: 3, marginTop: 2 }}>WHERE THE BALL LANDS</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#666', fontSize: 10, letterSpacing: 1 }}>BALANCE</div>
          <div className="shimmer-text" style={{ fontSize: 24, fontWeight: 900 }}>${balance.toLocaleString()}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        {/* Wheel */}
        <div style={{
          flex: 1, minWidth: 340, display: 'flex', justifyContent: 'center',
          background: 'linear-gradient(180deg, #1A1A2E, #0D0D0D)',
          border: '2px solid rgba(255,215,0,0.25)', borderRadius: 22, padding: 30,
          boxShadow: '0 0 40px rgba(255,215,0,0.1)',
        }}>
          <div style={{ position: 'relative', width: 340, height: 340 }}>
            <motion.div
              animate={{ rotate: angle }}
              transition={{ duration: 4, ease: 'easeOut' }}
            >
              <svg viewBox="0 0 400 400" width={340} height={340}>
                {numbers.map((n, i) => {
                  const a = (360 / 37) * i, na = (360 / 37) * (i + 1);
                  const mid = (a + na) / 2, rad = (mid * Math.PI) / 180;
                  const cx = 200 + 115 * Math.cos(rad), cy = 200 + 115 * Math.sin(rad);
                  return (
                    <g key={n}>
                      <path d={describeArc(200, 200, 170, a, na)} fill={color(n)} stroke="#FFD700" strokeWidth="0.8" />
                      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central"
                        fill="#fff" fontSize="10" fontWeight="bold"
                        transform={`rotate(${mid}, ${cx}, ${cy})`}>
                        {n}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </motion.div>

            {/* Ball indicator */}
            <div style={{
              position: 'absolute', top: 14, left: '50%', marginLeft: -7,
              width: 14, height: 14, borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #fff, #FFD700)',
              boxShadow: '0 0 12px rgba(255,215,0,0.8)',
              zIndex: 2,
            }} />

            {/* Result overlay */}
            {result !== null && (
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                style={{
                  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                  width: 80, height: 80, borderRadius: '50%',
                  background: '#0D0D0D', border: '2px solid #FFD700',
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', boxShadow: '0 0 30px rgba(255,215,0,0.3)',
                  zIndex: 3,
                }}
              >
                <div style={{ fontSize: 10, color: '#666' }}>RESULT</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: color(result) }}>{result}</div>
                <div style={{ width: 16, height: 16, borderRadius: '50%', background: color(result), border: '2px solid #FFD700', marginTop: 2 }} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div style={{ width: 260 }}>
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
              }}>
                ${bet.toLocaleString()}
              </div>
              <button onClick={() => setBet(bet + 100)} style={{
                width: 40, height: 40, background: 'rgba(255,215,0,0.08)',
                border: '1px solid rgba(255,215,0,0.2)', borderRadius: 8,
                color: 'var(--gold)', fontSize: 18, fontWeight: 700,
              }}>+</button>
            </div>
          </div>

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
            {spinning ? '🎡 SPINNING...' : '🎡 SPIN'}
          </motion.button>

          {lastWin > 0 && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{
              marginTop: 12, textAlign: 'center', padding: '10px',
              background: 'rgba(0,255,127,0.06)', border: '1px solid rgba(0,255,127,0.15)',
              borderRadius: 8, fontSize: 13,
            }}>
              <span style={{ color: '#888' }}>LAST WIN: </span>
              <span style={{ color: '#00FF7F', fontWeight: 800, fontSize: 18 }}>+${lastWin.toLocaleString()}</span>
            </motion.div>
          )}
        </div>
      </div>

      <div style={{
        marginTop: 32, background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,215,0,0.08)', borderRadius: 14, padding: 24,
      }}>
        <div style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 700, marginBottom: 8 }}>📖 GAME INFO</div>
        <p style={{ color: '#666', fontSize: 13, lineHeight: 1.7 }}>
          European roulette with numbers 0-36. Place your bet and predict where the ball lands.
          This is a UI demo only — no real gambling or cashouts possible.
        </p>
      </div>
    </div>
  );
}
