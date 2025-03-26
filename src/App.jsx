import './App.css'
import { Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Success from './components/Success'

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  )
}

export default App
