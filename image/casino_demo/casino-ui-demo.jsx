import { useState, useEffect, useRef, useCallback } from "react";

// ╔═══════════════════════════════════════════════════════════════════════════╗
// ║  PINWIN — DESIGN SYSTEM v2.2                                            ║
// ║  Build: 010101  → Display: v1.1.01                                      ║
// ║  Last updated: 2026-06-01                                               ║
// ╠═══════════════════════════════════════════════════════════════════════════╣
// ║  TYPOGRAPHY — 5 fonts max                                               ║
// ║                                                                           ║
// ║  1. Cinzel Decorative w900                                               ║
// ║     → Logo, Win Overlay, Poster big titles, Game page big titles        ║
// ║       (SIGN UP AND RECEIVE, FREE COINS EVERY 24 HOURS, etc.)            ║
// ║                                                                           ║
// ║  2. Raleway w600                                                          ║
// ║     → Section headers (ALL GAMES, SLOT GAMES, WINNERS TODAY)            ║
// ║       Badge labels (✦ EXCLUSIVE, HOT, POPULAR)                          ║
// ║       Card sub-titles (VIP CLUB, WELCOME BONUS, DAILY BONUS)            ║
// ║       Form field labels, Footer column headers                           ║
// ║                                                                           ║
// ║  3. Inter w400–w700                                                       ║
// ║     → All UI body text: category names, game card titles,               ║
// ║       table column headers, tier badges (LEGEND, VIP, PRO),             ║
// ║       game page subtitles, result messages, footer links & copy,        ║
// ║       auth forms, general player ID display (non-leaderboard)           ║
// ║       ◆ symbol in tables                                                 ║
// ║                                                                           ║
// ║  4. Playfair Display w700                                                 ║
// ║     → "Play now" button text only                                        ║
// ║     → Player names in leaderboard / winners tables ONLY                 ║
// ║       (all other player ID displays use Inter)                           ║
// ║                                                                           ║
// ║  5. Rajdhani w700 (font-variant-numeric: tabular-nums)                   ║
// ║     → ALL numeric displays — no exceptions:                             ║
// ║       Jackpot, countdown timer, balance, bet amount, payout,            ║
// ║       multiplier, crash multiplier, game results                        ║
// ║     → Bet / Payout / Multiplier: fixed 2 decimal places (.toFixed(2))  ║
// ║     → font-weight may vary by context (w500 small, w700 large)         ║
// ║       but font-family MUST stay Rajdhani                                ║
// ║     → In mixed text+number strings (e.g. "$300 AND 30 FS"):            ║
// ║       numbers use Rajdhani, surrounding text follows its own rule       ║
// ║                                                                           ║
// ║  WEIGHT FLEXIBILITY RULE                                                 ║
// ║  All 5 fonts may adjust font-weight by context for readability.         ║
// ║  Font-family must NEVER change within its assigned role.                ║
// ╠═══════════════════════════════════════════════════════════════════════════╣
// ║  COLOUR RULES                                                            ║
// ║                                                                           ║
// ║  Gold gradient (buttons, borders, logo shimmer):                        ║
// ║    #FFF5C0 → #FFE066 → #F5C518 → #D4A017 → #B8860B →                  ║
// ║    #8B6508 → #5C4000 → #2A1A00  (8-stop, 135deg)                       ║
// ║                                                                           ║
// ║  Numeric display colour: #FFE066 (flat, no gradient)                    ║
// ║    Reason: gradient on small numbers is hard to read                    ║
// ║                                                                           ║
// ║  Border colour (cards, boxes, buttons): rgba(245,197,24,.5)             ║
// ║    → NO gradient on border unless it is a decorative card frame         ║
// ║                                                                           ║
// ╠═══════════════════════════════════════════════════════════════════════════╣
// ║  HEADER                                                                  ║
// ║                                                                           ║
// ║  Logged OUT:  [Logo]  ············  [Login] [Sign Up] [Avatar]          ║
// ║  Logged IN:   [Logo]  ·········  [Balance] [+] [Avatar]                 ║
// ║                                                                           ║
// ║  Balance box:                                                            ║
// ║    - Format: $00,000,000.00 (8 digits + 2 decimal places)               ║
// ║    - Font: Rajdhani w700, colour #FFE066 (flat, no gradient)            ║
// ║    - Background: transparent                                             ║
// ║    - Border: 1px solid rgba(245,197,24,.5) — same as deposit btn        ║
// ║    - Border-radius: 8px                                                  ║
// ║    - Label "BALANCE" above number: Inter 9px rgba(255,255,255,.35)      ║
// ║                                                                           ║
// ║  Deposit (+) button:                                                     ║
// ║    - Shape: square 34×34px, border-radius 8px                           ║
// ║    - Style: transparent bg, border 1px solid rgba(245,197,24,.5)        ║
// ║    - Content: "+" only, gold gradient text                               ║
// ║                                                                           ║
// ║  Left 3 pills (Casino/Sport/Favorites) → REMOVED                        ║
// ║                                                                           ║
// ╠═══════════════════════════════════════════════════════════════════════════╣
// ║  SIDEBAR — width 200px, always visible                                  ║
// ║                                                                           ║
// ║  Structure: Main item (icon + label + always expanded)                  ║
// ║             Sub items (indented, Inter, no icon)                        ║
// ║                                                                           ║
// ║  Main items:                                                             ║
// ║    🎰 Game                                                               ║
// ║       - Live Casino                                                      ║
// ║       - Slots                                                            ║
// ║       - Table Games                                                      ║
// ║       - Roulette                                                         ║
// ║    ⚽ Sport                                                              ║
// ║       - Football                                                         ║
// ║       - Basketball                                                       ║
// ║       - Tennis                                                           ║
// ║       - Esports                                                          ║
// ║    👑 VIP Club                                                           ║
// ║       - Daily Bonus                                                      ║
// ║       - Welcome Bonus                                                    ║
// ║       - Shop                                                             ║
// ║       - History                                                          ║
// ║       - Rank                                                             ║
// ║       - Profile                                                          ║
// ║    ⭐ Favorites  ← ONLY collapsible item, default expanded              ║
// ║       - (placeholder game names as fake data)                           ║
// ║                                                                           ║
// ║  All other main items: always expanded, no collapse                     ║
// ║  Future: consider adding collapse toggle to all items                   ║
// ║                                                                           ║
// ╠═══════════════════════════════════════════════════════════════════════════╣
// ║  NAVIGATION FLOW                                                         ║
// ║                                                                           ║
// ║  Entry point → Home page (lobby) directly                               ║
// ║  Clicking game / Login / Sign Up / Banner CTA → Modal overlay          ║
// ║  Login modal bottom: "Are you a new member? Sign Up" → signup modal    ║
// ║  After login/register → close modal, continue                          ║
// ║  Sport / sub-items: UI only for now, links added later                  ║
// ║                                                                           ║
// ╠═══════════════════════════════════════════════════════════════════════════╣
// ║  WINNERS TABLE — NUMBER FORMAT                                           ║
// ║                                                                           ║
// ║  Bet / Payout / Multiplier:                                              ║
// ║    - Font: Rajdhani w700, 14px, tabular-nums                            ║
// ║    - Colour: #00E676 (Bet/Payout), #FFE066 (Multiplier)                 ║
// ║    - Decimal: always 2 places (.toFixed(2))                             ║
// ║  Player name: Playfair Display w700 (leaderboard only)                  ║
// ║  Tier badge: Inter, colour per tier                                      ║
// ║    LEGEND #FF6030 / VIP #FFD700 / PRO #30AAFF / ELITE #FF69B4          ║
// ║                                                                           ║
// ╠═══════════════════════════════════════════════════════════════════════════╣
// ║  PENDING DISCUSSIONS (not yet implemented)                              ║
// ║  - Individual game pages layout                                          ║
// ║  - Sport sub-pages                                                       ║
// ║  - VIP Club pages                                                        ║
// ║  - Sidebar collapse toggle (future)                                      ║
// ║  - Mobile / RWD breakpoints                                              ║
// ╚═══════════════════════════════════════════════════════════════════════════╝

// ─── RICH GOLD PALETTE ────────────────────────────────────────────────────────
const GOLD = {
  g1: "#FFF5C0", g2: "#FFE066", g3: "#F5C518", g4: "#D4A017",
  g5: "#B8860B", g6: "#8B6508", g7: "#5C4000", g8: "#2A1A00",
  glow: "rgba(245,197,24,0.6)", glowSoft: "rgba(245,197,24,0.2)",
  green: "#00E676", greenDim: "#00C853",
  bg: "#060504", bgCard: "#0D0B08", bgPanel: "#131008", bgSurf: "#1A1508",
  red: "#FF3D3D",
};

const GRAD = {
  gold: `linear-gradient(135deg, ${GOLD.g8} 0%, ${GOLD.g7} 10%, ${GOLD.g5} 25%, ${GOLD.g4} 40%, ${GOLD.g2} 55%, ${GOLD.g1} 65%, ${GOLD.g3} 75%, ${GOLD.g5} 88%, ${GOLD.g7} 100%)`,
  goldShimmer: `linear-gradient(90deg, ${GOLD.g8} 0%, ${GOLD.g6} 10%, ${GOLD.g4} 22%, ${GOLD.g2} 35%, ${GOLD.g1} 50%, ${GOLD.g2} 65%, ${GOLD.g4} 78%, ${GOLD.g6} 90%, ${GOLD.g8} 100%)`,
  goldText: `linear-gradient(135deg, ${GOLD.g6} 0%, ${GOLD.g4} 20%, ${GOLD.g2} 40%, ${GOLD.g1} 50%, ${GOLD.g3} 60%, ${GOLD.g5} 80%, ${GOLD.g7} 100%)`,
  goldBorder: `linear-gradient(135deg, ${GOLD.g7}, ${GOLD.g5}, ${GOLD.g3}, ${GOLD.g1}, ${GOLD.g2}, ${GOLD.g4}, ${GOLD.g6}, ${GOLD.g8})`,
  goldBtn: `linear-gradient(160deg, ${GOLD.g7} 0%, ${GOLD.g5} 15%, ${GOLD.g3} 30%, ${GOLD.g2} 45%, ${GOLD.g1} 55%, ${GOLD.g2} 65%, ${GOLD.g4} 80%, ${GOLD.g6} 100%)`,
};

const LOGO = {
  horizontal: "https://res.cloudinary.com/dinkfyp0u/image/upload/f_auto,q_auto/logo_horizontal_klblm5",
  icon:       "https://res.cloudinary.com/dinkfyp0u/image/upload/q_auto/f_auto/v1780286652/logo_icon_mjxi0k.png",
  vertical:   "https://res.cloudinary.com/dinkfyp0u/image/upload/q_auto/f_auto/v1780286666/logo_vertical_pprzrc.png",
};

// ─── SVG ICONS (monochrome, gold-gradient via linearGradient def) ─────────────
const SvgDefs = () => (
  <svg width="0" height="0" style={{position:"absolute"}}>
    <defs>
      <linearGradient id="iconGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={GOLD.g6}/>
        <stop offset="20%" stopColor={GOLD.g4}/>
        <stop offset="45%" stopColor={GOLD.g2}/>
        <stop offset="60%" stopColor={GOLD.g1}/>
        <stop offset="80%" stopColor={GOLD.g4}/>
        <stop offset="100%" stopColor={GOLD.g7}/>
      </linearGradient>
      <linearGradient id="iconGoldV" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor={GOLD.g1}/>
        <stop offset="50%" stopColor={GOLD.g3}/>
        <stop offset="100%" stopColor={GOLD.g6}/>
      </linearGradient>
    </defs>
  </svg>
);

// Icon components — all use fill="url(#iconGold)" or stroke
const Icon = ({ d, size=22, stroke=false, vb="0 0 24 24" }) => (
  <svg width={size} height={size} viewBox={vb} fill="none">
    <path d={d} fill={stroke ? "none" : "url(#iconGold)"}
      stroke={stroke ? "url(#iconGold)" : "none"}
      strokeWidth={stroke ? "1.5" : "0"} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Icons = {
  star:    <Icon d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>,
  crown:   <Icon d="M3 19h18M5 19V9l7-6 7 6v10M9 19v-6h6v6"/>,
  gift:    <Icon d="M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7a3 3 0 100-6 3 3 0 000 6z" stroke/>,
  trophy:  <Icon d="M8 21h8m-4-4v4M5 3H3a2 2 0 000 4c0 3.87 2.69 7.12 6.35 7.84M19 3h2a2 2 0 010 4c0 3.87-2.69 7.12-6.35 7.84M7 3h10v7a5 5 0 01-10 0V3z" stroke/>,
  dice:    <Icon d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke/>,
  card:    <Icon d="M2 5a2 2 0 012-2h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5zM2 10h20" stroke/>,
  slots:   <Icon d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>,
  settings:<Icon d="M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke/>,
  rocket:  <Icon d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" stroke/>,
  wheel:   <Icon d="M12 2a10 10 0 100 20A10 10 0 0012 2zM12 8v4l3 3" stroke/>,
  bomb:    <Icon d="M17.73 4.27a4 4 0 00-5.46 0L4 12.54a4 4 0 000 5.65 4 4 0 005.65 0l8.27-8.27a4 4 0 00-.19-5.65zM20 7l-2-2" stroke/>,
  user:    <Icon d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" stroke/>,
  play:    <Icon d="M5 3l14 9-14 9V3z"/>,
  chevronR:<Icon d="M9 18l6-6-6-6" stroke/>,
  chevronL:<Icon d="M15 18l-6-6 6-6" stroke/>,
  mail:    <Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" stroke/>,
  facebook:<Icon vb="0 0 24 24" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke/>,
  twitter: <Icon vb="0 0 24 24" d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" stroke/>,
  instagram:<Icon vb="0 0 24 24" d="M17.5 6.5h.01M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zM12 8a4 4 0 100 8 4 4 0 000-8z" stroke/>,
  youtube: <Icon vb="0 0 24 24" d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" stroke/>,
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Raleway:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700&family=Rajdhani:wght@400;500;600;700&display=swap');

  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html,body { background:${GOLD.bg}; overflow-x:hidden; font-family:'Inter',sans-serif; }
  :root {
    --g1:${GOLD.g1}; --g2:${GOLD.g2}; --g3:${GOLD.g3}; --g4:${GOLD.g4};
    --g5:${GOLD.g5}; --g6:${GOLD.g6}; --g7:${GOLD.g7}; --g8:${GOLD.g8};
    --glow:${GOLD.glow}; --green:${GOLD.green};
    --bg:${GOLD.bg}; --bgc:${GOLD.bgCard}; --bgp:${GOLD.bgPanel}; --bgs:${GOLD.bgSurf};
  }

  /* ── KEYFRAMES ── */
  @keyframes shimmerSlow {
    0%   { background-position: 250% center }
    100% { background-position: -250% center }
  }
  @keyframes pulseGold {
    0%,100% { box-shadow: 0 0 18px rgba(245,197,24,.25), 0 0 40px rgba(245,197,24,.08) }
    50%      { box-shadow: 0 0 40px rgba(245,197,24,.6),  0 0 80px rgba(245,197,24,.25) }
  }
  @keyframes pulseGoldText {
    0%,100% { text-shadow: 0 0 16px rgba(255,230,102,.3), 0 0 32px rgba(245,197,24,.1) }
    50%      { text-shadow: 0 0 32px rgba(255,230,102,.8), 0 0 60px rgba(245,197,24,.4), 0 0 90px rgba(212,160,23,.2) }
  }
  @keyframes float {
    0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)}
  }
  @keyframes fadeInUp {
    from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)}
  }
  @keyframes fadeIn {
    from{opacity:0} to{opacity:1}
  }
  @keyframes scaleIn {
    from{transform:scale(.55);opacity:0} to{transform:scale(1);opacity:1}
  }
  @keyframes jackpotDrop {
    0%  {transform:translateY(-160%);opacity:0}
    65% {transform:translateY(8%);opacity:1}
    82% {transform:translateY(-4%)}
    100%{transform:translateY(0)}
  }
  @keyframes winFlash {
    0%,100%{background:transparent} 30%,70%{background:rgba(245,197,24,.12)}
  }
  @keyframes particleFall {
    0%  {transform:translate(0,0) rotate(0deg);   opacity:1}
    100%{transform:translate(var(--dx),90vh) rotate(540deg); opacity:0}
  }
  @keyframes borderRotate {
    to { --angle: 360deg }
  }
  @keyframes wiggle {
    0%,100%{transform:rotate(0)} 25%{transform:rotate(-4deg)} 75%{transform:rotate(4deg)}
  }
  @keyframes counterPop {
    from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)}
  }
  @keyframes rouletteSpin {
    0%  {transform:rotate(0deg)}
    100%{transform:rotate(1800deg)}
  }

  /* ── TEXT GOLD ── */
  .gold-text {
    background: ${GRAD.goldText};
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmerSlow 14s linear infinite;
  }
  .gold-text-static {
    background: ${GRAD.goldText};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* ── BUTTONS ── */
  .btn-primary {
    position: relative;
    display: inline-flex; align-items: center; gap: 8px;
    padding: 10px 24px;
    border-radius: 30px;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: .5px;
    cursor: pointer;
    border: none;
    color: ${GOLD.g8};
    background: ${GRAD.goldBtn};
    background-size: 200% auto;
    transition: all .3s ease;
    overflow: hidden;
  }
  .btn-primary::before {
    content:'';
    position:absolute; inset:-2px;
    border-radius: 32px;
    background: ${GRAD.goldBorder};
    z-index:-1;
    opacity:.8;
  }
  .btn-primary::after {
    content:'';
    position:absolute; inset:0;
    border-radius:30px;
    background: linear-gradient(180deg, rgba(255,245,192,.25) 0%, transparent 60%);
    pointer-events:none;
  }
  .btn-primary:hover {
    box-shadow: 0 0 0 2px rgba(245,197,24,.25), 0 0 18px rgba(245,197,24,.55), 0 0 40px rgba(245,197,24,.2);
    filter: brightness(1.08);
  }
  .btn-primary:active { transform: scale(.96); transition: transform .1s; }

  .btn-ghost {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 22px;
    border-radius: 30px;
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: .4px;
    cursor: pointer;
    color: var(--g3);
    background: transparent;
    position: relative;
    transition: all .3s ease;
    border: none;
  }
  .btn-ghost::before {
    content:'';
    position:absolute; inset:0;
    border-radius:30px;
    padding: 1px;
    background: ${GRAD.goldBorder};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
  .btn-ghost:hover {
    box-shadow: 0 0 0 2px rgba(245,197,24,.2), 0 0 16px rgba(245,197,24,.45), 0 0 32px rgba(245,197,24,.15);
    color: var(--g1);
  }
  .btn-ghost:active { transform: scale(.96); transition: transform .1s; }

  /* ── PLAY NOW BUTTON (oval + circle icon) ── */
  .btn-play {
    display: inline-flex; align-items: center; gap: 0;
    border: none; cursor: pointer;
    border-radius: 30px;
    overflow: hidden;
    position: relative;
    transition: all .3s ease;
    background: transparent;
  }
  .btn-play::before {
    content:'';
    position:absolute; inset:-1.5px;
    border-radius:32px;
    background: ${GRAD.goldBorder};
    z-index:0;
  }
  .btn-play-inner {
    display: flex; align-items: center; gap: 0;
    background: rgba(8,6,3,.85);
    border-radius: 28px;
    position: relative; z-index:1;
    margin: 1.5px;
    overflow:hidden;
  }
  .btn-play-label {
    padding: 9px 18px 9px 16px;
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: .5px;
    color: var(--g2);
    white-space: nowrap;
  }
  .btn-play-circle {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: ${GRAD.goldBtn};
    display: flex; align-items: center; justify-content: center;
    margin: 2px 2px 2px 0;
    flex-shrink: 0;
    transition: transform .3s;
  }
  .btn-play:hover { box-shadow: 0 0 0 2px rgba(245,197,24,.2), 0 0 18px rgba(245,197,24,.5), 0 0 36px rgba(245,197,24,.18); }
  .btn-play:hover .btn-play-circle { transform: none; }
  .btn-play:active { transform: scale(.96); transition: transform .1s; }

  /* ── CARD GOLD BORDER ── */
  .card-gold {
    position:relative;
    background: ${GOLD.bgCard};
    transition: all .35s cubic-bezier(.34,1.56,.64,1);
    cursor: pointer;
  }
  .card-gold::before {
    content:'';
    position:absolute; inset:-1px;
    border-radius: inherit;
    background: ${GRAD.goldBorder};
    z-index:0;
    opacity:.55;
    transition: opacity .3s;
  }
  .card-gold-inner {
    position: relative; z-index:1;
    background: ${GOLD.bgCard};
    border-radius: inherit;
    height: 100%;
    overflow: hidden;
  }
  .card-gold:hover::before { opacity:1; }
  .card-gold:hover { box-shadow: 0 0 0 1px rgba(245,197,24,.3), 0 0 20px rgba(245,197,24,.45), 0 0 50px rgba(245,197,24,.15); }
  .card-gold:active { transform: scale(.97); transition: transform .1s; }

  /* ── SIDEBAR ICON ── */
  .sb-icon {
    width:44px; height:44px;
    border-radius:12px;
    display:flex; align-items:center; justify-content:center;
    cursor:pointer;
    transition:all .3s ease;
    position:relative;
    background: rgba(255,255,255,.03);
  }
  .sb-icon::before {
    content:'';
    position:absolute; inset:-1px;
    border-radius:13px;
    background: ${GRAD.goldBorder};
    z-index:0;
    opacity:0;
    transition: opacity .3s;
  }
  .sb-icon:hover::before, .sb-icon.active::before { opacity:.7; }
  .sb-icon:hover { transform:scale(1.15); filter:drop-shadow(0 0 8px rgba(245,197,24,.5)); }
  .sb-icon > * { position:relative; z-index:1; }

  /* ── GLASSMORPHISM ── */
  .glass {
    background: rgba(13,11,8,.75);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
  }

  /* ── NAV PILL ── */
  .nav-pill {
    display: inline-flex; align-items: center;
    padding: 6px 16px;
    border-radius: 20px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 11px;
    letter-spacing: 1px;
    cursor: pointer;
    border: none;
    transition: all .3s ease;
    position: relative;
    overflow: hidden;
  }
  .nav-pill.active, .nav-pill:hover {
    color: ${GOLD.g8} !important;
    background: ${GRAD.goldBtn} !important;
    box-shadow: 0 4px 16px rgba(245,197,24,.3);
  }

  /* ── COUNTER (tabular-nums to prevent layout shift) ── */
  .tabnum {
    font-family: 'Rajdhani', sans-serif;
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum";
  }

  /* ── JACKPOT NUMBER ── */
  .jackpot-num {
    font-family: 'Rajdhani', sans-serif;
    font-variant-numeric: tabular-nums;
    font-weight: 700;
    background: linear-gradient(180deg, ${GOLD.g1} 0%, ${GOLD.g2} 30%, ${GOLD.g3} 55%, ${GOLD.g5} 80%, ${GOLD.g6} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 2px 12px rgba(245,197,24,.45));
    animation: pulseGoldText 2.5s ease-in-out infinite;
  }

  /* ── TABLE ROW ── */
  .t-row { transition: background .2s; }
  .t-row:hover { background: rgba(245,197,24,.04); }

  /* ── SCROLLBAR ── */
  .no-scrollbar::-webkit-scrollbar { display:none; }
  .no-scrollbar { scrollbar-width:none; }

  /* ── PAGES ── */
  .page-in { animation: fadeInUp .4s ease both; }

  /* ── WIN OVERLAY ── */
  .win-overlay {
    position:fixed; inset:0; z-index:9999;
    display:flex; align-items:center; justify-content:center;
    background:rgba(3,2,1,.88);
    animation: fadeIn .25s ease;
  }
  .win-text {
    font-family:'Cinzel Decorative', cursive;
    font-weight:900;
    animation: jackpotDrop .7s cubic-bezier(.34,1.56,.64,1) both, pulseGoldText 1.2s ease-in-out infinite .7s;
  }

  /* ── GAME CARD ── */
  .game-card {
    position:relative; overflow:hidden; cursor:pointer;
    transition: all .4s cubic-bezier(.34,1.56,.64,1);
    flex-shrink:0;
  }
  .game-card:hover { box-shadow: 0 0 0 1px rgba(245,197,24,.3), 0 0 20px rgba(245,197,24,.4), 0 0 48px rgba(245,197,24,.12); z-index:10; }
  .game-card:hover .gc-img { filter: brightness(1.15); }
  .game-card:active { transform: scale(.96); transition: transform .1s; }
  .game-card:hover .gc-overlay { opacity:1; }
  .gc-overlay {
    position:absolute; inset:0;
    background:linear-gradient(to top, rgba(0,0,0,.92) 0%, transparent 55%);
    opacity:0; transition:opacity .3s;
    display:flex; align-items:flex-end; padding:12px;
  }

  /* ── PARTICLE ── */
  .particle {
    position:fixed; pointer-events:none; z-index:9998;
    animation: particleFall var(--dur) ease-in forwards;
  }

  /* ── POSTER BLEED CONTAINER ── */
  .poster-bleed {
    position:relative; overflow:hidden;
  }
  .poster-bleed .bleed-img {
    position:absolute; right:-10px; bottom:0;
    height:115%; width:auto;
    object-fit:cover;
    pointer-events:none;
    z-index:2;
  }
  .poster-bleed .bleed-glow {
    position:absolute; right:0; top:0; bottom:0; width:55%;
    background: radial-gradient(ellipse at 85% 50%, rgba(245,197,24,.08) 0%, transparent 70%);
    z-index:1; pointer-events:none;
  }

  /* ── PROGRESS ── */
  .progress-bar {
    height:3px;
    background: ${GRAD.gold};
    border-radius:2px;
    transition: width .15s linear;
  }

  /* ── VIEW MORE BUTTON ── */
  .btn-view-more {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 10px 28px;
    border-radius: 8px;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: .5px;
    cursor: pointer;
    color: var(--g3);
    background: transparent;
    position: relative;
    transition: all .3s ease;
    border: none;
  }
  .btn-view-more::before {
    content:'';
    position:absolute; inset:0;
    border-radius:8px;
    padding: 1px;
    background: ${GRAD.goldBorder};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
  .btn-view-more:hover {
    box-shadow: 0 0 0 2px rgba(245,197,24,.2), 0 0 16px rgba(245,197,24,.45), 0 0 32px rgba(245,197,24,.15);
    color: var(--g1);
  }
  .btn-view-more:active { transform: scale(.96); transition: transform .1s; }

  /* ── GAME CATEGORY BUTTON ── */
  .cat-btn {
    position: relative;
    border-radius: 12px;
    cursor: pointer;
    transition: all .25s ease;
    border: 1px solid rgba(245,197,24,.35);
    background: transparent;
    overflow: hidden;
    flex-shrink: 0;
  }
  .cat-btn-inner {
    padding: 12px 18px;
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    position: relative; z-index: 1;
  }
  .cat-btn .cat-label {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 11px;
    letter-spacing: 1px;
    color: ${GOLD.g1};
    transition: color .25s;
  }
  .cat-btn:hover {
    box-shadow: 0 0 0 1px rgba(245,197,24,.3), 0 0 16px rgba(245,197,24,.5), 0 0 36px rgba(245,197,24,.18);
  }
  .cat-btn:hover .cat-img { filter: brightness(1.2); }
  .cat-btn:active { transform: scale(.96); transition: transform .1s; }
  .cat-btn.active {
    background: linear-gradient(135deg, ${GOLD.g1} 0%, ${GOLD.g2} 100%);
    border-color: ${GOLD.g3};
  }
  .cat-btn.active .cat-label { color: #000; }

  /* ── SEARCH BOX ── */
  .search-box {
    display: flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(245,197,24,.3);
    border-radius: 20px;
    padding: 7px 14px;
    transition: all .3s;
  }
  .search-box:focus-within {
    border-color: rgba(245,197,24,.6);
    box-shadow: 0 0 12px rgba(245,197,24,.2);
  }
  .search-box input {
    background: none; border: none; outline: none;
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    width: 160px;
  }
  .search-box input::placeholder { color: rgba(255,255,255,.3); }

  /* ── JACKPOT BAR ── */
  .jackpot-bar {
    display: flex; align-items: center; justify-content: center; gap: 16px;
    padding: 10px 24px;
    background: linear-gradient(90deg, transparent, rgba(245,197,24,.06), transparent);
    border-bottom: 1px solid rgba(245,197,24,.1);
  }

  /* ── AUTH MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(0,0,0,.82);
    display: flex; align-items: center; justify-content: center;
    animation: fadeIn .2s ease;
    backdrop-filter: blur(4px);
  }
  .modal-box {
    width: 100%; max-width: 460px;
    margin: 0 20px;
    animation: scaleIn .25s cubic-bezier(.34,1.56,.64,1);
  }

  /* ── SIDEBAR EXPANDED ── */
  .sb-main-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 16px;
    cursor: pointer;
    border-radius: 8px;
    transition: all .2s;
    color: rgba(255,255,255,.6);
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: .3px;
  }
  .sb-main-item:hover { background: rgba(245,197,24,.06); color: ${GOLD.g2}; }
  .sb-main-item.active { color: ${GOLD.g2}; background: rgba(245,197,24,.08); }
  .sb-sub-item {
    padding: 7px 16px 7px 42px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: rgba(255,255,255,.4);
    border-radius: 6px;
    transition: all .2s;
    letter-spacing: .2px;
  }
  .sb-sub-item:hover { color: ${GOLD.g3}; background: rgba(245,197,24,.04); }
  .sb-sub-item.active { color: ${GOLD.g2}; }

  /* ── COUNTDOWN BOX (線框only) ── */
  .cd-box {
    min-width: 62px;
    background: transparent;
    border-radius: 8px;
    text-align: center;
    padding: 10px 12px;
    position: relative;
  }
  .cd-box::before {
    content:'';
    position:absolute; inset:-1px;
    border-radius:9px;
    background: ${GRAD.goldBorder};
    z-index:0;
    opacity:.45;
  }
  .cd-inner { position:relative; z-index:1; }
  .cd-num {
    font-family: 'Rajdhani', sans-serif;
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum";
    font-weight: 700;
    font-size: 26px;
    line-height: 1;
    background: linear-gradient(180deg, ${GOLD.g1} 0%, ${GOLD.g3} 60%, ${GOLD.g5} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .cd-lbl {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: rgba(245,197,24,.45);
    margin-top: 3px;
  }

  @media (max-width:768px) {
    .sidebar-desktop { display:none !important; }
    .main-pad { padding-left:0 !important; }
    .hero-grid { grid-template-columns:1fr !important; }
    .footer-cols { grid-template-columns:1fr 1fr !important; }
  }
`;

// ─── PARTICLES ───────────────────────────────────────────────────────────────
function Particles({ active, onDone }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    if (!active) { setList([]); return; }
    setList(Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      dx: (Math.random() - .5) * 180,
      dur: 1.6 + Math.random() * 1.6,
      size: 10 + Math.random() * 14,
      delay: Math.random() * .5,
      shape: ["◆","★","✦","◉","▲","●"][i % 6],
      color: [GOLD.g1,GOLD.g2,GOLD.g3,GOLD.g4][i%4],
    })));
    const t = setTimeout(() => { setList([]); onDone?.(); }, 4500);
    return () => clearTimeout(t);
  }, [active]);
  return <>{list.map(p => (
    <div key={p.id} className="particle" style={{
      left:`${p.x}vw`, top:"-4vh",
      fontSize:p.size, color:p.color,
      "--dx":`${p.dx}px`, "--dur":`${p.dur}s`,
      animationDelay:`${p.delay}s`,
    }}>{p.shape}</div>
  ))}</>;
}

// ─── WIN OVERLAY ─────────────────────────────────────────────────────────────
function WinOverlay({ show, amount, onClose }) {
  if (!show) return null;
  return (
    <div className="win-overlay" onClick={onClose}>
      <div style={{ textAlign:"center", position:"relative" }}>
        <div style={{ position:"absolute", inset:"-80px",
          background:"radial-gradient(circle, rgba(245,197,24,.28) 0%, transparent 68%)",
          animation:"pulseGold 1s ease-in-out infinite", pointerEvents:"none" }} />
        <div className="win-text gold-text-static" style={{ fontSize:"clamp(40px,8vw,96px)", lineHeight:1.1 }}>
          ✦ YOU WIN! ✦
        </div>
        <div style={{ marginTop:18, animation:"scaleIn .5s .5s ease both" }}>
          <div className="jackpot-num" style={{ fontSize:"clamp(44px,9vw,110px)" }}>
            ${amount?.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}
          </div>
        </div>
        <div style={{ marginTop:14, color:"rgba(255,255,255,.4)", fontFamily:"'Inter',sans-serif", fontSize:14, animation:"fadeInUp .5s 1.2s ease both" }}>
          Tap anywhere to continue
        </div>
      </div>
    </div>
  );
}

// ─── AUTH MODAL ──────────────────────────────────────────────────────────────
function AuthModal({ mode: initMode, onClose, onSuccess }) {
  const [mode, setMode] = useState(initMode || "login");
  const isLogin = mode === "login";
  const fields = isLogin
    ? ["Email Address","Password"]
    : ["Username","Email Address","Password","Confirm Password"];
  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="card-gold" style={{ borderRadius:18 }}>
          <div className="card-gold-inner" style={{ padding:32, position:"relative" }}>
            {/* Close */}
            <button onClick={onClose} style={{
              position:"absolute", top:14, right:14,
              background:"none", border:"none", cursor:"pointer",
              color:"rgba(255,255,255,.35)", fontSize:20, lineHeight:1,
              transition:"color .2s",
            }} onMouseEnter={e=>e.target.style.color="#fff"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.35)"}>✕</button>

            <div style={{ textAlign:"center", marginBottom:24 }}>
              <img src={LOGO.icon} alt="SPINWIN" style={{ height:48, width:"auto", objectFit:"contain", marginBottom:8 }} />
              {!isLogin && <div className="jackpot-num" style={{ fontSize:22, marginBottom:6 }}>$5,000 + 100 Free Spins</div>}
              <div style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:"rgba(255,255,255,.4)" }}>
                {isLogin ? "Welcome back. Sign in to continue." : "Create your account to claim your bonus."}
              </div>
            </div>

            {fields.map(l => (
              <div key={l} style={{ marginBottom:14 }}>
                <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:11, color:GOLD.g4, letterSpacing:2, marginBottom:5 }}>{l.toUpperCase()}</div>
                <input
                  type={l.toLowerCase().includes("password")?"password":l.toLowerCase().includes("email")?"email":"text"}
                  placeholder={l}
                  style={{
                    width:"100%", background:GOLD.bgSurf, border:`1px solid rgba(245,197,24,.18)`,
                    borderRadius:8, padding:"10px 14px", color:"#fff",
                    fontFamily:"'Inter',sans-serif", fontSize:13, outline:"none",
                    transition:"border-color .2s",
                  }}
                  onFocus={e=>e.target.style.borderColor="rgba(245,197,24,.5)"}
                  onBlur={e=>e.target.style.borderColor="rgba(245,197,24,.18)"}
                />
              </div>
            ))}

            <button className="btn-primary" onClick={onSuccess} style={{
              width:"100%", padding:"13px", fontSize:14, marginTop:6, borderRadius:10, justifyContent:"center",
            }}>
              {isLogin ? "Sign In" : "Create Account & Claim Bonus"}
            </button>

            <div style={{ textAlign:"center", marginTop:14, fontFamily:"'Inter',sans-serif", fontSize:13, color:"rgba(255,255,255,.3)" }}>
              {isLogin
                ? <>Are you a new member?{" "}<span style={{ color:GOLD.g3, cursor:"pointer" }} onClick={()=>setMode("signup")}>Sign Up</span></>
                : <>Have an account?{" "}<span style={{ color:GOLD.g3, cursor:"pointer" }} onClick={()=>setMode("login")}>Login</span></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HEADER ──────────────────────────────────────────────────────────────────
function Header({ isLoggedIn, onAuthTrigger }) {
  const [query, setQuery] = useState("");
  return (
    <header className="glass" style={{
      borderBottom:`1px solid rgba(245,197,24,.12)`,
      position:"sticky", top:0, zIndex:100,
    }}>
      <div style={{ maxWidth:1440, margin:"0 auto", padding:"0 20px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"flex-end", height:60, gap:10 }}>
          {isLoggedIn ? (
            <>
              {/* Balance */}
              <div style={{
                padding:"4px 14px", borderRadius:8,
                border:`1px solid rgba(245,197,24,.5)`,
                display:"flex", flexDirection:"column", alignItems:"flex-end",
              }}>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:9, color:"rgba(255,255,255,.35)", letterSpacing:1 }}>BALANCE</div>
                <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:15, color:GOLD.g2, fontVariantNumeric:"tabular-nums" }}>$00,000,000.00</div>
              </div>
              {/* Deposit */}
              <button style={{
                width:34, height:34, borderRadius:8,
                background:"transparent", border:`1px solid rgba(245,197,24,.5)`,
                cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:20,
                background: GRAD.goldText, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                transition:"box-shadow .3s",
              }}
              onMouseEnter={e=>e.currentTarget.style.boxShadow="0 0 12px rgba(245,197,24,.5)"}
              onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}
              >+</button>
              {/* Search */}
              <div className="search-box">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" stroke={GOLD.g4} strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  value={query}
                  onChange={e=>setQuery(e.target.value)}
                  placeholder="Search games..."
                />
              </div>
              {/* Avatar */}
              <div className="sb-icon" style={{ borderRadius:10 }}>{Icons.user}</div>
            </>
          ) : (
            <>
              <button className="btn-ghost" onClick={() => onAuthTrigger("login")} style={{ fontSize:13, padding:"8px 20px" }}>Login</button>
              <button className="btn-primary" onClick={() => onAuthTrigger("signup")} style={{ padding:"8px 22px" }}>Sign Up</button>
              <div className="sb-icon" style={{ borderRadius:10 }}>{Icons.user}</div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
const BUILD_VERSION = "010101"; // → v1.1.01
const DISPLAY_VERSION = `v${parseInt(BUILD_VERSION.slice(0,2))}.${parseInt(BUILD_VERSION.slice(2,4))}.${BUILD_VERSION.slice(4,6)}`;

function Sidebar({ setPage, activePage, onAuthTrigger }) {
  const navItems = [
    {
      icon: Icons.slots, label: "Game", key: "game",
      sub: [
        { label:"Live Casino", page:"live-casino" },
        { label:"Slots",       page:"slots"       },
        { label:"Table Games", page:"cards"        },
        { label:"Roulette",    page:"roulette"    },
        { label:"Poker",       page:"poker"       },
        { label:"Sic Bo",      page:"sicbo"       },
      ]
    },
    {
      icon: Icons.rocket, label: "Sport", key: "sport",
      sub: [
        { label:"Football",   page:"sport" },
        { label:"Basketball", page:"sport" },
        { label:"Tennis",     page:"sport" },
        { label:"Esports",    page:"sport" },
      ]
    },
    {
      icon: Icons.crown, label: "VIP Club", key: "vip",
      sub: [
        { label:"Daily Bonus",    page:"bonus"    },
        { label:"Welcome Bonus",  page:"bonus"    },
        { label:"Shop",           page:"vip"      },
        { label:"History",        page:"vip"      },
        { label:"Rank",           page:"vip"      },
        { label:"Profile",        page:"profile"  },
      ]
    },
    {
      icon: Icons.star, label: "Favorites", key: "favorites", collapsible: true,
      sub: [
        { label:"Golden Reels",   page:"slots"    },
        { label:"Live Roulette",  page:"roulette" },
        { label:"Crash Rocket",   page:"crash"    },
        { label:"Diamond Mines",  page:"mines"    },
      ]
    },
  ];

  const [collapsed, setCollapsed] = useState({ favorites: false });

  return (
    <aside className="sidebar-desktop" style={{
      position:"fixed", left:0, top:60, bottom:0, width:200,
      display:"flex", flexDirection:"column",
      zIndex:90,
      background:"rgba(6,5,4,.96)",
      borderRight:`1px solid rgba(245,197,24,.07)`,
      overflowY:"auto", overflowX:"hidden",
    }}>
      {/* Logo */}
      <div onClick={() => setPage("home")} style={{
        padding:"16px 14px 12px",
        borderBottom:`1px solid rgba(245,197,24,.08)`,
        cursor:"pointer",
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        <img
          src={LOGO.horizontal}
          alt="SPINWIN"
          style={{ height:36, width:"auto", objectFit:"contain" }}
          onError={e => {
            e.target.style.display="none";
            e.target.nextSibling.style.display="flex";
          }}
        />
        {/* Fallback text logo */}
        <div style={{ display:"none", alignItems:"center", gap:6 }}>
          <span className="gold-text" style={{ fontFamily:"'Cinzel Decorative', cursive", fontWeight:900, fontSize:16, letterSpacing:3 }}>PINWIN</span>
        </div>
      </div>

      {/* Nav items */}
      <div style={{ flex:1, padding:"10px 8px" }}>
        {navItems.map(item => {
          const isCollapsible = item.collapsible;
          const isOpen = isCollapsible ? !collapsed[item.key] : true;
          return (
            <div key={item.key} style={{ marginBottom:4 }}>
              <div
                className={`sb-main-item ${activePage===item.key?"active":""}`}
                onClick={() => {
                  if (isCollapsible) setCollapsed(c => ({ ...c, [item.key]: !c[item.key] }));
                }}
              >
                <span style={{ flexShrink:0 }}>{item.icon}</span>
                <span style={{ flex:1 }}>{item.label}</span>
                {isCollapsible && (
                  <span style={{ fontSize:10, opacity:.5, transform: isOpen?"rotate(180deg)":"none", transition:"transform .2s" }}>▼</span>
                )}
              </div>
              {isOpen && item.sub.map(s => (
                <div
                  key={s.label}
                  className={`sb-sub-item ${activePage===s.page?"active":""}`}
                  onClick={() => setPage(s.page)}
                >{s.label}</div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Version */}
      <div style={{
        padding:"12px 16px",
        borderTop:`1px solid rgba(245,197,24,.06)`,
        fontFamily:"'Rajdhani',sans-serif",
        fontSize:11,
        color:"rgba(245,197,24,.25)",
        letterSpacing:1,
        textAlign:"center",
      }}>{DISPLAY_VERSION}</div>
    </aside>
  );
}

// ─── HERO SECTION (3 Promo Banners) ──────────────────────────────────────────
function HeroSection({ onAuthTrigger }) {
  const banners = [
    {
      badge:"✦ EXCLUSIVE", title:"SIGN UP AND RECEIVE", highlight:"$300 AND 30 FREE SPINS",
      sub:"New member welcome bonus", bg:"linear-gradient(135deg,rgba(6,5,4,1) 0%,rgba(20,14,0,.95) 60%,rgba(40,28,0,.8) 100%)",
      accentColor:GOLD.g3, char:"👑", big:true,
    },
    {
      badge:"🔥 HOT GAME", title:"CRASH — WIN UP TO", highlight:"10,000×",
      sub:"Most popular game this week", bg:"linear-gradient(135deg,rgba(4,0,16,1) 0%,rgba(24,8,40,.8) 100%)",
      accentColor:"#c060ff", char:"🚀", big:false,
    },
    {
      badge:"💰 DEPOSIT BONUS", title:"FIRST DEPOSIT MATCH", highlight:"UP TO $5,000",
      sub:"100% match on your first deposit", bg:"linear-gradient(135deg,rgba(0,8,4,1) 0%,rgba(0,36,16,.8) 100%)",
      accentColor:GOLD.green, char:"💎", big:false,
    },
  ];

  const BigBanner = ({ b }) => (
    <div className="card-gold poster-bleed" style={{borderRadius:16,minHeight:220,cursor:"pointer"}} onClick={()=>onAuthTrigger("signup")}>
      <div className="card-gold-inner" style={{borderRadius:16,padding:"28px 32px",minHeight:220}}>
        <div style={{position:"absolute",inset:0,borderRadius:16,background:b.bg}}/>
        <div style={{position:"absolute",inset:0,borderRadius:16,background:"radial-gradient(ellipse at 20% 60%,rgba(245,197,24,.04) 0%,transparent 60%)"}}/>
        <div style={{position:"absolute",right:0,bottom:0,width:"45%",height:"115%",display:"flex",alignItems:"flex-end",justifyContent:"center",overflow:"hidden",zIndex:2,pointerEvents:"none"}}>
          <div style={{fontSize:80,paddingBottom:16,filter:`drop-shadow(0 0 24px ${b.accentColor}88)`,animation:"float 3s ease-in-out infinite"}}>{b.char}</div>
        </div>
        <div style={{position:"absolute",right:"42%",top:0,bottom:0,width:80,background:"linear-gradient(90deg,rgba(6,5,4,1),transparent)",zIndex:3,pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:4,maxWidth:"55%"}}>
          <div style={{display:"inline-flex",alignItems:"center",background:"rgba(245,197,24,.1)",border:`1px solid rgba(245,197,24,.25)`,borderRadius:4,padding:"2px 12px",marginBottom:12}}>
            <span style={{fontFamily:"'Raleway',sans-serif",fontSize:12,color:GOLD.g3,letterSpacing:2}}>{b.badge}</span>
          </div>
          <div style={{fontFamily:"'Cinzel Decorative',cursive",fontWeight:700,fontSize:"clamp(14px,2vw,22px)",color:"#fff",lineHeight:1.4,marginBottom:8}}>{b.title}
            <span className="gold-text-static" style={{display:"block"}}>{b.highlight}</span>
          </div>
          <div style={{fontFamily:"'Inter',sans-serif",fontSize:12,color:"rgba(255,255,255,.4)",marginBottom:18}}>{b.sub}</div>
          <button className="btn-play" onClick={e=>{e.stopPropagation();onAuthTrigger("signup");}}>
            <div className="btn-play-inner">
              <span className="btn-play-label">Play now</span>
              <div className="btn-play-circle"><svg width="14" height="14" viewBox="0 0 24 24" fill={GOLD.g8}><path d="M5 3l14 9-14 9V3z"/></svg></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const SmallBanner = ({ b }) => (
    <div className="card-gold" style={{borderRadius:14,cursor:"pointer",flex:1}} onClick={()=>onAuthTrigger("signup")}>
      <div className="card-gold-inner" style={{padding:"16px 20px",minHeight:96,borderRadius:14}}>
        <div style={{position:"absolute",inset:0,borderRadius:14,background:b.bg}}/>
        <div style={{position:"absolute",right:14,bottom:8,fontSize:40,opacity:.25,filter:`drop-shadow(0 0 12px ${b.accentColor})`,pointerEvents:"none"}}>{b.char}</div>
        <div style={{position:"relative",zIndex:1}}>
          <div style={{display:"inline-block",background:"rgba(245,197,24,.12)",border:`1px solid rgba(245,197,24,.2)`,borderRadius:4,padding:"2px 10px",fontFamily:"'Raleway',sans-serif",fontSize:11,color:GOLD.g3,letterSpacing:2,marginBottom:8}}>{b.badge}</div>
          <div style={{fontFamily:"'Inter',sans-serif",fontWeight:700,fontSize:"clamp(12px,1.5vw,15px)",color:"#fff",marginBottom:6}}>{b.title}</div>
          <div className="gold-text-static" style={{fontFamily:"'Cinzel Decorative',cursive",fontWeight:900,fontSize:"clamp(13px,1.6vw,18px)"}}>{b.highlight}</div>
        </div>
      </div>
    </div>
  );

  return (
    <section style={{padding:"20px 0"}}>
      <div className="hero-grid" style={{display:"grid",gridTemplateColumns:"2fr 1fr",gap:14}}>
        <BigBanner b={banners[0]}/>
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <SmallBanner b={banners[1]}/>
          <SmallBanner b={banners[2]}/>
        </div>
      </div>
    </section>
  );
}

// ─── GAME DATA (with tags) ────────────────────────────────────────────────────
const GAME_DATA = [
  { id:1,  label:"Sweet Bonanza",      tags:["slots"],                      bg:"#2d0a1a", accent:"#c0394f", icon:Icons.star,   page:"slots"    },
  { id:2,  label:"Gates of Olympus",   tags:["slots"],                      bg:"#0a1530", accent:"#3a6fd8", icon:Icons.crown,  page:"slots"    },
  { id:3,  label:"Buffalo King",       tags:["slots"],                      bg:"#1a0c00", accent:GOLD.g5,   icon:Icons.trophy, page:"slots", jackpot:true },
  { id:4,  label:"Dog House Megaways", tags:["slots"],                      bg:"#0a1f0a", accent:"#2e8b2e", icon:Icons.dice,   page:"slots"    },
  { id:5,  label:"Sugar Rush",         tags:["slots"],                      bg:"#1a0a2d", accent:"#8b2ec0", icon:Icons.gift,   page:"slots"    },
  { id:6,  label:"Book of Dead",       tags:["slots"],                      bg:"#1a1200", accent:GOLD.g4,   icon:Icons.star,   page:"slots"    },
  { id:7,  label:"Lightning Roulette", tags:["roulette","table","live-casino"], bg:"#0a0a1a", accent:"#4060ff", icon:Icons.wheel, page:"roulette" },
  { id:8,  label:"European Roulette",  tags:["roulette","table"],           bg:"#001a08", accent:"#20a050", icon:Icons.wheel,  page:"roulette" },
  { id:9,  label:"Speed Roulette",     tags:["roulette","table","live-casino"], bg:"#1a0808", accent:"#e04030", icon:Icons.wheel, page:"roulette" },
  { id:10, label:"Live Blackjack",     tags:["table","live-casino"],        bg:"#001408", accent:"#00c860", icon:Icons.card,   page:"cards"    },
  { id:11, label:"Baccarat",           tags:["table","live-casino"],        bg:"#140010", accent:"#c040a0", icon:Icons.card,   page:"cards"    },
  { id:12, label:"Sic Bo Live",        tags:["table","sic-bo","live-casino"], bg:"#1a1000", accent:GOLD.g4, icon:Icons.dice,  page:"dice"     },
  { id:13, label:"Classic Sic Bo",     tags:["table","sic-bo"],             bg:"#0a0a0a", accent:GOLD.g5,   icon:Icons.dice,   page:"dice"     },
  { id:14, label:"Texas Hold'em",      tags:["poker"],                      bg:"#0a1a0a", accent:"#40b040", icon:Icons.card,   page:"cards"    },
  { id:15, label:"Video Poker",        tags:["poker"],                      bg:"#1a0a1a", accent:"#a040c0", icon:Icons.card,   page:"cards"    },
  { id:16, label:"Poker Showdown",     tags:["poker","live-casino"],        bg:"#0a1400", accent:GOLD.g3,   icon:Icons.card,   page:"cards"    },
  { id:17, label:"Live Dealer Lobby",  tags:["live-casino"],                bg:"#140a00", accent:GOLD.g4,   icon:Icons.crown,  page:"roulette" },
  { id:18, label:"Monopoly Live",      tags:["live-casino"],                bg:"#001a1a", accent:"#00c0c0", icon:Icons.dice,   page:"cards"    },
];

const CATEGORIES = [
  { key:"live-casino", label:"Live Casino", icon:"📡" },
  { key:"slots",       label:"Slots",       icon:"🎰" },
  { key:"table",       label:"Table Games", icon:"🃏" },
  { key:"roulette",    label:"Roulette",    icon:"🎡" },
  { key:"poker",       label:"Poker",       icon:"♠️" },
  { key:"sic-bo",      label:"Sic Bo",      icon:"🎲" },
];

// ─── GAME CATEGORIES + GAMES ROW ─────────────────────────────────────────────
function GameSection({ onAuthTrigger }) {
  const [activeCategory, setActiveCategory] = useState("slots");
  const [visibleCount, setVisibleCount] = useState(10);
  const GAMES_PER_ROW = 5;
  const LOAD_MORE = GAMES_PER_ROW * 2;

  const filtered = GAME_DATA.filter(g => g.tags.includes(activeCategory));
  const catLabel = CATEGORIES.find(c => c.key === activeCategory)?.label || "";
  const displayGames = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleCategoryChange = (key) => {
    setActiveCategory(key);
    setVisibleCount(10);
  };

  return (
    <div style={{ padding:"12px 0" }}>
      {/* Category buttons */}
      <div className="no-scrollbar" style={{ display:"flex", gap:10, overflowX:"auto", paddingBottom:4, marginBottom:18 }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            className={`cat-btn ${activeCategory===cat.key?"active":""}`}
            onClick={() => handleCategoryChange(cat.key)}
          >
            <div className="cat-btn-inner">
              <span style={{ fontSize:20 }}>{cat.icon}</span>
              <span className="cat-label">{cat.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Section title */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
        {Icons.star}
        <span style={{ fontFamily:"'Raleway',sans-serif", fontWeight:600, fontSize:13, color:GOLD.g4, letterSpacing:3 }}>
          {catLabel.toUpperCase()} GAMES
        </span>
        <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:13, color:"rgba(245,197,24,.4)" }}>
          ({filtered.length})
        </span>
      </div>

      {/* Games grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10 }}>
        {displayGames.map(g => (
          <div key={g.id} className="game-card" onClick={() => onAuthTrigger("login")} style={{
            borderRadius:14,
            background:g.bg,
            border:`1px solid rgba(245,197,24,.15)`,
            height:180,
          }}>
            <div style={{ height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:14, position:"relative" }}>
              {g.jackpot && (
                <div style={{ position:"absolute", top:10, left:"50%", transform:"translateX(-50%)",
                  background:GRAD.goldBtn, color:GOLD.g8, fontSize:8,
                  fontFamily:"'Raleway',sans-serif", fontWeight:600,
                  padding:"3px 14px", borderRadius:20, letterSpacing:1.5, whiteSpace:"nowrap" }}>
                  ✦ JACKPOT
                </div>
              )}
              <div className="gc-img" style={{ marginTop:g.jackpot?18:0, filter:`drop-shadow(0 0 12px ${g.accent})`, transition:"filter .3s" }}>
                <svg width={40} height={40} viewBox="0 0 24 24" fill="none">
                  {g.icon.props.children}
                </svg>
              </div>
              <div style={{ fontFamily:"'Inter',sans-serif", fontWeight:600,
                fontSize:11, color:"rgba(255,255,255,.8)",
                textAlign:"center", marginTop:10, letterSpacing:.5 }}>{g.label}</div>
              {g.jackpot && (
                <div className="jackpot-num" style={{ fontSize:11, marginTop:4 }}>$56,280,480</div>
              )}
            </div>
            <div className="gc-overlay" style={{ borderRadius:14 }}>
              <button className="btn-play" style={{ width:"100%", justifyContent:"center" }}
                onClick={e => { e.stopPropagation(); onAuthTrigger("login"); }}>
                <div className="btn-play-inner" style={{ width:"100%", justifyContent:"center" }}>
                  <span className="btn-play-label" style={{ fontSize:12 }}>Play now</span>
                  <div className="btn-play-circle" style={{ width:30, height:30 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill={GOLD.g8}><path d="M5 3l14 9-14 9V3z"/></svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View More */}
      {hasMore && (
        <div style={{ textAlign:"center", marginTop:20 }}>
          <button className="btn-view-more" onClick={() => setVisibleCount(v => v + LOAD_MORE)}>
            View More ∨
          </button>
        </div>
      )}
    </div>
  );
}

// ─── JACKPOT BAR ─────────────────────────────────────────────────────────────
function DigitRoller({ digit, prevDigit }) {
  const [key, setKey] = useState(0);
  const isChanging = digit !== prevDigit;
  useEffect(() => { if (isChanging) setKey(k => k+1); }, [digit]);
  return (
    <div style={{
      display:"inline-block",
      width:"0.58em",
      height:"1em",
      overflow:"hidden",
      position:"relative",
      verticalAlign:"middle",
    }}>
      <div key={key} style={{
        position:"absolute", top:0, left:0, width:"100%",
        animation: isChanging ? "digitDown 0.3s ease-in-out forwards" : "none",
      }}>
        {/* prev on top, current below — animates upward so current comes into view from bottom */}
        <div style={{ height:"1em", display:"flex", alignItems:"center", justifyContent:"center", color:GOLD.g2 }}>{prevDigit}</div>
        <div style={{ height:"1em", display:"flex", alignItems:"center", justifyContent:"center", color:GOLD.g2 }}>{digit}</div>
      </div>
    </div>
  );
}

function JackpotBar() {
  const [amount, setAmount] = useState(98765432.10);
  const prevAmountRef = useRef(98765432.10);

  useEffect(() => {
    const t = setInterval(() => {
      setAmount(a => {
        prevAmountRef.current = a;
        return a + Math.random() * 13.7;
      });
    }, 300);
    return () => clearInterval(t);
  }, []);

  const fmt = (n) => n.toLocaleString("en-US", { minimumFractionDigits:2, maximumFractionDigits:2 });
  const currStr = fmt(amount);
  const prevStr = fmt(prevAmountRef.current);

  const maxLen = Math.max(currStr.length, prevStr.length);
  const currPad = currStr.padStart(maxLen, " ");
  const prevPad = prevStr.padStart(maxLen, " ");

  return (
    <div className="jackpot-bar">
      <style>{`
        @keyframes digitDown {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
      <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:11, color:GOLD.g5, letterSpacing:3 }}>✦ PROGRESSIVE JACKPOT</span>
      <div style={{
        fontFamily:"'Rajdhani',sans-serif",
        fontVariantNumeric:"tabular-nums",
        fontWeight:700,
        fontSize:"clamp(20px,3vw,32px)",
        letterSpacing:1,
        lineHeight:"1em",
        display:"inline-flex",
        alignItems:"center",
        gap:0,
        color:GOLD.g2,
      }}>
        <span style={{marginRight:6,color:GOLD.g2}}>$</span>
        {currPad.split("").map((ch, i) => {
          const prevCh = prevPad[i] || ch;
          if (/\d/.test(ch)) {
            return <DigitRoller key={i} digit={ch} prevDigit={prevCh}/>;
          }
          return (
            <span key={i} style={{ display:"inline-block", verticalAlign:"middle", color:GOLD.g2 }}>{ch}</span>
          );
        })}
      </div>
      <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:11, color:GOLD.g5, letterSpacing:3 }}>✦</span>
    </div>
  );
}

// ─── WINNERS TABLE ────────────────────────────────────────────────────────────
function WinnersTable() {
  const [tab, setTab] = useState("Recent");
  const rows = [
    { name:"FortuneKing88", tier:"LEGEND", lv:99, bet:"0.50", payout:"150.00", mult:"×300.00", game:"Sweet Bonanza",    avatar:null },
    { name:"LuckyQueen777", tier:"VIP",    lv:88, bet:"0.30", payout:"90.00",  mult:"×300.00", game:"Lightning Roulette", avatar:null },
    { name:"BigWinHunter",  tier:"PRO",    lv:77, bet:"0.20", payout:"60.00",  mult:"×300.00", game:"Crash Rocket",    avatar:null },
    { name:"JackpotMaster", tier:"ELITE",  lv:66, bet:"0.10", payout:"30.00",  mult:"×300.00", game:"Classic Sic Bo",  avatar:null },
    { name:"GoldenPlayer99",tier:"VIP",    lv:55, bet:"0.50", payout:"150.00", mult:"×300.00", game:"Texas Hold'em",   avatar:null },
  ];
  const tierColor = { LEGEND:"#FF6030", VIP:GOLD.g3, PRO:"#30AAFF", ELITE:"#FF80C0" };

  return (
    <div style={{ padding:"14px 0 24px" }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
        {Icons.trophy}
        <span style={{ fontFamily:"'Raleway',sans-serif", fontWeight:600, fontSize:13, color:GOLD.g4, letterSpacing:3 }}>WINNERS TODAY</span>
      </div>
      <div style={{ background:GOLD.bgCard, borderRadius:14, border:`1px solid rgba(245,197,24,.1)`, overflow:"hidden" }}>
        {/* Tabs */}
        <div style={{ display:"flex", borderBottom:`1px solid rgba(245,197,24,.08)`, padding:"0 16px" }}>
          {["Recent","Lucky Wins","High Rollers"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              background:"none", border:"none", cursor:"pointer",
              padding:"12px 16px",
              fontFamily:"'Inter',sans-serif", fontWeight:600, fontSize:13,
              color: tab===t ? GOLD.g3 : "rgba(255,255,255,.35)",
              borderBottom: tab===t ? `2px solid ${GOLD.g4}` : "2px solid transparent",
              transition:"all .2s", marginBottom:-1, letterSpacing:.5,
            }}>{t}</button>
          ))}
        </div>
        {/* Header */}
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1.5fr", padding:"8px 16px", borderBottom:`1px solid rgba(255,255,255,.04)` }}>
          {["Player","Bet","Payout","Multiplier","Game"].map(h => (
            <div key={h} style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,.25)", letterSpacing:.5 }}>{h}</div>
          ))}
        </div>
        {/* Rows */}
        {rows.map((r, i) => (
          <div key={r.name} className="t-row" style={{
            display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 1.5fr",
            padding:"10px 16px",
            borderBottom: i < rows.length-1 ? `1px solid rgba(255,255,255,.03)` : "none",
            alignItems:"center",
            animation:`fadeInUp .4s ${i*.07}s ease both`,
          }}>
            {/* Player */}
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{
                width:34, height:34, borderRadius:"50%",
                background:`rgba(245,197,24,.06)`,
                border:`1px solid ${tierColor[r.tier]||GOLD.g5}55`,
                display:"flex", alignItems:"center", justifyContent:"center",
                flexShrink:0, overflow:"hidden",
              }}>
                {r.avatar
                  ? <img src={r.avatar} alt={r.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  : Icons.user
                }
              </div>
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontWeight:700, fontSize:13, color:"#fff" }}>{r.name}</div>
                <div style={{ fontFamily:"'Inter',sans-serif", fontSize:10, color:tierColor[r.tier]||GOLD.g4 }}>{r.tier} • LV.{r.lv}</div>
              </div>
            </div>
            {/* Bet */}
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontVariantNumeric:"tabular-nums", color:GOLD.green, fontSize:13, fontWeight:700 }}>
              ${r.bet}
            </div>
            {/* Payout */}
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontVariantNumeric:"tabular-nums", color:GOLD.green, fontSize:13, fontWeight:700 }}>
              ${r.payout}
            </div>
            {/* Multiplier */}
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontVariantNumeric:"tabular-nums", fontWeight:700, fontSize:14,
              background:`linear-gradient(135deg,${GOLD.g1},${GOLD.g2},${GOLD.g3},${GOLD.g5})`,
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>{r.mult}</div>
            {/* Game Name */}
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:"rgba(255,255,255,.5)", letterSpacing:.3 }}>{r.game}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── BOTTOM PROMOS ────────────────────────────────────────────────────────────
function BottomPromos({ setPage, onAuthTrigger }) {
  const [cd, setCd] = useState({ d:2, h:10, m:21, s:7 });
  useEffect(() => {
    const t = setInterval(() => setCd(c => {
      let {d,h,m,s} = c; s--;
      if(s<0){s=59;m--} if(m<0){m=59;h--} if(h<0){h=23;d--} if(d<0){d=h=m=s=0}
      return {d,h,m,s};
    }), 1000);
    return () => clearInterval(t);
  }, []);
  const fmt = n => String(n).padStart(2,"0");

  const events = [
    {
      tag: "✦ DAILY BONUS",
      tagColor: GOLD.g4,
      title: "FREE COINS",
      highlight: "EVERY 24 HOURS!",
      bg: "linear-gradient(135deg, rgba(6,5,4,1) 0%, rgba(20,14,0,.95) 100%)",
      char: "🎁",
      showCountdown: true,
      action: () => setPage("bonus"),
      actionLabel: "Claim Now",
    },
    {
      tag: "👑 VIP CLUB",
      tagColor: "#b060e0",
      title: "EXCLUSIVE",
      highlight: "REWARDS",
      sub: "Join 50,000+ elite members",
      bg: "linear-gradient(135deg, #110828 0%, #1d1040 100%)",
      char: "💎",
      action: () => setPage("vip"),
      actionLabel: "Join VIP",
    },
    {
      tag: "🎉 WELCOME BONUS",
      tagColor: GOLD.g3,
      title: "FIRST DEPOSIT",
      highlight: "$5,000 + 100 FS",
      sub: "100% match on your first deposit",
      bg: "linear-gradient(135deg, #110800 0%, #201400 100%)",
      char: "🏆",
      action: () => onAuthTrigger("signup"),
      actionLabel: "Claim Bonus",
    },
  ];

  return (
    <div style={{ padding:"8px 0 28px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
        {events.map((ev, i) => (
          <div key={i} className="card-gold" style={{ borderRadius:16, cursor:"pointer" }} onClick={ev.action}>
            <div className="card-gold-inner" style={{ padding:26, position:"relative", minHeight:200, borderRadius:16 }}>
              <div style={{ position:"absolute", inset:0, borderRadius:16, background:ev.bg }} />
              {/* Char placeholder */}
              <div style={{ position:"absolute", right:12, bottom:0, fontSize:52, opacity:.18, pointerEvents:"none",
                filter:`drop-shadow(0 0 16px ${ev.tagColor})` }}>{ev.char}</div>
              <div style={{ position:"relative", zIndex:1 }}>
                <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:11, color:ev.tagColor, letterSpacing:3, marginBottom:8 }}>
                  {ev.tag}
                </div>
                <div style={{ fontFamily:"'Cinzel Decorative', cursive", fontWeight:700,
                  fontSize:"clamp(12px,1.4vw,16px)", color:"#fff", lineHeight:1.5, marginBottom:4 }}>
                  {ev.title}
                </div>
                <div className="gold-text-static" style={{ fontFamily:"'Cinzel Decorative', cursive", fontWeight:900,
                  fontSize:"clamp(14px,1.6vw,20px)", lineHeight:1.3, marginBottom:8 }}>
                  {ev.highlight}
                </div>
                {ev.sub && <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,.35)", marginBottom:14 }}>{ev.sub}</div>}
                {ev.showCountdown && (
                  <div style={{ display:"flex", gap:6, marginBottom:16, flexWrap:"wrap" }}>
                    {[["d","DAYS"],["h","HRS"],["m","MIN"],["s","SEC"]].map(([k,l]) => (
                      <div key={l} className="cd-box">
                        <div className="cd-inner">
                          <div className="cd-num" style={{ fontSize:20 }}>{fmt(cd[k])}</div>
                          <div className="cd-lbl">{l}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <button className="btn-primary" onClick={e=>{e.stopPropagation();ev.action();}} style={{ padding:"8px 22px", fontSize:12 }}>
                  {ev.actionLabel}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  const cols = {
    RESOURCES: ["Bonuses","Promotions","VIP Club","Support","Payment Methods","Fair Play"],
    COMPANY:   ["About Us","Careers","Affiliates","Terms & Conditions","Privacy Policy"],
  };
  const socials = [
    { icon:Icons.facebook, label:"Facebook" },
    { icon:Icons.twitter,  label:"Twitter"  },
    { icon:Icons.instagram,label:"Instagram"},
    { icon:Icons.youtube,  label:"YouTube"  },
  ];
  return (
    <footer style={{ background:GOLD.bgCard, borderTop:`1px solid rgba(245,197,24,.1)`, padding:"44px 0 24px" }}>
      <div style={{ maxWidth:1440, margin:"0 auto", padding:"0 80px" }}>
        <div className="footer-cols" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 2fr", gap:44, marginBottom:36 }}>
          <div>
            <img src={LOGO.vertical} alt="SPINWIN" style={{ height:60, width:"auto", objectFit:"contain", marginBottom:14 }} />
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:13, color:"rgba(255,255,255,.3)", lineHeight:1.8 }}>
              Premium gaming entertainment<br />
              platform for the discerning player.<br />
              18+ | Play Responsibly
            </div>
          </div>
          {Object.entries(cols).map(([col, items]) => (
            <div key={col}>
              <div style={{ fontFamily:"'Raleway',sans-serif", fontWeight:400, fontSize:12,
                color:GOLD.g4, letterSpacing:3, marginBottom:16 }}>{col}</div>
              {items.map(l => (
                <div key={l} style={{ fontFamily:"'Inter',sans-serif", fontSize:13,
                  color:"rgba(255,255,255,.3)", marginBottom:8, cursor:"pointer", transition:"color .2s" }}
                  onMouseEnter={e=>e.target.style.color=GOLD.g3}
                  onMouseLeave={e=>e.target.style.color="rgba(255,255,255,.3)"}>{l}</div>
              ))}
            </div>
          ))}
          <div>
            <div style={{ fontFamily:"'Raleway',sans-serif", fontWeight:400, fontSize:12,
              color:GOLD.g4, letterSpacing:3, marginBottom:16 }}>FOLLOW US</div>
            <div style={{ display:"flex", gap:10, marginBottom:20 }}>
              {socials.map(({ icon, label }) => (
                <div key={label} className="sb-icon" style={{ borderRadius:10 }} title={label}>{icon}</div>
              ))}
            </div>
            <div style={{ display:"flex", gap:8, marginBottom:10 }}>
              <div style={{ flex:1 }}>
                <input placeholder="Enter Email Address" style={{
                  width:"100%", background:GOLD.bgSurf,
                  border:`1px solid rgba(245,197,24,.18)`, borderRadius:8,
                  padding:"10px 14px", color:"#fff",
                  fontFamily:"'Inter',sans-serif", fontSize:13, outline:"none",
                }} />
              </div>
              <button className="btn-primary" style={{ padding:"9px 18px", whiteSpace:"nowrap" }}>Subscribe</button>
            </div>
            <label style={{ display:"flex", alignItems:"flex-start", gap:8, cursor:"pointer" }}>
              <input type="checkbox" style={{ accentColor:GOLD.g3, marginTop:3 }} />
              <span style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:"rgba(255,255,255,.3)", lineHeight:1.6 }}>
                Get exclusive offers and big win alerts
              </span>
            </label>
          </div>
        </div>
        <div style={{ borderTop:`1px solid rgba(255,255,255,.06)`, paddingTop:20,
          display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:"rgba(255,255,255,.2)" }}>
            © 2025 PINWIN. All rights reserved. Licensed & Regulated.
          </div>
          <div style={{ display:"flex", gap:24 }}>
            {["🔒 SSL Secured","18+ Only","Fast Payouts"].map(t => (
              <span key={t} style={{ fontFamily:"'Inter',sans-serif", fontSize:12, color:"rgba(255,255,255,.2)" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage, triggerWin, onAuthTrigger }) {
  return (
    <div className="page-in main-pad" style={{ paddingLeft:200 }}>
      <JackpotBar />
      <div style={{ maxWidth:1440, margin:"0 auto", padding:"0 24px" }}>
        <HeroSection onAuthTrigger={onAuthTrigger} />
        <GameSection onAuthTrigger={onAuthTrigger} />
        <WinnersTable />
        <BottomPromos setPage={setPage} onAuthTrigger={onAuthTrigger} />
      </div>
      <Footer />
    </div>
  );
}

// ─── SLOTS PAGE ───────────────────────────────────────────────────────────────
function SlotsPage({ triggerWin, padLeft=200 }) {
  const symbols = ["♠","♥","♦","♣","★","7","A","K"];
  const symColors = ["#fff","#e55","#e55","#fff",GOLD.g2,GOLD.g1,"#fff","#fff"];
  const [reels, setReels] = useState([[0,1,2],[3,4,5],[6,7,0]]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [bet, setBet] = useState(1.0);
  const [balance, setBalance] = useState(1000.0);

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true); setResult(null);
    setBalance(b => b - bet);
    let frame = 0;
    const dur = 2000 + Math.random()*1000;
    const iv = setInterval(() => {
      setReels([
        [Math.floor(Math.random()*8),Math.floor(Math.random()*8),Math.floor(Math.random()*8)],
        [Math.floor(Math.random()*8),Math.floor(Math.random()*8),Math.floor(Math.random()*8)],
        [Math.floor(Math.random()*8),Math.floor(Math.random()*8),Math.floor(Math.random()*8)],
      ]);
      frame += 60;
      if (frame > dur) {
        clearInterval(iv);
        const fr = [
          [Math.floor(Math.random()*8),Math.floor(Math.random()*8),Math.floor(Math.random()*8)],
          [Math.floor(Math.random()*8),Math.floor(Math.random()*8),Math.floor(Math.random()*8)],
          [Math.floor(Math.random()*8),Math.floor(Math.random()*8),Math.floor(Math.random()*8)],
        ];
        if (Math.random() < .30) { const s=Math.floor(Math.random()*8); fr[0][1]=fr[1][1]=fr[2][1]=s; }
        setReels(fr);
        setSpinning(false);
        const mid=[fr[0][1],fr[1][1],fr[2][1]];
        if(mid[0]===mid[1]&&mid[1]===mid[2]){
          const prize=bet*[5,10,50,15,20,100,8,25][mid[0]];
          setResult({win:true,prize}); setBalance(b=>b+prize); triggerWin(prize);
        } else { setResult({win:false}); }
      }
    }, 60);
  }, [spinning,bet,triggerWin]);

  return (
    <div className="page-in main-pad" style={{ paddingLeft:padLeft||200 }}>
      <div style={{ maxWidth:660, margin:"0 auto", padding:"32px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div className="gold-text" style={{ fontFamily:"'Cinzel Decorative', cursive", fontWeight:900, fontSize:26, letterSpacing:4 }}>
            ✦ GOLDEN REELS
          </div>
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:14, color:"rgba(255,255,255,.4)", marginTop:6 }}>
            Spin to Win — Up to 100× Multiplier
          </div>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:18,
          background:GOLD.bgSurf, borderRadius:10, padding:"12px 20px",
          border:`1px solid rgba(245,197,24,.12)` }}>
          <div><div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,.3)" }}>BALANCE</div>
            <div className="tabnum" style={{ fontSize:20, color:GOLD.green, fontWeight:700 }}>${balance.toFixed(2)}</div></div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,.3)" }}>BET</div>
            <div className="tabnum gold-text-static" style={{ fontSize:20, fontWeight:700 }}>${bet.toFixed(2)}</div></div>
        </div>

        <div style={{ background:"linear-gradient(180deg,#140e00,#080600)",
          border:`2px solid ${GOLD.g5}`, borderRadius:20, padding:24,
          boxShadow:`0 0 40px rgba(245,197,24,.15), inset 0 0 40px rgba(0,0,0,.5)`,
          animation: result?.win ? "winFlash .5s ease 3" : "none" }}>
          <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:18 }}>
            {reels.map((reel, ri) => (
              <div key={ri} style={{ flex:1, background:"#020100", borderRadius:12,
                border:`1px solid rgba(245,197,24,.2)`, overflow:"hidden", height:180, position:"relative" }}>
                <div style={{ position:"absolute", top:"33%", left:0, right:0, height:"34%",
                  background: result?.win ? "rgba(245,197,24,.08)" : "transparent",
                  border: result?.win ? `1px solid rgba(245,197,24,.4)` : "none",
                  zIndex:2, transition:"all .3s" }} />
                <div style={{ display:"flex", flexDirection:"column", height:"300%" }}>
                  {reel.map((s,si) => (
                    <div key={si} style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center",
                      fontFamily:"'Playfair Display',serif", fontSize:44, fontWeight:900,
                      color: spinning ? "rgba(255,255,255,.3)" : symColors[s],
                      filter: spinning ? "blur(3px)" : `drop-shadow(0 0 8px ${symColors[s]})`,
                      transition:"filter .1s" }}>{symbols[s]}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8, justifyContent:"center", marginBottom:14 }}>
            <div style={{ height:1, flex:1, background:"rgba(245,197,24,.2)" }} />
            <span style={{ fontFamily:"'Raleway',sans-serif", fontSize:11, color:GOLD.g5, letterSpacing:3 }}>WIN LINE</span>
            <div style={{ height:1, flex:1, background:"rgba(245,197,24,.2)" }} />
          </div>
          {result && (
            <div style={{ textAlign:"center", padding:10, borderRadius:8, marginBottom:10,
              background: result.win ? "rgba(0,230,118,.08)" : "rgba(255,61,61,.08)",
              border:`1px solid ${result.win ? GOLD.green : GOLD.red}`,
              animation:"scaleIn .3s ease" }}>
              {result.win
                ? <span className="tabnum" style={{ color:GOLD.green, fontSize:15, fontWeight:700 }}>✦ WIN! +${result.prize.toFixed(2)}</span>
                : <span style={{ fontFamily:"'Inter',sans-serif", color:GOLD.red, fontSize:13 }}>Try again — fortune favours the bold!</span>}
            </div>
          )}
        </div>

        <div style={{ display:"flex", gap:8, marginTop:16, marginBottom:14 }}>
          {[0.10,0.50,1.0,5.0,10.0].map(v => (
            <button key={v} className="btn-ghost" onClick={() => setBet(v)} style={{
              flex:1, padding:"7px 0", fontSize:12,
              background: bet===v ? "rgba(245,197,24,.1)" : "transparent",
            }}>${v}</button>
          ))}
        </div>
        <button className="btn-primary" onClick={spin} disabled={spinning} style={{
          width:"100%", padding:"17px", fontSize:16, letterSpacing:3, borderRadius:12,
          justifyContent:"center", opacity: spinning ? .7 : 1,
          animation: spinning ? "wiggle .3s ease infinite" : "pulseGold 2s ease-in-out infinite",
        }}>
          {spinning ? "⟳  SPINNING..." : "SPIN"}
        </button>
      </div>
    </div>
  );
}

// ─── ROULETTE ─────────────────────────────────────────────────────────────────
function RoulettePage({ triggerWin, padLeft=200 }) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [betType, setBetType] = useState("red");
  const [amount, setAmount] = useState(10);
  const [balance, setBalance] = useState(1000);
  const wheelRef = useRef(null);
  const redNums = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);

  const doSpin = () => {
    if (spinning) return;
    setSpinning(true); setResult(null);
    setBalance(b => b - amount);
    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 4s cubic-bezier(.2,.8,.4,1)";
      wheelRef.current.style.transform = `rotate(${1800+Math.random()*360}deg)`;
    }
    setTimeout(() => {
      const num = Math.floor(Math.random()*37);
      const isRed = redNums.has(num);
      const won = (betType==="red"&&isRed)||(betType==="black"&&num>0&&!isRed)||(betType==="green"&&num===0);
      const prize = won ? amount*(betType==="green"?35:2) : 0;
      setResult({ num, isRed, won, prize });
      setSpinning(false);
      if(won){setBalance(b=>b+prize);triggerWin(prize);}
    }, 4100);
  };

  const numBg = n => n===0?"#006633":redNums.has(n)?"#991100":"#111";

  return (
    <div className="page-in main-pad" style={{ paddingLeft:padLeft||200 }}>
      <div style={{ maxWidth:700, margin:"0 auto", padding:"32px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:22 }}>
          <div className="gold-text" style={{ fontFamily:"'Cinzel Decorative', cursive", fontWeight:900, fontSize:26, letterSpacing:4 }}>✦ LIVE ROULETTE</div>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:18,
          background:GOLD.bgSurf, borderRadius:10, padding:"12px 20px", border:`1px solid rgba(245,197,24,.12)` }}>
          <div><div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,.3)" }}>BALANCE</div>
            <div className="tabnum" style={{ fontSize:20, color:GOLD.green, fontWeight:700 }}>${balance.toFixed(2)}</div></div>
          {result && <div style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,.3)" }}>RESULT</div>
            <div style={{ width:44, height:44, borderRadius:"50%", background:numBg(result.num),
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:"'Rajdhani',sans-serif", fontWeight:900, fontSize:16, color:"#fff",
              border:`2px solid ${GOLD.g4}`, margin:"0 auto" }}>{result.num}</div>
          </div>}
        </div>
        <div style={{ display:"flex", justifyContent:"center", marginBottom:22 }}>
          <div style={{ width:260, height:260, position:"relative" }}>
            <div ref={wheelRef} style={{ width:"100%", height:"100%", borderRadius:"50%",
              background:"conic-gradient(from 0deg,#005522 0deg 9.7deg,#111 9.7deg 19.4deg,#991100 19.4deg 29.2deg,#111 29.2deg 38.9deg,#991100 38.9deg 48.6deg,#111 48.6deg 58.4deg,#991100 58.4deg 68.1deg,#111 68.1deg 77.8deg,#991100 77.8deg 87.5deg,#111 87.5deg 97.2deg,#991100 97.2deg 107deg,#111 107deg 116.7deg,#991100 116.7deg 126.4deg,#111 126.4deg 136.1deg,#991100 136.1deg 145.8deg,#111 145.8deg 155.6deg,#991100 155.6deg 165.3deg,#111 165.3deg 175deg,#991100 175deg 184.7deg,#111 184.7deg 360deg)",
              border:`4px solid ${GOLD.g4}`, boxShadow:`0 0 36px rgba(245,197,24,.25)` }}>
              <div style={{ position:"absolute", inset:"20%", borderRadius:"50%",
                background:"#060300", border:`3px solid ${GOLD.g5}`,
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div className="gold-text-static" style={{ fontFamily:"'Cinzel Decorative', cursive", fontSize:11, fontWeight:700, textAlign:"center", letterSpacing:2 }}>PIN<br/>WIN</div>
              </div>
            </div>
            <div style={{ position:"absolute", top:-8, left:"50%", transform:"translateX(-50%)",
              width:0, height:0, borderLeft:"8px solid transparent", borderRight:"8px solid transparent", borderTop:`24px solid ${GOLD.g3}` }} />
          </div>
        </div>
        <div style={{ display:"flex", gap:10, marginBottom:14, justifyContent:"center" }}>
          {[["red","RED",2,"#881100"],["black","BLACK",2,"#222"],["green","ZERO",35,"#005522"]].map(([v,l,m,bg]) => (
            <button key={v} onClick={() => setBetType(v)} style={{
              flex:1, padding:"12px", borderRadius:10, cursor:"pointer",
              fontFamily:"'Inter',sans-serif", fontWeight:700, fontSize:12, letterSpacing:.5,
              background: betType===v ? bg : "rgba(255,255,255,.04)",
              border:`2px solid ${betType===v ? GOLD.g4 : "rgba(255,255,255,.1)"}`,
              color:"#fff", transition:"all .2s",
            }}>{l}<br/><span style={{ fontSize:9, color:"rgba(255,255,255,.45)" }}>{m}× payout</span></button>
          ))}
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:14 }}>
          {[5,10,25,50,100].map(v => (
            <button key={v} className="btn-ghost" onClick={() => setAmount(v)} style={{
              flex:1, padding:"8px", fontSize:12,
              background: amount===v ? "rgba(245,197,24,.1)" : "transparent",
            }}>${v}</button>
          ))}
        </div>
        {result && (
          <div style={{ textAlign:"center", padding:12, borderRadius:10, marginBottom:14,
            background: result.won ? "rgba(0,230,118,.08)" : "rgba(255,61,61,.08)",
            border:`1px solid ${result.won?GOLD.green:GOLD.red}`, animation:"scaleIn .3s ease" }}>
            {result.won
              ? <span className="tabnum" style={{ color:GOLD.green, fontSize:15, fontWeight:700 }}>✦ WIN! +${result.prize.toFixed(2)}</span>
              : <span style={{ fontFamily:"'Inter',sans-serif", color:GOLD.red, fontSize:13 }}>Better luck next time!</span>}
          </div>
        )}
        <button className="btn-primary" onClick={doSpin} disabled={spinning} style={{
          width:"100%", padding:"15px", fontSize:15, letterSpacing:2, borderRadius:12,
          justifyContent:"center", opacity:spinning?.7:1,
        }}>{spinning?"⟳  SPINNING...":"SPIN THE WHEEL"}</button>
      </div>
    </div>
  );
}

// ─── CRASH ────────────────────────────────────────────────────────────────────
function CrashPage({ triggerWin, padLeft=200 }) {
  const [mult, setMult] = useState(1.00);
  const [state, setState] = useState("idle");
  const [cashedOut, setCashedOut] = useState(null);
  const [bet, setBet] = useState(10);
  const [balance, setBalance] = useState(1000);
  const crashAt = useRef(1);
  const iv = useRef(null);

  const start = () => {
    if (state==="running") return;
    setState("running"); setMult(1.00); setCashedOut(null);
    crashAt.current = 1.3 + Math.random()*18;
    setBalance(b => b-bet);
    let m = 1.00;
    iv.current = setInterval(() => {
      m += .01+m*.003; setMult(parseFloat(m.toFixed(2)));
      if(m>=crashAt.current){clearInterval(iv.current);setState("crashed");setMult(parseFloat(crashAt.current.toFixed(2)));}
    },80);
  };
  const cashOut = () => {
    if(state!=="running"||cashedOut) return;
    clearInterval(iv.current);
    const prize=bet*mult; setCashedOut(mult); setState("cashout");
    setBalance(b=>b+prize); triggerWin(prize);
  };
  useEffect(()=>()=>clearInterval(iv.current),[]);
  const mc = m => m<2?"#fff":m<5?GOLD.g2:m<10?"#FF9800":GOLD.red;

  return (
    <div className="page-in main-pad" style={{ paddingLeft:padLeft||200 }}>
      <div style={{ maxWidth:660, margin:"0 auto", padding:"32px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:20 }}>
          <div className="gold-text" style={{ fontFamily:"'Cinzel Decorative', cursive", fontWeight:900, fontSize:26, letterSpacing:4 }}>✦ CRASH</div>
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:14, color:"rgba(255,255,255,.4)", marginTop:6 }}>Cash out before the rocket crashes!</div>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:18,
          background:GOLD.bgSurf, borderRadius:10, padding:"12px 20px", border:`1px solid rgba(245,197,24,.12)` }}>
          <div><div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,.3)" }}>BALANCE</div>
            <div className="tabnum" style={{ fontSize:20, color:GOLD.green, fontWeight:700 }}>${balance.toFixed(2)}</div></div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,.3)" }}>BET</div>
            <div className="tabnum gold-text-static" style={{ fontSize:20, fontWeight:700 }}>${bet.toFixed(2)}</div></div>
        </div>
        <div style={{ height:270, borderRadius:16, position:"relative", overflow:"hidden",
          background:"linear-gradient(135deg,#040010,#09041a)",
          border:`2px solid ${state==="crashed"?GOLD.red:state==="cashout"?GOLD.green:"rgba(245,197,24,.25)"}`,
          display:"flex", alignItems:"center", justifyContent:"center", marginBottom:18,
          boxShadow:`0 0 30px ${state==="crashed"?"rgba(255,61,61,.2)":"rgba(245,197,24,.08)"}` }}>
          {Array.from({length:25}).map((_,i)=>(
            <div key={i} style={{ position:"absolute", left:`${(i*4.2)%100}%`, top:`${(i*7.3)%100}%`,
              width:2, height:2, borderRadius:"50%", background:"#fff", opacity:Math.random()*.5 }} />
          ))}
          <div style={{ position:"absolute",
            bottom:`${state==="running"?Math.min((mult-1)*8,60):20}%`,
            left:`${state==="running"?Math.min((mult-1)*5,60):20}%`,
            fontSize:44, transition:"bottom .08s linear,left .08s linear",
            transform:state==="crashed"?"rotate(90deg)":"rotate(-45deg)",
            filter:state==="running"&&mult>5?`drop-shadow(0 0 12px orange)`:"none" }}>🚀</div>
          <div style={{ textAlign:"center", zIndex:1 }}>
            <div className="tabnum" style={{ fontSize:"clamp(56px,11vw,96px)", fontWeight:900,
              color:state==="crashed"?GOLD.red:state==="cashout"?GOLD.green:mc(mult),
              textShadow:`0 0 28px currentColor`, lineHeight:1, transition:"color .2s" }}>
              {mult.toFixed(2)}×
            </div>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:12, letterSpacing:1, marginTop:8,
              color:state==="crashed"?GOLD.red:state==="cashout"?GOLD.green:"rgba(255,255,255,.35)" }}>
              {state==="crashed"?"✦ CRASHED":state==="cashout"?"✦ CASHED OUT":state==="idle"?"PLACE YOUR BET":"FLYING..."}
            </div>
          </div>
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:12 }}>
          {[5,10,25,50,100].map(v=>(
            <button key={v} className="btn-ghost" onClick={()=>state!=="running"&&setBet(v)} style={{
              flex:1, padding:"8px", fontSize:12, background:bet===v?"rgba(245,197,24,.1)":"transparent",
              opacity:state==="running"?.5:1 }}>${v}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <button className="btn-primary" onClick={start} disabled={state==="running"} style={{
            flex:1, padding:"15px", fontSize:14, letterSpacing:1, borderRadius:12, justifyContent:"center",
            opacity:state==="running"?.4:1 }}>
            {state==="crashed"||state==="cashout"?"NEW ROUND":"START"}
          </button>
          <button onClick={cashOut} disabled={state!=="running"||!!cashedOut} style={{
            flex:1, padding:"15px", borderRadius:12, fontSize:13, cursor:state==="running"&&!cashedOut?"pointer":"not-allowed",
            background:state==="running"&&!cashedOut?`linear-gradient(135deg,#004422,${GOLD.green})`:"rgba(255,255,255,.04)",
            border:`2px solid ${GOLD.green}`, color:state==="running"&&!cashedOut?"#000":GOLD.green,
            fontFamily:"'Inter',sans-serif", fontWeight:700, letterSpacing:.5, transition:"all .2s",
            animation:state==="running"&&!cashedOut?"pulseGold .8s ease infinite":"none" }}>
            CASH OUT<br/><span className="tabnum" style={{ fontSize:11 }}>${(bet*mult).toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MINES ────────────────────────────────────────────────────────────────────
function MinesPage({ triggerWin, padLeft=200 }) {
  const [mines, setMines] = useState(new Set());
  const [revealed, setRevealed] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [mult, setMult] = useState(1.0);
  const [bet, setBet] = useState(10);
  const [balance, setBalance] = useState(1000);
  const [started, setStarted] = useState(false);
  const [mCount, setMCount] = useState(5);

  const newGame = () => {
    const m = new Set();
    while(m.size<mCount) m.add(Math.floor(Math.random()*25));
    setMines(m); setRevealed(new Set()); setGameOver(false); setGameWon(false);
    setMult(1.0); setStarted(true); setBalance(b=>b-bet);
  };
  const reveal = i => {
    if(!started||gameOver||gameWon||revealed.has(i)) return;
    if(mines.has(i)){setRevealed(new Set([...revealed,i]));setGameOver(true);}
    else { const nr=new Set([...revealed,i]); setRevealed(nr); setMult(parseFloat((1+nr.size*(mCount*.3)).toFixed(2))); }
  };
  const cashOut = () => {
    if(!started||gameOver||gameWon||revealed.size===0) return;
    const prize=bet*mult; setBalance(b=>b+prize); setGameWon(true); triggerWin(prize);
  };

  return (
    <div className="page-in main-pad" style={{ paddingLeft:padLeft||200 }}>
      <div style={{ maxWidth:580, margin:"0 auto", padding:"32px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:20 }}>
          <div className="gold-text" style={{ fontFamily:"'Cinzel Decorative', cursive", fontWeight:900, fontSize:26, letterSpacing:4 }}>✦ MINES</div>
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:14, color:"rgba(255,255,255,.4)", marginTop:6 }}>Avoid mines — collect gems!</div>
        </div>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16,
          background:GOLD.bgSurf, borderRadius:10, padding:"12px 20px", border:`1px solid rgba(245,197,24,.12)` }}>
          <div><div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,.3)" }}>BALANCE</div>
            <div className="tabnum" style={{ fontSize:20, color:GOLD.green, fontWeight:700 }}>${balance.toFixed(2)}</div></div>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,.3)" }}>MULTIPLIER</div>
            <div className="tabnum gold-text-static" style={{ fontSize:20, fontWeight:700 }}>{mult.toFixed(2)}×</div></div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:"'Inter',sans-serif", fontSize:11, color:"rgba(255,255,255,.3)" }}>MINES</div>
            <div className="tabnum" style={{ fontSize:20, color:GOLD.red, fontWeight:700 }}>{mCount}</div></div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8, marginBottom:14 }}>
          {Array.from({length:25},(_,i)=>{
            const isRev=revealed.has(i), isMine=mines.has(i)&&(gameOver||gameWon), isHit=mines.has(i)&&gameOver&&revealed.has(i);
            return (
              <div key={i} onClick={()=>reveal(i)} style={{
                height:78, borderRadius:10, cursor:started&&!gameOver&&!gameWon&&!isRev?"pointer":"default",
                background:isHit?"rgba(255,61,61,.2)":isMine?"rgba(255,61,61,.07)":isRev?"rgba(0,230,118,.08)":GOLD.bgSurf,
                border:`1px solid ${isHit?GOLD.red:isMine?"rgba(255,61,61,.25)":isRev?GOLD.green:"rgba(245,197,24,.12)"}`,
                display:"flex", alignItems:"center", justifyContent:"center",
                transition:"all .2s", transform:isRev?"scale(1)":"scale(.97)",
                animation:isRev&&!isMine?"scaleIn .2s ease":"none",
              }}>
                {isMine
                  ? <svg width={28} height={28} viewBox="0 0 24 24" fill="none"><path d="M17.73 4.27a4 4 0 00-5.46 0L4 12.54a4 4 0 000 5.65 4 4 0 005.65 0l8.27-8.27a4 4 0 00-.19-5.65zM20 7l-2-2" stroke={GOLD.red} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : isRev
                    ? <svg width={26} height={26} viewBox="0 0 24 24" fill="url(#iconGold)"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                    : started&&!gameOver&&!gameWon
                      ? <div style={{ width:10, height:10, borderRadius:"50%", background:"rgba(245,197,24,.2)", border:`1px solid rgba(245,197,24,.3)` }} />
                      : null}
              </div>
            );
          })}
        </div>
        {(gameOver||gameWon)&&(
          <div style={{ textAlign:"center", padding:12, borderRadius:10, marginBottom:12,
            background:gameWon?"rgba(0,230,118,.08)":"rgba(255,61,61,.08)",
            border:`1px solid ${gameWon?GOLD.green:GOLD.red}`, animation:"scaleIn .3s ease" }}>
            {gameWon
              ? <span className="tabnum" style={{ color:GOLD.green, fontSize:15, fontWeight:700 }}>✦ CASHED OUT! +${(bet*mult).toFixed(2)}</span>
              : <span style={{ fontFamily:"'Inter',sans-serif", color:GOLD.red, fontSize:13 }}>You struck a mine!</span>}
          </div>
        )}
        <div style={{ display:"flex", gap:8, marginBottom:12 }}>
          {[5,10,25,50,100].map(v=>(
            <button key={v} className="btn-ghost" onClick={()=>!started&&setBet(v)} style={{
              flex:1, padding:"7px", fontSize:11, background:bet===v?"rgba(245,197,24,.1)":"transparent" }}>${v}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button className="btn-primary" onClick={newGame} style={{ flex:1, padding:"14px", fontSize:13, borderRadius:10, justifyContent:"center" }}>
            {started&&!gameOver&&!gameWon?"RESTART":"NEW GAME"}
          </button>
          {started&&!gameOver&&!gameWon&&revealed.size>0&&(
            <button onClick={cashOut} style={{
              flex:1, padding:"14px", borderRadius:10, fontSize:13, cursor:"pointer",
              background:`linear-gradient(135deg,#004422,${GOLD.green})`,
              border:"none", color:"#000", fontFamily:"'Inter',sans-serif", fontWeight:700 }}>
              CASH OUT ${(bet*mult).toFixed(2)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PLACEHOLDER ─────────────────────────────────────────────────────────────
function PlaceholderPage({ title, icon, desc, setPage, padLeft=200 }) {
  return (
    <div className="page-in main-pad" style={{ paddingLeft:padLeft||200 }}>
      <div style={{ maxWidth:660, margin:"80px auto", padding:"0 24px", textAlign:"center" }}>
        <div style={{ marginBottom:20, filter:`drop-shadow(0 0 20px ${GOLD.glow})`, animation:"float 3s ease-in-out infinite" }}>
          <svg width={80} height={80} viewBox="0 0 24 24" fill="none">{icon?.props?.children}</svg>
        </div>
        <div className="gold-text" style={{ fontFamily:"'Cinzel Decorative', cursive", fontWeight:900, fontSize:28, letterSpacing:4, marginBottom:14 }}>{title}</div>
        <div style={{ fontFamily:"'Inter',sans-serif", fontSize:15, color:"rgba(255,255,255,.45)", lineHeight:1.8, marginBottom:32 }}>{desc}</div>
        <div style={{ display:"flex", gap:14, justifyContent:"center" }}>
          <button className="btn-primary" onClick={() => setPage("home")} style={{ padding:"12px 32px" }}>← Back to Lobby</button>
          <button className="btn-ghost" style={{ padding:"11px 28px" }}>Learn More</button>
        </div>
      </div>
    </div>
  );
}

// ─── AUTH PAGES ───────────────────────────────────────────────────────────────
function AuthPage({ mode, setPage, padLeft=200 }) {
  const isLogin = mode==="login";
  const fields = isLogin ? ["Email Address","Password"] : ["Username","Email Address","Password","Confirm Password"];
  return (
    <div className="page-in main-pad" style={{ paddingLeft:padLeft||200, display:"flex", alignItems:"center", minHeight:"80vh" }}>
      <div style={{ maxWidth:460, margin:"0 auto", width:"100%", padding:"0 24px" }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div className="gold-text" style={{ fontFamily:"'Cinzel Decorative', cursive", fontWeight:900, fontSize:26, letterSpacing:4, marginBottom:10 }}>✦ PINWIN</div>
          {!isLogin && <div className="jackpot-num" style={{ fontSize:28, marginBottom:8 }}>$5,000 + 100 Free Spins</div>}
          <div style={{ fontFamily:"'Inter',sans-serif", fontSize:14, color:"rgba(255,255,255,.4)" }}>
            {isLogin ? "Welcome back. Sign in to continue." : "Create your account to claim your bonus."}
          </div>
        </div>
        <div className="card-gold" style={{ borderRadius:18 }}>
          <div className="card-gold-inner" style={{ padding:32 }}>
            {fields.map(l => (
              <div key={l} style={{ marginBottom:16 }}>
                <div style={{ fontFamily:"'Raleway',sans-serif", fontSize:12, color:GOLD.g4, letterSpacing:2, marginBottom:6 }}>{l.toUpperCase()}</div>
                <input type={l.toLowerCase().includes("password")?"password":l.toLowerCase().includes("email")?"email":"text"}
                  placeholder={l} style={{
                    width:"100%", background:GOLD.bgSurf, border:`1px solid rgba(245,197,24,.18)`,
                    borderRadius:8, padding:"11px 14px", color:"#fff",
                    fontFamily:"'Inter',sans-serif", fontSize:14, outline:"none" }} />
              </div>
            ))}
            <button className="btn-primary" onClick={() => setPage("home")} style={{
              width:"100%", padding:"14px", fontSize:15, marginTop:8, borderRadius:10, justifyContent:"center" }}>
              {isLogin ? "Sign In" : "Create Account & Claim Bonus"}
            </button>
            <div style={{ textAlign:"center", marginTop:16, fontFamily:"'Inter',sans-serif", fontSize:14, color:"rgba(255,255,255,.3)" }}>
              {isLogin ? <>No account? <span style={{ color:GOLD.g3, cursor:"pointer" }} onClick={()=>setPage("signup")}>Sign Up</span></>
                       : <>Have an account? <span style={{ color:GOLD.g3, cursor:"pointer" }} onClick={()=>setPage("login")}>Login</span></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [win, setWin] = useState({ show:false, amount:0 });
  const [particles, setParticles] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authModal, setAuthModal] = useState(null); // "login" | "signup" | null

  const nav = useCallback(p => { setPage(p); window.scrollTo({top:0,behavior:"smooth"}); }, []);
  const triggerWin = useCallback(amt => { setWin({show:true,amount:amt}); setParticles(true); }, []);
  const closeWin = useCallback(() => setWin({show:false,amount:0}), []);

  const onAuthTrigger = useCallback((mode) => setAuthModal(mode), []);
  const onAuthSuccess = useCallback(() => {
    setIsLoggedIn(true);
    setAuthModal(null);
  }, []);

  // Pages that require auth — intercept navigation
  const navWithAuth = useCallback(p => {
    const gamePages = ["slots","roulette","crash","mines","cards","dice","poker","sicbo","live-casino","plinko"];
    if (!isLoggedIn && gamePages.includes(p)) {
      setAuthModal("login");
      return;
    }
    nav(p);
  }, [isLoggedIn, nav]);

  const render = () => {
    const padLeft = 200;
    switch(page){
      case "home":       return <HomePage     setPage={navWithAuth} triggerWin={triggerWin} onAuthTrigger={onAuthTrigger} />;
      case "slots":      return <SlotsPage    triggerWin={triggerWin} padLeft={padLeft} />;
      case "roulette":   return <RoulettePage triggerWin={triggerWin} padLeft={padLeft} />;
      case "crash":      return <CrashPage    triggerWin={triggerWin} padLeft={padLeft} />;
      case "mines":      return <MinesPage    triggerWin={triggerWin} padLeft={padLeft} />;
      case "vip":        return <PlaceholderPage title="VIP CLUB"    icon={Icons.crown}   desc="Exclusive rewards for our most loyal players. Earn points, climb tiers, and unlock premium benefits." setPage={nav} padLeft={padLeft}/>;
      case "bonus":      return <PlaceholderPage title="DAILY BONUS" icon={Icons.gift}    desc="Claim your free coins every 24 hours! The longer your streak, the bigger the reward." setPage={nav} padLeft={padLeft}/>;
      case "tournament": return <PlaceholderPage title="TOURNAMENTS" icon={Icons.trophy}  desc="Compete with thousands of players worldwide in live tournaments." setPage={nav} padLeft={padLeft}/>;
      case "cards":      return <PlaceholderPage title="CARD GAMES"  icon={Icons.card}    desc="Classic card games including Blackjack, Baccarat, and Poker." setPage={nav} padLeft={padLeft}/>;
      case "dice":       return <PlaceholderPage title="DICE"        icon={Icons.dice}    desc="Roll the dice and test your luck!" setPage={nav} padLeft={padLeft}/>;
      case "plinko":     return <PlaceholderPage title="PLINKO"      icon={Icons.dice}    desc="Drop the ball and watch it bounce for massive multipliers!" setPage={nav} padLeft={padLeft}/>;
      case "poker":      return <PlaceholderPage title="POKER"       icon={Icons.card}    desc="Texas Hold'em, Video Poker, and more." setPage={nav} padLeft={padLeft}/>;
      case "sicbo":      return <PlaceholderPage title="SIC BO"      icon={Icons.dice}    desc="Classic Sic Bo and Live Sic Bo tables." setPage={nav} padLeft={padLeft}/>;
      case "live-casino":return <PlaceholderPage title="LIVE CASINO" icon={Icons.crown}   desc="Live dealer tables available 24/7." setPage={nav} padLeft={padLeft}/>;
      case "favorites":  return <PlaceholderPage title="FAVOURITES"  icon={Icons.star}    desc="Your saved favourite games, all in one place." setPage={nav} padLeft={padLeft}/>;
      case "profile":    return <PlaceholderPage title="MY PROFILE"  icon={Icons.user}    desc="View your game history, manage deposits and withdrawals." setPage={nav} padLeft={padLeft}/>;
      case "settings":   return <PlaceholderPage title="SETTINGS"    icon={Icons.settings} desc="Manage account preferences and responsible gaming limits." setPage={nav} padLeft={padLeft}/>;
      case "sport":      return <PlaceholderPage title="SPORTS"      icon={Icons.trophy}  desc="Sports betting coming soon!" setPage={nav} padLeft={padLeft}/>;
      default:           return <HomePage setPage={navWithAuth} triggerWin={triggerWin} onAuthTrigger={onAuthTrigger} />;
    }
  };

  return (
    <div style={{ background:GOLD.bg, minHeight:"100vh", color:"#fff" }}>
      <style>{STYLES}</style>
      <SvgDefs />
      <Particles active={particles} onDone={()=>setParticles(false)} />
      <WinOverlay show={win.show} amount={win.amount} onClose={closeWin} />
      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSuccess={onAuthSuccess}
        />
      )}
      <Header isLoggedIn={isLoggedIn} onAuthTrigger={onAuthTrigger} />
      <Sidebar setPage={navWithAuth} activePage={page} onAuthTrigger={onAuthTrigger} />
      <main>{render()}</main>
    </div>
  );
}
