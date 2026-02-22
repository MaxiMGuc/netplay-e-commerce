import { useParams, Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import products from '../../data/products'
import './Product.css'

// Product — страница одного товара
// Читает id из URL и показывает подробную информацию
function Product() {
  const { id } = useParams()
  const { addToCart } = useCart()

  // Находим товар по id
  const product = products.find((p) => p.id === Number(id))

  // Если товар не найден
  if (!product) {
    return (
      <main className="product-page">
        <div className="product-not-found">
          <h1>Товар не найден</h1>
          <p>Возможно, товар был удалён или ссылка неверная.</p>
          <Link to="/catalog" className="product-back-btn">Вернуться в каталог</Link>
        </div>
      </main>
    )
  }

  // Похожие товары (тот же спорт, но другой id)
  const related = products
    .filter((p) => p.sport === product.sport && p.id !== product.id)
    .slice(0, 4)

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
              {product.badge}
            </span>
          )}
          <img src={product.image} alt={product.name} className="product-image" />
        </div>

        {/* Информация */}
        <div className="product-details">
          <span className="product-sport-tag">{product.sport}</span>
          <h1 className="product-name">{product.name}</h1>

          {/* Рейтинг */}
          <div className="product-rating">
            <span className="product-stars">{'★'.repeat(Math.round(product.rating))}</span>
            <span className="product-rating-num">{product.rating}</span>
            <span className="product-reviews-count">({product.reviews} отзывов)</span>
          </div>

          {/* Цена */}
          <div className="product-price-block">
            <span className="product-price-current">{product.price.toLocaleString('ru-RU')} ₽</span>
            {product.oldPrice && (
              <span className="product-price-old">{product.oldPrice.toLocaleString('ru-RU')} ₽</span>
            )}
          </div>

          {/* Описание */}
          <p className="product-description">{product.description}</p>

          {/* Характеристики */}
          <div className="product-specs">
            <div className="product-spec">
              <span className="product-spec-label">Категория</span>
              <span className="product-spec-value">{product.category}</span>
            </div>
            <div className="product-spec">
              <span className="product-spec-label">Вид спорта</span>
              <span className="product-spec-value">{product.sport}</span>
            </div>
          </div>

          {/* Кнопка */}
          <button
            className="product-add-btn"
            onClick={() => addToCart(product)}
          >
            🛒 Добавить в корзину
          </button>
        </div>
      </div>

      {/* Похожие товары */}
      {related.length > 0 && (
        <section className="product-related">
          <h2 className="product-related-title">Похожие товары</h2>
          <div className="product-related-grid">
            {related.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`} className="product-related-card">
                <img src={item.image} alt={item.name} className="product-related-img" />
                <div className="product-related-info">
                  <p className="product-related-name">{item.name}</p>
                  <p className="product-related-price">{item.price.toLocaleString('ru-RU')} ₽</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default Product
