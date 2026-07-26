import { useFavourites } from '../../../context/FavoritesContext'
import styles from './FavoriteButton.module.css'

interface FavoriteButtonProps {
  externalId: string
  size?: 'sm' | 'md'
}

export default function FavoriteButton({ externalId, size = 'md' }: FavoriteButtonProps) {
  const { isFavourite, toggleFavourite } = useFavourites()
  const active = isFavourite(externalId)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation() // prevent card navigation
    toggleFavourite(externalId)
  }

  return (
    <button
      className={`${styles.btn} ${styles[size]} ${active ? styles.active : ''}`}
      onClick={handleClick}
      aria-label={active ? 'Remove from favourites' : 'Add to favourites'}
      aria-pressed={active}
    >
      <span className={styles.heart}>{active ? '❤️' : '🤍'}</span>
    </button>
  )
}
