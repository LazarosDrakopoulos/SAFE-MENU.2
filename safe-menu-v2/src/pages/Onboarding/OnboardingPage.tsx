import { useState, type FormEvent, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGuest } from '../../context/GuestContext'
import { ALLERGENS } from '../../data/allergens'
import type { AllergenId } from '../../types/allergen'
import type { GuestProfile } from '../../types/user'
import Button from '../../components/ui/Button/Button'
import styles from './OnboardingPage.module.css'

interface FormValues {
  firstName: string
  lastName: string
  emergencyContactName: string
  emergencyContactPhone: string
}

const EMPTY_FORM: FormValues = {
  firstName: '',
  lastName: '',
  emergencyContactName: '',
  emergencyContactPhone: '',
}

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { setProfile } = useGuest()

  const [form, setForm] = useState<FormValues>(EMPTY_FORM)
  const [selectedAllergens, setSelectedAllergens] = useState<AllergenId[]>([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [errors, setErrors] = useState<Partial<FormValues & { allergens: string }>>({})
  const [step, setStep] = useState<1 | 2>(1)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const toggleAllergen = (id: AllergenId) => {
    setSelectedAllergens(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
    if (errors.allergens) setErrors(prev => ({ ...prev, allergens: undefined }))
  }

  const validateStep1 = () => {
    const newErrors: Partial<FormValues> = {}
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) setStep(2)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (selectedAllergens.length === 0) {
      setErrors(prev => ({
        ...prev,
        allergens: 'Please select at least one allergy, or confirm you have none.',
      }))
      return
    }

    const profile: GuestProfile = {
      ...form,
      allergens: selectedAllergens,
      createdAt: new Date().toISOString(),
    }
    setProfile(profile)
    navigate('/shops', { replace: true })
  }

  const allergenLabel = selectedAllergens.length === 0
    ? 'Select your allergies'
    : selectedAllergens
        .map(id => ALLERGENS.find(a => a.id === id))
        .filter(Boolean)
        .map(a => `${a!.emoji} ${a!.label}`)
        .join(', ')

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <img src="/smlogo.png" alt="Safe Menu" className={styles.logo} />
        <h1>Your Safety Profile</h1>
        <p>This information helps us show you only the food that's safe for you.</p>
      </div>

    
      <div className={styles.steps}>
        <div className={`${styles.step} ${step >= 1 ? styles.stepActive : ''}`}>
          <span className={styles.stepDot}>1</span>
          <span>Personal info</span>
        </div>
        <div className={styles.stepLine} />
        <div className={`${styles.step} ${step >= 2 ? styles.stepActive : ''}`}>
          <span className={styles.stepDot}>2</span>
          <span>Allergies</span>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>

        
        {step === 1 && (
          <div className={styles.stepContent}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="firstName" className={styles.label}>
                  First Name <span className={styles.required}>*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="e.g. Maria"
                  className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                  autoComplete="given-name"
                />
                {errors.firstName && (
                  <span className={styles.error}>{errors.firstName}</span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="lastName" className={styles.label}>
                  Last Name <span className={styles.required}>*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="e.g. Papadaki"
                  className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                  autoComplete="family-name"
                />
                {errors.lastName && (
                  <span className={styles.error}>{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className={styles.divider}>
              <span>Emergency Contact <span className={styles.optional}>(optional but recommended)</span></span>
            </div>

            <div className={styles.field}>
              <label htmlFor="emergencyContactName" className={styles.label}>
                Contact Name
              </label>
              <input
                id="emergencyContactName"
                name="emergencyContactName"
                type="text"
                value={form.emergencyContactName}
                onChange={handleChange}
                placeholder="e.g. Nikos Papadakis"
                className={styles.input}
                autoComplete="off"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="emergencyContactPhone" className={styles.label}>
                Contact Phone
              </label>
              <input
                id="emergencyContactPhone"
                name="emergencyContactPhone"
                type="tel"
                value={form.emergencyContactPhone}
                onChange={handleChange}
                placeholder="e.g. +30 69X XXX XXXX"
                className={styles.input}
                autoComplete="tel"
              />
            </div>

            <Button
              type="button"
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleNext}
              rightIcon={<span>→</span>}
            >
              Next
            </Button>
          </div>
        )}

       
        {step === 2 && (
          <div className={styles.stepContent}>
            <div className={styles.allergyInfo}>
              <span className={styles.allergyInfoIcon}></span>
              <p>Select everything you're allergic or intolerant to. We'll hide all unsafe dishes from your menu.</p>
            </div>

           
            <div className={styles.field}>
              <label className={styles.label}>
                Your Allergies <span className={styles.required}>*</span>
              </label>

              <div className={styles.dropdownWrap}>
                <button
                  type="button"
                  className={`${styles.dropdownTrigger} ${errors.allergens ? styles.inputError : ''}`}
                  onClick={() => setDropdownOpen(o => !o)}
                  aria-expanded={dropdownOpen}
                >
                  <span className={styles.dropdownValue}>{allergenLabel}</span>
                  <span className={`${styles.dropdownArrow} ${dropdownOpen ? styles.dropdownArrowOpen : ''}`}>
                    ▾
                  </span>
                </button>

                {dropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    {ALLERGENS.map(allergen => {
                      const isSelected = selectedAllergens.includes(allergen.id)
                      return (
                        <button
                          key={allergen.id}
                          type="button"
                          className={`${styles.dropdownItem} ${isSelected ? styles.dropdownItemSelected : ''}`}
                          onClick={() => toggleAllergen(allergen.id)}
                        >
                          <span className={styles.allergenEmoji}>{allergen.emoji}</span>
                          <span className={styles.allergenInfo}>
                            <span className={styles.allergenLabel}>{allergen.label}</span>
                            <span className={styles.allergenDesc}>{allergen.description}</span>
                          </span>
                          <span className={styles.checkmark}>
                            {isSelected ? '✓' : ''}
                          </span>
                        </button>
                      )
                    })}

                  
                    <button
                      type="button"
                      className={`${styles.dropdownItem} ${styles.noAllergyItem} ${selectedAllergens.length === 0 ? styles.dropdownItemSelected : ''}`}
                      onClick={() => {
                        setSelectedAllergens([])
                        setDropdownOpen(false)
                      }}
                    >
                      <span className={styles.allergenEmoji}></span>
                      <span className={styles.allergenInfo}>
                        <span className={styles.allergenLabel}>No known allergies</span>
                        <span className={styles.allergenDesc}>Show me everything on the menu</span>
                      </span>
                      <span className={styles.checkmark}>
                        {selectedAllergens.length === 0 ? '✓' : ''}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {errors.allergens && (
                <span className={styles.error}>{errors.allergens}</span>
              )}
            </div>

         
            {selectedAllergens.length > 0 && (
              <div className={styles.chips}>
                {selectedAllergens.map(id => {
                  const a = ALLERGENS.find(x => x.id === id)!
                  return (
                    <button
                      key={id}
                      type="button"
                      className={styles.chip}
                      onClick={() => toggleAllergen(id)}
                      aria-label={`Remove ${a.label}`}
                    >
                      {a.emoji} {a.label} ×
                    </button>
                  )
                })}
              </div>
            )}

            <div className={styles.buttonRow}>
              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={() => setStep(1)}
                leftIcon={<span>←</span>}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                rightIcon={<span>→</span>}
              >
                Find
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
