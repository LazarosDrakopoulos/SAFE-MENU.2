import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFavourites } from '../../context/FavoritesContext'
import { useGuest } from '../../context/GuestContext'
import { useShop } from '../../context/ShopContext'
import { getProductById } from '../../services/productService'
import { isSafeForUser } from '../../services/allergenDetector'
import { getAllergenEmoji } from '../../services/allergenService'
import type { Product } from '../../types/product'
import TopBar from '../../components/layout/TopBar/TopBar'
import FavoriteButton from '../../components/features/FavoriteButton/FavoriteButton'
import Spinner from '../../components/ui/Spinner/Spinner'
import styles from './FavouritesPage.module.css'

export default function FavouritesPage() {
  const navigate = useNavigate()
  const { favourites } = useFavourites()
  const { state: guestState } = useGuest()
  const { selectedShop } = useShop()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const userAllergens = guestState.profile?.allergens ?? []
  const shopId = selectedShop?.id ?? 'unknown'

  useEffect(() => {
    if (favourites.length === 0) {
      setLoading(false)
      return
    }

    setLoading(true)
    Promise.all(
      favourites.map(id => getProductById(id, shopId))
    )
      .then(results => setProducts(results.filter((p): p is Product => p !== null)))
      .finally(() => setLoading(false))
  }, [favourites, shopId])

  return (
    <div className={styles.page}>
      <TopBar title="Favourites" />

      <div className={styles.content}>
        {loading && <Spinner label="Loading favourites..." />}

        {!loading && favourites.length === 0 && (
          <div className={styles.empty}>
            <span className={styles.emptyEmoji}>🤍</span>
            <h3>No favourites yet</h3>
            <p>Tap the heart on any dish to save it here.</p>
            <button className={styles.browseBtn} onClick={() => navigate('/menu')}>
              Browse Menu →
            </button>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className={styles.grid}>
            {products.map((product, i) => {
              const safe = isSafeForUser(product.allergens, userAllergens)
              return (
                <button
                  key={product.id}
                  className={`${styles.card} ${!safe ? styles.cardUnsafe : ''}`}
                  onClick={() => navigate(`/menu/${product.externalId}`)}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className={styles.imageWrap}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className={styles.image}
                      loading="lazy"
                    />
                    <div className={styles.favBtn}>
                      <FavoriteButton externalId={product.externalId} size="sm" />
                    </div>
                    {!safe && (
                      <div className={styles.unsafeTag}>⚠️ Unsafe</div>
                    )}
                  </div>

                  <div className={styles.body}>
                    <h3 className={styles.name}>{product.name}</h3>
                    <span className={styles.category}>{product.category}</span>
                    {product.allergens.length > 0 && (
                      <div className={styles.allergens}>
                        {product.allergens.slice(0, 4).map(id => (
                          <span key={id} className={`${styles.allergenDot} ${userAllergens.includes(id) ? styles.allergenDanger : ''}`}>
                            {getAllergenEmoji(id)}
                          </span>
                        ))}
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
