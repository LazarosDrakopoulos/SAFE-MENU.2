import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const splashRef = useRef(null)

  useEffect(() => {
    const splash = splashRef.current

    if (sessionStorage.getItem('splashShown')) {
      splash.style.display = 'none'
      return
    }

    sessionStorage.setItem('splashShown', 'true')

    setTimeout(() => {
      splash.classList.add('fade-out')
    }, 2000)

    setTimeout(() => {
      splash.style.display = 'none'
    }, 2800)
  }, [])

  return (
    <>
      
      <div id="splash" ref={splashRef}>
        <img src="/smlogo.png" alt="Safe Menu Logo" className="splash-logo" />
      </div>

     
      <main>
        <section className="intro">
          <Link to="/allergens">
            <img src="/smlogo.png" alt="SAFE MENU Logo" className="logo" />
          </Link>
          <p>
            Welcome to <strong>SAFE MENU</strong> — a digital menu created to help guests with food allergies
            enjoy their meals safely and confidently. Choose your allergens and get a menu personalized just for you.
          </p>
        </section>
      </main>

     
      <footer className="footer">
        <div className="socials">
          <a href="https://facebook.com" className="social">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://linkedin.com" className="social">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://instagram.com" className="social">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <p className="copyright">© 2026 Safe Menu</p>
      </footer>

      
      <Link to="/firstaid">
        <button className="emergency-btn">FIRST AID</button>
      </Link>
    </>
  )
}

export default Home