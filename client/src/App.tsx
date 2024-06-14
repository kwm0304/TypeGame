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

function App() {
  return (
    <Router>
      <UserProvider>
        <GameProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<SinglePlayer />} />
            <Route path="/user" element={<UserAuthentication />} />
            <Route path="/results" element={<DisplayResults />} />
            <Route path="/games" element={<ChooseGameType />} />
            {/* <Route path="/games/tournament" element={<Tournament />} /> */}
            <Route path="/games/1v1" element={<Versus />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </GameProvider>
      </UserProvider>
    </Router>
  );
}

export default App;