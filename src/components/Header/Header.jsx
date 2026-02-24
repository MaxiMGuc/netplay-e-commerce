import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useToast } from '../../context/ToastContext'
import { useWishlist } from '../../context/WishlistContext'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import './Header.css'

function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const { user, isAdmin, signOut } = useAuth()
  const { totalItems } = useCart()
  const { showToast } = useToast()
  const { totalWishlist } = useWishlist()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    showToast(t('auth.signedOut'), 'info')
    navigate('/')
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        {!isHome && (
          <button
            className="header-back-btn"
            onClick={() => navigate(-1)}
            title={t('header.back')}
          >
            ←
          </button>
        )}

        <Link to="/" className="logo">
          <span className="logo-icon">🏸</span>
          <span className="logo-text">NETPLAY</span>
        </Link>

        <nav className="header-nav">
          <NavLink to="/" className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`} end>
            {t('header.home') || 'Home'}
          </NavLink>
          <NavLink to="/catalog" className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}>
            {t('header.catalog') || 'Catalog'}
          </NavLink>
          <NavLink to="/categories" className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}>
            {t('header.categories') || 'Categories'}
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}>
            {t('header.about') || 'About'}
          </NavLink>
          {isAdmin && (
            <NavLink to="/admin/products" className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}>
              Admin
            </NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin/products#create-product" className={({ isActive }) => `header-nav-link ${isActive ? 'active' : ''}`}>
              + Добавить товар
            </NavLink>
          )}
        </nav>

        <form className="header-search-form" onSubmit={handleSearchSubmit}>
          <span className="header-search-icon">🔍</span>
          <input
            type="text"
            className="header-search-input"
            placeholder={t('header.searchPlaceholder')}
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
        </form>

        <div className="header-actions">
          <LanguageSwitcher />

          {user ? (
            <button className="header-action-link header-user-btn" onClick={handleSignOut} title={t('header.signOut')}>
              <span className="header-action-icon">👤</span>
              <span className="header-action-label">
                {user.user_metadata?.name || t('header.signOut')}
              </span>
            </button>
          ) : (
            <Link to="/login" className="header-action-link" title={t('header.signIn')}>
              <span className="header-action-icon">👤</span>
              <span className="header-action-label">{t('header.signIn')}</span>
            </Link>
          )}

          <Link to="/wishlist" className="header-action-link" title={t('header.wishlist')}>
            <span className="header-action-icon">♡</span>
            {totalWishlist > 0 && (
              <span className="header-action-badge">{totalWishlist}</span>
            )}
          </Link>

          <Link to="/cart" className="header-action-link" title={t('header.cart')}>
            <span className="header-action-icon">🛒</span>
            {totalItems > 0 && (
              <span className="header-action-badge">{totalItems}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
