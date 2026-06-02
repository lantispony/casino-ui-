import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fish, Trophy, Book } from '@phosphor-icons/react';

const fishTypes = [
  { id: 1, name: 'Clownfish', points: 10, size: 28, color: '#FF6B6B', speed: 2 },
  { id: 2, name: 'Goldfish', points: 20, size: 38, color: '#FFD700', speed: 1.8 },
  { id: 3, name: 'Angelfish', points: 50, size: 48, color: '#9B59B6', speed: 1.5 },
  { id: 4, name: 'Arowana', points: 100, size: 62, color: '#E74C3C', speed: 1.2 },
  { id: 5, name: 'Whale', points: 500, size: 85, color: '#3498DB', speed: 0.6 },
  { id: 6, name: 'Dragon Fish', points: 1000, size: 70, color: '#FF4500', speed: 0.9 },
];

function makeFish() {
  const t = fishTypes[Math.floor(Math.random() * fishTypes.length)];
  const right = Math.random() > 0.5;
  return { id: Date.now() + Math.random(), type: t, x: right ? 900 : -100, y: 40 + Math.random() * 380, dir: right ? -1 : 1 };
}

export default function FishPage() {
  const [fishes, setFishes] = useState([]);
  const [score, setScore] = useState(0);
  const [balance, setBalance] = useState(100000);
  const [bet, setBet] = useState(500);
  const [shooting, setShooting] = useState(false);
  const [bullets, setBullets] = useState([]);
  const [splash, setSplash] = useState(null);

  const spawn = useCallback(() => {
    if (fishes.length < 15) setFishes(p => [...p, makeFish()]);
  }, [fishes]);

  const shoot = (e) => {
    if (shooting || balance < bet) return;
    setShooting(true);
    setBalance(b => b - bet);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const id = Date.now();
    setBullets(p => [...p, { id, x, y }]);
    setTimeout(() => setBullets(p => p.filter(b => b.id !== id)), 400);
    const target = [...fishes].sort((a, b) => (Math.abs(a.x - x) + Math.abs(a.y - y)) - (Math.abs(b.x - x) + Math.abs(b.y - y)))[0];
    if (target && Math.abs(target.x - x) < 60 && Math.abs(target.y - y) < 60) {
      const pts = target.type.points;
      setScore(s => s + pts);
      setBalance(b => b + pts * 10);
      setSplash({ x: target.x, y: target.y, text: `+${pts * 10}` });
      setFishes(p => p.filter(f => f.id !== target.id));
      setTimeout(() => setSplash(null), 800);
    }
    setTimeout(() => setShooting(false), 400);
  };

  return (
    <div style={{ padding: '24px 32px 50px', maxWidth: 1000, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div className="jackpot-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 12 }}><Fish size={32} color="url(#goldGrad)" /> FISHING KING</div>
          <div style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 600, letterSpacing: 3, marginTop: 2 }}>HUNT THE DEEP</div>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div style={{ color: 'var(--gold)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><Trophy size={22} color="url(#goldGrad)" />{score}</div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#666', fontSize: 9, letterSpacing: 1 }}>BALANCE</div>
            <div className="shimmer-text" style={{ fontSize: 18, fontWeight: 900 }}>${balance.toLocaleString()}</div>
          </div>
        </div>
      </div>

      {/* Game Canvas */}
      <div onClick={shoot} style={{
        position: 'relative', height: 460,
        background: 'linear-gradient(180deg, #0A1628, #0D2137, #0A1628)',
        border: '2px solid rgba(255,215,0,0.15)', borderRadius: 20, overflow: 'hidden',
        cursor: 'crosshair', boxShadow: '0 0 30px rgba(255,215,0,0.05)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 40%, rgba(0,191,255,0.03) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', top: 10, left: 14, color: '#555', fontSize: 11, zIndex: 10 }}>
          💰 ${bet.toLocaleString()}/shot • Click to fire
        </div>

        {/* Bullets */}
        <AnimatePresence>
          {bullets.map(b => (
            <motion.div key={b.id} initial={{ x: 400, y: b.y, scale: 0.5 }} animate={{ x: b.x - 15, scale: 1, opacity: 0 }} transition={{ duration: 0.25 }}
              style={{ position: 'absolute', width: 8, height: 8, borderRadius: '50%', background: 'radial-gradient(circle, #FFD700, #FF4500)', boxShadow: '0 0 12px #FFD700' }} />
          ))}
        </AnimatePresence>

        {/* Fish */}
        {fishes.map(f => (
          <motion.div key={f.id} animate={{ x: f.dir > 0 ? 900 : -100 }} transition={{ duration: f.type.speed * 10, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', top: f.y, cursor: 'pointer', filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.25))' }}>
            <Fish size={f.type.size} color="url(#goldGrad)" />
          </motion.div>
        ))}

        {/* Splash */}
        <AnimatePresence>{splash && <motion.div initial={{ opacity: 1, y: 0, scale: 1 }} animate={{ opacity: 0, y: -40, scale: 1.5 }} exit={{ opacity: 0 }}
          style={{ position: 'absolute', left: splash.x, top: splash.y, color: '#FFD700', fontSize: 24, fontWeight: 900, textShadow: '0 0 15px rgba(255,215,0,0.5)', pointerEvents: 'none' }}>
          {splash.text}
        </motion.div>}</AnimatePresence>

        {/* Crosshair */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'var(--gold)', fontSize: 28, opacity: 0.2, pointerEvents: 'none' }}>+</div>
      </div>

      <div style={{ display: 'flex', gap: 16, marginTop: 16, alignItems: 'center' }}>
        <div style={{ color: '#888', fontSize: 12 }}>BET:</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[100, 500, 1000, 5000].map(a => (
            <button key={a} onClick={() => setBet(a)} style={{
              padding: '6px 16px', borderRadius: 6, fontSize: 12, fontWeight: 600,
              border: `1px solid ${bet === a ? 'var(--gold)' : 'rgba(255,215,0,0.15)'}`,
              background: bet === a ? 'rgba(255,215,0,0.1)' : 'transparent',
              color: bet === a ? 'var(--gold)' : '#888', transition: 'all 0.3s',
            }}>${a.toLocaleString()}</button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,215,0,0.08)', borderRadius: 14, padding: 24 }}>
        <div style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}><Book size={20} color="url(#goldGrad)" /> GAME INFO</div>
        <p style={{ color: '#666', fontSize: 13, lineHeight: 1.7 }}>
          Click to fire cannons and catch fish! Bigger fish = bigger rewards.
          This is a UI demo only — no real gambling or cashouts possible.
        </p>
      </div>
    </div>
  );
}
