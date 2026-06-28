import type { ReactNode } from 'react'
import styles from './Badge.module.css'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'safe' | 'unsafe' | 'warning' | 'info' | 'disabled'
  size?: 'sm' | 'md'
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
}: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]}`}>
      {children}
    </span>
  )
}
