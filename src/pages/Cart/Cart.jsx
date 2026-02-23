import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'
import './Cart.css'

// Cart — страница корзины
function Cart() {
  const { items, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice } = useCart()
  const { showToast } = useToast()
  const { t } = useTranslation()

  const handleRemove = (item) => {
    removeFromCart(item.id)
    showToast(t('cart.removed', { name: item.name }), 'info')
  }

  const handleClear = () => {
    clearCart()
    showToast(t('cart.cleared'), 'info')
  }

  // Расчёт доставки
  const deliveryPrice = totalPrice >= 99 ? 0 : 10
  const finalPrice = totalPrice + deliveryPrice

  // Пустая корзина
  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <span className="cart-empty-icon">🛒</span>
          <h1 className="cart-empty-title">{t('cart.empty')}</h1>
          <p className="cart-empty-text">
            {t('cart.emptyText')}
          </p>
          <Link to="/catalog" className="cart-empty-btn">
            {t('cart.goToCatalog')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1 className="cart-title">{t('cart.title')}</h1>
        <button className="cart-clear-btn" onClick={handleClear}>
          {t('cart.clear')}
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
                <p className="cart-item-price-single">${item.price.toLocaleString('en-US')} {t('cart.perItem')}</p>
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
                ${(item.price * item.quantity).toLocaleString('en-US')}
              </p>

              <button
                className="cart-item-remove"
                title={t('productCard.removeFromWishlist')}
                onClick={() => handleRemove(item)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Итого */}
        <div className="cart-summary">
          <h2 className="cart-summary-title">{t('cart.yourOrder')}</h2>

          <div className="cart-summary-row">
            <span>{t('cart.itemsCount')}</span>
            <span>{totalItems} {t('cart.pcs')}</span>
          </div>

          <div className="cart-summary-row">
            <span>{t('cart.itemsCost')}</span>
            <span>${totalPrice.toLocaleString('en-US')}</span>
          </div>

          <div className="cart-summary-row">
            <span>{t('cart.delivery')}</span>
            <span className={deliveryPrice === 0 ? 'cart-free-delivery' : ''}>
              {deliveryPrice === 0 ? t('cart.free') : `$${deliveryPrice}`}
            </span>
          </div>

          {deliveryPrice > 0 && (
            <p className="cart-delivery-hint">
              {t('cart.freeDeliveryLeft', { amount: (99 - totalPrice).toLocaleString('en-US') })}
            </p>
          )}

          <div className="cart-summary-row cart-summary-total">
            <span>{t('cart.total')}</span>
            <span>${finalPrice.toLocaleString('en-US')}</span>
          </div>

          <button className="cart-checkout-btn">{t('cart.checkout')}</button>

          <Link to="/catalog" className="cart-continue-link">
            {t('cart.continueShopping')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
