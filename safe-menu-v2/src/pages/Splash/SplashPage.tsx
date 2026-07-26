import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './SplashPage.module.css'

export default function SplashPage() {
  const navigate = useNavigate()
  const { mode } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      
      navigate(mode ? '/onboarding' : '/auth', { replace: true })
    }, 2200)

    return () => clearTimeout(timer)
  }, [navigate, mode])

  return (
    <div className={styles.splash}>
      <div className={styles.logoWrap}>
        <div className={styles.logoRing} />
        <img
          src={`${import.meta.env.BASE_URL}smlogo.png`}
          alt="Safe Menu"
          className={styles.logo}
          draggable={false}
        />
      </div>
      <p className={styles.tagline}>Eat safely</p>
    </div>
  )
}
