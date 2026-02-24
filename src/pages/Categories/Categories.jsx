import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductGrid from '../../components/ProductGrid/ProductGrid'
import { useProducts } from '../../context/ProductsContext'
import './Categories.css'

// Categories — страница со всеми категориями и видами спорта
function Categories() {
  const { t } = useTranslation()
  const { products } = useProducts()

  const sports = [
    { name: t('home.badminton'), sportKey: 'Бадминтон', icon: '🏸', color: '#6366f1' },
    { name: t('home.tennis'), sportKey: 'Теннис', icon: '🎾', color: '#10b981' },
    { name: t('home.tableTennis'), sportKey: 'Настольный теннис', icon: '🏓', color: '#f59e0b' },
    { name: t('home.squash'), sportKey: 'Сквош', icon: '💥', color: '#ef4444' },
  ]

  const categories = [
    { name: t('categories.rackets'), icon: '🏸', desc: t('categories.racketsDesc'), key: 'Ракетки' },
    { name: t('categories.shoes'), icon: '👟', desc: t('categories.shoesDesc'), key: 'Обувь' },
    { name: t('categories.clothing'), icon: '👕', desc: t('categories.clothingDesc'), key: 'Одежда' },
    { name: t('categories.shuttlecocks'), icon: '🪶', desc: t('categories.shuttlecocksDesc'), key: 'Воланы' },
    { name: t('categories.strings'), icon: '🧵', desc: t('categories.stringsDesc'), key: 'Струны' },
    { name: t('categories.bags'), icon: '🎒', desc: t('categories.bagsDesc'), key: 'Сумки' },
    { name: t('categories.accessories'), icon: '🎽', desc: t('categories.accessoriesDesc'), key: 'Аксессуары' },
  ]

  // Популярные товары для каждого вида спорта (по 4 шт)
  const badmintonProducts = products.filter((p) => p.sport === 'Бадминтон').slice(0, 4)
  const tennisProducts = products.filter((p) => p.sport === 'Теннис').slice(0, 4)
  const tableTennisProducts = products.filter((p) => p.sport === 'Настольный теннис').slice(0, 4)
  const squashProducts = products.filter((p) => p.sport === 'Сквош').slice(0, 4)

  return (
    <main className="categories-page">
      <h1 className="categories-title">{t('categories.title')}</h1>

      {/* По видам спорта */}
      <section className="categories-section">
        <h2 className="categories-subtitle">{t('categories.sports')}</h2>
        <div className="categories-sports-grid">
          {sports.map((sport) => (
            <Link
              key={sport.sportKey}
              to={`/catalog?sport=${encodeURIComponent(sport.sportKey)}`}
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
        <h2 className="categories-subtitle">{t('categories.productTypes')}</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat.key}
              to={`/catalog?category=${encodeURIComponent(cat.key)}`}
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
          <h2 className="categories-subtitle">{t('categories.badmintonPopular')}</h2>
          <Link to="/catalog?sport=Бадминтон" className="categories-view-all">{t('categories.viewAll')}</Link>
        </div>
        <ProductGrid products={badmintonProducts} />
      </section>

      {/* Популярные товары — Теннис */}
      <section className="categories-section">
        <div className="categories-section-header">
          <h2 className="categories-subtitle">{t('categories.tennisPopular')}</h2>
          <Link to="/catalog?sport=Теннис" className="categories-view-all">{t('categories.viewAll')}</Link>
        </div>
        <ProductGrid products={tennisProducts} />
      </section>

      {/* Популярные товары — Настольный теннис */}
      <section className="categories-section">
        <div className="categories-section-header">
          <h2 className="categories-subtitle">{t('categories.tableTennisPopular')}</h2>
          <Link to="/catalog?sport=Настольный теннис" className="categories-view-all">{t('categories.viewAll')}</Link>
        </div>
        <ProductGrid products={tableTennisProducts} />
      </section>

      {/* Популярные товары — Сквош */}
      <section className="categories-section">
        <div className="categories-section-header">
          <h2 className="categories-subtitle">{t('categories.squashPopular')}</h2>
          <Link to="/catalog?sport=Сквош" className="categories-view-all">{t('categories.viewAll')}</Link>
        </div>
        <ProductGrid products={squashProducts} />
      </section>
    </main>
  )
}

export default Categories
