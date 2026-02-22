import { Link } from 'react-router-dom'
import { useWishlist } from '../../context/WishlistContext'
import ProductGrid from '../../components/ProductGrid/ProductGrid'
import './Wishlist.css'

function Wishlist() {
  const { items } = useWishlist()

  return (
    <main className="wishlist-page">
      <h1 className="wishlist-title">Избранное</h1>

      {items.length === 0 ? (
        <div className="wishlist-empty">
          <span className="wishlist-empty-icon">♡</span>
          <h2 className="wishlist-empty-title">В избранном пока пусто</h2>
          <p className="wishlist-empty-text">
            Нажмите ♡ на карточке товара, чтобы сохранить его в избранное
          </p>
          <Link to="/catalog" className="wishlist-empty-btn">
            Перейти в каталог
          </Link>
        </div>
      ) : (
        <>
          <p className="wishlist-count">
            {items.length} {items.length === 1 ? 'товар' : items.length < 5 ? 'товара' : 'товаров'}
          </p>
          <ProductGrid products={items} />
        </>
      )}
    </main>
  )
}

export default Wishlist
