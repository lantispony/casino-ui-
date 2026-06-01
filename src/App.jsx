import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Lobby from './pages/Lobby';
import SlotsPage from './pages/SlotsPage';
import RoulettePage from './pages/RoulettePage';
import BaccaratPage from './pages/BaccaratPage';
import DicePage from './pages/DicePage';
import FishPage from './pages/FishPage';
import LotteryPage from './pages/LotteryPage';
import UserCenter from './pages/UserCenter';
import Deposit from './pages/Deposit';
import Records from './pages/Records';
import Events from './pages/Events';
import DailyRewards from './pages/DailyRewards';
import VIP from './pages/VIP';
import SeasonPass from './pages/SeasonPass';
import Shop from './pages/Shop';
import Missions from './pages/Missions';
import Rankings from './pages/Rankings';
import Guilds from './pages/Guilds';
import './styles/global.css';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/game/slots" element={<SlotsPage />} />
        <Route path="/game/roulette" element={<RoulettePage />} />
        <Route path="/game/baccarat" element={<BaccaratPage />} />
        <Route path="/game/dice" element={<DicePage />} />
        <Route path="/game/fish" element={<FishPage />} />
        <Route path="/game/lottery" element={<LotteryPage />} />
        <Route path="/user" element={<UserCenter />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/records" element={<Records />} />
        <Route path="/events" element={<Events />} />
        <Route path="/rewards" element={<DailyRewards />} />
        <Route path="/vip" element={<VIP />} />
        <Route path="/season-pass" element={<SeasonPass />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/rankings" element={<Rankings />} />
        <Route path="/guilds" element={<Guilds />} />
      </Routes>
    </Layout>
  );
}
