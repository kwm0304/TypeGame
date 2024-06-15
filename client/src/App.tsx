import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserAuthentication from "./pages/UserAuthentication";
import Navbar from "./components/Navbar";
import SinglePlayer from "./pages/SinglePlayer";
import { UserProvider } from "./context/AuthContext";
import { GameProvider } from "./context/GameContext";
import DisplayResults from "./pages/DisplayResults";
import ChooseGameType from "./pages/ChooseGameType";
import Versus from "./pages/Versus";
import Leaderboard from "./pages/Leaderboard";
import MultiplayerResults from "./pages/MultiplayerResults";

function App() {
  return (
    <Router>
      <UserProvider>
        <GameProvider>
          <div className="flex flex-col h-screen">
          <Navbar />
          <div className="flex-grow">
          <Routes>
            <Route path="/" element={<SinglePlayer />} />
            <Route path="/user" element={<UserAuthentication />} />
            <Route path="/results" element={<DisplayResults />} />
            <Route path="/games" element={<ChooseGameType />} />
            {/* <Route path="/games/tournament" element={<Tournament />} /> */}
            <Route path="/multilplayerresult" element={<MultiplayerResults />} />
            <Route path="/games/1v1" element={<Versus />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
          </div>
          </div>
        </GameProvider>
      </UserProvider>
    </Router>
  );
}

export default App;