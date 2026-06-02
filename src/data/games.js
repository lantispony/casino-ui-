export const games = [
  {
    id: 'slots',
    name: 'Golden Slots',
    tagline: 'SPIN & WIN BIG',
    description: 'Classic 3-reel slot machine. Match the jackpot symbols for massive payouts.',
    icon: '🎰',
    phIcon: 'Coin',
    bgClass: 'bg-slots',
    popular: true,
  },
  {
    id: 'roulette',
    name: 'Royal Roulette',
    tagline: 'WHERE THE BALL LANDS',
    description: 'European roulette at its finest. Predict where the ball stops.',
    icon: '🎡',
    phIcon: 'Compass',
    bgClass: 'bg-roulette',
    popular: true,
  },
  {
    id: 'baccarat',
    name: 'Baccarat Supreme',
    tagline: 'PLAYER VS BANKER',
    description: 'The classic card game of elegance and high stakes.',
    icon: '🃏',
    phIcon: 'Cards',
    bgClass: 'bg-baccarat',
    popular: true,
  },
  {
    id: 'dice',
    name: 'Sic Bo',
    tagline: 'ROLL THE BONES',
    description: 'Ancient Chinese dice game. Big or small, pick your fate.',
    icon: '🎲',
    phIcon: 'DiceFive',
    bgClass: 'bg-dice',
    popular: false,
  },
  {
    id: 'fish',
    name: 'Fishing King',
    tagline: 'HUNT THE DEEP',
    description: 'Blast fish for coins. The bigger the fish, the bigger the prize.',
    icon: '🐟',
    phIcon: 'Fish',
    bgClass: 'bg-fish',
    popular: false,
  },
  {
    id: 'lottery',
    name: 'Instant Lottery',
    tagline: 'EVERY MINUTE WINS',
    description: 'Fast-paced lottery draw every 60 seconds.',
    icon: '🎯',
    phIcon: 'Target',
    bgClass: 'bg-lottery',
    popular: false,
  },
];

export const banners = [
  {
    id: 1,
    title: '100% WELCOME BONUS',
    subtitle: 'Double your first deposit — up to $10,000 FREE',
    tag: 'NEW',
    gradient: 'linear-gradient(135deg, #1A0A00, #3D1A00)',
  },
  {
    id: 2,
    title: '$50,000 DAILY JACKPOT',
    subtitle: 'One lucky player wins big every single day',
    tag: 'JACKPOT',
    gradient: 'linear-gradient(135deg, #0A001A, #2D0040)',
    image: '/images/banner_girl_02.png',
  },
  {
    id: 3,
    title: 'VIP GOLDEN WEEKEND',
    subtitle: 'Triple rewards, exclusive tables, cashback boost',
    tag: 'VIP',
    gradient: 'linear-gradient(135deg, #001A0A, #003D1A)',
    image: '/images/banner_girl_03.png',
  },
];

export const userStats = {
  username: 'HIGHROLLER',
  balance: 888888,
  level: 'Gold VIP',
  levelIcon: '👑',
  todayProfit: 15800,
  totalDeposit: 500000,
  totalWithdraw: 320000,
  memberSince: '2024-06',
};

export const transactions = [
  { id: 1, type: 'deposit', amount: 10000, status: 'success', date: '2026-05-28 14:30', method: 'Bank Transfer' },
  { id: 2, type: 'withdraw', amount: 5000, status: 'success', date: '2026-05-28 10:15', method: 'USDT' },
  { id: 3, type: 'game', amount: -2000, status: 'success', date: '2026-05-27 22:00', method: 'Golden Slots' },
  { id: 4, type: 'game', amount: 8000, status: 'success', date: '2026-05-27 21:30', method: 'Royal Roulette' },
  { id: 5, type: 'deposit', amount: 50000, status: 'pending', date: '2026-05-27 15:00', method: 'Bank Transfer' },
  { id: 6, type: 'withdraw', amount: 2000, status: 'failed', date: '2026-05-26 09:00', method: 'USDT' },
];

export const events = [
  { id: 1, title: 'New Member Bonus', desc: 'Deposit $100+ get $100 FREE + 50 free spins', tag: 'NEW', color: '#FFD700' },
  { id: 2, title: 'Daily Check-in', desc: 'Check in daily for rewards. 7-day streak = mega bonus', tag: 'DAILY', color: '#FF4500' },
  { id: 3, title: 'Refer a Friend', desc: 'Share the wealth. You and your friend both get $500', tag: 'REFERRAL', color: '#00FF7F' },
  { id: 4, title: 'Weekend Multiplier', desc: 'All points x2 every Saturday & Sunday', tag: 'WEEKEND', color: '#9B30FF' },
  { id: 5, title: 'High Roller VIP', desc: 'Deposit $100k/month for exclusive VIP treatment', tag: 'VIP', color: '#FFD700' },
  { id: 6, title: 'Slots Tournament', desc: 'Highest slot winnings this week wins $50,000', tag: 'TOURNAMENT', color: '#FF8C00' },
];

export const vipTiers = [
  { name: 'Bronze', icon: '🥉', minDeposit: 0, color: '#CD7F32', cashback: 1, bonus: 100 },
  { name: 'Silver', icon: '🥈', minDeposit: 10000, color: '#C0C0C0', cashback: 2, bonus: 500 },
  { name: 'Gold', icon: '👑', minDeposit: 50000, color: '#FFD700', cashback: 5, bonus: 2000 },
  { name: 'Platinum', icon: '💎', minDeposit: 200000, color: '#E5E4E2', cashback: 8, bonus: 10000 },
  { name: 'Diamond', icon: '🌟', minDeposit: 500000, color: '#00BFFF', cashback: 12, bonus: 50000 },
];

export const dailyRewards = [
  { day: 1, reward: 100, icon: '🪙' },
  { day: 2, reward: 200, icon: '🪙' },
  { day: 3, reward: 500, icon: '💰' },
  { day: 4, reward: 200, icon: '🪙' },
  { day: 5, reward: 1000, icon: '💰' },
  { day: 6, reward: 500, icon: '🪙' },
  { day: 7, reward: 5000, icon: '👑' },
];

export const shopItems = [
  { id: 1, name: 'Coin Pack I', price: 100, coins: 1000, popular: false, icon: '🪙' },
  { id: 2, name: 'Coin Pack II', price: 500, coins: 6000, popular: true, icon: '💰' },
  { id: 3, name: 'Coin Pack III', price: 1000, coins: 13000, popular: false, icon: '💎' },
  { id: 4, name: 'VIP Monthly', price: 5000, coins: 75000, popular: false, icon: '👑' },
  { id: 5, name: 'Jackpot Bundle', price: 10000, coins: 150000, popular: true, icon: '🎰' },
  { id: 6, name: 'Whale Pack', price: 50000, coins: 800000, popular: false, icon: '🐋' },
];

export const missions = [
  { id: 1, title: 'Spin Master', desc: 'Spin slots 50 times', reward: 500, progress: 32, total: 50, icon: '🎰' },
  { id: 2, title: 'Lucky Streak', desc: 'Win 5 games in a row', reward: 2000, progress: 3, total: 5, icon: '🔥' },
  { id: 3, title: 'High Roller', desc: 'Deposit $10,000 total', reward: 5000, progress: 7500, total: 10000, icon: '💰' },
  { id: 4, title: 'Social Butterfly', desc: 'Invite 3 friends', reward: 3000, progress: 1, total: 3, icon: '👥' },
  { id: 5, title: 'Sharp Shooter', desc: 'Win at roulette 10 times', reward: 1500, progress: 6, total: 10, icon: '🎯' },
];

export const rankings = [
  { rank: 1, name: 'KingFisher', level: 'Diamond', winnings: 1847200, avatar: '👑' },
  { rank: 2, name: 'LuckyStar88', level: 'Diamond', winnings: 1523400, avatar: '⭐' },
  { rank: 3, name: 'CryptoWhale', level: 'Platinum', winnings: 1289100, avatar: '🐋' },
  { rank: 4, name: 'SlotQueen', level: 'Platinum', winnings: 987600, avatar: '👸' },
  { rank: 5, name: 'RouletteKing', level: 'Gold', winnings: 854300, avatar: '🤴' },
  { rank: 6, name: 'LuckyDragon', level: 'Gold', winnings: 721000, avatar: '🐉' },
  { rank: 7, name: 'AcePoker', level: 'Gold', winnings: 654200, avatar: '🃏' },
  { rank: 8, name: 'MegaWin42', level: 'Silver', winnings: 523100, avatar: '💎' },
];

export const guilds = [
  { id: 1, name: 'Golden Legion', members: 152, level: 12, rank: 1, icon: '🦁', desc: 'Elite guild for serious players' },
  { id: 2, name: 'Lucky Dragons', members: 98, level: 9, rank: 2, icon: '🐉', desc: 'Dragon-themed fellowship of fortune' },
  { id: 3, name: 'Coin Masters', members: 134, level: 11, rank: 3, icon: '💰', desc: 'We chase the biggest pots' },
  { id: 4, name: 'Royal Flush', members: 76, level: 7, rank: 4, icon: '♠️', desc: 'Card game specialists' },
  { id: 5, name: 'Night Owls', members: 212, level: 14, rank: 1, icon: '🦉', desc: 'Active 24/7 worldwide guild' },
];

export const seasonPass = {
  season: 3,
  name: 'Summer of Gold',
  endDate: '2026-07-15',
  tiers: [
    { level: 1, free: '100 coins', premium: '500 coins + Avatar Frame' },
    { level: 5, free: '200 coins', premium: '1000 coins + Gold Emote' },
    { level: 10, free: '500 coins', premium: '2500 coins + Exclusive Skin' },
    { level: 20, free: '1000 coins', premium: '5000 coins + VIP Week Pass' },
    { level: 35, free: '2500 coins', premium: '15000 coins + Legendary Title' },
    { level: 50, free: '5000 coins', premium: '50000 coins + Diamond Border' },
  ],
};
