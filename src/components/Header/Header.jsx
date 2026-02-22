import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          🏸 <span>Ракетка</span>Маркет
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
          <Link to="/login" className="header-auth-link">
            Вход / Регистрация
          </Link>
          <Link to="/cart" className="header-icon-btn" title="Корзина">🛒</Link>
        </div>
      </div>
    </header>
  )
}

export default Header
