import { useState } from 'react'
import './App.css'
import RegisterPage from './Pages/register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RegisterPage />
    </div>
  )
}

export default App
