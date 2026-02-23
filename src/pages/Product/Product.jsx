import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { useToast } from '../../context/ToastContext'
import ProductGrid from '../../components/ProductGrid/ProductGrid'
import products from '../../data/products'
import './Product.css'

// Product — страница одного товара
function Product() {
  const { id } = useParams()
  const { addToCart, isInCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { showToast } = useToast()
  const { t } = useTranslation()
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [imageError, setImageError] = useState(false)

  // Находим товар по id
  const product = products.find((p) => p.id === Number(id))

  // Если товар не найден
  if (!product) {
    return (
      <main className="product-page">
        <div className="product-not-found">
          <span className="product-not-found-icon">🔍</span>
          <h1>{t('product.notFound')}</h1>
          <p>{t('product.notFoundDesc')}</p>
          <Link to="/catalog" className="product-back-btn">{t('product.backToCatalog')}</Link>
        </div>
      </main>
    )
  }

  const liked = isInWishlist(product.id)
  const inCart = isInCart(product.id)

  // Скидка в процентах
  const discountPercent = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0

  const handleAddToCart = () => {
    addToCart(product, quantity)
    showToast(t('product.addedToCart', { name: product.name, qty: quantity }), 'success')
  }

  const handleToggleWishlist = () => {
    toggleWishlist(product)
    showToast(
      liked ? t('product.removedFromWishlist') : t('product.addedToWishlist'),
      liked ? 'info' : 'success'
    )
  }

  // Похожие товары
  const related = products
    .filter((p) => p.sport === product.sport && p.id !== product.id)
    .slice(0, 4)

  // Табы
  const tabs = [
    { key: 'description', label: t('product.descriptionTab') },
    { key: 'specs', label: t('product.specsTab') },
    { key: 'reviews', label: t('product.reviewsTab', { count: product.reviews }) },
    { key: 'delivery', label: t('product.deliveryTab') },
  ]

  return (
    <main className="product-page">
      {/* Хлебные крошки */}
      <nav className="product-breadcrumbs">
        <Link to="/">{t('catalog.home')}</Link>
        <span>/</span>
        <Link to="/catalog">{t('catalog.catalog')}</Link>
        <span>/</span>
        <Link to={`/catalog?sport=${encodeURIComponent(product.sport)}`}>{product.sport}</Link>
        <span>/</span>
        <span className="product-breadcrumb-current">{product.name}</span>
      </nav>

      {/* Основной блок */}
      <div className="product-main">
        {/* Картинка */}
        <div className="product-image-block">
          {product.badge && (
            <span className={`product-page-badge product-page-badge--${product.badge === 'Скидка' ? 'sale' : product.badge === 'Новинка' ? 'new' : 'hit'}`}>
              {product.badge === 'Скидка' && discountPercent > 0
                ? `-${discountPercent}%`
                : product.badge}
            </span>
          )}
          <img
            src={imageError ? '' : product.image}
            alt={product.name}
            className="product-image"
            onError={() => setImageError(true)}
          />
        </div>

        {/* Информация */}
        <div className="product-details">
          <span className="product-sport-tag">{product.sport} / {product.category}</span>
          <h1 className="product-name">{product.name}</h1>

          {/* Рейтинг */}
          <div className="product-rating">
            <div className="product-stars-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`product-star ${star <= Math.round(product.rating) ? 'filled' : ''}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="product-rating-num">{product.rating}</span>
            <span className="product-reviews-count">{product.reviews} {t('product.reviews')}</span>
          </div>

          {/* Цена */}
          <div className="product-price-block">
            <span className="product-price-current">${product.price.toLocaleString('en-US')}</span>
            {product.oldPrice && (
              <>
                <span className="product-price-old">${product.oldPrice.toLocaleString('en-US')}</span>
                <span className="product-price-discount">-{discountPercent}%</span>
              </>
            )}
          </div>

          {/* Описание (краткое) */}
          <p className="product-description">{product.description}</p>

          {/* Наличие */}
          <div className="product-availability">
            <span className="product-availability-dot" />
            {t('product.inStock')}
          </div>

          {/* Количество + Кнопка */}
          <div className="product-actions">
            <div className="product-qty">
              <button
                className="product-qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="product-qty-value">{quantity}</span>
              <button
                className="product-qty-btn"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>

            <button className="product-add-btn" onClick={handleAddToCart}>
              {inCart ? t('product.alreadyInCart') : t('product.addToCart')}
            </button>

            <button
              className={`product-wishlist-btn ${liked ? 'active' : ''}`}
              onClick={handleToggleWishlist}
              title={liked ? t('product.removeFromWishlist') : t('product.addToWishlist')}
            >
              {liked ? '♥' : '♡'}
            </button>
          </div>

          {/* Преимущества */}
          <div className="product-perks">
            <div className="product-perk">
              <span>🚚</span> {t('product.freeDeliveryPerk')}
            </div>
            <div className="product-perk">
              <span>🔄</span> {t('product.returnPerk')}
            </div>
            <div className="product-perk">
              <span>✅</span> {t('product.guaranteePerk')}
            </div>
          </div>
        </div>
      </div>

      {/* Табы */}
      <section className="product-tabs-section">
        <div className="product-tabs-nav">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`product-tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="product-tab-content">
          {activeTab === 'description' && (
            <div className="product-tab-description">
              <p>{product.description}</p>
              <p>
                {t('product.brand')}: <strong>Yonex</strong>. {t('product.category')}: <strong>{product.category}</strong>.
                {t('product.sportType')}: <strong>{product.sport}</strong>.
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="product-tab-specs">
              <table className="product-specs-table">
                <tbody>
                  <tr><td>{t('product.brand')}</td><td>Yonex</td></tr>
                  <tr><td>{t('product.category')}</td><td>{product.category}</td></tr>
                  <tr><td>{t('product.sportType')}</td><td>{product.sport}</td></tr>
                  <tr><td>{t('product.article')}</td><td>YNX-{String(product.id).padStart(4, '0')}</td></tr>
                  <tr><td>{t('product.rating')}</td><td>{product.rating} {t('product.outOf5')}</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="product-tab-reviews">
              <div className="product-reviews-summary">
                <div className="product-reviews-score">
                  <span className="product-reviews-big-num">{product.rating}</span>
                  <div>
                    <div className="product-reviews-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={star <= Math.round(product.rating) ? 'filled' : ''}>★</span>
                      ))}
                    </div>
                    <p>{product.reviews} {t('product.reviews')}</p>
                  </div>
                </div>
              </div>
              <p className="product-reviews-placeholder">
                {t('product.reviewsPlaceholder')}
              </p>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="product-tab-delivery">
              <h3>{t('product.deliveryMethods')}</h3>
              <ul>
                <li><strong>{t('product.courierMoscow')}</strong> {t('product.courierMoscowDesc')}</li>
                <li><strong>{t('product.cdek')}</strong> {t('product.cdekDesc')}</li>
                <li><strong>{t('product.russianPost')}</strong> {t('product.russianPostDesc')}</li>
                <li><strong>{t('product.pickup')}</strong> {t('product.pickupDesc')}</li>
              </ul>
              <h3>{t('product.payment')}</h3>
              <ul>
                <li>{t('product.payCard')}</li>
                <li>{t('product.payCash')}</li>
                <li>{t('product.payWallet')}</li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Похожие товары */}
      {related.length > 0 && (
        <section className="product-related">
          <div className="product-related-header">
            <h2 className="product-related-title">{t('product.relatedProducts')}</h2>
            <Link
              to={`/catalog?sport=${encodeURIComponent(product.sport)}`}
              className="product-related-link"
            >
              {t('product.allProducts')}
            </Link>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </main>
  )
}

export default Product
