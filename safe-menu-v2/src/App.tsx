/* ─────────────────────────────────────────────
   App.tsx — Root router
   Navigation guards based on auth + onboarding state:

   No mode selected  → Auth screen
   Guest, no profile → Onboarding form
   Guest, no shop    → Shop selection
   All complete      → Menu (main app)
───────────────────────────────────────────── */

import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { useGuest } from './context/GuestContext'
import { useShop } from './context/ShopContext'

import SplashPage from './pages/Splash/SplashPage'
import AuthPage from './pages/Auth/AuthPage'
import OnboardingPage from './pages/Onboarding/OnboardingPage'
import ShopSelectPage from './pages/ShopSelect/ShopSelectPage'
import MenuPage from './pages/Menu/MenuPage'
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage'
import ProfilePage from './pages/Profile/ProfilePage'
import AllergiesPage from './pages/Allergies/AllergiesPage'
import FirstAidPage from './pages/FirstAid/FirstAidPage'
import BottomNav from './components/layout/BottomNav/BottomNav'

function AppRoutes() {
  const { mode } = useAuth()
  const { state: guestState } = useGuest()
  const { selectedShop } = useShop()

  // Not decided yet — show auth
  if (!mode) {
    return (
      <Routes>
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/splash" replace />} />
      </Routes>
    )
  }

  // Guest mode, no profile yet — force onboarding
  if (!guestState.isProfileComplete) {
    return (
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    )
  }

  // Profile complete, no shop selected — force shop selection
  if (!selectedShop) {
    return (
      <Routes>
        <Route path="/shops" element={<ShopSelectPage />} />
        <Route path="*" element={<Navigate to="/shops" replace />} />
      </Routes>
    )
  }

  // Fully onboarded — show main app with bottom nav
  return (
    <>
      <Routes>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:externalId" element={<ProductDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/allergies" element={<AllergiesPage />} />
        <Route path="/firstaid" element={<FirstAidPage />} />
        <Route path="*" element={<Navigate to="/menu" replace />} />
      </Routes>
      <BottomNav />
    </>
  )
}

export default function App() {
  return <AppRoutes />
}
