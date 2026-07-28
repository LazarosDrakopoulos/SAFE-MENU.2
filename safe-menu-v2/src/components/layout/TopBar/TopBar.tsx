import { useNavigate } from 'react-router-dom'
import styles from './TopBar.module.css'

interface TopBarProps {
  title: string
  showBack?: boolean
  showProfile?: boolean
  rightSlot?: React.ReactNode
}

export default function TopBar({
  title,
  showBack = false,
  showProfile = false,
  rightSlot,
}: TopBarProps) {
  const navigate = useNavigate()

  return (
    <header className={styles.topBar}>
    <div className={styles.left}>
  {showBack && (
    <button
  className={styles.iconBtn}
  onClick={() => navigate(-1)}
  aria-label="Go back"
>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
</button>
  )}
  {showProfile && (
    <button className={styles.profileBtn} onClick={() => navigate('/profile')}>👤</button>
  )}
</div>

<h1 className={styles.title}>{title}</h1>

<div className={styles.right}>
  {rightSlot}
</div>
    </header>
  )
}
