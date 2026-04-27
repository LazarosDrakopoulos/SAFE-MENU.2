import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Allergens from './pages/Allergens'
import Menu from './pages/Menu'
import Contact from './pages/Contact'
import FirstAid from './pages/FirstAid'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allergens" element={<Allergens />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/firstaid" element={<FirstAid />} />
      </Routes>
    </>
  )
}

export default App