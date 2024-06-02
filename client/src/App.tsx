import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import UserAuthentication from './pages/UserAuthentication'
import Navbar from './components/Navbar'
import SinglePlayer from './pages/SinglePlayer'

function App() {

  return (
    <>
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<SinglePlayer />} />
        <Route path="/user" element={<UserAuthentication />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
