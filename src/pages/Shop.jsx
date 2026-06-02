import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Check } from '@phosphor-icons/react';
import { shopItems } from '../data/games';
import CoinRain from '../components/animations/CoinRain';

export default function Shop() {
  const [showCoins, setShowCoins] = useState(false);
  const [purchased, setPurchased] = useState(null);

  const buy = (item) => {
    setPurchased(item.id);
    setShowCoins(true);
    setTimeout(() => { setShowCoins(false); setPurchased(null); }, 3000);
  };

  return (
    <div style={{ padding: '24px 32px 50px', maxWidth: 900, margin: '0 auto' }}>
      <CoinRain active={showCoins} />

      <div className="jackpot-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 12 }}>
        <ShoppingCart size={28} color="url(#goldGrad)" /> SHOP
      </div>
      <p style={{ color: '#777', fontSize: 14, marginBottom: 32 }}>
        Fuel your gameplay with coin packs and exclusive bundles.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
        {shopItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            style={{
              background: item.popular ? 'linear-gradient(135deg, rgba(255,215,0,0.06), transparent)' : 'rgba(255,255,255,0.01)',
              border: `1px solid ${item.popular ? 'rgba(255,215,0,0.2)' : 'rgba(255,255,255,0.05)'}`,
              borderRadius: 16, padding: '28px 20px', textAlign: 'center',
              boxShadow: item.popular ? 'var(--glow-gold)' : 'none',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {item.popular && (
              <div style={{
                position: 'absolute', top: 10, right: -24, transform: 'rotate(45deg)',
                background: 'linear-gradient(135deg, #FF4500, #FF0000)', color: '#fff',
                padding: '4px 30px', fontSize: 9, fontWeight: 800, letterSpacing: 1,
              }}>
                BEST SELLER
              </div>
            )}
            <div style={{ fontSize: 44, marginBottom: 12, filter: 'drop-shadow(0 0 10px rgba(255,215,0,0.3))' }}>
              {item.icon}
            </div>
            <div style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{item.name}</div>
            <div className="shimmer-text" style={{ fontSize: 28, fontWeight: 900, marginBottom: 4 }}>
              {item.coins.toLocaleString()}
            </div>
            <div style={{ color: '#666', fontSize: 11, marginBottom: 16 }}>coins</div>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={() => buy(item)}
              style={{
                width: '100%', padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: 14,
                background: item.popular ? 'var(--gold-gradient)' : 'rgba(255,255,255,0.05)',
                color: item.popular ? '#000' : '#999',
                border: item.popular ? 'none' : '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s',
              }}>
              ${item.price.toLocaleString()}
            </motion.button>
            {purchased === item.id && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  style={{ marginTop: 8, color: '#00FF7F', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                  <Check size={12} color="#00FF7F" /> PURCHASED!
                </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
