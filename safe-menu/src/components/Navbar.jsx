import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
        <li><NavLink to="/allergens" className={({ isActive }) => isActive ? "active" : ""}>Allergens</NavLink></li>
        <li><NavLink to="/menu" className={({ isActive }) => isActive ? "active" : ""}>Menu</NavLink></li>
        <li><NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar