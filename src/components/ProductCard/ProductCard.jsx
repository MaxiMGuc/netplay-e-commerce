import { memo, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useToast } from '../../context/ToastContext'
import './ProductCard.css'

// Изображение-заглушка при ошибке загрузки
const FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgMzAwIDMwMCI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmMWY1ZjkiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2NiZDVlMSIgZm9udC1zaXplPSI0OCI+8J+TtzwvdGV4dD48L3N2Zz4='
const UNSPLASH_BASE = 'https://source.unsplash.com/900x900/?'

const imageFallbackBySportCategory = {
  'Бадминтон|Ракетки': `${UNSPLASH_BASE}badminton,racket`,
  'Бадминтон|Обувь': `${UNSPLASH_BASE}badminton,shoes`,
  'Бадминтон|Воланы': `${UNSPLASH_BASE}badminton,shuttlecock`,
  'Бадминтон|Струны': `${UNSPLASH_BASE}badminton,stringing`,
  'Бадминтон|Одежда': `${UNSPLASH_BASE}badminton,sportswear`,
  'Бадминтон|Аксессуары': `${UNSPLASH_BASE}badminton,gear`,
  'Бадминтон|Сумки': `${UNSPLASH_BASE}badminton,bag`,
  'Теннис|Ракетки': `${UNSPLASH_BASE}tennis,racket`,
  'Теннис|Обувь': `${UNSPLASH_BASE}tennis,shoes`,
  'Теннис|Струны': `${UNSPLASH_BASE}tennis,stringing`,
  'Теннис|Мячи': `${UNSPLASH_BASE}tennis,balls`,
  'Теннис|Одежда': `${UNSPLASH_BASE}tennis,sportswear`,
  'Теннис|Аксессуары': `${UNSPLASH_BASE}tennis,gear`,
  'Теннис|Сумки': `${UNSPLASH_BASE}tennis,bag`,
  'Настольный теннис|Ракетки': `${UNSPLASH_BASE}table-tennis,paddle`,
  'Настольный теннис|Обувь': `${UNSPLASH_BASE}table-tennis,shoes`,
  'Настольный теннис|Мячи': `${UNSPLASH_BASE}table-tennis,ball`,
  'Настольный теннис|Одежда': `${UNSPLASH_BASE}table-tennis,sportswear`,
  'Настольный теннис|Сумки': `${UNSPLASH_BASE}table-tennis,bag`,
  'Настольный теннис|Аксессуары': `${UNSPLASH_BASE}table-tennis,equipment`,
  'Сквош|Ракетки': `${UNSPLASH_BASE}squash,racket`,
  'Сквош|Обувь': `${UNSPLASH_BASE}squash,shoes`,
  'Сквош|Мячи': `${UNSPLASH_BASE}squash,ball`,
  'Сквош|Струны': `${UNSPLASH_BASE}squash,stringing`,
  'Сквош|Одежда': `${UNSPLASH_BASE}squash,sportswear`,
  'Сквош|Сумки': `${UNSPLASH_BASE}squash,bag`,
  'Сквош|Аксессуары': `${UNSPLASH_BASE}squash,gear`,
}

function getFallbackProductImage(product) {
  const key = `${product.sport}|${product.category}`
  return (
    imageFallbackBySportCategory[key] ||
    `${UNSPLASH_BASE}${encodeURIComponent(`${product.sport} ${product.category}`)}`
  )
}

function getOptimizedProductImage(imageUrl) {
  if (!imageUrl || !imageUrl.includes('cdn.shopify.com')) return imageUrl
  const hasWidthParam = /[?&]width=\d+/.test(imageUrl)
  if (hasWidthParam) return imageUrl
  return `${imageUrl}${imageUrl.includes('?') ? '&' : '?'}width=640`
}

// ProductCard — отображает один товар
function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { showToast } = useToast()
  const { t } = useTranslation()
  const [imageError, setImageError] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const liked = isInWishlist(product.id)
  const productImage = useMemo(
    () => getOptimizedProductImage(product.image),
    [product.image]
  )

  const handleAddToCart = () => {
    addToCart(product)
    setIsAdding(true)
    showToast(t('productCard.addedToCart', { name: product.name }), 'success')
    setTimeout(() => setIsAdding(false), 600)
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
    showToast(
      liked ? t('productCard.removedFromWishlist') : t('productCard.addedToWishlist'),
      liked ? 'info' : 'success'
    )
  }

  // Скидка в процентах
  const discountPercent = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0

  return (
    <div className="product-card">
      {/* Бейдж */}
      {product.badge && (
        <span className={`product-badge product-badge--${product.badge === 'Скидка' ? 'sale' : product.badge === 'Новинка' ? 'new' : 'hit'}`}>
          {product.badge === 'Скидка' && discountPercent > 0
            ? `-${discountPercent}%`
            : product.badge}
        </span>
      )}

      {/* Кнопка «Избранное» */}
      <button
        className={`product-wishlist-btn ${liked ? 'active' : ''}`}
        onClick={handleToggleWishlist}
        title={liked ? t('productCard.removeFromWishlist') : t('productCard.addToWishlist')}
      >
        {liked ? '♥' : '♡'}
      </button>

      {/* Картинка */}
      <Link to={`/product/${product.id}`} className="product-card-image-link">
        <img
          src={imageError ? getFallbackProductImage(product) : productImage}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onError={(e) => {
            if (imageError) {
              e.currentTarget.onerror = null
              e.currentTarget.src = FALLBACK_IMAGE
              return
            }
            setImageError(true)
          }}
        />
      </Link>

      {/* Информация */}
      <div className="product-card-info">
        <span className="product-card-sport">{product.sport}</span>

        <Link to={`/product/${product.id}`} className="product-card-name">
          {product.name}
        </Link>

        {/* Рейтинг */}
        <div className="product-card-rating">
          <div className="product-card-stars-wrapper">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`product-card-star ${star <= Math.round(product.rating) ? 'filled' : ''}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="product-card-rating-num">{product.rating}</span>
          <span className="product-card-reviews">({product.reviews})</span>
        </div>

        {/* Цена */}
        <div className="product-card-prices">
          <span className="product-card-price">${product.price.toLocaleString('en-US')}</span>
          {product.oldPrice && (
            <span className="product-card-old-price">${product.oldPrice.toLocaleString('en-US')}</span>
          )}
        </div>

        {/* Кнопка «В корзину» */}
        <button
          className={`product-card-btn ${isAdding ? 'added' : ''}`}
          onClick={handleAddToCart}
        >
          {isAdding ? t('productCard.added') : t('productCard.addToCart')}
        </button>
      </div>
    </div>
  )
}

export default memo(ProductCard)
