import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import HeroBanner from '../../components/HeroBanner/HeroBanner'
import { ProductRow } from '../../components/ProductGrid/ProductGrid'
import { useProducts } from '../../context/ProductsContext'
import './Home.css'

function Home() {
  const { t } = useTranslation()
  const { products } = useProducts()
  const hits = products.filter((p) => p.badge === 'Хит')
  const sale = products.filter((p) => p.badge === 'Скидка')
  const newArrivals = products.filter((p) => p.badge === 'Новинка')

  const badminton = products.filter((p) => p.sport === 'Бадминтон').slice(0, 12)
  const tennis = products.filter((p) => p.sport === 'Теннис').slice(0, 12)
  const tableTennis = products.filter((p) => p.sport === 'Настольный теннис').slice(0, 12)
  const squash = products.filter((p) => p.sport === 'Сквош').slice(0, 12)

  const brands = [
    { name: 'Yonex', logo: '🏸' },
    { name: 'Wilson', logo: '🎾' },
    { name: 'Butterfly', logo: '🏓' },
    { name: 'Li-Ning', logo: '🥇' },
    { name: 'Head', logo: '🎯' },
    { name: 'Babolat', logo: '💪' },
    { name: 'Tecnifibre', logo: '⚡' },
    { name: 'Dunlop', logo: '🔥' },
  ]

  return (
    <main className="netflix-home">
      <HeroBanner />

      {/* Sports Quick Links */}
      <section className="netflix-section">
        <div className="netflix-section-header">
          <h2 className="netflix-section-title">{t('home.sports')}</h2>
        </div>
        <div className="netflix-sports-row">
          <Link to="/catalog?sport=Бадминтон" className="netflix-sport-card">
            <div className="netflix-sport-icon">🏸</div>
            <span className="netflix-sport-name">{t('home.badminton')}</span>
            <span className="netflix-sport-count">{products.filter(p => p.sport === 'Бадминтон').length} {t('home.productsCount')}</span>
          </Link>
          <Link to="/catalog?sport=Теннис" className="netflix-sport-card">
            <div className="netflix-sport-icon">🎾</div>
            <span className="netflix-sport-name">{t('home.tennis')}</span>
            <span className="netflix-sport-count">{products.filter(p => p.sport === 'Теннис').length} {t('home.productsCount')}</span>
          </Link>
          <Link to="/catalog?sport=Настольный теннис" className="netflix-sport-card">
            <div className="netflix-sport-icon">🏓</div>
            <span className="netflix-sport-name">{t('home.tableTennis')}</span>
            <span className="netflix-sport-count">{products.filter(p => p.sport === 'Настольный теннис').length} {t('home.productsCount')}</span>
          </Link>
          <Link to="/catalog?sport=Сквош" className="netflix-sport-card">
            <div className="netflix-sport-icon">💥</div>
            <span className="netflix-sport-name">{t('home.squash')}</span>
            <span className="netflix-sport-count">{products.filter(p => p.sport === 'Сквош').length} {t('home.productsCount')}</span>
          </Link>
        </div>
      </section>

      {/* Best Sellers */}
      {hits.length > 0 && (
        <section className="netflix-section">
          <div className="netflix-section-header">
            <h2 className="netflix-section-title">{t('home.bestSellers')}</h2>
            <Link to="/catalog" className="netflix-section-link">{t('home.allProducts')} →</Link>
          </div>
          <ProductRow products={hits} />
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="netflix-section">
          <div className="netflix-section-header">
            <h2 className="netflix-section-title">{t('home.newArrivals')}</h2>
            <Link to="/catalog" className="netflix-section-link">{t('home.allNew')} →</Link>
          </div>
          <ProductRow products={newArrivals} />
        </section>
      )}

      {/* Promo Banner */}
      <section className="netflix-promo-section">
        <div className="netflix-promo-card">
          <div className="netflix-promo-content">
            <span className="netflix-promo-tag">{t('home.promoTag')}</span>
            <h3>{t('home.promoTitle1').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}</h3>
            <Link to="/catalog?sport=Бадминтон&badge=Скидка" className="netflix-promo-btn">
              {t('home.viewBtn')} →
            </Link>
          </div>
        </div>
        <div className="netflix-promo-card netflix-promo-card--alt">
          <div className="netflix-promo-content">
            <span className="netflix-promo-tag">{t('home.promoNewTag')}</span>
            <h3>{t('home.promoTitle2').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}</h3>
            <Link to="/catalog?sport=Теннис&badge=Новинка" className="netflix-promo-btn">
              {t('home.viewBtn')} →
            </Link>
          </div>
        </div>
      </section>

      {/* Sale */}
      {sale.length > 0 && (
        <section className="netflix-section">
          <div className="netflix-section-header">
            <h2 className="netflix-section-title">{t('home.sales')}</h2>
            <Link to="/catalog" className="netflix-section-link">{t('home.viewAll')} →</Link>
          </div>
          <ProductRow products={sale} />
        </section>
      )}

      {/* By Sport Rows */}
      {badminton.length > 0 && (
        <section className="netflix-section">
          <div className="netflix-section-header">
            <h2 className="netflix-section-title">🏸 {t('home.badminton')}</h2>
            <Link to="/catalog?sport=Бадминтон" className="netflix-section-link">{t('home.viewAll')} →</Link>
          </div>
          <ProductRow products={badminton} />
        </section>
      )}

      {tennis.length > 0 && (
        <section className="netflix-section">
          <div className="netflix-section-header">
            <h2 className="netflix-section-title">🎾 {t('home.tennis')}</h2>
            <Link to="/catalog?sport=Теннис" className="netflix-section-link">{t('home.viewAll')} →</Link>
          </div>
          <ProductRow products={tennis} />
        </section>
      )}

      {tableTennis.length > 0 && (
        <section className="netflix-section">
          <div className="netflix-section-header">
            <h2 className="netflix-section-title">🏓 {t('home.tableTennis')}</h2>
            <Link to="/catalog?sport=Настольный теннис" className="netflix-section-link">{t('home.viewAll')} →</Link>
          </div>
          <ProductRow products={tableTennis} />
        </section>
      )}

      {squash.length > 0 && (
        <section className="netflix-section">
          <div className="netflix-section-header">
            <h2 className="netflix-section-title">💥 {t('home.squash')}</h2>
            <Link to="/catalog?sport=Сквош" className="netflix-section-link">{t('home.viewAll')} →</Link>
          </div>
          <ProductRow products={squash} />
        </section>
      )}

      {/* Brands */}
      <section className="netflix-section">
        <h2 className="netflix-section-title">{t('home.ourBrands')}</h2>
        <div className="netflix-brands-row">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              to={`/catalog?search=${brand.name}`}
              className="netflix-brand-card"
            >
              <span className="netflix-brand-logo">{brand.logo}</span>
              <span className="netflix-brand-name">{brand.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="netflix-features">
        <div className="netflix-feature">
          <span className="netflix-feature-icon">🚚</span>
          <h3>{t('home.fastDelivery')}</h3>
          <p>{t('home.fastDeliveryDesc')}</p>
        </div>
        <div className="netflix-feature">
          <span className="netflix-feature-icon">✅</span>
          <h3>{t('home.original')}</h3>
          <p>{t('home.originalDesc')}</p>
        </div>
        <div className="netflix-feature">
          <span className="netflix-feature-icon">🔄</span>
          <h3>{t('home.return14')}</h3>
          <p>{t('home.return14Desc')}</p>
        </div>
        <div className="netflix-feature">
          <span className="netflix-feature-icon">💬</span>
          <h3>{t('home.expertHelp')}</h3>
          <p>{t('home.expertHelpDesc')}</p>
        </div>
      </section>
    </main>
  )
}

export default Home
