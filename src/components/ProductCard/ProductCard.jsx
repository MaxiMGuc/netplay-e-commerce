import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './ProductCard.css'

// ProductCard — отображает один товар
// Принимает объект product с полями: id, name, price, oldPrice, image, sport, badge, rating, reviews
function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="product-card">
      {/* Бейдж (Хит, Скидка, Новинка) */}
      {product.badge && (
        <span className={`product-badge product-badge--${product.badge === 'Скидка' ? 'sale' : product.badge === 'Новинка' ? 'new' : 'hit'}`}>
          {product.badge}
        </span>
      )}

      {/* Картинка — кликабельная, ведёт на страницу товара */}
      <Link to={`/product/${product.id}`} className="product-card-image-link">
        <img src={product.image} alt={product.name} className="product-card-image" />
      </Link>

      {/* Информация о товаре */}
      <div className="product-card-info">
        <span className="product-card-sport">{product.sport}</span>

        <Link to={`/product/${product.id}`} className="product-card-name">
          {product.name}
        </Link>

        {/* Рейтинг */}
        <div className="product-card-rating">
          <span className="product-card-stars">{'★'.repeat(Math.round(product.rating))}</span>
          <span className="product-card-reviews">{product.reviews} отзывов</span>
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
          className="product-card-btn"
          onClick={() => addToCart(product)}
        >
          В корзину
        </button>
      </div>
    </div>
  )
}

export default ProductCard
