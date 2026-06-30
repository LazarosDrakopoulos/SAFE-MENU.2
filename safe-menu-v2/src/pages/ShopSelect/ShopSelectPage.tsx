import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShop } from '../../context/ShopContext'
import { useGuest } from '../../context/GuestContext'
import { getShops } from '../../services/shopService'
import type { Shop } from '../../types/shop'
import Spinner from '../../components/ui/Spinner/Spinner'
import styles from './ShopSelectPage.module.css'

export default function ShopSelectPage() {
  const navigate = useNavigate()
  const { selectShop } = useShop()
  const { state: guestState } = useGuest()
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'select' | 'qr'>('select')

  const firstName = guestState.profile?.firstName ?? 'Guest'

  useEffect(() => {
    getShops()
      .then(setShops)
      .finally(() => setLoading(false))
  }, [])

  const handleSelect = (shop: Shop) => {
    selectShop(shop)
    navigate('/menu', { replace: true })
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <img src="/smlogo.png" alt="Safe Menu" className={styles.logo} />
        <h1>Hi, {firstName}!</h1>
        <p>Where are you eating today? Choose a venue to see your safe menu.</p>
      </div>

      
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'select' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('select')}
        >
           Select Venue
        </button>
        <button
          className={`${styles.tab} ${styles.tabDisabled}`}
          disabled
          title="Coming in Phase 2"
        >
          📷 Scan QR
          <span className={styles.comingSoon}>Phase 2</span>
        </button>
      </div>

      
      {loading ? (
        <Spinner label="Loading venues..." />
      ) : (
        <div className={styles.shopList}>
          {shops.map((shop, i) => (
            <button
              key={shop.id}
              className={`${styles.shopCard} ${!shop.isOpen ? styles.shopClosed : ''}`}
              onClick={() => shop.isOpen && handleSelect(shop)}
              disabled={!shop.isOpen}
              style={{ '--shop-color': shop.color, animationDelay: `${i * 60}ms` } as React.CSSProperties}
            >
              <div className={styles.shopEmoji} style={{ background: shop.color }}>
                {shop.emoji}
              </div>

              <div className={styles.shopInfo}>
                <div className={styles.shopTop}>
                  <span className={styles.shopName}>{shop.name}</span>
                  {!shop.isOpen && (
                    <span className={styles.closedBadge}>Closed</span>
                  )}
                </div>
                <span className={styles.shopCuisine}>{shop.cuisine}</span>
                <span className={styles.shopDesc}>{shop.description}</span>
                <div className={styles.shopMeta}>
                  <span>⭐ {shop.rating}</span>
                  <span>·</span>
                  <span>⏱ ~{shop.waitTime} min</span>
                </div>
              </div>

              <span className={styles.shopArrow}>›</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
