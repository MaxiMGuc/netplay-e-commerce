import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import './Header.css'

// Header — шапка сайта с логотипом, поиском, авторизацией, избранным и корзиной
function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { totalItems } = useCart()
  const { totalWishlist } = useWishlist()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="header">
      {/* Верхняя полоска */}
      <div className="header-topbar">
        <div className="header-topbar-inner">
          <span>Бесплатная доставка от 5 000 ₽</span>
          <div className="header-topbar-links">
            <Link to="/about">О компании</Link>
            <Link to="/about#contacts">Контакты</Link>
            <span>📞 +7 (999) 123-45-67</span>
          </div>
        </div>
      </div>

      {/* Основная шапка */}
      <div className="header-main">
        <div className="header-inner">
          <Link to="/" className="logo">
            <span className="logo-icon">🏸</span>
            <span className="logo-text">
              <span className="logo-accent">Ракетка</span>Маркет
            </span>
          </Link>

          <form className="header-search-form" onSubmit={handleSearchSubmit}>
            <span className="header-search-icon">🔍</span>
            <input
              type="text"
              className="header-search-input"
              placeholder="Поиск по каталогу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="header-search-clear"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
            <button type="submit" className="header-search-submit">
              Найти
            </button>
          </form>

          <div className="header-actions">
            <Link to="/login" className="header-action-link" title="Войти">
              <span className="header-action-icon">👤</span>
              <span className="header-action-label">Войти</span>
            </Link>

            <Link to="/wishlist" className="header-action-link" title="Избранное">
              <span className="header-action-icon">♡</span>
              {totalWishlist > 0 && (
                <span className="header-action-badge">{totalWishlist}</span>
              )}
              <span className="header-action-label">Избранное</span>
            </Link>

            <Link to="/cart" className="header-action-link" title="Корзина">
              <span className="header-action-icon">🛒</span>
              {totalItems > 0 && (
                <span className="header-action-badge">{totalItems}</span>
              )}
              <span className="header-action-label">Корзина</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
