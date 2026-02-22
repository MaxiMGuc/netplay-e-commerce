import { Link } from 'react-router-dom'
import products from '../../data/products'
import ProductGrid from '../../components/ProductGrid/ProductGrid'
import './Categories.css'

// Categories — страница со всеми категориями и видами спорта
const sports = [
  { name: 'Бадминтон', icon: '🏸', color: '#6366f1' },
  { name: 'Теннис', icon: '🎾', color: '#10b981' },
  { name: 'Настольный теннис', icon: '🏓', color: '#f59e0b' },
  { name: 'Сквош', icon: '💥', color: '#ef4444' },
]

const categories = [
  { name: 'Ракетки', icon: '🏸', desc: 'Профессиональные и любительские' },
  { name: 'Обувь', icon: '👟', desc: 'Кроссовки для зала и корта' },
  { name: 'Одежда', icon: '👕', desc: 'Спортивная форма и экипировка' },
  { name: 'Мячи', icon: '🎾', desc: 'Теннисные, для настольного тенниса и сквоша' },
  { name: 'Воланы', icon: '🪶', desc: 'Перьевые и пластиковые' },
  { name: 'Струны', icon: '🧵', desc: 'Для бадминтонных и теннисных ракеток' },
  { name: 'Сумки', icon: '🎒', desc: 'Сумки и рюкзаки для снаряжения' },
  { name: 'Аксессуары', icon: '🎽', desc: 'Обмотки, напульсники, кепки' },
]

function Categories() {
  // Популярные товары для каждого вида спорта (по 4 шт)
  const badmintonProducts = products.filter((p) => p.sport === 'Бадминтон').slice(0, 4)
  const tennisProducts = products.filter((p) => p.sport === 'Теннис').slice(0, 4)
  const tableTennisProducts = products.filter((p) => p.sport === 'Настольный теннис').slice(0, 4)
  const squashProducts = products.filter((p) => p.sport === 'Сквош').slice(0, 4)

  return (
    <main className="categories-page">
      <h1 className="categories-title">Категории</h1>

      {/* По видам спорта */}
      <section className="categories-section">
        <h2 className="categories-subtitle">Виды спорта</h2>
        <div className="categories-sports-grid">
          {sports.map((sport) => (
            <Link
              key={sport.name}
              to={`/catalog?sport=${encodeURIComponent(sport.name)}`}
              className="categories-sport-card"
              style={{ borderColor: sport.color }}
            >
              <span className="categories-sport-icon">{sport.icon}</span>
              <span className="categories-sport-name">{sport.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* По категориям товаров */}
      <section className="categories-section">
        <h2 className="categories-subtitle">Типы товаров</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/catalog?category=${encodeURIComponent(cat.name)}`}
              className="categories-card"
            >
              <span className="categories-card-icon">{cat.icon}</span>
              <div>
                <h3 className="categories-card-name">{cat.name}</h3>
                <p className="categories-card-desc">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Популярные товары — Бадминтон */}
      <section className="categories-section">
        <div className="categories-section-header">
          <h2 className="categories-subtitle">🏸 Бадминтон — популярное</h2>
          <Link to="/catalog?sport=Бадминтон" className="categories-view-all">Все товары →</Link>
        </div>
        <ProductGrid products={badmintonProducts} />
      </section>

      {/* Популярные товары — Теннис */}
      <section className="categories-section">
        <div className="categories-section-header">
          <h2 className="categories-subtitle">🎾 Теннис — популярное</h2>
          <Link to="/catalog?sport=Теннис" className="categories-view-all">Все товары →</Link>
        </div>
        <ProductGrid products={tennisProducts} />
      </section>

      {/* Популярные товары — Настольный теннис */}
      <section className="categories-section">
        <div className="categories-section-header">
          <h2 className="categories-subtitle">🏓 Настольный теннис — популярное</h2>
          <Link to="/catalog?sport=Настольный теннис" className="categories-view-all">Все товары →</Link>
        </div>
        <ProductGrid products={tableTennisProducts} />
      </section>

      {/* Популярные товары — Сквош */}
      <section className="categories-section">
        <div className="categories-section-header">
          <h2 className="categories-subtitle">💥 Сквош — популярное</h2>
          <Link to="/catalog?sport=Сквош" className="categories-view-all">Все товары →</Link>
        </div>
        <ProductGrid products={squashProducts} />
      </section>
    </main>
  )
}

export default Categories
