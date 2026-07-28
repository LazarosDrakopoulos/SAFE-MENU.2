import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useShop } from '../../context/ShopContext'
import { useGuest } from '../../context/GuestContext'
import { getProductsByShop } from '../../services/productService'
import { isSafeForUser } from '../../services/allergenDetector'
import { getAllergenEmoji, getAllergenLabel } from '../../services/allergenService'
import type { Product } from '../../types/product'
import TopBar from '../../components/layout/TopBar/TopBar'
import Spinner from '../../components/ui/Spinner/Spinner'
import styles from './MenuPage.module.css'
import FavoriteButton from '../../components/features/FavoriteButton/FavoriteButton'

export default function MenuPage() {
  const navigate = useNavigate()
  const { selectedShop, clearShop } = useShop()
  const { state: guestState } = useGuest()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [showUnsafe, setShowUnsafe] = useState(false)

  const userAllergens = guestState.profile?.allergens ?? []

  useEffect(() => {
    if (!selectedShop) return

    setLoading(true)
    setError(null)

    getProductsByShop(selectedShop.id, selectedShop.mealDbCategories)
      .then(res => setProducts(res.products))
      .catch(() => setError('Could not load the menu. Please check your connection.'))
      .finally(() => setLoading(false))
  }, [selectedShop])

  // Unique categories from loaded products
  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))]
    return ['All', ...cats]
  }, [products])

  // Filtered products
  const filtered = useMemo(() => {
    let list = products

    if (activeCategory !== 'All') {
      list = list.filter(p => p.category === activeCategory)
    }

    if (!showUnsafe) {
      list = list.filter(p => isSafeForUser(p.allergens, userAllergens))
    }

    return list
  }, [products, activeCategory, showUnsafe, userAllergens])

  const safeCount = products.filter(p =>
    isSafeForUser(p.allergens, userAllergens)
  ).length

  if (!selectedShop) return null

  return (
    <div className={styles.page}>
      <TopBar
        title={selectedShop.name} showProfile
        rightSlot={
          <button className={styles.changeBtn} onClick={clearShop}>
            Change
          </button>
        }
      />

      <div className={styles.content}>
        {!loading && userAllergens.length > 0 && (
          <div className={styles.safetyBanner}>
            <span className={styles.safetyIcon}></span>
            <div className={styles.safetyText}>
              <strong>{safeCount} safe dishes</strong> found for your profile
              <span className={styles.allergenPills}>
                {userAllergens.map(id => (
                  <span key={id} className={styles.allergenPill}>
                    {getAllergenEmoji(id)} {getAllergenLabel(id)}
                  </span>
                ))}
              </span>
            </div>
          </div>
        )}

        {!loading && categories.length > 1 && (
          <div className={styles.categoryRow}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.catBtn} ${activeCategory === cat ? styles.catBtnActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

      
        {!loading && userAllergens.length > 0 && (
          <div className={styles.toggleRow}>
            <span className={styles.toggleLabel}>Show unsafe dishes</span>
            <button
              className={`${styles.toggle} ${showUnsafe ? styles.toggleOn : ''}`}
              onClick={() => setShowUnsafe(v => !v)}
              role="switch"
              aria-checked={showUnsafe}
              aria-label="Show unsafe dishes"
            >
              <span className={styles.toggleThumb} />
            </button>
          </div>
        )}

       
        {loading && <Spinner label="Loading menu..." />}

        {error && (
          <div className={styles.errorState}>
            <span></span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className={styles.emptyState}>
            <span className={styles.emptyEmoji}></span>
            <h3>No safe dishes here</h3>
            <p>
              {showUnsafe
                ? 'No dishes in this category.'
                : 'All dishes in this category contain your allergens. Try another category or toggle "Show unsafe".'}
            </p>
          </div>
        )}

        
        {!loading && !error && filtered.length > 0 && (
          <div className={styles.grid}>
            {filtered.map((product, i) => {
              const safe = isSafeForUser(product.allergens, userAllergens)
              return (
                <button
                  key={product.id}
                  className={`${styles.card} ${!safe ? styles.cardUnsafe : ''}`}
                  onClick={() => navigate(`/menu/${product.externalId}`)}
                  style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
                >
                  <div className={styles.cardImageWrap}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className={styles.cardImage}
                      loading="lazy"
                    />
                    {!safe && (
                      <div className={styles.unsafeOverlay}>
                        <span> Contains allergens</span>
                      </div>
                    )}
                    {safe && userAllergens.length > 0 && (
                      <div className={styles.safeTag}>✓ Safe</div>
                    )}
                    
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{product.name}</h3>
                    <div className={styles.favBtn}>
                       <FavoriteButton externalId={product.externalId} size="sm" />
                     </div>
                    <span className={styles.cardCategory}>{product.category}</span>

                    {product.allergens.length > 0 && (
                      <div className={styles.cardAllergens}>
                        {product.allergens.slice(0, 4).map(id => (
                          <span key={id} className={`${styles.allergenDot} ${userAllergens.includes(id) ? styles.allergenDotDanger : ''}`}>
                            {getAllergenEmoji(id)}
                          </span>
                        ))}
                        {product.allergens.length > 4 && (
                          <span className={styles.allergenMore}>+{product.allergens.length - 4}</span>
                        )}
                      </div>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
