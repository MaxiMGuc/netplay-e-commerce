import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useToast } from '../../context/ToastContext'
import './ProductCard.css'

// Изображение-заглушка при ошибке загрузки
const FALLBACK_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiB2aWV3Qm94PSIwIDAgMzAwIDMwMCI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmMWY1ZjkiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2NiZDVlMSIgZm9udC1zaXplPSI0OCI+8J+TtzwvdGV4dD48L3N2Zz4='

// ProductCard — отображает один товар
function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { showToast } = useToast()
  const [imageError, setImageError] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const liked = isInWishlist(product.id)

  const handleAddToCart = () => {
    addToCart(product)
    setIsAdding(true)
    showToast(`${product.name} добавлен в корзину`, 'success')
    setTimeout(() => setIsAdding(false), 600)
  }

  const handleToggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
    showToast(
      liked ? 'Удалено из избранного' : 'Добавлено в избранное',
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
        title={liked ? 'Убрать из избранного' : 'В избранное'}
      >
        {liked ? '♥' : '♡'}
      </button>

      {/* Картинка */}
      <Link to={`/product/${product.id}`} className="product-card-image-link">
        <img
          src={imageError ? FALLBACK_IMAGE : product.image}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
          onError={() => setImageError(true)}
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
          <span className="product-card-price">{product.price.toLocaleString('ru-RU')} ₽</span>
          {product.oldPrice && (
            <span className="product-card-old-price">{product.oldPrice.toLocaleString('ru-RU')} ₽</span>
          )}
        </div>

        {/* Кнопка «В корзину» */}
        <button
          className={`product-card-btn ${isAdding ? 'added' : ''}`}
          onClick={handleAddToCart}
        >
          {isAdding ? '✓ Добавлено' : 'В корзину'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard
