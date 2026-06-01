import { useState, useEffect, useRef, useCallback } from react;

 ╔═══════════════════════════════════════════════════════════════════════════╗
 ║  PINWIN — DESIGN SYSTEM v2.1                                            ║
 ║  Last updated 2025 (in-progress, not yet applied to UI)                ║
 ╠═══════════════════════════════════════════════════════════════════════════╣
 ║  TYPOGRAPHY — 5 fonts max                                               ║
 ║                                                                           ║
 ║  1. Cinzel Decorative w900                                               ║
 ║     → Logo, Win Overlay, Poster big titles, Game page big titles        ║
 ║       (SIGN UP AND RECEIVE, FREE COINS EVERY 24 HOURS, etc.)            ║
 ║                                                                           ║
 ║  2. Raleway w600                                                          ║
 ║     → Section headers (ALL GAMES, SLOT GAMES, WINNERS TODAY)            ║
 ║       Badge labels (✦ EXCLUSIVE, HOT, POPULAR)                          ║
 ║       Card sub-titles (VIP CLUB, WELCOME BONUS, DAILY BONUS)            ║
 ║       Form field labels, Footer column headers                           ║
 ║                                                                           ║
 ║  3. Inter w400–w700                                                       ║
 ║     → All UI body text category names, game card titles,               ║
 ║       table column headers, tier badges (LEGEND, VIP, PRO),             ║
 ║       game page subtitles, result messages, footer links & copy,        ║
 ║       auth forms, general player ID display (non-leaderboard)           ║
 ║       ◆ symbol in tables                                                 ║
 ║                                                                           ║
 ║  4. Playfair Display w700                                                 ║
 ║     → Play now button text only                                        ║
 ║     → Player names in leaderboard  winners tables ONLY                 ║
 ║       (all other player ID displays use Inter)                           ║
 ║                                                                           ║
 ║  5. Rajdhani w700 (font-variant-numeric tabular-nums)                   ║
 ║     → ALL numeric displays — no exceptions                             ║
 ║       Jackpot, countdown timer, balance, bet amount, payout,            ║
 ║       multiplier, crash multiplier, game results                        ║
 ║     → Bet  Payout  Multiplier fixed 2 decimal places (.toFixed(2))  ║
 ║     → font-weight may vary by context (w500 small, w700 large)         ║
 ║       but font-family MUST stay Rajdhani                                ║
 ║     → In mixed text+number strings (e.g. $300 AND 30 FS)            ║
 ║       numbers use Rajdhani, surrounding text follows its own rule       ║
 ║                                                                           ║
 ║  WEIGHT FLEXIBILITY RULE                                                 ║
 ║  All 5 fonts may adjust font-weight by context for readability.         ║
 ║  Font-family must NEVER change within its assigned role.                ║
 ╠═══════════════════════════════════════════════════════════════════════════╣
 ║  COLOUR RULES                                                            ║
 ║                                                                           ║
 ║  Gold gradient (buttons, borders, logo shimmer)                        ║
 ║    #FFF5C0 → #FFE066 → #F5C518 → #D4A017 → #B8860B →                  ║
 ║    #8B6508 → #5C4000 → #2A1A00  (8-stop, 135deg)                       ║
 ║                                                                           ║
 ║  Numeric display colour #FFE066 (flat, no gradient)                    ║
 ║    Reason gradient on small numbers is hard to read                    ║
 ║                                                                           ║
 ║  Border colour (cards, boxes, buttons) rgba(245,197,24,.5)             ║
 ║    → NO gradient on border unless it is a decorative card frame         ║
 ║                                                                           ║
 ╠═══════════════════════════════════════════════════════════════════════════╣
 ║  HEADER                                                                  ║
 ║                                                                           ║
 ║  Logged OUT  [Logo]  ············  [Login] [Sign Up] [Avatar]          ║
 ║  Logged IN   [Logo]  ·········  [Balance] [+] [Avatar]                 ║
 ║                                                                           ║
 ║  Balance box                                                            ║
 ║    - Format $00,000,000.00 (8 digits + 2 decimal places)               ║
 ║    - Font Rajdhani w700, colour #FFE066 (flat, no gradient)            ║
 ║    - Background transparent                                             ║
 ║    - Border 1px solid rgba(245,197,24,.5) — same as deposit btn        ║
 ║    - Border-radius 8px                                                  ║
 ║    - Label BALANCE above number Inter 9px rgba(255,255,255,.35)      ║
 ║                                                                           ║
 ║  Deposit (+) button                                                     ║
 ║    - Shape square 34×34px, border-radius 8px                           ║
 ║    - Style transparent bg, border 1px solid rgba(245,197,24,.5)        ║
 ║    - Content + only, gold gradient text                               ║
 ║                                                                           ║
 ║  Left 3 pills (CasinoSportFavorites) → REMOVED                        ║
 ║                                                                           ║
 ╠═══════════════════════════════════════════════════════════════════════════╣
 ║  SIDEBAR — width 200px, always visible                                  ║
 ║                                                                           ║
 ║  Structure Main item (icon + label + always expanded)                  ║
 ║             Sub items (indented, Inter, no icon)                        ║
 ║                                                                           ║
 ║  Main items                                                             ║
 ║    🎰 Game                                                               ║
 ║       - Live Casino                                                      ║
 ║       - Slots                                                            ║
 ║       - Table Games                                                      ║
 ║       - Roulette                                                         ║
 ║    ⚽ Sport                                                              ║
 ║       - Football                                                         ║
 ║       - Basketball                                                       ║
 ║       - Tennis                                                           ║
 ║       - Esports                                                          ║
 ║    👑 VIP Club                                                           ║
 ║       - Daily Bonus                                                      ║
 ║       - Welcome Bonus                                                    ║
 ║       - Shop                                                             ║
 ║       - History                                                          ║
 ║       - Rank                                                             ║
 ║       - Profile                                                          ║
 ║    ⭐ Favorites  ← ONLY collapsible item, default expanded              ║
 ║       - (placeholder game names as fake data)                           ║
 ║                                                                           ║
 ║  All other main items always expanded, no collapse                     ║
 ║  Future consider adding collapse toggle to all items                   ║
 ║                                                                           ║
 ╠═══════════════════════════════════════════════════════════════════════════╣
 ║  NAVIGATION FLOW                                                         ║
 ║                                                                           ║
 ║  Entry point → Login  Register page (not lobby)                        ║
 ║  After loginregister → Lobby (home page)                               ║
 ║  Register full form with realistic flow, data NOT stored               ║
 ║  Sport  sub-items UI only for now, links added later                  ║
 ║                                                                           ║
 ╠═══════════════════════════════════════════════════════════════════════════╣
 ║  WINNERS TABLE — NUMBER FORMAT                                           ║
 ║                                                                           ║
 ║  Bet  Payout  Multiplier                                              ║
 ║    - Font Rajdhani w700, 14px, tabular-nums                            ║
 ║    - Colour #00E676 (BetPayout), #FFE066 (Multiplier)                 ║
 ║    - Decimal always 2 places (.toFixed(2))                             ║
 ║  Player name Playfair Display w700 (leaderboard only)                  ║
 ║  Tier badge Inter, colour per tier                                      ║
 ║    LEGEND #FF6030  VIP #FFD700  PRO #30AAFF  ELITE #FF69B4          ║
 ║                                                                           ║
 ╠═══════════════════════════════════════════════════════════════════════════╣
 ║  PENDING DISCUSSIONS (not yet implemented)                              ║
 ║  - Individual game pages layout                                          ║
 ║  - Sport sub-pages                                                       ║
 ║  - VIP Club pages                                                        ║
 ║  - Sidebar collapse toggle (future)                                      ║
 ║  - Mobile  RWD breakpoints                                              ║
 ╚═══════════════════════════════════════════════════════════════════════════╝

 ─── RICH GOLD PALETTE ────────────────────────────────────────────────────────
const GOLD = {
  g1 #FFF5C0, g2 #FFE066, g3 #F5C518, g4 #D4A017,
  g5 #B8860B, g6 #8B6508, g7 #5C4000, g8 #2A1A00,
  glow rgba(245,197,24,0.6), glowSoft rgba(245,197,24,0.2),
  green #00E676, greenDim #00C853,
  bg #060504, bgCard #0D0B08, bgPanel #131008, bgSurf #1A1508,
  red #FF3D3D,
};

const GRAD = {
  gold `linear-gradient(135deg, ${GOLD.g8} 0%, ${GOLD.g7} 10%, ${GOLD.g5} 25%, ${GOLD.g4} 40%, ${GOLD.g2} 55%, ${GOLD.g1} 65%, ${GOLD.g3} 75%, ${GOLD.g5} 88%, ${GOLD.g7} 100%)`,
  goldShimmer `linear-gradient(90deg, ${GOLD.g8} 0%, ${GOLD.g6} 10%, ${GOLD.g4} 22%, ${GOLD.g2} 35%, ${GOLD.g1} 50%, ${GOLD.g2} 65%, ${GOLD.g4} 78%, ${GOLD.g6} 90%, ${GOLD.g8} 100%)`,
  goldText `linear-gradient(135deg, ${GOLD.g6} 0%, ${GOLD.g4} 20%, ${GOLD.g2} 40%, ${GOLD.g1} 50%, ${GOLD.g3} 60%, ${GOLD.g5} 80%, ${GOLD.g7} 100%)`,
  goldBorder `linear-gradient(135deg, ${GOLD.g7}, ${GOLD.g5}, ${GOLD.g3}, ${GOLD.g1}, ${GOLD.g2}, ${GOLD.g4}, ${GOLD.g6}, ${GOLD.g8})`,
  goldBtn `linear-gradient(160deg, ${GOLD.g7} 0%, ${GOLD.g5} 15%, ${GOLD.g3} 30%, ${GOLD.g2} 45%, ${GOLD.g1} 55%, ${GOLD.g2} 65%, ${GOLD.g4} 80%, ${GOLD.g6} 100%)`,
};

 ─── SVG ICONS (monochrome, gold-gradient via linearGradient def) ─────────────
const SvgDefs = () = (
  svg width=0 height=0 style={{positionabsolute}}
    defs
      linearGradient id=iconGold x1=0% y1=0% x2=100% y2=100%
        stop offset=0% stopColor={GOLD.g6}
        stop offset=20% stopColor={GOLD.g4}
        stop offset=45% stopColor={GOLD.g2}
        stop offset=60% stopColor={GOLD.g1}
        stop offset=80% stopColor={GOLD.g4}
        stop offset=100% stopColor={GOLD.g7}
      linearGradient
      linearGradient id=iconGoldV x1=0% y1=0% x2=0% y2=100%
        stop offset=0% stopColor={GOLD.g1}
        stop offset=50% stopColor={GOLD.g3}
        stop offset=100% stopColor={GOLD.g6}
      linearGradient
    defs
  svg
);

 Icon components — all use fill=url(#iconGold) or stroke
const Icon = ({ d, size=22, stroke=false, vb=0 0 24 24 }) = (
  svg width={size} height={size} viewBox={vb} fill=none
    path d={d} fill={stroke  none  url(#iconGold)}
      stroke={stroke  url(#iconGold)  none}
      strokeWidth={stroke  1.5  0} strokeLinecap=round strokeLinejoin=round
  svg
);

const Icons = {
  star    Icon d=M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z,
  crown   Icon d=M3 19h18M5 19V9l7-6 7 6v10M9 19v-6h6v6,
  gift    Icon d=M20 12v10H4V12M22 7H2v5h20V7zM12 22V7M12 7a3 3 0 100-6 3 3 0 000 6z stroke,
  trophy  Icon d=M8 21h8m-4-4v4M5 3H3a2 2 0 000 4c0 3.87 2.69 7.12 6.35 7.84M19 3h2a2 2 0 010 4c0 3.87-2.69 7.12-6.35 7.84M7 3h10v7a5 5 0 01-10 0V3z stroke,
  dice    Icon d=M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z stroke,
  card    Icon d=M2 5a2 2 0 012-2h16a2 2 0 012 2v14a2 2 0 01-2 2H4a2 2 0 01-2-2V5zM2 10h20 stroke,
  slots   Icon d=M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z,
  settingsIcon d=M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z stroke,
  rocket  Icon d=M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z stroke,
  wheel   Icon d=M12 2a10 10 0 100 20A10 10 0 0012 2zM12 8v4l3 3 stroke,
  bomb    Icon d=M17.73 4.27a4 4 0 00-5.46 0L4 12.54a4 4 0 000 5.65 4 4 0 005.65 0l8.27-8.27a4 4 0 00-.19-5.65zM20 7l-2-2 stroke,
  user    Icon d=M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z stroke,
  play    Icon d=M5 3l14 9-14 9V3z,
  chevronRIcon d=M9 18l6-6-6-6 stroke,
  chevronLIcon d=M15 18l-6-6 6-6 stroke,
  mail    Icon d=M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6 stroke,
  facebookIcon vb=0 0 24 24 d=M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z stroke,
  twitter Icon vb=0 0 24 24 d=M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z stroke,
  instagramIcon vb=0 0 24 24 d=M17.5 6.5h.01M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zM12 8a4 4 0 100 8 4 4 0 000-8z stroke,
  youtube Icon vb=0 0 24 24 d=M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z stroke,
};

 ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const STYLES = `
  @import url('httpsfonts.googleapis.comcss2family=Cinzelwght@400;600;700;900family=Cinzelwght@400;600;700;900&family=Orbitronwght@400;700;900&family=Playfair+Displaywght@400;600;700;800;900&family=Interwght@300;400;500;600;700&family=Roboto+Monowght@400;500;700family=Tenor+Sans&family=Playfair+Displaywght@400;600;700;800;900family=Cinzelwght@400;600;700;900&family=Orbitronwght@400;700;900&family=Playfair+Displaywght@400;600;700;800;900&family=Interwght@300;400;500;600;700&family=Roboto+Monowght@400;500;700family=Interwght@300;400;500;600;700family=Cinzelwght@400;600;700;900&family=Orbitronwght@400;700;900&family=Playfair+Displaywght@400;600;700;800;900&family=Interwght@300;400;500;600;700&family=Roboto+Monowght@400;500;700family=Roboto+Monowght@400;500;700&display=swap');

  , before, after { margin0; padding0; box-sizingborder-box; }
  html,body { background${GOLD.bg}; overflow-xhidden; font-family'Inter',sans-serif; }
  root {
    --g1${GOLD.g1}; --g2${GOLD.g2}; --g3${GOLD.g3}; --g4${GOLD.g4};
    --g5${GOLD.g5}; --g6${GOLD.g6}; --g7${GOLD.g7}; --g8${GOLD.g8};
    --glow${GOLD.glow}; --green${GOLD.green};
    --bg${GOLD.bg}; --bgc${GOLD.bgCard}; --bgp${GOLD.bgPanel}; --bgs${GOLD.bgSurf};
  }

   ── KEYFRAMES ── 
  @keyframes shimmerSlow {
    0%   { background-position 250% center }
    100% { background-position -250% center }
  }
  @keyframes pulseGold {
    0%,100% { box-shadow 0 0 18px rgba(245,197,24,.25), 0 0 40px rgba(245,197,24,.08) }
    50%      { box-shadow 0 0 40px rgba(245,197,24,.6),  0 0 80px rgba(245,197,24,.25) }
  }
  @keyframes pulseGoldText {
    0%,100% { text-shadow 0 0 16px rgba(255,230,102,.3), 0 0 32px rgba(245,197,24,.1) }
    50%      { text-shadow 0 0 32px rgba(255,230,102,.8), 0 0 60px rgba(245,197,24,.4), 0 0 90px rgba(212,160,23,.2) }
  }
  @keyframes float {
    0%,100%{transformtranslateY(0)} 50%{transformtranslateY(-10px)}
  }
  @keyframes fadeInUp {
    from{opacity0;transformtranslateY(24px)} to{opacity1;transformtranslateY(0)}
  }
  @keyframes fadeIn {
    from{opacity0} to{opacity1}
  }
  @keyframes scaleIn {
    from{transformscale(.55);opacity0} to{transformscale(1);opacity1}
  }
  @keyframes jackpotDrop {
    0%  {transformtranslateY(-160%);opacity0}
    65% {transformtranslateY(8%);opacity1}
    82% {transformtranslateY(-4%)}
    100%{transformtranslateY(0)}
  }
  @keyframes winFlash {
    0%,100%{backgroundtransparent} 30%,70%{backgroundrgba(245,197,24,.12)}
  }
  @keyframes particleFall {
    0%  {transformtranslate(0,0) rotate(0deg);   opacity1}
    100%{transformtranslate(var(--dx),90vh) rotate(540deg); opacity0}
  }
  @keyframes borderRotate {
    to { --angle 360deg }
  }
  @keyframes wiggle {
    0%,100%{transformrotate(0)} 25%{transformrotate(-4deg)} 75%{transformrotate(4deg)}
  }
  @keyframes counterPop {
    from{opacity0;transformtranslateY(6px)} to{opacity1;transformtranslateY(0)}
  }
  @keyframes rouletteSpin {
    0%  {transformrotate(0deg)}
    100%{transformrotate(1800deg)}
  }

   ── TEXT GOLD ── 
  .gold-text {
    background ${GRAD.goldText};
    background-size 200% auto;
    -webkit-background-clip text;
    -webkit-text-fill-color transparent;
    background-clip text;
    animation shimmerSlow 14s linear infinite;
  }
  .gold-text-static {
    background ${GRAD.goldText};
    -webkit-background-clip text;
    -webkit-text-fill-color transparent;
    background-clip text;
  }

   ── BUTTONS ── 
  .btn-primary {
    position relative;
    display inline-flex; align-items center; gap 8px;
    padding 10px 24px;
    border-radius 30px;
    font-family 'Playfair Display', serif;
    font-weight 700;
    font-size 14px;
    letter-spacing .5px;
    cursor pointer;
    border none;
    color ${GOLD.g8};
    background ${GRAD.goldBtn};
    background-size 200% auto;
    transition all .3s ease;
    overflow hidden;
  }
  .btn-primarybefore {
    content'';
    positionabsolute; inset-2px;
    border-radius 32px;
    background ${GRAD.goldBorder};
    z-index-1;
    opacity.8;
  }
  .btn-primaryafter {
    content'';
    positionabsolute; inset0;
    border-radius30px;
    background linear-gradient(180deg, rgba(255,245,192,.25) 0%, transparent 60%);
    pointer-eventsnone;
  }
  .btn-primaryhover {
    transform translateY(-2px) scale(1.03);
    box-shadow 0 6px 28px rgba(245,197,24,.5), 0 0 40px rgba(245,197,24,.2);
    background-position right center;
    filter brightness(1.08);
  }
  .btn-primaryactive { transform scale(.97); }

  .btn-ghost {
    display inline-flex; align-items center; gap 6px;
    padding 9px 22px;
    border-radius 30px;
    font-family 'Playfair Display', serif;
    font-weight 600;
    font-size 13px;
    letter-spacing .4px;
    cursor pointer;
    color var(--g3);
    background transparent;
    position relative;
    transition all .3s ease;
    border none;
  }
  .btn-ghostbefore {
    content'';
    positionabsolute; inset0;
    border-radius30px;
    padding 1px;
    background ${GRAD.goldBorder};
    -webkit-mask linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite xor;
    mask-composite exclude;
  }
  .btn-ghosthover {
    background rgba(245,197,24,.08);
    color var(--g1);
    box-shadow 0 0 20px rgba(245,197,24,.15);
  }

   ── PLAY NOW BUTTON (oval + circle icon) ── 
  .btn-play {
    display inline-flex; align-items center; gap 0;
    border none; cursor pointer;
    border-radius 30px;
    overflow hidden;
    position relative;
    transition all .3s ease;
    background transparent;
  }
  .btn-playbefore {
    content'';
    positionabsolute; inset-1.5px;
    border-radius32px;
    background ${GRAD.goldBorder};
    z-index0;
  }
  .btn-play-inner {
    display flex; align-items center; gap 0;
    background rgba(8,6,3,.85);
    border-radius 28px;
    position relative; z-index1;
    margin 1.5px;
    overflowhidden;
  }
  .btn-play-label {
    padding 9px 18px 9px 16px;
    font-family 'Playfair Display', serif;
    font-weight 700;
    font-size 13px;
    letter-spacing .5px;
    color var(--g2);
    white-space nowrap;
  }
  .btn-play-circle {
    width 36px; height 36px;
    border-radius 50%;
    background ${GRAD.goldBtn};
    display flex; align-items center; justify-content center;
    margin 2px 2px 2px 0;
    flex-shrink 0;
    transition transform .3s;
  }
  .btn-playhover { transform translateY(-2px); box-shadow 0 6px 24px rgba(245,197,24,.35); }
  .btn-playhover .btn-play-circle { transform scale(1.1); }

   ── CARD GOLD BORDER ── 
  .card-gold {
    positionrelative;
    background ${GOLD.bgCard};
    transition all .35s cubic-bezier(.34,1.56,.64,1);
    cursor pointer;
  }
  .card-goldbefore {
    content'';
    positionabsolute; inset-1px;
    border-radius inherit;
    background ${GRAD.goldBorder};
    z-index0;
    opacity.55;
    transition opacity .3s;
  }
  .card-gold-inner {
    position relative; z-index1;
    background ${GOLD.bgCard};
    border-radius inherit;
    height 100%;
    overflow hidden;
  }
  .card-goldhoverbefore { opacity1; }
  .card-goldhover { transform translateY(-6px) scale(1.02); box-shadow 0 20px 50px rgba(0,0,0,.6), 0 0 30px rgba(245,197,24,.15); }

   ── SIDEBAR ICON ── 
  .sb-icon {
    width44px; height44px;
    border-radius12px;
    displayflex; align-itemscenter; justify-contentcenter;
    cursorpointer;
    transitionall .3s ease;
    positionrelative;
    background rgba(255,255,255,.03);
  }
  .sb-iconbefore {
    content'';
    positionabsolute; inset-1px;
    border-radius13px;
    background ${GRAD.goldBorder};
    z-index0;
    opacity0;
    transition opacity .3s;
  }
  .sb-iconhoverbefore, .sb-icon.activebefore { opacity.7; }
  .sb-iconhover { transformscale(1.15); filterdrop-shadow(0 0 8px rgba(245,197,24,.5)); }
  .sb-icon   { positionrelative; z-index1; }

   ── GLASSMORPHISM ── 
  .glass {
    background rgba(13,11,8,.75);
    backdrop-filter blur(18px);
    -webkit-backdrop-filter blur(18px);
  }

   ── NAV PILL ── 
  .nav-pill {
    display inline-flex; align-items center;
    padding 6px 16px;
    border-radius 20px;
    font-family 'Inter', sans-serif;
    font-weight 600;
    font-size 11px;
    letter-spacing 1px;
    cursor pointer;
    border none;
    transition all .3s ease;
    position relative;
    overflow hidden;
  }
  .nav-pill.active, .nav-pillhover {
    color ${GOLD.g8} !important;
    background ${GRAD.goldBtn} !important;
    box-shadow 0 4px 16px rgba(245,197,24,.3);
  }

   ── COUNTER (tabular-nums to prevent layout shift) ── 
  .tabnum {
    font-family 'Rajdhani', sans-serif;
    font-variant-numeric tabular-nums;
    font-feature-settings tnum;
  }

   ── JACKPOT NUMBER ── 
  .jackpot-num {
    font-family 'Rajdhani', sans-serif;
    font-variant-numeric tabular-nums;
    font-weight 700;
    background linear-gradient(180deg, ${GOLD.g1} 0%, ${GOLD.g2} 30%, ${GOLD.g3} 55%, ${GOLD.g5} 80%, ${GOLD.g6} 100%);
    -webkit-background-clip text;
    -webkit-text-fill-color transparent;
    background-clip text;
    filter drop-shadow(0 2px 12px rgba(245,197,24,.45));
    animation pulseGoldText 2.5s ease-in-out infinite;
  }

   ── COUNTDOWN BOX ── 
  .cd-box {
    min-width 62px;
    background rgba(245,197,24,.06);
    border-radius 8px;
    text-align center;
    padding 10px 12px;
    position relative;
  }
  .cd-boxbefore {
    content'';
    positionabsolute; inset-1px;
    border-radius9px;
    background ${GRAD.goldBorder};
    z-index0;
    opacity.45;
  }
  .cd-inner { positionrelative; z-index1; }
  .cd-num {
    font-family 'Rajdhani', sans-serif;
    font-variant-numeric tabular-nums;
    font-feature-settings tnum;
    font-weight 700;
    font-size 26px;
    line-height 1;
    background linear-gradient(180deg, ${GOLD.g1} 0%, ${GOLD.g3} 60%, ${GOLD.g5} 100%);
    -webkit-background-clip text;
    -webkit-text-fill-color transparent;
    background-clip text;
  }
  .cd-lbl {
    font-family 'Inter', sans-serif;
    font-size 10px;
    letter-spacing 1.5px;
    text-transform uppercase;
    color rgba(245,197,24,.45);
    margin-top 3px;
  }

   ── TABLE ROW ── 
  .t-row { transition background .2s; }
  .t-rowhover { background rgba(245,197,24,.04); }

   ── SCROLLBAR ── 
  .no-scrollbar-webkit-scrollbar { displaynone; }
  .no-scrollbar { scrollbar-widthnone; }

   ── PAGES ── 
  .page-in { animation fadeInUp .4s ease both; }

   ── WIN OVERLAY ── 
  .win-overlay {
    positionfixed; inset0; z-index9999;
    displayflex; align-itemscenter; justify-contentcenter;
    backgroundrgba(3,2,1,.88);
    animation fadeIn .25s ease;
  }
  .win-text {
    font-family'Cinzel Decorative', cursive;
    font-weight900;
    animation jackpotDrop .7s cubic-bezier(.34,1.56,.64,1) both, pulseGoldText 1.2s ease-in-out infinite .7s;
  }

   ── GAME CARD ── 
  .game-card {
    positionrelative; overflowhidden; cursorpointer;
    transition all .4s cubic-bezier(.34,1.56,.64,1);
    flex-shrink0;
  }
  .game-cardhover { transformtranslateY(-8px) scale(1.04); z-index10; }
  .game-cardhover .gc-overlay { opacity1; }
  .gc-overlay {
    positionabsolute; inset0;
    backgroundlinear-gradient(to top, rgba(0,0,0,.92) 0%, transparent 55%);
    opacity0; transitionopacity .3s;
    displayflex; align-itemsflex-end; padding12px;
  }

   ── PARTICLE ── 
  .particle {
    positionfixed; pointer-eventsnone; z-index9998;
    animation particleFall var(--dur) ease-in forwards;
  }

   ── POSTER BLEED CONTAINER ── 
  .poster-bleed {
    positionrelative; overflowhidden;
  }
  .poster-bleed .bleed-img {
    positionabsolute; right-10px; bottom0;
    height115%; widthauto;
    object-fitcover;
    pointer-eventsnone;
    z-index2;
  }
  .poster-bleed .bleed-glow {
    positionabsolute; right0; top0; bottom0; width55%;
    background radial-gradient(ellipse at 85% 50%, rgba(245,197,24,.08) 0%, transparent 70%);
    z-index1; pointer-eventsnone;
  }

   ── PROGRESS ── 
  .progress-bar {
    height3px;
    background ${GRAD.gold};
    border-radius2px;
    transition width .15s linear;
  }

  @media (max-width768px) {
    .sidebar-desktop { displaynone !important; }
    .main-pad { padding-left0 !important; }
    .hero-grid { grid-template-columns1fr !important; }
    .footer-cols { grid-template-columns1fr 1fr !important; }
  }
`;

 ─── PARTICLES ───────────────────────────────────────────────────────────────
function Particles({ active, onDone }) {
  const [list, setList] = useState([]);
  useEffect(() = {
    if (!active) { setList([]); return; }
    setList(Array.from({ length 70 }, (_, i) = ({
      id i,
      x Math.random()  100,
      dx (Math.random() - .5)  180,
      dur 1.6 + Math.random()  1.6,
      size 10 + Math.random()  14,
      delay Math.random()  .5,
      shape [◆,★,✦,◉,▲,●][i % 6],
      color [GOLD.g1,GOLD.g2,GOLD.g3,GOLD.g4][i%4],
    })));
    const t = setTimeout(() = { setList([]); onDone.(); }, 4500);
    return () = clearTimeout(t);
  }, [active]);
  return {list.map(p = (
    div key={p.id} className=particle style={{
      left`${p.x}vw`, top-4vh,
      fontSizep.size, colorp.color,
      --dx`${p.dx}px`, --dur`${p.dur}s`,
      animationDelay`${p.delay}s`,
    }}{p.shape}div
  ))};
}

 ─── WIN OVERLAY ─────────────────────────────────────────────────────────────
function WinOverlay({ show, amount, onClose }) {
  if (!show) return null;
  return (
    div className=win-overlay onClick={onClose}
      div style={{ textAligncenter, positionrelative }}
        div style={{ positionabsolute, inset-80px,
          backgroundradial-gradient(circle, rgba(245,197,24,.28) 0%, transparent 68%),
          animationpulseGold 1s ease-in-out infinite, pointerEventsnone }} 
        div className=win-text gold-text-static style={{ fontSizeclamp(40px,8vw,96px), lineHeight1.1 }}
          ✦ YOU WIN! ✦
        div
        div style={{ marginTop18, animationscaleIn .5s .5s ease both }}
          div className=jackpot-num style={{ fontSizeclamp(44px,9vw,110px) }}
            ${amount.toLocaleString(en-US,{minimumFractionDigits2,maximumFractionDigits2})}
          div
        div
        div style={{ marginTop14, colorrgba(255,255,255,.4), fontFamily'Inter',sans-serif, fontSize14, animationfadeInUp .5s 1.2s ease both }}
          Tap anywhere to continue
        div
      div
    div
  );
}

 ─── HEADER ──────────────────────────────────────────────────────────────────
function Header({ setPage }) {
  const [activePill, setActivePill] = useState(Casino);
  return (
    header className=glass style={{
      borderBottom`1px solid rgba(245,197,24,.12)`,
      positionsticky, top0, zIndex100,
    }}
      div style={{ maxWidth1440, margin0 auto, padding0 20px }}
        div style={{ displayflex, alignItemscenter, justifyContentspace-between, height60 }}
          { Pills }
          div style={{ displayflex, gap6 }}
            {[Casino,Sport,Favorites].map(p = (
              button key={p} className={`nav-pill ${activePill===pactive}`}
                onClick={() = setActivePill(p)}
                style={{ color activePill===p  GOLD.g8  rgba(255,255,255,.55), background activePill===p  undefined  rgba(255,255,255,.05) }}
                {p}
              button
            ))}
          div

          { Logo }
          div onClick={() = setPage(home)} style={{ cursorpointer, userSelectnone, displayflex, alignItemscenter, gap10 }}
            div style={{ fontSize22, filterdrop-shadow(0 0 8px rgba(245,197,24,.5)), colorGOLD.g3 }}✦div
            span className=gold-text style={{
              fontFamily'Cinzel Decorative', cursive,
              fontWeight900, fontSize28, letterSpacing5,
              lineHeight1,
            }}PINWINspan
            div style={{ fontSize22, filterdrop-shadow(0 0 8px rgba(245,197,24,.5)), colorGOLD.g3 }}✦div
          div

          { Right }
          div style={{ displayflex, alignItemscenter, gap10 }}
            button className=btn-ghost onClick={() = setPage(login)} style={{ fontSize13 }}Loginbutton
            button className=btn-primary onClick={() = setPage(signup)} style={{ padding8px 22px }}Sign Upbutton
            div onClick={() = setPage(profile)} className=sb-icon style={{ borderRadius10 }}
              {Icons.user}
            div
          div
        div
      div

      { Sub bar }
      div style={{
        textAligncenter, padding5px 0,
        backgroundlinear-gradient(90deg, transparent, rgba(245,197,24,.07), transparent),
        borderTop`1px solid rgba(245,197,24,.07)`,
        fontFamily'Raleway',sans-serif, fontSize12, letterSpacing4, colorGOLD.g4,
      }}
        PREMIUM GAMING ENTERTAINMENT — WHERE LEGENDS ARE MADE
      div
    header
  );
}

 ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ setPage, activePage }) {
  const items = [
    { iconIcons.star,    pagefavorites,  labelFavorites },
    { iconIcons.crown,   pagevip,        labelVIP Club  },
    { iconIcons.gift,    pagebonus,       labelBonuses   },
    { iconIcons.trophy,  pagetournament,  labelTournament},
    { iconIcons.slots,   pageslots,       labelSlots     },
    { iconIcons.card,    pagecards,       labelCards     },
    { iconIcons.dice,    pagedice,        labelDice      },
    { iconIcons.settings,pagesettings,   labelSettings  },
  ];
  return (
    aside className=sidebar-desktop style={{
      positionfixed, left0, top120, bottom0, width62,
      displayflex, flexDirectioncolumn, alignItemscenter,
      gap14, paddingTop18, zIndex90,
      backgroundrgba(6,5,4,.92),
      borderRight`1px solid rgba(245,197,24,.07)`,
    }}
      {items.map(({ icon, page, label }) = (
        div key={page} className={`sb-icon ${activePage===pageactive}`}
          onClick={() = setPage(page)}
          title={label}
          {icon}
        div
      ))}
    aside
  );
}

 ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection({ setPage }) {
   Play button component
  const PlayBtn = ({ onClick }) = (
    button className=btn-play onClick={onClick}
      div className=btn-play-inner
        span className=btn-play-labelPlay nowspan
        div className=btn-play-circle
          svg width=14 height=14 viewBox=0 0 24 24 fill={GOLD.g8}
            path d=M5 3l14 9-14 9V3z
          svg
        div
      div
    button
  );

  return (
    section style={{ padding20px 0 }}
      div style={{ displaygrid, gridTemplateColumns2fr 1fr, gap14 }} className=hero-grid

        { Big left card — poster bleed demo }
        div className=card-gold poster-bleed style={{ borderRadius16, minHeight220, overflowvisible }}
          onClick={() = setPage(signup)}
          div className=card-gold-inner style={{ borderRadius16, padding28px 32px }}
            div style={{ positionabsolute, inset0, borderRadius16,
              backgroundlinear-gradient(135deg, rgba(6,5,4,1) 0%, rgba(13,11,8,.95) 40%, rgba(20,16,8,.8) 70%, rgba(30,22,5,.6) 100%) }} 
            div style={{ positionabsolute, inset0,
              backgroundradial-gradient(ellipse at 25% 60%, rgba(245,197,24,.06) 0%, transparent 55%) }} 
            { Bleed placeholder — replace src with real PNG }
            div style={{
              positionabsolute, right0, bottom0, width48%, height115%,
              background`linear-gradient(135deg, ${GOLD.bgCard} 0%, rgba(245,197,24,.04) 100%)`,
              borderRadius0 16px 16px 0,
              displayflex, alignItemsflex-end, justifyContentcenter,
              overflowhidden, zIndex2,
            }}
              div style={{ textAligncenter, paddingBottom12 }}
                div style={{ fontSize64, filter`drop-shadow(0 0 20px ${GOLD.glow})`, animationfloat 3s ease-in-out infinite }}👑div
                div style={{ fontFamily'Inter',sans-serif, fontSize10, colorrgba(245,197,24,.4), letterSpacing1 }}REPLACE WITH PNG CUTOUTdiv
              div
            div
            { Fade overlay so bleed blends }
            div style={{ positionabsolute, right45%, top0, bottom0, width80px,
              backgroundlinear-gradient(90deg, rgba(13,11,8,1), transparent), zIndex3, pointerEventsnone }} 

            div style={{ positionrelative, zIndex4, maxWidth52% }}
              div style={{ displayinline-flex, alignItemscenter, gap6,
                backgroundrgba(245,197,24,.1), border`1px solid rgba(245,197,24,.25)`,
                borderRadius4, padding3px 12px, marginBottom12,
              }}
                span style={{ fontFamily'Raleway',sans-serif, fontSize12, colorGOLD.g3, letterSpacing3 }}✦ EXCLUSIVEspan
              div
              div style={{ fontFamily'Cinzel Decorative', cursive, fontWeight700,
                fontSizeclamp(14px,2vw,22px), color#fff, lineHeight1.4, marginBottom8 }}
                SIGN UP AND RECEIVE
                span className=gold-text-static style={{ displayblock }} $300 AND 30 FSspan
              div
              div style={{ marginTop16 }}PlayBtn onClick={() = setPage(signup)} div
            div
          div
        div

        { Right column }
        div style={{ displayflex, flexDirectioncolumn, gap14 }}
          {[
            { badge🔥 HOT,    titleCRASH — UP TO 10,000×, pagecrash },
            { badge⭐ POPULAR, titlePLAY NOW — LIVE ROULETTE, pageroulette },
          ].map(({ badge, title, page p }) = (
            div key={p} className=card-gold style={{ borderRadius14, flex1 }} onClick={() = setPage(p)}
              div className=card-gold-inner style={{ padding16px 18px, minHeight96 }}
                div style={{ positionabsolute, inset0, borderRadius14,
                  backgroundradial-gradient(ellipse at 80% 40%, rgba(245,197,24,.05) 0%, transparent 60%) }} 
                div style={{ positionrelative, zIndex1 }}
                  div style={{ displayinline-block, backgroundrgba(245,197,24,.12),
                    border`1px solid rgba(245,197,24,.2)`, borderRadius4, padding2px 10px,
                    fontFamily'Raleway',sans-serif, fontSize11, colorGOLD.g3, letterSpacing2, marginBottom8 }}{badge}div
                  div style={{ fontFamily'Inter',sans-serif, fontWeight700,
                    fontSizeclamp(12px,1.5vw,15px), color#fff, marginBottom12 }}{title}div
                  button className=btn-play style={{ transformscale(.9), transformOriginleft }}
                    div className=btn-play-inner
                      span className=btn-play-label style={{ fontSize12 }}Play nowspan
                      div className=btn-play-circle style={{ width30, height30 }}
                        svg width=12 height=12 viewBox=0 0 24 24 fill={GOLD.g8}path d=M5 3l14 9-14 9V3zsvg
                      div
                    div
                  button
                div
              div
            div
          ))}
        div
      div
    section
  );
}

 ─── GAME CATEGORIES ─────────────────────────────────────────────────────────
function GameCategories({ setPage }) {
  const cats = [
    { iconIcons.rocket, labelCRASH,    pagecrash    },
    { iconIcons.wheel,  labelROULETTE, pageroulette },
    { iconIcons.slots,  labelSLOT,     pageslots    },
    { iconIcons.bomb,   labelMINES,    pagemines    },
    { iconIcons.trophy, labelBATTLES,  pageslots    },
    { iconIcons.dice,   labelDICE,     pagedice     },
    { iconIcons.card,   labelPOKER,    pagecards    },
    { iconIcons.star,   labelPLINKO,   pageplinko   },
  ];
  return (
    div style={{ padding12px 0 }}
      div style={{ displayflex, alignItemscenter, gap8, marginBottom12 }}
        {Icons.star}
        span style={{ fontFamily'Raleway',sans-serif, fontWeight600, fontSize13, colorGOLD.g4, letterSpacing3 }}ALL GAMESspan
      div
      div className=no-scrollbar style={{ displayflex, gap10, overflowXauto, paddingBottom4 }}
        {cats.map(({ icon, label, page }) = (
          div key={label} className=card-gold style={{ borderRadius12, flexShrink0 }}
            onClick={() = setPage(page)}
            div className=card-gold-inner style={{ padding12px 16px, displayflex, flexDirectioncolumn, alignItemscenter, gap8, minWidth76 }}
              {icon}
              span style={{ fontFamily'Inter',sans-serif, fontWeight600, fontSize10, letterSpacing1 }}
                className=gold-text-static{label}span
            div
          div
        ))}
      div
    div
  );
}

 ─── SLOT ROW ─────────────────────────────────────────────────────────────────
function SlotGamesRow({ setPage }) {
  const games = [
    { labelSweet Bonanza,      bg#2d0a1a, accent#c0394f, iconIcons.star  },
    { labelGates of Olympus,   bg#0a1530, accent#3a6fd8, iconIcons.crown },
    { labelBuffalo King,       bg#1a0c00, accentGOLD.g5,   iconIcons.trophy, jackpottrue },
    { labelDog House Megaways, bg#0a1f0a, accent#2e8b2e, iconIcons.dice  },
    { labelSugar Rush,         bg#1a0a2d, accent#8b2ec0, iconIcons.gift  },
  ];
  return (
    div style={{ padding8px 0 18px }}
      div style={{ displayflex, alignItemscenter, justifyContentspace-between, marginBottom12 }}
        div style={{ displayflex, alignItemscenter, gap8 }}
          {Icons.star}
          span style={{ fontFamily'Raleway',sans-serif, fontWeight600, fontSize13, colorGOLD.g4, letterSpacing3 }}SLOT GAMESspan
        div
        div style={{ displayflex, gap6 }}
          button className=btn-ghost style={{ padding5px 12px, fontSize12 }}{Icons.chevronL}button
          button className=btn-ghost style={{ padding5px 12px, fontSize12 }}{Icons.chevronR}button
        div
      div
      div className=no-scrollbar style={{ displayflex, gap10, overflowXauto, alignItemscenter }}
        {games.map((g, i) = {
          const isCenter = i === 2;
          return (
            div key={g.label} className=game-card onClick={() = setPage(slots)} style={{
              width isCenter  188  155,
              height isCenter  215  180,
              borderRadius 14,
              background g.bg,
              border isCenter  `2px solid ${GOLD.g4}`  `1px solid rgba(245,197,24,.15)`,
              boxShadow isCenter  `0 0 30px rgba(245,197,24,.25)`  none,
              zIndex isCenter  5  1,
              transform isCenter  scale(1.05)  none,
            }}
              div style={{ height100%, displayflex, flexDirectioncolumn, alignItemscenter, justifyContentcenter, padding14, positionrelative }}
                {g.jackpot && (
                  div style={{ positionabsolute, top10, left50%, transformtranslateX(-50%),
                    backgroundGRAD.goldBtn, colorGOLD.g8, fontSize8,
                    fontFamily'Raleway',sans-serif, fontWeight400,
                    padding3px 14px, borderRadius20, letterSpacing1.5, whiteSpacenowrap }}
                    ✦ JACKPOT
                  div
                )}
                div style={{ marginTop g.jackpot  18  0, filter`drop-shadow(0 0 12px ${g.accent})` }}
                  svg width={isCenter5240} height={isCenter5240} viewBox=0 0 24 24 fill=none
                    {g.icon.props.children}
                  svg
                div
                div style={{ fontFamily'Inter',sans-serif, fontWeight600,
                  fontSize isCenter  12  10,
                  color g.jackpot  GOLD.g2  rgba(255,255,255,.8),
                  textAligncenter, marginTop10, letterSpacing.5 }}{g.label}div
                {g.jackpot && (
                  div style={{ marginTop6, textAligncenter }}
                    div className=jackpot-num style={{ fontSize13 }}$56,280,480div
                    button className=btn-primary style={{ marginTop8, padding5px 14px, fontSize11 }}Play Nowbutton
                  div
                )}
              div
              div className=gc-overlay style={{ borderRadius14 }}
                button className=btn-play style={{ width100%, justifyContentcenter }}
                  div className=btn-play-inner style={{ width100%, justifyContentcenter }}
                    span className=btn-play-label style={{ fontSize12 }}Play nowspan
                    div className=btn-play-circle style={{ width30, height30 }}
                      svg width=12 height=12 viewBox=0 0 24 24 fill={GOLD.g8}path d=M5 3l14 9-14 9V3zsvg
                    div
                  div
                button
              div
            div
          );
        })}
      div
    div
  );
}

 ─── JACKPOT BANNER ───────────────────────────────────────────────────────────
function JackpotBanner({ setPage }) {
  const [amount, setAmount] = useState(98765432.10);
  useEffect(() = {
    const t = setInterval(() = setAmount(a = a + Math.random()  13.7), 100);
    return () = clearInterval(t);
  }, []);

  return (
    div style={{ padding14px 0 }}
      { Promo banner }
      div className=card-gold poster-bleed style={{ borderRadius16, overflowhidden, marginBottom18 }}
        onClick={() = setPage(signup)}
        div className=card-gold-inner style={{ padding28px 32px, minHeight160 }}
          div style={{ positionabsolute, inset0,
            backgroundlinear-gradient(135deg, rgba(6,5,4,1) 50%, rgba(245,197,24,.04) 100%) }} 
          div style={{ positionabsolute, right0, top0, bottom0, width45%,
            background`linear-gradient(135deg, ${GOLD.bgCard}, rgba(245,197,24,.04))`,
            displayflex, alignItemscenter, justifyContentcenter }}
            div style={{ fontSize72, animationfloat 3s ease-in-out infinite,
              filter`drop-shadow(0 0 24px ${GOLD.glow})` }}🦅div
          div
          div style={{ positionabsolute, right43%, top0, bottom0, width80,
            backgroundlinear-gradient(90deg, rgba(6,5,4,1), transparent), zIndex3, pointerEventsnone }} 
          div style={{ positionrelative, zIndex4, maxWidth55% }}
            div style={{ fontFamily'Raleway',sans-serif, fontSize12, colorGOLD.g4, letterSpacing3, marginBottom10 }}✦ EXCLUSIVE OFFERdiv
            div style={{ fontFamily'Cinzel Decorative', cursive, fontWeight700,
              fontSizeclamp(14px,2.2vw,24px), color#fff, lineHeight1.4, marginBottom18 }}
              SIGN UP AND RECEIVEbr 
              span className=gold-text-static$300 AND 30 FREE SPINSspan
            div
            button className=btn-play
              div className=btn-play-inner
                span className=btn-play-labelPlay nowspan
                div className=btn-play-circle
                  svg width=14 height=14 viewBox=0 0 24 24 fill={GOLD.g8}path d=M5 3l14 9-14 9V3zsvg
                div
              div
            button
          div
        div
      div

      { Progressive jackpot }
      div style={{ backgroundGOLD.bgCard, borderRadius16, padding28px,
        border`1px solid rgba(245,197,24,.18)`, textAligncenter, positionrelative, overflowhidden }}
        div style={{ positionabsolute, inset0,
          backgroundradial-gradient(ellipse at center, rgba(245,197,24,.05) 0%, transparent 65%) }} 
        div style={{ displayflex, alignItemscenter, justifyContentcenter, gap20, marginBottom10 }}
          div style={{ filter`drop-shadow(0 0 8px ${GOLD.glow})` }}{Icons.crown}div
          span style={{ fontFamily'Raleway',sans-serif, fontSize13, colorGOLD.g5, letterSpacing4 }}PROGRESSIVE JACKPOTspan
          div style={{ filter`drop-shadow(0 0 8px ${GOLD.glow})` }}{Icons.crown}div
        div
        div className=jackpot-num style={{ fontSizeclamp(32px,6vw,70px), letterSpacing1 }}
          $ {amount.toLocaleString(en-US,{minimumFractionDigits2,maximumFractionDigits2})}
        div
      div
    div
  );
}

 ─── WINNERS TABLE ────────────────────────────────────────────────────────────
function WinnersTable() {
  const [tab, setTab] = useState(Recent);
  const rows = [
    { nameFortuneKing88, tierLEGEND • LV.99, bet0.50, payout150.00, mult×300.00, gameIcons.slots },
    { nameLuckyQueen777, tierVIP • LV.88,    bet0.30, payout90.00,  mult×300.00, gameIcons.wheel },
    { nameBigWinHunter,  tierPRO • LV.77,    bet0.20, payout60.00,  mult×300.00, gameIcons.rocket },
    { nameJackpotMaster, tierELITE • LV.66,  bet0.10, payout30.00,  mult×300.00, gameIcons.bomb  },
    { nameGoldenPlayer99,tierVIP • LV.55,    bet0.50, payout150.00, mult×300.00, gameIcons.card  },
  ];
  const tierColor = { LEGEND#FF6030, VIPGOLD.g3, PRO#30AAFF, ELITE#FF80C0 };

  return (
    div style={{ padding14px 0 24px }}
      div style={{ displayflex, alignItemscenter, gap8, marginBottom14 }}
        {Icons.trophy}
        span style={{ fontFamily'Raleway',sans-serif, fontWeight600, fontSize13, colorGOLD.g4, letterSpacing3 }}WINNERS TODAYspan
      div
      div style={{ backgroundGOLD.bgCard, borderRadius14, border`1px solid rgba(245,197,24,.1)`, overflowhidden }}
        div style={{ displayflex, borderBottom`1px solid rgba(245,197,24,.08)`, padding0 16px }}
          {[Recent,Lucky Wins,High Rollers].map(t = (
            button key={t} onClick={() = setTab(t)} style={{
              backgroundnone, bordernone, cursorpointer,
              padding12px 16px,
              fontFamily'Inter',sans-serif, fontWeight600, fontSize13,
              color tab===t  GOLD.g3  rgba(255,255,255,.35),
              borderBottom tab===t  `2px solid ${GOLD.g4}`  2px solid transparent,
              transitionall .2s, marginBottom-1, letterSpacing.5,
            }}{t}button
          ))}
        div
        div style={{ displaygrid, gridTemplateColumns2fr 1.2fr 1.2fr 1fr 48px, padding8px 16px, borderBottom`1px solid rgba(255,255,255,.04)` }}
          {[Player,Bet,Payout,Multiplier,].map(h = (
            div key={h} style={{ fontFamily'Inter',sans-serif, fontSize11, colorrgba(255,255,255,.25), letterSpacing.5 }}{h}div
          ))}
        div
        {rows.map((r, i) = {
          const tierKey = r.tier.split( )[0];
          return (
            div key={r.name} className=t-row style={{
              displaygrid, gridTemplateColumns2fr 1.2fr 1.2fr 1fr 48px,
              padding10px 16px,
              borderBottom i  rows.length-1  `1px solid rgba(255,255,255,.03)`  none,
              alignItemscenter,
              animation`fadeInUp .4s ${i.07}s ease both`,
            }}
              div style={{ displayflex, alignItemscenter, gap10 }}
                div style={{
                  width34, height34, borderRadius50%,
                  background`rgba(245,197,24,.06)`,
                  border`1px solid ${tierColor[tierKey]GOLD.g5}44`,
                  displayflex, alignItemscenter, justifyContentcenter, flexShrink0,
                }}
                  {Icons.user}
                div
                div
                  div style={{ fontFamily'Inter',sans-serif, fontSize13, fontWeight600, color#fff }}{r.name}div
                  div style={{ fontFamily'Inter',sans-serif, fontSize11, colortierColor[tierKey]GOLD.g4 }}{r.tier}div
                div
              div
              div style={{ fontFamily'Rajdhani',sans-serif, fontVariantNumerictabular-nums, colorGOLD.green, fontSize12 }}
                span style={{ colorGOLD.g5, marginRight4 }}◆span{r.bet}
              div
              div style={{ fontFamily'Rajdhani',sans-serif, fontVariantNumerictabular-nums, colorGOLD.green, fontSize12 }}
                span style={{ colorGOLD.g5, marginRight4 }}◆span{r.payout}
              div
              div style={{ fontFamily'Rajdhani',sans-serif, fontVariantNumerictabular-nums }}
                style={{ fontFamily'Rajdhani',sans-serif, fontVariantNumerictabular-nums, fontWeight700, fontSize14, backgroundlinear-gradient(135deg,#FFF5C0,#FFE066,#F5C518,#B8860B), WebkitBackgroundCliptext, WebkitTextFillColortransparent }}{r.mult}div
              div style={{ displayflex, justifyContentcenter }}{r.game}div
            div
          );
        })}
      div
    div
  );
}

 ─── BOTTOM PROMOS ────────────────────────────────────────────────────────────
function BottomPromos({ setPage }) {
  const [cd, setCd] = useState({ d2, h10, m21, s7 });
  useEffect(() = {
    const t = setInterval(() = setCd(c = {
      let {d,h,m,s} = c; s--;
      if(s0){s=59;m--} if(m0){m=59;h--} if(h0){h=23;d--} if(d0){d=h=m=s=0}
      return {d,h,m,s};
    }), 1000);
    return () = clearInterval(t);
  }, []);
  const fmt = n = String(n).padStart(2,0);

  return (
    div style={{ padding8px 0 28px }}
      div style={{ displaygrid, gridTemplateColumns1fr 1fr, gap14 }}
        { Daily Bonus }
        div className=card-gold style={{ borderRadius16 }}
          div className=card-gold-inner style={{ padding26, positionrelative, minHeight220 }}
            div style={{ positionabsolute, inset0, borderRadius16,
              backgroundlinear-gradient(135deg, rgba(6,5,4,1) 55%, rgba(245,197,24,.04)) }} 
            div style={{ positionrelative, zIndex1 }}
              div style={{ fontFamily'Raleway',sans-serif, fontSize12, colorGOLD.g4, letterSpacing3, marginBottom8 }}
                ✦ DAILY BONUS
              div
              div style={{ fontFamily'Cinzel Decorative', cursive, fontWeight700,
                fontSizeclamp(13px,1.6vw,18px), color#fff, lineHeight1.5, marginBottom20 }}
                FREE COINSbr 
                span className=gold-text-staticEVERY 24 HOURS!span
              div
              div style={{ displayflex, gap8, marginBottom22, flexWrapwrap }}
                {[[d,DAYS],[h,HOURS],[m,MIN],[s,SEC]].map(([k,l]) = (
                  div key={l} className=cd-box
                    div className=cd-inner
                      div className=cd-num{fmt(cd[k])}div
                      div className=cd-lbl{l}div
                    div
                  div
                ))}
              div
              button className=btn-primary onClick={() = setPage(bonus)} style={{ padding10px 28px }}
                Claim Now
              button
            div
          div
        div

        { Right }
        div style={{ displayflex, flexDirectioncolumn, gap14 }}
          div className=card-gold style={{ borderRadius14, flex1, cursorpointer }} onClick={() = setPage(vip)}
            div className=card-gold-inner style={{ padding20, backgroundlinear-gradient(135deg,#110828,#1d1040) }}
              div style={{ fontFamily'Raleway',sans-serif, fontSize12, color#b060e0, letterSpacing3, marginBottom6 }}
                ✦ VIP CLUB
              div
              div style={{ fontFamily'Raleway',sans-serif, fontWeight400, fontSize18, color#fff, letterSpacing2 }}
                EXCLUSIVE REWARDS
              div
              div style={{ marginTop8, fontFamily'Inter',sans-serif, fontSize12, colorrgba(255,255,255,.4) }}
                Join 50,000+ elite members
              div
            div
          div
          div className=card-gold style={{ borderRadius14, flex1, cursorpointer }} onClick={() = setPage(signup)}
            div className=card-gold-inner style={{ padding20, backgroundlinear-gradient(135deg,#110800,#201400) }}
              div style={{ fontFamily'Raleway',sans-serif, fontSize12, colorGOLD.g4, letterSpacing3, marginBottom6 }}
                ✦ WELCOME BONUS
              div
              div className=gold-text-static style={{ fontFamily'Raleway',sans-serif, fontWeight400, fontSize20, letterSpacing2 }}
                $5,000 + 100 FS
              div
              div style={{ marginTop8, fontFamily'Inter',sans-serif, fontSize12, colorrgba(255,255,255,.4) }}
                First deposit match up to $5,000
              div
            div
          div
        div
      div
    div
  );
}

 ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  const cols = {
    RESOURCES [Bonuses,Promotions,VIP Club,Support,Payment Methods,Fair Play],
    COMPANY   [About Us,Careers,Affiliates,Terms & Conditions,Privacy Policy],
  };
  const socials = [
    { iconIcons.facebook, labelFacebook },
    { iconIcons.twitter,  labelTwitter  },
    { iconIcons.instagram,labelInstagram},
    { iconIcons.youtube,  labelYouTube  },
  ];
  return (
    footer style={{ backgroundGOLD.bgCard, borderTop`1px solid rgba(245,197,24,.1)`, padding44px 0 24px }}
      div style={{ maxWidth1440, margin0 auto, padding0 80px }}
        div className=footer-cols style={{ displaygrid, gridTemplateColumns2fr 1fr 1fr 2fr, gap44, marginBottom36 }}
          div
            div className=gold-text style={{ fontFamily'Cinzel Decorative', cursive, fontWeight900, fontSize22, letterSpacing4, marginBottom14 }}
              ✦ PINWIN
            div
            div style={{ fontFamily'Inter',sans-serif, fontSize13, colorrgba(255,255,255,.3), lineHeight1.8 }}
              Premium gaming entertainmentbr 
              platform for the discerning player.br 
              18+  Play Responsibly
            div
          div
          {Object.entries(cols).map(([col, items]) = (
            div key={col}
              div style={{ fontFamily'Raleway',sans-serif, fontWeight400, fontSize12,
                colorGOLD.g4, letterSpacing3, marginBottom16 }}{col}div
              {items.map(l = (
                div key={l} style={{ fontFamily'Inter',sans-serif, fontSize13,
                  colorrgba(255,255,255,.3), marginBottom8, cursorpointer, transitioncolor .2s }}
                  onMouseEnter={e=e.target.style.color=GOLD.g3}
                  onMouseLeave={e=e.target.style.color=rgba(255,255,255,.3)}{l}div
              ))}
            div
          ))}
          div
            div style={{ fontFamily'Raleway',sans-serif, fontWeight400, fontSize12,
              colorGOLD.g4, letterSpacing3, marginBottom16 }}FOLLOW USdiv
            div style={{ displayflex, gap10, marginBottom20 }}
              {socials.map(({ icon, label }) = (
                div key={label} className=sb-icon style={{ borderRadius10 }} title={label}{icon}div
              ))}
            div
            div style={{ displayflex, gap8, marginBottom10 }}
              div style={{ flex1 }}
                input placeholder=Enter Email Address style={{
                  width100%, backgroundGOLD.bgSurf,
                  border`1px solid rgba(245,197,24,.18)`, borderRadius8,
                  padding10px 14px, color#fff,
                  fontFamily'Inter',sans-serif, fontSize13, outlinenone,
                }} 
              div
              button className=btn-primary style={{ padding9px 18px, whiteSpacenowrap }}Subscribebutton
            div
            label style={{ displayflex, alignItemsflex-start, gap8, cursorpointer }}
              input type=checkbox style={{ accentColorGOLD.g3, marginTop3 }} 
              span style={{ fontFamily'Inter',sans-serif, fontSize12, colorrgba(255,255,255,.3), lineHeight1.6 }}
                Get exclusive offers and big win alerts
              span
            label
          div
        div
        div style={{ borderTop`1px solid rgba(255,255,255,.06)`, paddingTop20,
          displayflex, justifyContentspace-between, alignItemscenter, flexWrapwrap, gap10 }}
          div style={{ fontFamily'Inter',sans-serif, fontSize12, colorrgba(255,255,255,.2) }}
            © 2025 PINWIN. All rights reserved. Licensed & Regulated.
          div
          div style={{ displayflex, gap24 }}
            {[🔒 SSL Secured,18+ Only,Fast Payouts].map(t = (
              span key={t} style={{ fontFamily'Inter',sans-serif, fontSize12, colorrgba(255,255,255,.2) }}{t}span
            ))}
          div
        div
      div
    footer
  );
}

 ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ setPage, triggerWin }) {
  return (
    div className=page-in main-pad style={{ paddingLeft68 }}
      div style={{ maxWidth1440, margin0 auto, padding0 24px }}
        HeroSection setPage={setPage} 
        GameCategories setPage={setPage} 
        SlotGamesRow setPage={setPage} 
        div className=no-scrollbar style={{ displayflex, gap8, overflowXauto, padding8px 0 14px }}
          {[PLINKO,ROULETTE,SLOT,MINES,AVIATOR,DICE,DARTS,GOAL,POKER].map(c = (
            div key={c} className=card-gold style={{ borderRadius8, flexShrink0 }}
              div className=card-gold-inner style={{ padding7px 16px }}
                span style={{ fontFamily'Inter',sans-serif, fontWeight600,
                  fontSize11, letterSpacing.5 }} className=gold-text-static{c}span
              div
            div
          ))}
        div
        JackpotBanner setPage={setPage} 
        WinnersTable 
        BottomPromos setPage={setPage} 
      div
      Footer 
    div
  );
}

 ─── SLOTS PAGE ───────────────────────────────────────────────────────────────
function SlotsPage({ triggerWin }) {
  const symbols = [♠,♥,♦,♣,★,7,A,K];
  const symColors = [#fff,#e55,#e55,#fff,GOLD.g2,GOLD.g1,#fff,#fff];
  const [reels, setReels] = useState([[0,1,2],[3,4,5],[6,7,0]]);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [bet, setBet] = useState(1.0);
  const [balance, setBalance] = useState(1000.0);

  const spin = useCallback(() = {
    if (spinning) return;
    setSpinning(true); setResult(null);
    setBalance(b = b - bet);
    let frame = 0;
    const dur = 2000 + Math.random()1000;
    const iv = setInterval(() = {
      setReels([
        [Math.floor(Math.random()8),Math.floor(Math.random()8),Math.floor(Math.random()8)],
        [Math.floor(Math.random()8),Math.floor(Math.random()8),Math.floor(Math.random()8)],
        [Math.floor(Math.random()8),Math.floor(Math.random()8),Math.floor(Math.random()8)],
      ]);
      frame += 60;
      if (frame  dur) {
        clearInterval(iv);
        const fr = [
          [Math.floor(Math.random()8),Math.floor(Math.random()8),Math.floor(Math.random()8)],
          [Math.floor(Math.random()8),Math.floor(Math.random()8),Math.floor(Math.random()8)],
          [Math.floor(Math.random()8),Math.floor(Math.random()8),Math.floor(Math.random()8)],
        ];
        if (Math.random()  .30) { const s=Math.floor(Math.random()8); fr[0][1]=fr[1][1]=fr[2][1]=s; }
        setReels(fr);
        setSpinning(false);
        const mid=[fr[0][1],fr[1][1],fr[2][1]];
        if(mid[0]===mid[1]&&mid[1]===mid[2]){
          const prize=bet[5,10,50,15,20,100,8,25][mid[0]];
          setResult({wintrue,prize}); setBalance(b=b+prize); triggerWin(prize);
        } else { setResult({winfalse}); }
      }
    }, 60);
  }, [spinning,bet,triggerWin]);

  return (
    div className=page-in main-pad style={{ paddingLeft68 }}
      div style={{ maxWidth660, margin0 auto, padding32px 24px }}
        div style={{ textAligncenter, marginBottom28 }}
          div className=gold-text style={{ fontFamily'Cinzel Decorative', cursive, fontWeight900, fontSize26, letterSpacing4 }}
            ✦ GOLDEN REELS
          div
          div style={{ fontFamily'Inter',sans-serif, fontSize14, colorrgba(255,255,255,.4), marginTop6 }}
            Spin to Win — Up to 100× Multiplier
          div
        div
        div style={{ displayflex, justifyContentspace-between, marginBottom18,
          backgroundGOLD.bgSurf, borderRadius10, padding12px 20px,
          border`1px solid rgba(245,197,24,.12)` }}
          divdiv style={{ fontFamily'Inter',sans-serif, fontSize11, colorrgba(255,255,255,.3) }}BALANCEdiv
            div className=tabnum style={{ fontSize20, colorGOLD.green, fontWeight700 }}${balance.toFixed(2)}divdiv
          div style={{ textAlignright }}
            div style={{ fontFamily'Inter',sans-serif, fontSize11, colorrgba(255,255,255,.3) }}BETdiv
            div className=tabnum gold-text-static style={{ fontSize20, fontWeight700 }}${bet.toFixed(2)}divdiv
        div

        div style={{ backgroundlinear-gradient(180deg,#140e00,#080600),
          border`2px solid ${GOLD.g5}`, borderRadius20, padding24,
          boxShadow`0 0 40px rgba(245,197,24,.15), inset 0 0 40px rgba(0,0,0,.5)`,
          animation result.win  winFlash .5s ease 3  none }}
          div style={{ displayflex, gap10, justifyContentcenter, marginBottom18 }}
            {reels.map((reel, ri) = (
              div key={ri} style={{ flex1, background#020100, borderRadius12,
                border`1px solid rgba(245,197,24,.2)`, overflowhidden, height180, positionrelative }}
                div style={{ positionabsolute, top33%, left0, right0, height34%,
                  background result.win  rgba(245,197,24,.08)  transparent,
                  border result.win  `1px solid rgba(245,197,24,.4)`  none,
                  zIndex2, transitionall .3s }} 
                div style={{ displayflex, flexDirectioncolumn, height300% }}
                  {reel.map((s,si) = (
                    div key={si} style={{ flex1, displayflex, alignItemscenter, justifyContentcenter,
                      fontFamily'Playfair Display',serif, fontSize44, fontWeight900,
                      color spinning  rgba(255,255,255,.3)  symColors[s],
                      filter spinning  blur(3px)  `drop-shadow(0 0 8px ${symColors[s]})`,
                      transitionfilter .1s }}{symbols[s]}div
                  ))}
                div
              div
            ))}
          div
          div style={{ displayflex, alignItemscenter, gap8, justifyContentcenter, marginBottom14 }}
            div style={{ height1, flex1, backgroundrgba(245,197,24,.2) }} 
            span style={{ fontFamily'Raleway',sans-serif, fontSize11, colorGOLD.g5, letterSpacing3 }}WIN LINEspan
            div style={{ height1, flex1, backgroundrgba(245,197,24,.2) }} 
          div
          {result && (
            div style={{ textAligncenter, padding10, borderRadius8, marginBottom10,
              background result.win  rgba(0,230,118,.08)  rgba(255,61,61,.08),
              border`1px solid ${result.win  GOLD.green  GOLD.red}`,
              animationscaleIn .3s ease }}
              {result.win
                 span className=tabnum style={{ colorGOLD.green, fontSize15, fontWeight700 }}✦ WIN! +${result.prize.toFixed(2)}span
                 span style={{ fontFamily'Inter',sans-serif, colorGOLD.red, fontSize13 }}Try again — fortune favours the bold!span}
            div
          )}
        div

        div style={{ displayflex, gap8, marginTop16, marginBottom14 }}
          {[0.10,0.50,1.0,5.0,10.0].map(v = (
            button key={v} className=btn-ghost onClick={() = setBet(v)} style={{
              flex1, padding7px 0, fontSize12,
              background bet===v  rgba(245,197,24,.1)  transparent,
            }}${v}button
          ))}
        div
        button className=btn-primary onClick={spin} disabled={spinning} style={{
          width100%, padding17px, fontSize16, letterSpacing3, borderRadius12,
          justifyContentcenter, opacity spinning  .7  1,
          animation spinning  wiggle .3s ease infinite  pulseGold 2s ease-in-out infinite,
        }}
          {spinning  ⟳  SPINNING...  SPIN}
        button
      div
    div
  );
}

 ─── ROULETTE ─────────────────────────────────────────────────────────────────
function RoulettePage({ triggerWin }) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [betType, setBetType] = useState(red);
  const [amount, setAmount] = useState(10);
  const [balance, setBalance] = useState(1000);
  const wheelRef = useRef(null);
  const redNums = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);

  const doSpin = () = {
    if (spinning) return;
    setSpinning(true); setResult(null);
    setBalance(b = b - amount);
    if (wheelRef.current) {
      wheelRef.current.style.transition = transform 4s cubic-bezier(.2,.8,.4,1);
      wheelRef.current.style.transform = `rotate(${1800+Math.random()360}deg)`;
    }
    setTimeout(() = {
      const num = Math.floor(Math.random()37);
      const isRed = redNums.has(num);
      const won = (betType===red&&isRed)(betType===black&&num0&&!isRed)(betType===green&&num===0);
      const prize = won  amount(betType===green352)  0;
      setResult({ num, isRed, won, prize });
      setSpinning(false);
      if(won){setBalance(b=b+prize);triggerWin(prize);}
    }, 4100);
  };

  const numBg = n = n===0#006633redNums.has(n)#991100#111;

  return (
    div className=page-in main-pad style={{ paddingLeft68 }}
      div style={{ maxWidth700, margin0 auto, padding32px 24px }}
        div style={{ textAligncenter, marginBottom22 }}
          div className=gold-text style={{ fontFamily'Cinzel Decorative', cursive, fontWeight900, fontSize26, letterSpacing4 }}✦ LIVE ROULETTEdiv
        div
        div style={{ displayflex, justifyContentspace-between, marginBottom18,
          backgroundGOLD.bgSurf, borderRadius10, padding12px 20px, border`1px solid rgba(245,197,24,.12)` }}
          divdiv style={{ fontFamily'Inter',sans-serif, fontSize11, colorrgba(255,255,255,.3) }}BALANCEdiv
            div className=tabnum style={{ fontSize20, colorGOLD.green, fontWeight700 }}${balance.toFixed(2)}divdiv
          {result && div style={{ textAligncenter }}
            div style={{ fontFamily'Inter',sans-serif, fontSize11, colorrgba(255,255,255,.3) }}RESULTdiv
            div style={{ width44, height44, borderRadius50%, backgroundnumBg(result.num),
              displayflex, alignItemscenter, justifyContentcenter,
              fontFamily'Rajdhani',sans-serif, fontWeight900, fontSize16, color#fff,
              border`2px solid ${GOLD.g4}`, margin0 auto }}{result.num}div
          div}
        div
        div style={{ displayflex, justifyContentcenter, marginBottom22 }}
          div style={{ width260, height260, positionrelative }}
            div ref={wheelRef} style={{ width100%, height100%, borderRadius50%,
              backgroundconic-gradient(from 0deg,#005522 0deg 9.7deg,#111 9.7deg 19.4deg,#991100 19.4deg 29.2deg,#111 29.2deg 38.9deg,#991100 38.9deg 48.6deg,#111 48.6deg 58.4deg,#991100 58.4deg 68.1deg,#111 68.1deg 77.8deg,#991100 77.8deg 87.5deg,#111 87.5deg 97.2deg,#991100 97.2deg 107deg,#111 107deg 116.7deg,#991100 116.7deg 126.4deg,#111 126.4deg 136.1deg,#991100 136.1deg 145.8deg,#111 145.8deg 155.6deg,#991100 155.6deg 165.3deg,#111 165.3deg 175deg,#991100 175deg 184.7deg,#111 184.7deg 360deg),
              border`4px solid ${GOLD.g4}`, boxShadow`0 0 36px rgba(245,197,24,.25)` }}
              div style={{ positionabsolute, inset20%, borderRadius50%,
                background#060300, border`3px solid ${GOLD.g5}`,
                displayflex, alignItemscenter, justifyContentcenter }}
                div className=gold-text-static style={{ fontFamily'Cinzel Decorative', cursive, fontSize11, fontWeight700, textAligncenter, letterSpacing2 }}PINbrWINdiv
              div
            div
            div style={{ positionabsolute, top-8, left50%, transformtranslateX(-50%),
              width0, height0, borderLeft8px solid transparent, borderRight8px solid transparent, borderTop`24px solid ${GOLD.g3}` }} 
          div
        div
        div style={{ displayflex, gap10, marginBottom14, justifyContentcenter }}
          {[[red,RED,2,#881100],[black,BLACK,2,#222],[green,ZERO,35,#005522]].map(([v,l,m,bg]) = (
            button key={v} onClick={() = setBetType(v)} style={{
              flex1, padding12px, borderRadius10, cursorpointer,
              fontFamily'Inter',sans-serif, fontWeight700, fontSize12, letterSpacing.5,
              background betType===v  bg  rgba(255,255,255,.04),
              border`2px solid ${betType===v  GOLD.g4  rgba(255,255,255,.1)}`,
              color#fff, transitionall .2s,
            }}{l}brspan style={{ fontSize9, colorrgba(255,255,255,.45) }}{m}× payoutspanbutton
          ))}
        div
        div style={{ displayflex, gap8, marginBottom14 }}
          {[5,10,25,50,100].map(v = (
            button key={v} className=btn-ghost onClick={() = setAmount(v)} style={{
              flex1, padding8px, fontSize12,
              background amount===v  rgba(245,197,24,.1)  transparent,
            }}${v}button
          ))}
        div
        {result && (
          div style={{ textAligncenter, padding12, borderRadius10, marginBottom14,
            background result.won  rgba(0,230,118,.08)  rgba(255,61,61,.08),
            border`1px solid ${result.wonGOLD.greenGOLD.red}`, animationscaleIn .3s ease }}
            {result.won
               span className=tabnum style={{ colorGOLD.green, fontSize15, fontWeight700 }}✦ WIN! +${result.prize.toFixed(2)}span
               span style={{ fontFamily'Inter',sans-serif, colorGOLD.red, fontSize13 }}Better luck next time!span}
          div
        )}
        button className=btn-primary onClick={doSpin} disabled={spinning} style={{
          width100%, padding15px, fontSize15, letterSpacing2, borderRadius12,
          justifyContentcenter, opacityspinning.71,
        }}{spinning⟳  SPINNING...SPIN THE WHEEL}button
      div
    div
  );
}

 ─── CRASH ────────────────────────────────────────────────────────────────────
function CrashPage({ triggerWin }) {
  const [mult, setMult] = useState(1.00);
  const [state, setState] = useState(idle);
  const [cashedOut, setCashedOut] = useState(null);
  const [bet, setBet] = useState(10);
  const [balance, setBalance] = useState(1000);
  const crashAt = useRef(1);
  const iv = useRef(null);

  const start = () = {
    if (state===running) return;
    setState(running); setMult(1.00); setCashedOut(null);
    crashAt.current = 1.3 + Math.random()18;
    setBalance(b = b-bet);
    let m = 1.00;
    iv.current = setInterval(() = {
      m += .01+m.003; setMult(parseFloat(m.toFixed(2)));
      if(m=crashAt.current){clearInterval(iv.current);setState(crashed);setMult(parseFloat(crashAt.current.toFixed(2)));}
    },80);
  };
  const cashOut = () = {
    if(state!==runningcashedOut) return;
    clearInterval(iv.current);
    const prize=betmult; setCashedOut(mult); setState(cashout);
    setBalance(b=b+prize); triggerWin(prize);
  };
  useEffect(()=()=clearInterval(iv.current),[]);
  const mc = m = m2#fffm5GOLD.g2m10#FF9800GOLD.red;

  return (
    div className=page-in main-pad style={{ paddingLeft68 }}
      div style={{ maxWidth660, margin0 auto, padding32px 24px }}
        div style={{ textAligncenter, marginBottom20 }}
          div className=gold-text style={{ fontFamily'Cinzel Decorative', cursive, fontWeight900, fontSize26, letterSpacing4 }}✦ CRASHdiv
          div style={{ fontFamily'Inter',sans-serif, fontSize14, colorrgba(255,255,255,.4), marginTop6 }}Cash out before the rocket crashes!div
        div
        div style={{ displayflex, justifyContentspace-between, marginBottom18,
          backgroundGOLD.bgSurf, borderRadius10, padding12px 20px, border`1px solid rgba(245,197,24,.12)` }}
          divdiv style={{ fontFamily'Inter',sans-serif, fontSize11, colorrgba(255,255,255,.3) }}BALANCEdiv
            div className=tabnum style={{ fontSize20, colorGOLD.green, fontWeight700 }}${balance.toFixed(2)}divdiv
          div style={{ textAlignright }}
            div style={{ fontFamily'Inter',sans-serif, fontSize11, colorrgba(255,255,255,.3) }}BETdiv
            div className=tabnum gold-text-static style={{ fontSize20, fontWeight700 }}${bet.toFixed(2)}divdiv
        div
        div style={{ height270, borderRadius16, positionrelative, overflowhidden,
          backgroundlinear-gradient(135deg,#040010,#09041a),
          border`2px solid ${state===crashedGOLD.redstate===cashoutGOLD.greenrgba(245,197,24,.25)}`,
          displayflex, alignItemscenter, justifyContentcenter, marginBottom18,
          boxShadow`0 0 30px ${state===crashedrgba(255,61,61,.2)rgba(245,197,24,.08)}` }}
          {Array.from({length25}).map((_,i)=(
            div key={i} style={{ positionabsolute, left`${(i4.2)%100}%`, top`${(i7.3)%100}%`,
              width2, height2, borderRadius50%, background#fff, opacityMath.random().5 }} 
          ))}
          div style={{ positionabsolute,
            bottom`${state===runningMath.min((mult-1)8,60)20}%`,
            left`${state===runningMath.min((mult-1)5,60)20}%`,
            fontSize44, transitionbottom .08s linear,left .08s linear,
            transformstate===crashedrotate(90deg)rotate(-45deg),
            filterstate===running&&mult5`drop-shadow(0 0 12px orange)`none }}🚀div
          div style={{ textAligncenter, zIndex1 }}
            div className=tabnum style={{ fontSizeclamp(56px,11vw,96px), fontWeight900,
              colorstate===crashedGOLD.redstate===cashoutGOLD.greenmc(mult),
              textShadow`0 0 28px currentColor`, lineHeight1, transitioncolor .2s }}
              {mult.toFixed(2)}×
            div
            div style={{ fontFamily'Inter',sans-serif, fontSize12, letterSpacing1, marginTop8,
              colorstate===crashedGOLD.redstate===cashoutGOLD.greenrgba(255,255,255,.35) }}
              {state===crashed✦ CRASHEDstate===cashout✦ CASHED OUTstate===idlePLACE YOUR BETFLYING...}
            div
          div
        div
        div style={{ displayflex, gap8, marginBottom12 }}
          {[5,10,25,50,100].map(v=(
            button key={v} className=btn-ghost onClick={()=state!==running&&setBet(v)} style={{
              flex1, padding8px, fontSize12, backgroundbet===vrgba(245,197,24,.1)transparent,
              opacitystate===running.51 }}${v}button
          ))}
        div
        div style={{ displayflex, gap12 }}
          button className=btn-primary onClick={start} disabled={state===running} style={{
            flex1, padding15px, fontSize14, letterSpacing1, borderRadius12, justifyContentcenter,
            opacitystate===running.41 }}
            {state===crashedstate===cashoutNEW ROUNDSTART}
          button
          button onClick={cashOut} disabled={state!==running!!cashedOut} style={{
            flex1, padding15px, borderRadius12, fontSize13, cursorstate===running&&!cashedOutpointernot-allowed,
            backgroundstate===running&&!cashedOut`linear-gradient(135deg,#004422,${GOLD.green})`rgba(255,255,255,.04),
            border`2px solid ${GOLD.green}`, colorstate===running&&!cashedOut#000GOLD.green,
            fontFamily'Inter',sans-serif, fontWeight700, letterSpacing.5, transitionall .2s,
            animationstate===running&&!cashedOutpulseGold .8s ease infinitenone }}
            CASH OUTbrspan className=tabnum style={{ fontSize11 }}${(betmult).toFixed(2)}span
          button
        div
      div
    div
  );
}

 ─── MINES ────────────────────────────────────────────────────────────────────
function MinesPage({ triggerWin }) {
  const [mines, setMines] = useState(new Set());
  const [revealed, setRevealed] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [mult, setMult] = useState(1.0);
  const [bet, setBet] = useState(10);
  const [balance, setBalance] = useState(1000);
  const [started, setStarted] = useState(false);
  const [mCount, setMCount] = useState(5);

  const newGame = () = {
    const m = new Set();
    while(m.sizemCount) m.add(Math.floor(Math.random()25));
    setMines(m); setRevealed(new Set()); setGameOver(false); setGameWon(false);
    setMult(1.0); setStarted(true); setBalance(b=b-bet);
  };
  const reveal = i = {
    if(!startedgameOvergameWonrevealed.has(i)) return;
    if(mines.has(i)){setRevealed(new Set([...revealed,i]));setGameOver(true);}
    else { const nr=new Set([...revealed,i]); setRevealed(nr); setMult(parseFloat((1+nr.size(mCount.3)).toFixed(2))); }
  };
  const cashOut = () = {
    if(!startedgameOvergameWonrevealed.size===0) return;
    const prize=betmult; setBalance(b=b+prize); setGameWon(true); triggerWin(prize);
  };

  return (
    div className=page-in main-pad style={{ paddingLeft68 }}
      div style={{ maxWidth580, margin0 auto, padding32px 24px }}
        div style={{ textAligncenter, marginBottom20 }}
          div className=gold-text style={{ fontFamily'Cinzel Decorative', cursive, fontWeight900, fontSize26, letterSpacing4 }}✦ MINESdiv
          div style={{ fontFamily'Inter',sans-serif, fontSize14, colorrgba(255,255,255,.4), marginTop6 }}Avoid mines — collect gems!div
        div
        div style={{ displayflex, justifyContentspace-between, marginBottom16,
          backgroundGOLD.bgSurf, borderRadius10, padding12px 20px, border`1px solid rgba(245,197,24,.12)` }}
          divdiv style={{ fontFamily'Inter',sans-serif, fontSize11, colorrgba(255,255,255,.3) }}BALANCEdiv
            div className=tabnum style={{ fontSize20, colorGOLD.green, fontWeight700 }}${balance.toFixed(2)}divdiv
          div style={{ textAligncenter }}
            div style={{ fontFamily'Inter',sans-serif, fontSize11, colorrgba(255,255,255,.3) }}MULTIPLIERdiv
            div className=tabnum gold-text-static style={{ fontSize20, fontWeight700 }}{mult.toFixed(2)}×divdiv
          div style={{ textAlignright }}
            div style={{ fontFamily'Inter',sans-serif, fontSize11, colorrgba(255,255,255,.3) }}MINESdiv
            div className=tabnum style={{ fontSize20, colorGOLD.red, fontWeight700 }}{mCount}divdiv
        div
        div style={{ displaygrid, gridTemplateColumnsrepeat(5,1fr), gap8, marginBottom14 }}
          {Array.from({length25},(_,i)={
            const isRev=revealed.has(i), isMine=mines.has(i)&&(gameOvergameWon), isHit=mines.has(i)&&gameOver&&revealed.has(i);
            return (
              div key={i} onClick={()=reveal(i)} style={{
                height78, borderRadius10, cursorstarted&&!gameOver&&!gameWon&&!isRevpointerdefault,
                backgroundisHitrgba(255,61,61,.2)isMinergba(255,61,61,.07)isRevrgba(0,230,118,.08)GOLD.bgSurf,
                border`1px solid ${isHitGOLD.redisMinergba(255,61,61,.25)isRevGOLD.greenrgba(245,197,24,.12)}`,
                displayflex, alignItemscenter, justifyContentcenter,
                transitionall .2s, transformisRevscale(1)scale(.97),
                animationisRev&&!isMinescaleIn .2s easenone,
              }}
                {isMine
                   svg width={28} height={28} viewBox=0 0 24 24 fill=nonepath d=M17.73 4.27a4 4 0 00-5.46 0L4 12.54a4 4 0 000 5.65 4 4 0 005.65 0l8.27-8.27a4 4 0 00-.19-5.65zM20 7l-2-2 stroke={GOLD.red} strokeWidth=1.5 strokeLinecap=round strokeLinejoin=roundsvg
                   isRev
                     svg width={26} height={26} viewBox=0 0 24 24 fill=url(#iconGold)path d=M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6zsvg
                     started&&!gameOver&&!gameWon
                       div style={{ width10, height10, borderRadius50%, backgroundrgba(245,197,24,.2), border`1px solid rgba(245,197,24,.3)` }} 
                       null}
              div
            );
          })}
        div
        {(gameOvergameWon)&&(
          div style={{ textAligncenter, padding12, borderRadius10, marginBottom12,
            backgroundgameWonrgba(0,230,118,.08)rgba(255,61,61,.08),
            border`1px solid ${gameWonGOLD.greenGOLD.red}`, animationscaleIn .3s ease }}
            {gameWon
               span className=tabnum style={{ colorGOLD.green, fontSize15, fontWeight700 }}✦ CASHED OUT! +${(betmult).toFixed(2)}span
               span style={{ fontFamily'Inter',sans-serif, colorGOLD.red, fontSize13 }}You struck a mine!span}
          div
        )}
        div style={{ displayflex, gap8, marginBottom12 }}
          {[5,10,25,50,100].map(v=(
            button key={v} className=btn-ghost onClick={()=!started&&setBet(v)} style={{
              flex1, padding7px, fontSize11, backgroundbet===vrgba(245,197,24,.1)transparent }}${v}button
          ))}
        div
        div style={{ displayflex, gap10 }}
          button className=btn-primary onClick={newGame} style={{ flex1, padding14px, fontSize13, borderRadius10, justifyContentcenter }}
            {started&&!gameOver&&!gameWonRESTARTNEW GAME}
          button
          {started&&!gameOver&&!gameWon&&revealed.size0&&(
            button onClick={cashOut} style={{
              flex1, padding14px, borderRadius10, fontSize13, cursorpointer,
              background`linear-gradient(135deg,#004422,${GOLD.green})`,
              bordernone, color#000, fontFamily'Inter',sans-serif, fontWeight700 }}
              CASH OUT ${(betmult).toFixed(2)}
            button
          )}
        div
      div
    div
  );
}

 ─── PLACEHOLDER ─────────────────────────────────────────────────────────────
function PlaceholderPage({ title, icon, desc, setPage }) {
  return (
    div className=page-in main-pad style={{ paddingLeft68 }}
      div style={{ maxWidth660, margin80px auto, padding0 24px, textAligncenter }}
        div style={{ marginBottom20, filter`drop-shadow(0 0 20px ${GOLD.glow})`, animationfloat 3s ease-in-out infinite }}
          svg width={80} height={80} viewBox=0 0 24 24 fill=none{icon.props.children}svg
        div
        div className=gold-text style={{ fontFamily'Cinzel Decorative', cursive, fontWeight900, fontSize28, letterSpacing4, marginBottom14 }}{title}div
        div style={{ fontFamily'Inter',sans-serif, fontSize15, colorrgba(255,255,255,.45), lineHeight1.8, marginBottom32 }}{desc}div
        div style={{ displayflex, gap14, justifyContentcenter }}
          button className=btn-primary onClick={() = setPage(home)} style={{ padding12px 32px }}← Back to Lobbybutton
          button className=btn-ghost style={{ padding11px 28px }}Learn Morebutton
        div
      div
    div
  );
}

 ─── AUTH PAGES ───────────────────────────────────────────────────────────────
function AuthPage({ mode, setPage }) {
  const isLogin = mode===login;
  const fields = isLogin  [Email Address,Password]  [Username,Email Address,Password,Confirm Password];
  return (
    div className=page-in main-pad style={{ paddingLeft68, displayflex, alignItemscenter, minHeight80vh }}
      div style={{ maxWidth460, margin0 auto, width100%, padding0 24px }}
        div style={{ textAligncenter, marginBottom28 }}
          div className=gold-text style={{ fontFamily'Cinzel Decorative', cursive, fontWeight900, fontSize26, letterSpacing4, marginBottom10 }}✦ PINWINdiv
          {!isLogin && div className=jackpot-num style={{ fontSize28, marginBottom8 }}$5,000 + 100 Free Spinsdiv}
          div style={{ fontFamily'Inter',sans-serif, fontSize14, colorrgba(255,255,255,.4) }}
            {isLogin  Welcome back. Sign in to continue.  Create your account to claim your bonus.}
          div
        div
        div className=card-gold style={{ borderRadius18 }}
          div className=card-gold-inner style={{ padding32 }}
            {fields.map(l = (
              div key={l} style={{ marginBottom16 }}
                div style={{ fontFamily'Raleway',sans-serif, fontSize12, colorGOLD.g4, letterSpacing2, marginBottom6 }}{l.toUpperCase()}div
                input type={l.toLowerCase().includes(password)passwordl.toLowerCase().includes(email)emailtext}
                  placeholder={l} style={{
                    width100%, backgroundGOLD.bgSurf, border`1px solid rgba(245,197,24,.18)`,
                    borderRadius8, padding11px 14px, color#fff,
                    fontFamily'Inter',sans-serif, fontSize14, outlinenone }} 
              div
            ))}
            button className=btn-primary onClick={() = setPage(home)} style={{
              width100%, padding14px, fontSize15, marginTop8, borderRadius10, justifyContentcenter }}
              {isLogin  Sign In  Create Account & Claim Bonus}
            button
            div style={{ textAligncenter, marginTop16, fontFamily'Inter',sans-serif, fontSize14, colorrgba(255,255,255,.3) }}
              {isLogin  No account span style={{ colorGOLD.g3, cursorpointer }} onClick={()=setPage(signup)}Sign Upspan
                        Have an account span style={{ colorGOLD.g3, cursorpointer }} onClick={()=setPage(login)}Loginspan}
            div
          div
        div
      div
    div
  );
}

 ─── APP ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState(home);
  const [win, setWin] = useState({ showfalse, amount0 });
  const [particles, setParticles] = useState(false);

  const nav = useCallback(p = { setPage(p); window.scrollTo({top0,behaviorsmooth}); }, []);
  const triggerWin = useCallback(amt = { setWin({showtrue,amountamt}); setParticles(true); }, []);
  const closeWin = useCallback(() = setWin({showfalse,amount0}), []);

  const render = () = {
    switch(page){
      case home       return HomePage     setPage={nav} triggerWin={triggerWin} ;
      case slots      return SlotsPage    triggerWin={triggerWin} ;
      case roulette   return RoulettePage triggerWin={triggerWin} ;
      case crash      return CrashPage    triggerWin={triggerWin} ;
      case mines      return MinesPage    triggerWin={triggerWin} ;
      case login      return AuthPage mode=login  setPage={nav} ;
      case signup     return AuthPage mode=signup setPage={nav} ;
      case vip        return PlaceholderPage title=VIP CLUB    icon={Icons.crown}  desc=Exclusive rewards for our most loyal players. Earn points, climb tiers, and unlock premium benefits including cashback, personal managers, and exclusive tournaments. setPage={nav};
      case bonus      return PlaceholderPage title=DAILY BONUS  icon={Icons.gift}   desc=Claim your free coins every 24 hours! The longer your streak, the bigger the reward. Log in daily to keep the fortune flowing. setPage={nav};
      case tournament return PlaceholderPage title=TOURNAMENTS  icon={Icons.trophy} desc=Compete with thousands of players worldwide in live tournaments. Win massive prize pools and earn your place on the leaderboard! setPage={nav};
      case plinko     return PlaceholderPage title=PLINKO       icon={Icons.dice}   desc=Drop the ball and watch it bounce for massive multipliers! Choose your risk level and see where fortune takes you. setPage={nav};
      case cards      return PlaceholderPage title=CARD GAMES   icon={Icons.card}   desc=Classic card games including Blackjack, Baccarat, and Poker. Play against the house or join live dealer tables. setPage={nav};
      case dice       return PlaceholderPage title=DICE         icon={Icons.dice}   desc=Roll the dice and test your luck! Set your own target number and multiplier. Simple, fast, and rewarding. setPage={nav};
      case favorites  return PlaceholderPage title=FAVOURITES   icon={Icons.star}   desc=Your saved favourite games, all in one place. Quick access to the games you love the most. setPage={nav};
      case profile    return PlaceholderPage title=MY PROFILE   icon={Icons.user}   desc=View your game history, manage deposits and withdrawals, update account settings, and track VIP progress. setPage={nav};
      case settings   return PlaceholderPage title=SETTINGS     icon={Icons.settings} desc=Manage account preferences, notifications, privacy controls, and responsible gaming limits. setPage={nav};
      default           return HomePage setPage={nav} triggerWin={triggerWin} ;
    }
  };

  return (
    div style={{ backgroundGOLD.bg, minHeight100vh, color#fff }}
      style{STYLES}style
      SvgDefs 
      Particles active={particles} onDone={()=setParticles(false)} 
      WinOverlay show={win.show} amount={win.amount} onClose={closeWin} 
      Header setPage={nav} 
      Sidebar setPage={nav} activePage={page} 
      main{render()}main
    div
  );
}