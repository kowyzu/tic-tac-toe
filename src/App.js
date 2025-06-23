import { Route, Routes } from "react-router";
import Game from "./views/Game";
import Leaderboard from "./views/Leaderboard";
import TheNavigation from "./components/TheNavigation";

export default function App() {
  return (
    <>
      <TheNavigation />
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </>
  );
}
