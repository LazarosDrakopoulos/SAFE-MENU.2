import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGuest } from '../../context/GuestContext'
import { useShop } from '../../context/ShopContext'
import { searchProducts } from '../../services/productService'
import { isSafeForUser } from '../../services/allergenDetector'
import { getAllergenEmoji } from '../../services/allergenService'
import type { Product } from '../../types/product'
import TopBar from '../../components/layout/TopBar/TopBar'
import FavoriteButton from '../../components/features/FavoriteButton/FavoriteButton'
import Spinner from '../../components/ui/Spinner/Spinner'
import styles from './SearchPage.module.css'

// Simple debounce — waits for user to stop typing before searching
function useDebounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  delay: number
): T {
  let timer: ReturnType<typeof setTimeout>
  return ((...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }) as T
}

export default function SearchPage() {
  const navigate = useNavigate()
  const { state: guestState } = useGuest()
  const { selectedShop } = useShop()

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [safeOnly, setSafeOnly] = useState(true)

  const userAllergens = guestState.profile?.allergens ?? []
  const shopId = selectedShop?.id ?? 'unknown'

  const doSearch = useCallback(
    async (q: string) => {
      if (!q.trim()) {
        setResults([])
        setSearched(false)
        return
      }
      setLoading(true)
      setSearched(true)
      try {
        const found = await searchProducts(q, shopId)
        setResults(found)
      } catch {
        setResults([])
      } finally {
        setLoading(false)
      }
    },
    [shopId]
  )

  const debouncedSearch = useDebounce(doSearch, 400)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setQuery(val)
    debouncedSearch(val)
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
    setSearched(false)
  }

  const filtered = safeOnly
    ? results.filter(p => isSafeForUser(p.allergens, userAllergens))
    : results

  const safeCount = results.filter(p => isSafeForUser(p.allergens, userAllergens)).length

  return (
    <div className={styles.page}>
      <TopBar title="Search" />

      <div className={styles.content}>
        {/* Search bar */}
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search any dish..."
            value={query}
            onChange={handleInput}
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          {query && (
            <button className={styles.clearBtn} onClick={handleClear} aria-label="Clear search">
              ✕
            </button>
          )}
        </div>

        {/* Safe only toggle */}
        {searched && results.length > 0 && (
          <div className={styles.filterRow}>
            <span className={styles.resultCount}>
              {safeOnly
                ? `${safeCount} safe result${safeCount !== 1 ? 's' : ''}`
                : `${results.length} total result${results.length !== 1 ? 's' : ''}`}
            </span>
            <div className={styles.toggleWrap}>
              <span className={styles.toggleLabel}>Safe only</span>
              <button
                className={`${styles.toggle} ${safeOnly ? styles.toggleOn : ''}`}
                onClick={() => setSafeOnly(v => !v)}
                role="switch"
                aria-checked={safeOnly}
              >
                <span className={styles.toggleThumb} />
              </button>
            </div>
          </div>
        )}

        {/* States */}
        {loading && <Spinner label="Searching..." />}

        {!loading && !searched && (
          <div className={styles.hint}>
            <span className={styles.hintEmoji}>🍽️</span>
            <p>Search across all dishes from TheMealDB.</p>
            <p>Your allergen filter is always applied.</p>
          </div>
        )}

        {!loading && searched && filtered.length === 0 && (
          <div className={styles.empty}>
            <span className={styles.emptyEmoji}>🥺</span>
            <h3>No results</h3>
            <p>
              {safeOnly && results.length > 0
                ? `Found ${results.length} dish${results.length !== 1 ? 'es' : ''} but none are safe for your allergies. Toggle "Safe only" to see all.`
                : `No dishes found for "${query}". Try a different search.`}
            </p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className={styles.grid}>
            {filtered.map((product, i) => {
              const safe = isSafeForUser(product.allergens, userAllergens)
              return (
                <button
                  key={product.id}
                  className={`${styles.card} ${!safe ? styles.cardUnsafe : ''}`}
                  onClick={() => navigate(`/menu/${product.externalId}`)}
                  style={{ animationDelay: `${Math.min(i * 40, 300)}ms` }}
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
                    {safe && userAllergens.length > 0 && (
                      <div className={styles.safeTag}>✓ Safe</div>
                    )}
                  </div>

                  <div className={styles.body}>
                    <h3 className={styles.name}>{product.name}</h3>
                    <span className={styles.category}>{product.category}</span>
                    {product.allergens.length > 0 && (
                      <div className={styles.allergens}>
                        {product.allergens.slice(0, 4).map(id => (
                          <span
                            key={id}
                            className={`${styles.allergenDot} ${userAllergens.includes(id) ? styles.allergenDanger : ''}`}
                          >
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
