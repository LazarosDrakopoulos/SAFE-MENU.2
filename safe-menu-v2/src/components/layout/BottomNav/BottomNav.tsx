import { NavLink } from 'react-router-dom'
import styles from './BottomNav.module.css'

const TABS = [
  { to: '/menu',      label: 'Menu',      icon: '🍽️' },
  { to: '/allergies', label: 'Allergies', icon: '⚠️' },
  { to: '/profile',   label: 'Profile',   icon: '👤' },
  { to: '/firstaid',  label: 'First Aid', icon: '🚨' },
] as const

export default function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      {TABS.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `${styles.tab} ${isActive ? styles.active : ''}`
          }
          aria-label={tab.label}
        >
          <span className={styles.icon} aria-hidden="true">{tab.icon}</span>
          <span className={styles.label}>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
