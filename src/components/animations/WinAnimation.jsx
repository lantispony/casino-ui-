import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const symbols = ['🪙', '💰', '✨', '👑', '💎', '🎰', '7️⃣', '⭐', '🔥', '💫'];
const colors = ['#FFD700', '#FFA500', '#FF4500', '#FF0000', '#FF69B4', '#00BFFF', '#FFD700'];

export default function WinAnimation({ show, amount, onComplete }) {
  const [particles, setParticles] = useState([]);

  const createParticles = useCallback(() => {
    const items = [];
    for (let i = 0; i < 80; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 1.5 + Math.random() * 2,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 18 + Math.random() * 36,
        rotation: Math.random() * 720,
      });
    }
    setParticles(items);
  }, []);

  useEffect(() => {
    if (show) {
      createParticles();
      const timer = setTimeout(() => onComplete?.(), 4000);
      return () => clearTimeout(timer);
    }
  }, [show, createParticles, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed', inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10000, flexDirection: 'column',
          }}
        >
          {/* Central Win Display */}
          <motion.div
            initial={{ scale: 0, rotateX: 90 }}
            animate={{ scale: 1, rotateX: 0 }}
            exit={{ scale: 0, rotateX: -90 }}
            transition={{ type: 'spring', stiffness: 150, damping: 12 }}
            style={{
              background: 'linear-gradient(135deg, #1A1A1A, #0D0D0D)',
              border: '2px solid #FFD700',
              borderRadius: 28, padding: '50px 80px',
              textAlign: 'center',
              boxShadow: '0 0 80px rgba(255,215,0,0.4), 0 0 160px rgba(255,215,0,0.15), inset 0 0 60px rgba(255,215,0,0.05)',
              zIndex: 10002, position: 'relative',
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              style={{ fontSize: 72, marginBottom: 8, filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.6))' }}
            >
              👑
            </motion.div>
            <div className="jackpot-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: 4, marginBottom: 4 }}>
              JACKPOT!
            </div>
            <div className="shimmer-text" style={{
              fontSize: 64, fontWeight: 900, letterSpacing: 2,
              filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.8))',
              padding: '8px 0',
            }}>
              +${amount?.toLocaleString()}
            </div>
            <div style={{ color: '#888', fontSize: 14, marginTop: 8, letterSpacing: 1 }}>
              CREDITED TO YOUR ACCOUNT
            </div>
          </motion.div>

          {/* Particle rain */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                x: `${p.x}vw`,
                y: -50,
                rotate: 0,
                scale: 0,
              }}
              animate={{
                y: '110vh',
                rotate: 720 + p.rotation,
                scale: [0, 1.2, 1, 0.8],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: 'easeIn',
              }}
              style={{
                position: 'fixed', fontSize: p.size, left: 0, top: 0,
                zIndex: 10001, pointerEvents: 'none',
                filter: `drop-shadow(0 0 8px ${p.color})`,
              }}
            >
              {p.symbol}
            </motion.div>
          ))}

          {/* Expanding glow rings */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 2, delay: i * 0.4, ease: 'easeOut' }}
              style={{
                position: 'fixed', width: 300, height: 300,
                borderRadius: '50%',
                border: '2px solid rgba(255,215,0,0.3)',
                zIndex: 9999, pointerEvents: 'none',
              }}
            />
          ))}

          {/* Flash strobes */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`flash-${i}`}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ duration: 0.15, delay: 0.5 + i * 0.3 }}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(255,215,0,0.15)',
                zIndex: 9998, pointerEvents: 'none',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
