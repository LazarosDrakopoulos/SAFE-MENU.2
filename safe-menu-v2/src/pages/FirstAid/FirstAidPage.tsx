import TopBar from '../../components/layout/TopBar/TopBar'
import styles from './FirstAidPage.module.css'

const STEPS = [
  { icon: '', text: 'Stay calm and assess the severity of the reaction.' },
  { icon: '', text: 'For mild symptoms (rash, itching): monitor closely and give antihistamines if prescribed.' },
  { icon: '', text: 'For severe reactions (difficulty breathing, swelling, dizziness): call emergency services immediately.' },
  { icon: '', text: 'Use an epinephrine auto-injector (EpiPen) if available and prescribed.' },
  { icon: '', text: 'Keep the person lying down with legs elevated if possible.' },
  { icon: '', text: 'Do NOT give food or drink if the person has difficulty swallowing.' },
  { icon: '', text: 'Stay with them and monitor until help arrives.' },
]

export default function FirstAidPage() {
  return (
    <div className={styles.page}>
      <TopBar title="First Aid" />

      <div className={styles.content}>
        <div className={styles.hero}>
          <span className={styles.heroIcon}></span>
          <h2>Food Allergy Emergency</h2>
          <p>Follow these steps if someone is having an allergic reaction.</p>
        </div>

        <div className={styles.stepList}>
          {STEPS.map((step, i) => (
            <div key={i} className={styles.step} style={{ animationDelay: `${i * 60}ms` }}>
              <div className={styles.stepNumber}>{i + 1}</div>
              <div className={styles.stepBody}>
                <span className={styles.stepIcon}>{step.icon}</span>
                <p className={styles.stepText}>{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <a
          href="https://www.vrisko.gr/efimeries-nosokomeion"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.hospitalBtn}
        >
          <span></span>
          Find Nearest Hospital
        </a>

        <div className={styles.emergencyCard}>
          <span className={styles.emergencyNum}>112</span>
          <p>European Emergency Number</p>
          <a href="tel:112" className={styles.callBtn}>
            📞 Call Now
          </a>
        </div>
      </div>
    </div>
  )
}
