import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useWishlist } from '../../context/WishlistContext'
import ProductGrid from '../../components/ProductGrid/ProductGrid'
import './Wishlist.css'

function Wishlist() {
  const { items } = useWishlist()
  const { t } = useTranslation()

  // Получение правильного склонения для количества товаров
  const getProductWord = (count) => {
    if (count === 1) return t('catalog.product_one')
    if (count >= 2 && count <= 4) return t('catalog.product_few')
    return t('catalog.product_many')
  }

  return (
    <main className="wishlist-page">
      <h1 className="wishlist-title">{t('wishlist.title')}</h1>

      {items.length === 0 ? (
        <div className="wishlist-empty">
          <span className="wishlist-empty-icon">♡</span>
          <h2 className="wishlist-empty-title">{t('wishlist.empty')}</h2>
          <p className="wishlist-empty-text">
            {t('wishlist.emptyText')}
          </p>
          <Link to="/catalog" className="wishlist-empty-btn">
            {t('wishlist.goToCatalog')}
          </Link>
        </div>
      ) : (
        <>
          <p className="wishlist-count">
            {items.length} {getProductWord(items.length)}
          </p>
          <ProductGrid products={items} />
        </>
      )}
    </main>
  )
}

export default Wishlist
