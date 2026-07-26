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
import FavouritesPage from './pages/Favourites/FavouritesPage'
import SearchPage from './pages/Search/SearchPage'
import BottomNav from './components/layout/BottomNav/BottomNav'

function AppRoutes() {
  const { mode } = useAuth()
  const { state: guestState } = useGuest()
  const { selectedShop } = useShop()

  if (!mode) {
    return (
      <Routes>
        <Route path="/splash" element={<SplashPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/splash" replace />} />
      </Routes>
    )
  }

  if (!guestState.isProfileComplete) {
    return (
      <Routes>
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    )
  }

  if (!selectedShop) {
    return (
      <Routes>
        <Route path="/shops" element={<ShopSelectPage />} />
        <Route path="*" element={<Navigate to="/shops" replace />} />
      </Routes>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:externalId" element={<ProductDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
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
