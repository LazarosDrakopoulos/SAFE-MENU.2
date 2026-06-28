import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/ui/Button/Button'
import styles from './AuthPage.module.css'

export default function AuthPage() {
  const { enterAsGuest } = useAuth()
  const navigate = useNavigate()

  const handleGuest = () => {
    enterAsGuest()
    navigate('/onboarding', { replace: true })
  }

  return (
    <div className={styles.page}>
      {/* Background decoration */}
      <div className={styles.bgBlob1} />
      <div className={styles.bgBlob2} />

      {/* Logo */}
      <div className={styles.logoSection}>
        <img src="/smlogo.png" alt="Safe Menu" className={styles.logo} />
        <h1 className={styles.appName}>Safe Menu</h1>
        <p className={styles.tagline}>Discover food that's safe for you</p>
      </div>

      {/* Auth card */}
      <div className={styles.card}>

        {/* Login section — disabled, phase 2 */}
        <div className={styles.comingSoonWrap}>
          <div className={styles.comingSoonBanner}>
            <span>🔒</span>
            <span>Login & Register — Coming in Phase 2</span>
          </div>

          <Button
            variant="secondary"
            size="lg"
            fullWidth
            disabled
            leftIcon={<span>📧</span>}
          >
            Login with Email
          </Button>

          <Button
            variant="ghost"
            size="lg"
            fullWidth
            disabled
          >
            Create Account
          </Button>
        </div>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>or</span>
          <span className={styles.dividerLine} />
        </div>

        {/* Guest CTA — the active path */}
        <div className={styles.guestSection}>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleGuest}
            leftIcon={<span>👤</span>}
          >
            Continue as Guest
          </Button>
          <p className={styles.guestNote}>
            No account needed. Set your allergies and explore the menu instantly.
          </p>
        </div>
      </div>

      <p className={styles.footer}>
        © 2025 Safe Menu · Designed for safe dining
      </p>
    </div>
  )
}
