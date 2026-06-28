import { useNavigate } from 'react-router-dom'
import styles from './TopBar.module.css'

interface TopBarProps {
  title: string
  showBack?: boolean
  rightSlot?: React.ReactNode
}

export default function TopBar({ title, showBack = false, rightSlot }: TopBarProps) {
  const navigate = useNavigate()

  return (
    <header className={styles.topBar}>
      <div className={styles.left}>
        {showBack && (
          <button
            className={styles.backBtn}
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            ←
          </button>
        )}
      </div>

      <h1 className={styles.title}>{title}</h1>

      <div className={styles.right}>
        {rightSlot}
      </div>
    </header>
  )
}
