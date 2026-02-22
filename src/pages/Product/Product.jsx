import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
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
          <h1>Товар не найден</h1>
          <p>Возможно, товар был удалён или ссылка неверная.</p>
          <Link to="/catalog" className="product-back-btn">Вернуться в каталог</Link>
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
    showToast(`${product.name} (${quantity} шт.) добавлен в корзину`, 'success')
  }

  const handleToggleWishlist = () => {
    toggleWishlist(product)
    showToast(
      liked ? 'Удалено из избранного' : 'Добавлено в избранное',
      liked ? 'info' : 'success'
    )
  }

  // Похожие товары
  const related = products
    .filter((p) => p.sport === product.sport && p.id !== product.id)
    .slice(0, 4)

  // Табы
  const tabs = [
    { key: 'description', label: 'Описание' },
    { key: 'specs', label: 'Характеристики' },
    { key: 'reviews', label: `Отзывы (${product.reviews})` },
    { key: 'delivery', label: 'Доставка' },
  ]

  return (
    <main className="product-page">
      {/* Хлебные крошки */}
      <nav className="product-breadcrumbs">
        <Link to="/">Главная</Link>
        <span>/</span>
        <Link to="/catalog">Каталог</Link>
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
            <span className="product-reviews-count">{product.reviews} отзывов</span>
          </div>

          {/* Цена */}
          <div className="product-price-block">
            <span className="product-price-current">{product.price.toLocaleString('ru-RU')} ₽</span>
            {product.oldPrice && (
              <>
                <span className="product-price-old">{product.oldPrice.toLocaleString('ru-RU')} ₽</span>
                <span className="product-price-discount">-{discountPercent}%</span>
              </>
            )}
          </div>

          {/* Описание (краткое) */}
          <p className="product-description">{product.description}</p>

          {/* Наличие */}
          <div className="product-availability">
            <span className="product-availability-dot" />
            В наличии
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
              {inCart ? '🛒 Уже в корзине — добавить ещё' : '🛒 Добавить в корзину'}
            </button>

            <button
              className={`product-wishlist-btn ${liked ? 'active' : ''}`}
              onClick={handleToggleWishlist}
              title={liked ? 'Убрать из избранного' : 'В избранное'}
            >
              {liked ? '♥' : '♡'}
            </button>
          </div>

          {/* Преимущества */}
          <div className="product-perks">
            <div className="product-perk">
              <span>🚚</span> Бесплатная доставка от 5 000 ₽
            </div>
            <div className="product-perk">
              <span>🔄</span> Возврат 14 дней
            </div>
            <div className="product-perk">
              <span>✅</span> Гарантия оригинальности
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
                Бренд: <strong>Yonex</strong>. Категория: <strong>{product.category}</strong>.
                Вид спорта: <strong>{product.sport}</strong>.
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="product-tab-specs">
              <table className="product-specs-table">
                <tbody>
                  <tr><td>Бренд</td><td>Yonex</td></tr>
                  <tr><td>Категория</td><td>{product.category}</td></tr>
                  <tr><td>Вид спорта</td><td>{product.sport}</td></tr>
                  <tr><td>Артикул</td><td>YNX-{String(product.id).padStart(4, '0')}</td></tr>
                  <tr><td>Рейтинг</td><td>{product.rating} из 5</td></tr>
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
                    <p>{product.reviews} отзывов</p>
                  </div>
                </div>
              </div>
              <p className="product-reviews-placeholder">
                Отзывы покупателей скоро появятся здесь. Вы можете оставить первый отзыв!
              </p>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="product-tab-delivery">
              <h3>Способы доставки</h3>
              <ul>
                <li><strong>Курьером по Москве</strong> — 1–2 дня, от 300 ₽ (бесплатно от 5 000 ₽)</li>
                <li><strong>СДЭК</strong> — 2–5 дней, от 350 ₽</li>
                <li><strong>Почта России</strong> — 5–10 дней, от 250 ₽</li>
                <li><strong>Самовывоз</strong> — бесплатно, Москва, ул. Спортивная, 10</li>
              </ul>
              <h3>Оплата</h3>
              <ul>
                <li>Банковская карта онлайн</li>
                <li>Наличные курьеру при получении</li>
                <li>Электронные кошельки (ЮMoney, SberPay)</li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Похожие товары */}
      {related.length > 0 && (
        <section className="product-related">
          <div className="product-related-header">
            <h2 className="product-related-title">Похожие товары</h2>
            <Link
              to={`/catalog?sport=${encodeURIComponent(product.sport)}`}
              className="product-related-link"
            >
              Все товары →
            </Link>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </main>
  )
}

export default Product
