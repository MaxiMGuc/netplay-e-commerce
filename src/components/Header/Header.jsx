import './Header.css'

function Header({ cartCount }) {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="/" className="logo">
          🛒 <span>Piksuri</span>Shop
        </a>

        <nav className="nav">
          <a href="#products">Products</a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
        </nav>

        <div className="cart-btn">
          🛍️ Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
      </div>
    </header>
  )
}

export default Header
