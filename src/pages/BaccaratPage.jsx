import { useState } from 'react';
import { motion } from 'framer-motion';
import WinAnimation from '../components/animations/WinAnimation';
import CoinRain from '../components/animations/CoinRain';
import { Cards, Book } from '@phosphor-icons/react';

const suits = ['♠', '♥', '♦', '♣'];
const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

function randCard() {
  const s = suits[Math.floor(Math.random() * 4)];
  return { suit: s, value: values[Math.floor(Math.random() * 13)], isRed: s === '♥' || s === '♦' };
}

function calcPts(cards) {
  let t = 0;
  for (const c of cards) {
    if (c.value === 'A') t += 1;
    else if (['10', 'J', 'Q', 'K'].includes(c.value)) t += 0;
    else t += parseInt(c.value);
  }
  return t % 10;
}

export default function BaccaratPage() {
  const [player, setPlayer] = useState([]);
  const [banker, setBanker] = useState([]);
  const [balance, setBalance] = useState(100000);
  const [bet, setBet] = useState(1000);
  const [betOn, setBetOn] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [showWin, setShowWin] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [showCoins, setShowCoins] = useState(false);
  const [dealing, setDealing] = useState(false);

  const deal = (target) => {
    if (dealing || balance < bet) return;
    setBetOn(target);
    setDealing(true);
    setShowResult(false);
    setBalance(b => b - bet);
    const p = [randCard(), randCard()], b = [randCard(), randCard()];
    setPlayer(p); setBanker(b);

    setTimeout(() => {
      const pp = calcPts(p), bp = calcPts(b);
      let winner = 'tie';
      if (pp > bp) winner = 'player';
      else if (bp > pp) winner = 'banker';
      setShowResult(true);
      if (winner === target) {
        const w = target === 'tie' ? bet * 8 : bet * 2;
        setLastWin(w); setBalance(b => b + w);
        setShowWin(true); setShowCoins(true);
        setTimeout(() => setShowCoins(false), 4000);
      }
      setDealing(false);
    }, 1500);
  };

  return (
    <div style={{ padding: '24px 32px 50px', maxWidth: 1000, margin: '0 auto' }}>
      <WinAnimation show={showWin} amount={lastWin} onComplete={() => setShowWin(false)} />
      <CoinRain active={showCoins} />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <div className="jackpot-text" style={{ fontSize: 32, fontWeight: 900, letterSpacing: 2, display: 'flex', alignItems: 'center', gap: 12 }}><Cards size={32} color="url(#goldGrad)" /> BACCARAT SUPREME</div>
          <div style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 600, letterSpacing: 3, marginTop: 2 }}>PLAYER VS BANKER</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ color: '#666', fontSize: 10, letterSpacing: 1 }}>BALANCE</div>
          <div className="shimmer-text" style={{ fontSize: 24, fontWeight: 900 }}>${balance.toLocaleString()}</div>
        </div>
      </div>

      {/* Table */}
      <div style={{
        background: 'linear-gradient(135deg, #0D3B0D, #0A2A0A)',
        border: '2px solid #FFD700', borderRadius: 22, padding: 30,
        display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'center',
        minHeight: 320, position: 'relative', overflow: 'hidden',
        boxShadow: '0 0 40px rgba(255,215,0,0.1)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(255,215,0,0.03) 0%, transparent 60%)' }} />

        {/* Banker */}
        <div style={{ flex: 1, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ color: '#FFD700', fontSize: 16, fontWeight: 700, letterSpacing: 3, marginBottom: 16 }}>BANKER</div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', minHeight: 110 }}>
            {banker.map((c, i) => (
              <motion.div key={i}
                initial={{ rotateY: 180, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                style={{
                  width: 72, height: 104,
                  background: 'linear-gradient(135deg, #222, #111)',
                  border: '2px solid rgba(255,215,0,0.35)', borderRadius: 10,
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: c?.isRed ? '#FF0000' : '#fff' }}>{c?.value}</span>
                <span style={{ fontSize: 18, color: c?.isRed ? '#FF0000' : '#fff' }}>{c?.suit}</span>
              </motion.div>
            ))}
          </div>
          {showResult && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{
            marginTop: 10, display: 'inline-flex', width: 36, height: 36, borderRadius: '50%',
            background: 'var(--gold-gradient)', color: '#000', fontWeight: 900,
            fontSize: 16, alignItems: 'center', justifyContent: 'center',
          }}>{banker.length > 0 ? calcPts(banker) : '?'}</motion.div>}
        </div>

        {/* Center */}
        <div style={{ width: 200, textAlign: 'center', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#FFD700', letterSpacing: 6, textShadow: '0 0 20px rgba(255,215,0,0.3)' }}>VS</div>
          <div style={{ color: '#888', fontSize: 11, marginBottom: 4 }}>BET</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button onClick={() => setBet(Math.max(100, bet - 500))} style={{
              width: 30, height: 30, background: 'rgba(255,215,0,0.08)',
              border: '1px solid rgba(255,215,0,0.2)', borderRadius: 6,
              color: 'var(--gold)', fontSize: 14, fontWeight: 700,
            }}>−</button>
            <div style={{
              width: 70, height: 30, background: '#000',
              border: '1px solid rgba(255,215,0,0.25)', borderRadius: 6,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--gold-light)', fontSize: 14, fontWeight: 800,
            }}>${bet.toLocaleString()}</div>
            <button onClick={() => setBet(bet + 500)} style={{
              width: 30, height: 30, background: 'rgba(255,215,0,0.08)',
              border: '1px solid rgba(255,215,0,0.2)', borderRadius: 6,
              color: 'var(--gold)', fontSize: 14, fontWeight: 700,
            }}>+</button>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['player', 'banker', 'tie'].map(t => (
              <motion.button key={t} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => deal(t)}
                disabled={dealing || balance < bet}
                style={{
                  padding: '8px 14px', borderRadius: 8,
                  border: `1px solid ${betOn === t ? 'var(--gold)' : 'rgba(255,215,0,0.15)'}`,
                  background: betOn === t ? 'rgba(255,215,0,0.12)' : 'transparent',
                  color: betOn === t ? 'var(--gold)' : '#888', fontWeight: 600, fontSize: 12,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                  transition: 'all 0.3s',
                }}>
                {t === 'player' ? 'PLAYER' : t === 'banker' ? 'BANKER' : 'TIE'}
                <span style={{ fontSize: 9, color: '#555' }}>{t === 'tie' ? 'x8' : 'x2'}</span>
              </motion.button>
            ))}
          </div>
          {lastWin > 0 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{
            padding: '6px 14px', background: 'rgba(0,255,127,0.06)', border: '1px solid rgba(0,255,127,0.15)',
            borderRadius: 6, fontSize: 12,
          }}>WIN <span style={{ color: '#00FF7F', fontWeight: 800 }}>+${lastWin.toLocaleString()}</span></motion.div>}
        </div>

        {/* Player */}
        <div style={{ flex: 1, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ color: '#FFD700', fontSize: 16, fontWeight: 700, letterSpacing: 3, marginBottom: 16 }}>PLAYER</div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', minHeight: 110 }}>
            {player.map((c, i) => (
              <motion.div key={i}
                initial={{ rotateY: 180, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }}
                transition={{ delay: i * 0.2 }}
                style={{
                  width: 72, height: 104,
                  background: 'linear-gradient(135deg, #222, #111)',
                  border: '2px solid rgba(255,215,0,0.35)', borderRadius: 10,
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: c?.isRed ? '#FF0000' : '#fff' }}>{c?.value}</span>
                <span style={{ fontSize: 18, color: c?.isRed ? '#FF0000' : '#fff' }}>{c?.suit}</span>
              </motion.div>
            ))}
          </div>
          {showResult && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{
            marginTop: 10, display: 'inline-flex', width: 36, height: 36, borderRadius: '50%',
            background: 'var(--gold-gradient)', color: '#000', fontWeight: 900,
            fontSize: 16, alignItems: 'center', justifyContent: 'center',
          }}>{player.length > 0 ? calcPts(player) : '?'}</motion.div>}
        </div>
      </div>

      <div style={{
        marginTop: 32, background: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,215,0,0.08)', borderRadius: 14, padding: 24,
      }}>
        <div style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}><Book size={20} color="url(#goldGrad)" /> GAME INFO</div>
        <p style={{ color: '#666', fontSize: 13, lineHeight: 1.7 }}>
          Classic baccarat. Bet on Player, Banker, or Tie. Closest to 9 wins.
          This is a UI demo only — no real gambling or cashouts possible.
        </p>
      </div>
    </div>
  );
}
