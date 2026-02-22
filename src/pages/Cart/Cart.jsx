import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import './Cart.css'

// Cart — страница корзины
// Использует CartContext для чтения и изменения товаров
function Cart() {
  const { items, updateQuantity, removeFromCart, totalItems, totalPrice } = useCart()

  // Пустая корзина
  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <span className="cart-empty-icon">🛒</span>
          <h1 className="cart-empty-title">Корзина пуста</h1>
          <p className="cart-empty-text">
            Добавьте товары из каталога, чтобы оформить заказ
          </p>
          <Link to="/catalog" className="cart-empty-btn">
            Перейти в каталог
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Корзина</h1>

      <div className="cart-layout">
        {/* Список товаров */}
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.name} className="cart-item-image" />
              </Link>

              <div className="cart-item-info">
                <Link to={`/product/${item.id}`} className="cart-item-name">
                  {item.name}
                </Link>
                <p className="cart-item-price">{item.price.toLocaleString('ru-RU')} ₽</p>
              </div>

              <div className="cart-item-quantity">
                <button
                  className="cart-qty-btn"
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  −
                </button>
                <span className="cart-qty-value">{item.quantity}</span>
                <button
                  className="cart-qty-btn"
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>

              <p className="cart-item-subtotal">
                {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
              </p>

              <button
                className="cart-item-remove"
                title="Удалить"
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Итого */}
        <div className="cart-summary">
          <h2 className="cart-summary-title">Итого</h2>
          <div className="cart-summary-row">
            <span>Товаров:</span>
            <span>{totalItems} шт.</span>
          </div>
          <div className="cart-summary-row cart-summary-total">
            <span>Сумма:</span>
            <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
          </div>
          <button className="cart-checkout-btn">Оформить заказ</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
