import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'
import './Cart.css'

// Cart — страница корзины
function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice } = useCart()
  const { showToast } = useToast()

  const handleRemove = (item) => {
    removeFromCart(item.id)
    showToast(`${item.name} удалён из корзины`, 'info')
  }

  const handleClear = () => {
    clearCart()
    showToast('Корзина очищена', 'info')
  }

  // Расчёт доставки
  const deliveryPrice = totalPrice >= 5000 ? 0 : 300
  const finalPrice = totalPrice + deliveryPrice

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
      <div className="cart-header">
        <h1 className="cart-title">Корзина</h1>
        <button className="cart-clear-btn" onClick={handleClear}>
          Очистить корзину
        </button>
      </div>

      <div className="cart-layout">
        {/* Список товаров */}
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <Link to={`/product/${item.id}`} className="cart-item-image-link">
                <img src={item.image} alt={item.name} className="cart-item-image" />
              </Link>

              <div className="cart-item-info">
                <Link to={`/product/${item.id}`} className="cart-item-name">
                  {item.name}
                </Link>
                <p className="cart-item-meta">{item.sport} / {item.category}</p>
                <p className="cart-item-price-single">{item.price.toLocaleString('ru-RU')} ₽ за шт.</p>
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
                onClick={() => handleRemove(item)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Итого */}
        <div className="cart-summary">
          <h2 className="cart-summary-title">Ваш заказ</h2>

          <div className="cart-summary-row">
            <span>Товаров</span>
            <span>{totalItems} шт.</span>
          </div>

          <div className="cart-summary-row">
            <span>Стоимость товаров</span>
            <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
          </div>

          <div className="cart-summary-row">
            <span>Доставка</span>
            <span className={deliveryPrice === 0 ? 'cart-free-delivery' : ''}>
              {deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice} ₽`}
            </span>
          </div>

          {deliveryPrice > 0 && (
            <p className="cart-delivery-hint">
              До бесплатной доставки: {(5000 - totalPrice).toLocaleString('ru-RU')} ₽
            </p>
          )}

          <div className="cart-summary-row cart-summary-total">
            <span>Итого</span>
            <span>{finalPrice.toLocaleString('ru-RU')} ₽</span>
          </div>

          <button className="cart-checkout-btn">Оформить заказ</button>

          <Link to="/catalog" className="cart-continue-link">
            ← Продолжить покупки
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
