import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserAuthentication from "./pages/UserAuthentication";
import Navbar from "./components/Navbar";
import SinglePlayer from "./pages/SinglePlayer";
import { UserProvider } from "./context/AuthContext";
import { GameProvider } from "./context/GameContext";
import DisplayResults from "./pages/DisplayResults";

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
          </Routes>
        </GameProvider>
      </UserProvider>
    </Router>
  );
}

export default App;