import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Cart.css'

// Демо-данные для примера (пустая корзина по умолчанию)
const initialItems = []

function Cart() {
  const [items, setItems] = useState(initialItems)

  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

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
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />

              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">{item.price.toFixed(2)} ₽</p>
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
                {(item.price * item.quantity).toFixed(2)} ₽
              </p>

              <button
                className="cart-item-remove"
                title="Удалить"
                onClick={() => removeItem(item.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2 className="cart-summary-title">Итого</h2>
          <div className="cart-summary-row">
            <span>Товаров:</span>
            <span>{items.reduce((s, i) => s + i.quantity, 0)} шт.</span>
          </div>
          <div className="cart-summary-row cart-summary-total">
            <span>Сумма:</span>
            <span>{total.toFixed(2)} ₽</span>
          </div>
          <button className="cart-checkout-btn">Оформить заказ</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
