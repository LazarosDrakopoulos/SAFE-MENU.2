import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGuest } from '../../context/GuestContext'
import { ALLERGENS } from '../../data/allergens'
import type { AllergenId } from '../../types/allergen'
import TopBar from '../../components/layout/TopBar/TopBar'
import Button from '../../components/ui/Button/Button'
import styles from './AllergiesPage.module.css'

export default function AllergiesPage() {
  const { state, updateAllergens } = useGuest()
  const navigate = useNavigate()
  const [selected, setSelected] = useState<AllergenId[]>(
    state.profile?.allergens ?? []
  )
  const [saved, setSaved] = useState(false)

  const toggle = (id: AllergenId) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
    setSaved(false)
  }

  const handleSave = () => {
    updateAllergens(selected)
    setSaved(true)
    setTimeout(() => navigate('/menu'), 800)
  }

  return (
    <div className={styles.page}>
      <TopBar title="My Allergies" />

      <div className={styles.content}>
        <p className={styles.subtitle}>
          Tap to toggle. Changes apply immediately to your menu.
        </p>

        <div className={styles.grid}>
          {ALLERGENS.map(allergen => {
            const active = selected.includes(allergen.id)
            return (
              <button
                key={allergen.id}
                className={`${styles.allergenBtn} ${active ? styles.allergenBtnActive : ''}`}
                onClick={() => toggle(allergen.id)}
                aria-pressed={active}
              >
                <span className={styles.emoji}>{allergen.emoji}</span>
                <span className={styles.label}>{allergen.label}</span>
                {active && <span className={styles.check}>✓</span>}
              </button>
            )
          })}
        </div>

        {selected.length === 0 && (
          <p className={styles.noneNote}>
            ✅ No allergies selected — all dishes will be shown.
          </p>
        )}

        <Button
          variant={saved ? 'secondary' : 'primary'}
          size="lg"
          fullWidth
          onClick={handleSave}
          leftIcon={<span>{saved ? '✓' : '💾'}</span>}
        >
          {saved ? 'Saved! Going to menu...' : 'Save & Go to Menu'}
        </Button>
      </div>
    </div>
  )
}
