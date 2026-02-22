import { Link } from 'react-router-dom'
import HeroBanner from '../../components/HeroBanner/HeroBanner'
import ProductGrid from '../../components/ProductGrid/ProductGrid'
import products from '../../data/products'
import './Home.css'

// Home — главная страница
function Home() {
  const hits = products.filter((p) => p.badge === 'Хит')
  const sale = products.filter((p) => p.badge === 'Скидка')
  const newArrivals = products.filter((p) => p.badge === 'Новинка')
  const allPreview = products.slice(0, 8)

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
    <main className="home">
      {/* Главный баннер */}
      <HeroBanner />

      {/* Быстрые ссылки по видам спорта */}
      <section className="home-sports">
        <h2 className="home-section-title">Виды спорта</h2>
        <div className="home-sports-grid">
          <Link to="/catalog?sport=Бадминтон" className="home-sport-card">
            <span className="home-sport-icon">🏸</span>
            <span className="home-sport-name">Бадминтон</span>
            <span className="home-sport-count">{products.filter(p => p.sport === 'Бадминтон').length} товаров</span>
          </Link>
          <Link to="/catalog?sport=Теннис" className="home-sport-card">
            <span className="home-sport-icon">🎾</span>
            <span className="home-sport-name">Теннис</span>
            <span className="home-sport-count">{products.filter(p => p.sport === 'Теннис').length} товаров</span>
          </Link>
          <Link to="/catalog?sport=Настольный теннис" className="home-sport-card">
            <span className="home-sport-icon">🏓</span>
            <span className="home-sport-name">Настольный теннис</span>
            <span className="home-sport-count">{products.filter(p => p.sport === 'Настольный теннис').length} товаров</span>
          </Link>
          <Link to="/catalog?sport=Сквош" className="home-sport-card">
            <span className="home-sport-icon">💥</span>
            <span className="home-sport-name">Сквош</span>
            <span className="home-sport-count">{products.filter(p => p.sport === 'Сквош').length} товаров</span>
          </Link>
        </div>
      </section>

      {/* Хиты продаж */}
      {hits.length > 0 && (
        <section className="home-section">
          <div className="home-section-header">
            <h2 className="home-section-title">🔥 Хиты продаж</h2>
            <Link to="/catalog" className="home-section-link">Все товары →</Link>
          </div>
          <ProductGrid products={hits} />
        </section>
      )}

      {/* Промо-баннер */}
      <section className="home-promo">
        <div className="home-promo-card home-promo-card--1">
          <div className="home-promo-content">
            <span className="home-promo-tag">Акция</span>
            <h3>Скидки до 25%<br />на бадминтон</h3>
            <Link to="/catalog?sport=Бадминтон&badge=Скидка" className="home-promo-btn">
              Смотреть →
            </Link>
          </div>
        </div>
        <div className="home-promo-card home-promo-card--2">
          <div className="home-promo-content">
            <span className="home-promo-tag">Новинки</span>
            <h3>Новая коллекция<br />теннисных ракеток</h3>
            <Link to="/catalog?sport=Теннис&badge=Новинка" className="home-promo-btn">
              Смотреть →
            </Link>
          </div>
        </div>
      </section>

      {/* Новинки */}
      {newArrivals.length > 0 && (
        <section className="home-section">
          <div className="home-section-header">
            <h2 className="home-section-title">✨ Новинки</h2>
            <Link to="/catalog" className="home-section-link">Все новинки →</Link>
          </div>
          <ProductGrid products={newArrivals} />
        </section>
      )}

      {/* Товары со скидкой */}
      {sale.length > 0 && (
        <section className="home-section">
          <div className="home-section-header">
            <h2 className="home-section-title">💰 Скидки</h2>
            <Link to="/catalog" className="home-section-link">Смотреть все →</Link>
          </div>
          <ProductGrid products={sale} />
        </section>
      )}

      {/* Популярные товары */}
      <section className="home-section">
        <div className="home-section-header">
          <h2 className="home-section-title">Популярные товары</h2>
          <Link to="/catalog" className="home-section-link">Весь каталог →</Link>
        </div>
        <ProductGrid products={allPreview} />
      </section>

      {/* Бренды */}
      <section className="home-section">
        <h2 className="home-section-title">Наши бренды</h2>
        <div className="home-brands-grid">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              to={`/catalog?search=${brand.name}`}
              className="home-brand-card"
            >
              <span className="home-brand-logo">{brand.logo}</span>
              <span className="home-brand-name">{brand.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Преимущества */}
      <section className="home-features">
        <div className="home-feature">
          <span className="home-feature-icon">🚚</span>
          <h3>Быстрая доставка</h3>
          <p>Доставка по всей России от 1 дня. Бесплатно от 5 000 ₽.</p>
        </div>
        <div className="home-feature">
          <span className="home-feature-icon">✅</span>
          <h3>100% оригинал</h3>
          <p>Только сертифицированная продукция от официальных дистрибьюторов.</p>
        </div>
        <div className="home-feature">
          <span className="home-feature-icon">🔄</span>
          <h3>Возврат 14 дней</h3>
          <p>Простой возврат без лишних вопросов. Гарантия на все товары.</p>
        </div>
        <div className="home-feature">
          <span className="home-feature-icon">💬</span>
          <h3>Эксперт на связи</h3>
          <p>Наши консультанты помогут подобрать снаряжение под ваш стиль игры.</p>
        </div>
      </section>
    </main>
  )
}

export default Home
