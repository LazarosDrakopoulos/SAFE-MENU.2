import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useShop } from '../../context/ShopContext'
import { useGuest } from '../../context/GuestContext'
import { getProductById } from '../../services/productService'
import { getAllergenEmoji, getAllergenLabel } from '../../services/allergenService'
import { isSafeForUser, getMatchingAllergens } from '../../services/allergenDetector'
import type { Product } from '../../types/product'
import Badge from '../../components/ui/Badge/Badge'
import Spinner from '../../components/ui/Spinner/Spinner'
import styles from './ProductDetailPage.module.css'

export default function ProductDetailPage() {
  const { externalId } = useParams<{ externalId: string }>()
  const navigate = useNavigate()
  const { selectedShop } = useShop()
  const { state: guestState } = useGuest()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  const userAllergens = guestState.profile?.allergens ?? []

  useEffect(() => {
    if (!externalId || !selectedShop) return
    setLoading(true)
    getProductById(externalId, selectedShop.id)
      .then(setProduct)
      .finally(() => setLoading(false))
  }, [externalId, selectedShop])

  if (loading) return <div className={styles.loadingWrap}><Spinner /></div>
  if (!product) return (
    <div className={styles.errorWrap}>
      <p>Dish not found.</p>
      <button onClick={() => navigate(-1)}>← Go back</button>
    </div>
  )

  const safe = isSafeForUser(product.allergens, userAllergens)
  const dangerAllergens = getMatchingAllergens(product.allergens, userAllergens)

  return (
    <div className={styles.page}>
    
      <div className={styles.imageWrap}>
        <img src={product.imageUrl} alt={product.name} className={styles.image} />
        <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="Go back">
          ←
        </button>
        {!safe && (
          <div className={styles.unsafeBanner}>
            ⚠️ Contains your allergens
          </div>
        )}
        {safe && userAllergens.length > 0 && (
          <div className={styles.safeBanner}>
            ✓ Safe for you
          </div>
        )}
      </div>

      <div className={styles.body}>
       
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{product.name}</h1>
          <Badge variant="info">{product.category}</Badge>
        </div>

        
        {dangerAllergens.length > 0 && (
          <div className={styles.dangerAlert}>
            <span className={styles.dangerIcon}>🚫</span>
            <div>
              <strong>Not safe for you</strong>
              <p>This dish contains: {dangerAllergens.map(id => `${getAllergenEmoji(id)} ${getAllergenLabel(id)}`).join(', ')}</p>
            </div>
          </div>
        )}

       
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>About this dish</h2>
          <p className={styles.description}>{product.description}</p>
        </div>

       
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Ingredients</h2>
          <div className={styles.ingredientList}>
            {product.ingredients.map(ing => {
              const isAllergen = product.allergens.some(aid =>
                userAllergens.includes(aid) &&
                ing.toLowerCase().includes(aid)
              )
              return (
                <span
                  key={ing}
                  className={`${styles.ingredient} ${isAllergen ? styles.ingredientDanger : ''}`}
                >
                  {ing}
                </span>
              )
            })}
          </div>
        </div>

        
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Allergens in this dish</h2>
          {product.allergens.length === 0 ? (
            <p className={styles.noAllergens}> No known allergens detected</p>
          ) : (
            <div className={styles.allergenList}>
              {product.allergens.map(id => (
                <div
                  key={id}
                  className={`${styles.allergenRow} ${userAllergens.includes(id) ? styles.allergenRowDanger : ''}`}
                >
                  <span className={styles.allergenEmoji}>{getAllergenEmoji(id)}</span>
                  <span className={styles.allergenName}>{getAllergenLabel(id)}</span>
                  {userAllergens.includes(id) && (
                    <Badge variant="unsafe" size="sm">Your allergen</Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
