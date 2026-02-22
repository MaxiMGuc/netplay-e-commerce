import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import SportFilter from '../../components/SportFilter/SportFilter'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter'
import ProductGrid from '../../components/ProductGrid/ProductGrid'
import products from '../../data/products'
import './Catalog.css'

// Catalog — страница каталога с фильтрами
// Читает параметры из URL (?sport=...&category=...&search=...)
function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Текущие фильтры из URL
  const currentSport = searchParams.get('sport') || 'Все'
  const currentCategory = searchParams.get('category') || 'Все'
  const searchQuery = searchParams.get('search') || ''

  // Обновление фильтра спорта
  const handleSportChange = (sport) => {
    const params = new URLSearchParams(searchParams)
    if (sport === 'Все') {
      params.delete('sport')
    } else {
      params.set('sport', sport)
    }
    setSearchParams(params)
  }

  // Обновление фильтра категории
  const handleCategoryChange = (category) => {
    const params = new URLSearchParams(searchParams)
    if (category === 'Все') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    setSearchParams(params)
  }

  // Фильтрация товаров
  const filtered = useMemo(() => {
    return products.filter((product) => {
      // Фильтр по спорту
      if (currentSport !== 'Все' && product.sport !== currentSport) return false
      // Фильтр по категории
      if (currentCategory !== 'Все' && product.category !== currentCategory) return false
      // Фильтр по поиску
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const inName = product.name.toLowerCase().includes(query)
        const inDesc = product.description.toLowerCase().includes(query)
        if (!inName && !inDesc) return false
      }
      return true
    })
  }, [currentSport, currentCategory, searchQuery])

  return (
    <main className="catalog">
      <h1 className="catalog-title">Каталог товаров</h1>

      {/* Поисковый запрос */}
      {searchQuery && (
        <p className="catalog-search-info">
          Результаты поиска: <strong>«{searchQuery}»</strong>
        </p>
      )}

      {/* Фильтр по виду спорта */}
      <div className="catalog-filters">
        <SportFilter active={currentSport} onChange={handleSportChange} />
        <CategoryFilter active={currentCategory} onChange={handleCategoryChange} />
      </div>

      {/* Количество найденных товаров */}
      <p className="catalog-count">
        Найдено: {filtered.length} {filtered.length === 1 ? 'товар' : 'товаров'}
      </p>

      {/* Сетка товаров */}
      <ProductGrid products={filtered} />
    </main>
  )
}

export default Catalog
