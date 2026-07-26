import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { GuestProvider } from './context/GuestContext'
import { ShopProvider } from './context/ShopContext'
import { FavoritesProvider } from './context/FavoritesContext'
import App from './App'

import './styles/tokens.css'
import './styles/reset.css'
import './styles/global.css'
import './styles/animations.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GuestProvider>
          <ShopProvider>
            <FavoritesProvider>
              <App />
            </FavoritesProvider>
          </ShopProvider>
        </GuestProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
