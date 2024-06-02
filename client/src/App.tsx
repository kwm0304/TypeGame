import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import UserAuthentication from './pages/UserAuthentication'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/user" element={<UserAuthentication />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
