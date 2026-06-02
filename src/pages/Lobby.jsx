import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);
  return matches;
}
import {
  Coin, Star, Coins as CoinsIcon, ChartLineUp, Target, GameController,
  CaretRight, CalendarCheck, Crown, Ticket, ShoppingCart, Trophy, Sword,
  Confetti, Diamond, Lightning, CurrencyDollar, Compass, Cards, DiceFive, Fish
} from '@phosphor-icons/react';
import { games, banners, userStats, missions } from '../data/games';
import WinAnimation from '../components/animations/WinAnimation';
import CoinRain from '../components/animations/CoinRain';
import Beams from '../components/animations/Beams';

function FixedNumber({ value, digits = 8 }) {
  const str = String(Math.floor(value)).padStart(digits, '0');
  const parts = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',').split('');
  return (
    <>
      <span style={{ display: 'inline-block', width: 20, textAlign: 'center' }}>$</span>
      {parts.map((ch, i) => (
        <AnimatePresence key={i}>
          <motion.span
            key={`${i}-${ch}`}
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            exit={{ y: 30 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            style={{
              display: 'inline-block',
              width: ch === ',' ? 16 : 24,
              textAlign: 'center',
              overflow: 'hidden',
            }}
          >
            {ch}
          </motion.span>
        </AnimatePresence>
      ))}
    </>
  );
}

export default function Lobby() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [showWin, setShowWin] = useState(false);
  const [showCoins, setShowCoins] = useState(false);
  const [jackpot, setJackpot] = useState(12847392);
  const isNarrow = useMediaQuery('(max-width: 1450px)');
  const isTiny = useMediaQuery('(max-width: 800px)');

  useEffect(() => {
    const timer = setInterval(() => {
      setJackpot((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerWin = () => {
    setShowWin(true);
    setShowCoins(true);
    setTimeout(() => setShowCoins(false), 4000);
  };

  return (
    <div style={{ padding: '24px 32px 50px', maxWidth: 1400, margin: '0 auto' }}>
      <WinAnimation show={showWin} amount={88888} onComplete={() => setShowWin(false)} />
      <CoinRain active={showCoins} />

      {/* === JACKPOT TICKER === */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}
      >
        <div style={{
          display: 'flex', alignItems: 'center', gap: 20,
          background: 'linear-gradient(135deg, rgba(255,215,0,0.08), rgba(255,69,0,0.04))',
          border: '1px solid rgba(255,215,0,0.2)', borderRadius: 16,
          padding: '14px 32px', backdropFilter: 'blur(10px)',
        }}>
          <Coin size={32} color="url(#goldGrad)" weight="bold" />
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#666', fontSize: 10, letterSpacing: 4, fontWeight: 600 }}>PROGRESSIVE JACKPOT</div>
            <div style={{
              fontSize: 36, fontWeight: 700, fontFamily: "'Rajdhani', sans-serif",
              fontVariantNumeric: 'tabular-nums', letterSpacing: 2, whiteSpace: 'nowrap',
              minWidth: 300,
            }}>
              <FixedNumber value={jackpot} />
            </div>
          </div>
          <button onClick={triggerWin} style={{
            background: 'linear-gradient(135deg, #FF4500, #FF0000)',
            color: '#fff', fontWeight: 800, fontSize: 12, letterSpacing: 1,
            padding: '10px 22px', borderRadius: 10, border: 'none',
            boxShadow: '0 0 20px rgba(255,69,0,0.4)',
            transition: 'all 0.3s', cursor: 'pointer',
          }}>
            DEMO WIN ▶
          </button>
        </div>
      </motion.div>

      {/* === HERO BANNER === */}
      <section style={{ marginBottom: 30, position: 'relative' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'relative', height: isTiny ? 320 : 380, borderRadius: 24, overflow: 'hidden',
              background: currentBanner === 0 ? '#0A0A0A' : banners[currentBanner].gradient,
              display: 'flex', alignItems: 'center', padding: '0 60px',
            }}
          >
            {currentBanner === 0 && (
              <div style={{ position: 'absolute', inset: 0 }}>
                <Beams
                  beamWidth={3} beamHeight={50} beamNumber={48}
                  lightColor="#ffcf57" speed={3.1}
                  noiseIntensity={0.25} scale={0.3} rotation={45} lightIntensity={3}
                />
              </div>
            )}

            {/* Banner 2-3 right image */}
            {currentBanner > 0 && banners[currentBanner].image && (
              <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', zIndex: 1,
              }}>
                <img src={banners[currentBanner].image} alt=""
                  style={{
                    height: '100%', width: '100%', objectFit: 'contain',
                    objectPosition: 'right center',
                  }} />
              </div>
            )}

            {/* Text content */}
            <div style={{ position: 'relative', zIndex: 3, maxWidth: isNarrow ? 380 : 600 }}>
              <div style={{
                display: 'inline-block', padding: '4px 16px', borderRadius: 20,
                background: 'linear-gradient(135deg, #FF4500, #FF0000)', color: '#fff',
                fontSize: 10, fontWeight: 800, letterSpacing: 2, marginBottom: 16,
              }}>
                {banners[currentBanner].tag}
              </div>
              <motion.h1
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="jackpot-text"
                style={{ fontSize: isTiny ? 30 : 48, fontWeight: 900, marginBottom: 12, lineHeight: 1.1, textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}
              >
                {banners[currentBanner].title}
              </motion.h1>
              <motion.p
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                style={{ color: '#ccc', fontSize: isTiny ? 14 : 18, marginBottom: 24, textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
              >
                {banners[currentBanner].subtitle}
              </motion.p>
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                <Link to="/events"
                  className="btn-primary"
                  style={{ display: 'inline-block', padding: '14px 36px', fontSize: 15, letterSpacing: 1, textDecoration: 'none' }}
                >
                  CLAIM BONUS →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Border overlay */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 24,
          border: '1px solid rgba(255,215,0,0.2)',
          pointerEvents: 'none', zIndex: 10,
        }} />

        {/* Banner 1 bleed image */}
        {currentBanner === 0 && (
          <>
            <div style={{
              position: 'absolute', right: '-10%', top: '-80px', bottom: 0, width: '70%',
              overflow: 'hidden', zIndex: 11, pointerEvents: 'none',
              WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 15%, black 60%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%)',
              WebkitMaskComposite: 'intersect',
              maskImage: 'linear-gradient(to left, transparent 0%, black 15%, black 60%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 15%)',
              maskComposite: 'intersect',
            }}>
              <img src="/images/gold_black_025.png" alt=""
                style={{
                  position: 'absolute', right: 0, top: 0, width: 'auto', height: '150%',
                  objectFit: 'cover', objectPosition: 'top right',
                }} />
            </div>
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
              borderRadius: '0 0 24px 24px',
              background: 'linear-gradient(to bottom, transparent, #0A0A0A)',
              pointerEvents: 'none', zIndex: 3,
            }} />
          </>
        )}
        <div style={{
          position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 8, zIndex: 11,
        }}>
          {banners.map((_, i) => (
            <div key={i} onClick={() => setCurrentBanner(i)} style={{
              height: 8, borderRadius: 4, cursor: 'pointer', transition: 'all 0.3s',
              background: i === currentBanner ? 'var(--gold)' : 'rgba(255,255,255,0.15)',
              width: i === currentBanner ? 28 : 8,
            }} />
          ))}
        </div>
      </section>

      {/* === QUICK STATS === */}
      <section style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 32,
      }}>
        {[
          { icon: Star, label: 'YOUR STATUS', value: userStats.level, glow: 'var(--glow-gold)' },
          { icon: CoinsIcon, label: 'BALANCE', value: `$${userStats.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, glow: 'var(--glow-gold)' },
          { icon: ChartLineUp, label: "TODAY'S PROFIT", value: `+$${userStats.todayProfit.toLocaleString()}`, color: '#00FF7F' },
          { icon: Target, label: 'DAILY REWARD', value: 'CLAIM →', link: '/rewards' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            style={{
              background: 'linear-gradient(135deg, rgba(255,215,0,0.04), transparent)',
              border: '1px solid rgba(255,215,0,0.12)', borderRadius: 14, padding: '18px 20px',
              display: 'flex', alignItems: 'center', gap: 16,
              boxShadow: s.glow || 'none',
            }}
          >
            <s.icon size={28} color="url(#goldGrad)" />
            <div>
              <div style={{ color: '#666', fontSize: 9, letterSpacing: 2, fontWeight: 600 }}>{s.label}</div>
              {s.link ? (
                <Link to={s.link} style={{
                  color: 'var(--gold)', fontSize: 16, fontWeight: 800, textDecoration: 'none',
                  animation: 'pulse-glow 2s ease-in-out infinite',
                }}>
                  {s.value}
                </Link>
              ) : (
                <div style={{ color: s.color || '#fff', fontSize: 18, fontWeight: 800 }}>
                  {s.value}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </section>

      {/* === GAME GRID === */}
      <section style={{ marginBottom: 40 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
            <GameController size={24} color="url(#goldGrad)" />
            GAMES
          </h2>
          <div style={{ display: 'flex', gap: 10 }}>
            {['ALL', 'SLOTS', 'TABLE', 'LOTTERY'].map((t) => (
              <button key={t} style={{
                background: t === 'ALL' ? 'rgba(255,215,0,0.15)' : 'transparent',
                color: t === 'ALL' ? 'var(--gold)' : '#666',
                border: t === 'ALL' ? '1px solid rgba(255,215,0,0.3)' : '1px solid transparent',
                borderRadius: 8, padding: '6px 16px', fontSize: 11, fontWeight: 700,
                letterSpacing: 1, transition: 'all 0.3s',
              }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16,
        }}>
          {games.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6, scale: 1.01 }}
            >
              <Link to={`/game/${game.id}`} style={{
                display: 'flex', alignItems: 'center', gap: 18, textDecoration: 'none',
                background: 'linear-gradient(135deg, #1A1A1A, #111)',
                border: '1px solid rgba(255,215,0,0.12)',
                borderRadius: 16, padding: '22px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                transition: 'all 0.3s', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', inset: 0, borderRadius: 16,
                  background: 'radial-gradient(ellipse at 50% 100%, rgba(255,215,0,0.03) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }} />

                <GameIcon phIcon={game.phIcon} />

                <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>{game.name}</span>
                    {game.popular && (
                      <span style={{
                        fontSize: 9, fontWeight: 800, background: 'linear-gradient(135deg, #FF4500, #FF0000)',
                        color: '#fff', padding: '2px 10px', borderRadius: 10, letterSpacing: 1,
                      }}>
                        HOT
                      </span>
                    )}
                  </div>
                  <div style={{ color: 'var(--gold)', fontSize: 10, fontWeight: 600, letterSpacing: 2, marginBottom: 4 }}>
                    {game.tagline}
                  </div>
                  <div style={{ color: '#777', fontSize: 12, lineHeight: 1.4 }}>{game.description}</div>
                </div>

                <CaretRight size={20} color="var(--gold)" style={{ flexShrink: 0, opacity: 0.5 }} />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* === META SYSTEMS ROW === */}
      <section style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 40,
      }}>
        {[
          { path: '/rewards', icon: CalendarCheck, title: 'DAILY REWARDS', sub: 'Check in & collect', color: '#FFD700' },
          { path: '/vip', icon: Crown, title: 'VIP CLUB', sub: 'Exclusive perks', color: '#FF8C00' },
          { path: '/season-pass', icon: Ticket, title: 'SEASON PASS', sub: 'Season 3 active', color: '#00BFFF' },
          { path: '/shop', icon: ShoppingCart, title: 'SHOP', sub: 'Coins & bundles', color: '#00FF7F' },
          { path: '/missions', icon: Target, title: 'MISSIONS', sub: `${missions.filter(m => m.progress >= m.total).length}/${missions.length} done`, color: '#9B30FF' },
          { path: '/rankings', icon: Trophy, title: 'LEADERBOARD', sub: 'Top players', color: '#FFD700' },
          { path: '/guilds', icon: Sword, title: 'GUILDS', sub: 'Join a crew', color: '#FF4500' },
          { path: '/events', icon: Confetti, title: 'EVENTS', sub: 'Limited time', color: '#FF69B4' },
        ].map((item) => (
          <motion.div key={item.path} whileHover={{ y: -4 }}>
            <Link to={item.path} style={{
              display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none',
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,215,0,0.08)',
              borderRadius: 12, padding: '16px 18px', transition: 'all 0.3s',
            }}>
              <item.icon size={24} color="url(#goldGrad)" />
              <div>
                <div style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{item.title}</div>
                <div style={{ color: '#666', fontSize: 11 }}>{item.sub}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>

      {/* === PLATFORM HIGHLIGHTS === */}
      <section style={{
        background: 'linear-gradient(135deg, #0A0A0A, #111)',
        border: '1px solid rgba(255,215,0,0.1)', borderRadius: 20, padding: '50px 40px',
        marginBottom: 30, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 80% 30%, rgba(255,215,0,0.04) 0%, transparent 60%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: 36 }}>
          <h2 className="shimmer-text" style={{ fontSize: 28, fontWeight: 900, letterSpacing: 2, marginBottom: 8 }}>
            WHY CHOOSE MONARCH?
          </h2>
          <p style={{ color: '#777', fontSize: 14 }}>The ultimate premium casino experience</p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20,
          position: 'relative', zIndex: 1,
        }}>
          {[
            { icon: Diamond, title: 'PREMIUM DESIGN', desc: 'Cinematic visuals with ultra-premium gold aesthetic' },
            { icon: CoinsIcon, title: 'BIGGEST JACKPOTS', desc: 'Progressive prizes that keep growing every second' },
            { icon: Lightning, title: 'INSTANT REWARDS', desc: 'Real-time win animations with spectacular effects' },
            { icon: Diamond, title: 'VIP EXPERIENCE', desc: 'Exclusive tiers with massive cashback & bonuses' },
          ].map((f) => (
            <div key={f.title} style={{
              textAlign: 'center', padding: '24px 16px',
              background: 'rgba(255,255,255,0.02)', borderRadius: 14,
              border: '1px solid rgba(255,215,0,0.06)',
            }}>
              <div style={{ marginBottom: 12 }}>
                <f.icon size={40} color="url(#goldGrad)" />
              </div>
              <div style={{ color: 'var(--gold)', fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{f.title}</div>
              <div style={{ color: '#666', fontSize: 12, lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* === CTA === */}
      <section style={{
        background: 'linear-gradient(135deg, #1A0A00, #2D1A00, #1A0A00)',
        border: '1px solid rgba(255,215,0,0.2)', borderRadius: 20,
        padding: '50px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(255,215,0,0.06) 0%, transparent 60%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="jackpot-text" style={{ fontSize: 36, fontWeight: 900, marginBottom: 8 }}>
            READY TO WIN BIG?
          </h2>
          <p style={{ color: '#999', fontSize: 15, marginBottom: 28, maxWidth: 500, margin: '0 auto 28px' }}>
            Join thousands of players experiencing the thrill of MONARCH CASINO
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Link to="/deposit" className="btn-primary" style={{
              padding: '16px 40px', fontSize: 16, letterSpacing: 1, textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              <CurrencyDollar size={20} color="#000" weight="bold" />
              DEPOSIT NOW
            </Link>
            <Link to="/events" style={{
              background: 'transparent', color: 'var(--gold)', fontWeight: 700,
              padding: '16px 40px', borderRadius: 10, fontSize: 14,
              border: '1px solid rgba(255,215,0,0.3)', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              <Confetti size={20} color="url(#goldGrad)" />
              VIEW EVENTS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function GameIcon({ phIcon }) {
  const iconMap = {
    Coin, Compass: Compass, Cards: Cards, DiceFive: DiceFive, Fish: Fish, Target
  };
  const Icon = iconMap[phIcon];
  if (!Icon) return null;
  return <Icon size={42} color="url(#goldGrad)" weight="bold" />;
}