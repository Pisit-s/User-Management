import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import RegisterPage from './pages/Register'
import UserPage from './pages/User'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/user' element={<UserPage />} />
      </Routes>
    </Router>
  )
}

export default App
