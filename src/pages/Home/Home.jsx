import { Link } from 'react-router-dom'
import HeroBanner from '../../components/HeroBanner/HeroBanner'
import ProductGrid from '../../components/ProductGrid/ProductGrid'
import products from '../../data/products'
import './Home.css'

// Home — главная страница
// Показывает баннер, популярные товары и быстрые ссылки на категории
function Home() {
  // Разные выборки товаров для секций
  const hits = products.filter((p) => p.badge === 'Хит')
  const sale = products.filter((p) => p.badge === 'Скидка')
  const newArrivals = products.filter((p) => p.badge === 'Новинка')
  const allPreview = products.slice(0, 8)

  // Бренды-заглушки
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
          </Link>
          <Link to="/catalog?sport=Теннис" className="home-sport-card">
            <span className="home-sport-icon">🎾</span>
            <span className="home-sport-name">Теннис</span>
          </Link>
          <Link to="/catalog?sport=Настольный теннис" className="home-sport-card">
            <span className="home-sport-icon">🏓</span>
            <span className="home-sport-name">Настольный теннис</span>
          </Link>
          <Link to="/catalog?sport=Сквош" className="home-sport-card">
            <span className="home-sport-icon">💥</span>
            <span className="home-sport-name">Сквош</span>
          </Link>
        </div>
      </section>

      {/* Хиты продаж */}
      {hits.length > 0 && (
        <section className="home-section">
          <div className="home-section-header">
            <h2 className="home-section-title">Хиты продаж</h2>
            <Link to="/catalog" className="home-section-link">Все товары →</Link>
          </div>
          <ProductGrid products={hits} />
        </section>
      )}

      {/* Новинки */}
      {newArrivals.length > 0 && (
        <section className="home-section">
          <div className="home-section-header">
            <h2 className="home-section-title">Новинки</h2>
            <Link to="/catalog" className="home-section-link">Все новинки →</Link>
          </div>
          <ProductGrid products={newArrivals} />
        </section>
      )}

      {/* Товары со скидкой */}
      {sale.length > 0 && (
        <section className="home-section">
          <div className="home-section-header">
            <h2 className="home-section-title">Скидки</h2>
            <Link to="/catalog" className="home-section-link">Смотреть все →</Link>
          </div>
          <ProductGrid products={sale} />
        </section>
      )}

      {/* Популярные товары — общая выборка */}
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
            <div key={brand.name} className="home-brand-card">
              <span className="home-brand-logo">{brand.logo}</span>
              <span className="home-brand-name">{brand.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Преимущества */}
      <section className="home-features">
        <div className="home-feature">
          <span className="home-feature-icon">🚚</span>
          <h3>Быстрая доставка</h3>
          <p>Доставка по всей России от 1 дня</p>
        </div>
        <div className="home-feature">
          <span className="home-feature-icon">✅</span>
          <h3>Оригинальные товары</h3>
          <p>Только сертифицированная продукция</p>
        </div>
        <div className="home-feature">
          <span className="home-feature-icon">🔄</span>
          <h3>Возврат 14 дней</h3>
          <p>Простой возврат без лишних вопросов</p>
        </div>
        <div className="home-feature">
          <span className="home-feature-icon">💬</span>
          <h3>Поддержка</h3>
          <p>Консультация по подбору снаряжения</p>
        </div>
      </section>
    </main>
  )
}

export default Home
