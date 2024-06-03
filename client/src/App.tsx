import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserAuthentication from "./pages/UserAuthentication";
import Navbar from "./components/Navbar";
import SinglePlayer from "./pages/SinglePlayer";
// import { UserProvider } from "./context/AuthContext";
import { GameProvider } from "./context/GameContext";

function App() {
  return (
    <>
      <Router>
        <GameProvider>
          {/* <UserProvider> */}
            <Navbar />
            <Routes>
              <Route path="/" element={<SinglePlayer />} />
              <Route path="/user" element={<UserAuthentication />} />
            </Routes>
          {/* </UserProvider> */}
        </GameProvider>
      </Router>
    </>
  );
}

export default App;
