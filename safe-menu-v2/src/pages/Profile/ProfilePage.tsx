import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGuest } from '../../context/GuestContext'
import { useAuth } from '../../context/AuthContext'
import { useShop } from '../../context/ShopContext'
import { useFavourites } from '../../context/FavoritesContext'
import { ALLERGENS } from '../../data/allergens'
import type { AllergenId } from '../../types/allergen'
import { getAllergenEmoji, getAllergenLabel } from '../../services/allergenService'
import TopBar from '../../components/layout/TopBar/TopBar'
import Button from '../../components/ui/Button/Button'
import styles from './ProfilePage.module.css'

export default function ProfilePage() {
  const { state: guestState, clearProfile, updateAllergens } = useGuest()
  const { logout } = useAuth()
  const { clearShop } = useShop()
  const { favourites, clearFavourites } = useFavourites()
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)
  const [editingAllergies, setEditingAllergies] = useState(false)
  const [selectedAllergens, setSelectedAllergens] = useState<AllergenId[]>(
    guestState.profile?.allergens ?? []
  )
  const [saved, setSaved] = useState(false)

  const profile = guestState.profile
  if (!profile) return null

  const handleReset = () => {
    clearProfile()
    clearShop()
    clearFavourites()
    logout()
    navigate('/auth', { replace: true })
  }

  const toggleAllergen = (id: AllergenId) => {
    setSelectedAllergens(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
    setSaved(false)
  }

  const handleSaveAllergies = () => {
    updateAllergens(selectedAllergens)
    setSaved(true)
    setTimeout(() => {
      setEditingAllergies(false)
      setSaved(false)
    }, 800)
  }

  return (
    <div className={styles.page}>
      <TopBar title="My Profile" showBack />

      <div className={styles.content}>
        {/* Avatar */}
        <div className={styles.avatarSection}>
          <div className={styles.avatar}>
            {profile.firstName[0]}{profile.lastName[0]}
          </div>
          <h2 className={styles.name}>{profile.firstName} {profile.lastName}</h2>
          <span className={styles.guestBadge}>👤 Guest</span>
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

        {/* Allergies card */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>My Allergies</h3>
            <button
              className={styles.editLink}
              onClick={() => setEditingAllergies(v => !v)}
            >
              {editingAllergies ? 'Cancel' : 'Edit →'}
            </button>
          </div>

          {!editingAllergies && (
            <>
              {profile.allergens.length === 0 ? (
                <p className={styles.noAllergies}>✅ No known allergies</p>
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
            </>
          )}

          {editingAllergies && (
            <div className={styles.allergenGrid}>
              {ALLERGENS.map(allergen => {
                const active = selectedAllergens.includes(allergen.id)
                return (
                  <button
                    key={allergen.id}
                    className={`${styles.allergenBtn} ${active ? styles.allergenBtnActive : ''}`}
                    onClick={() => toggleAllergen(allergen.id)}
                    aria-pressed={active}
                  >
                    <span>{allergen.emoji}</span>
                    <span className={styles.allergenBtnLabel}>{allergen.label}</span>
                    {active && <span className={styles.check}>✓</span>}
                  </button>
                )
              })}
              <Button
                variant={saved ? 'secondary' : 'primary'}
                size="md"
                fullWidth
                onClick={handleSaveAllergies}
              >
                {saved ? '✓ Saved!' : 'Save Changes'}
              </Button>
            </div>
          )}
        </div>

        {/* Favourites quick info */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>❤️ Favourites</h3>
            <button
              className={styles.editLink}
              onClick={() => navigate('/favourites')}
            >
              View all →
            </button>
          </div>
          <p className={styles.favCount}>
            {favourites.length === 0
              ? 'No saved dishes yet.'
              : `${favourites.length} saved dish${favourites.length !== 1 ? 'es' : ''}`}
          </p>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={() => navigate('/shops')}
            leftIcon={<span>🏪</span>}
          >
            Change Venue
          </Button>

          <Button
            variant="danger"
            size="md"
            fullWidth
            onClick={() => setShowConfirm(true)}
            leftIcon={<span>🚪</span>}
          >
            Start Over
          </Button>
        </div>

        {/* Confirm modal */}
        {showConfirm && (
          <div className={styles.modalOverlay} onClick={() => setShowConfirm(false)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <h3>Start over?</h3>
              <p>This will clear your profile, allergies, favourites and selected venue.</p>
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
