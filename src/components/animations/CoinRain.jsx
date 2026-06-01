import { motion } from 'framer-motion';

const items = ['🪙', '💰', '💎', '👑', '✨'];

export default function CoinRain({ active }) {
  if (!active) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9997, pointerEvents: 'none' }}>
      {[...Array(60)].map((_, i) => {
        const size = 16 + Math.random() * 28;
        return (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: -100,
              rotate: 0,
              scale: 0.4 + Math.random() * 0.8,
            }}
            animate={{
              y: window.innerHeight + 100,
              rotate: 360 * (1 + Math.floor(Math.random() * 5)),
            }}
            transition={{
              duration: 2.5 + Math.random() * 3,
              delay: Math.random() * 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              position: 'fixed', fontSize: size, zIndex: 9998, pointerEvents: 'none',
              filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.5))',
            }}
          >
            {items[Math.floor(Math.random() * items.length)]}
          </motion.div>
        );
      })}
    </div>
  );
}
