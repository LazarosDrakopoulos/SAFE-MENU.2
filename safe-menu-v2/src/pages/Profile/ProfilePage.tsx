import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGuest } from '../../context/GuestContext'
import { useAuth } from '../../context/AuthContext'
import { useShop } from '../../context/ShopContext'
import { getAllergenEmoji, getAllergenLabel } from '../../services/allergenService'
import TopBar from '../../components/layout/TopBar/TopBar'
import Button from '../../components/ui/Button/Button'
import styles from './ProfilePage.module.css'

export default function ProfilePage() {
  const { state: guestState, clearProfile } = useGuest()
  const { logout } = useAuth()
  const { clearShop } = useShop()
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)

  const profile = guestState.profile
  if (!profile) return null

  const handleReset = () => {
    clearProfile()
    clearShop()
    logout()
    navigate('/auth', { replace: true })
  }

  return (
    <div className={styles.page}>
      <TopBar title="My Profile" />

      <div className={styles.content}>
       
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {profile.firstName[0]}{profile.lastName[0]}
          </div>
          <h2 className={styles.name}>{profile.firstName} {profile.lastName}</h2>
          <span className={styles.guestBadge}> Guest</span>
        </div>

        {/* Info card */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Profile Info</h3>

          <div className={styles.row}>
            <span className={styles.rowLabel}>First Name</span>
            <span className={styles.rowValue}>{profile.firstName}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Last Name</span>
            <span className={styles.rowValue}>{profile.lastName}</span>
          </div>
          {profile.emergencyContactName && (
            <div className={styles.row}>
              <span className={styles.rowLabel}>Emergency Contact</span>
              <span className={styles.rowValue}>{profile.emergencyContactName}</span>
            </div>
          )}
          {profile.emergencyContactPhone && (
            <div className={styles.row}>
              <span className={styles.rowLabel}>Emergency Phone</span>
              <span className={styles.rowValue}>{profile.emergencyContactPhone}</span>
            </div>
          )}
        </div>

       
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>My Allergies</h3>
            <button className={styles.editLink} onClick={() => navigate('/allergies')}>
              Edit →
            </button>
          </div>
          {profile.allergens.length === 0 ? (
            <p className={styles.noAllergies}> No known allergies</p>
          ) : (
            <div className={styles.allergenList}>
              {profile.allergens.map(id => (
                <div key={id} className={styles.allergenItem}>
                  <span>{getAllergenEmoji(id)}</span>
                  <span>{getAllergenLabel(id)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        
        <div className={styles.actions}>
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={() => navigate('/shops')}
            leftIcon={<span></span>}
          >
            Change Venue
          </Button>

          <Button
            variant="danger"
            size="md"
            fullWidth
            onClick={() => setShowConfirm(true)}
            leftIcon={<span></span>}
          >
            Start Over
          </Button>
        </div>

        
        {showConfirm && (
          <div className={styles.modalOverlay} onClick={() => setShowConfirm(false)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <h3>Start over?</h3>
              <p>This will clear your profile, allergies and selected venue.</p>
              <div className={styles.modalActions}>
                <Button variant="ghost" size="md" onClick={() => setShowConfirm(false)}>
                  Cancel
                </Button>
                <Button variant="danger" size="md" onClick={handleReset}>
                  Yes, reset
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
