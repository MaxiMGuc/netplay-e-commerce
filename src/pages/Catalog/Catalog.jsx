import { useMemo, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SportFilter from '../../components/SportFilter/SportFilter'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter'
import ProductGrid from '../../components/ProductGrid/ProductGrid'
import products from '../../data/products'
import './Catalog.css'

// Catalog — страница каталога с фильтрами и сортировкой
function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sortBy, setSortBy] = useState('popular')
  const { t } = useTranslation()

  // Варианты сортировки
  const sortOptions = [
    { value: 'popular', label: t('catalog.sortPopular') },
    { value: 'price-asc', label: t('catalog.sortPriceAsc') },
    { value: 'price-desc', label: t('catalog.sortPriceDesc') },
    { value: 'rating', label: t('catalog.sortRating') },
    { value: 'name', label: t('catalog.sortName') },
  ]

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

  // Сброс всех фильтров
  const handleResetFilters = () => {
    setSearchParams({})
    setSortBy('popular')
  }

  // Фильтрация и сортировка товаров
  const filtered = useMemo(() => {
    let result = products.filter((product) => {
      if (currentSport !== 'Все' && product.sport !== currentSport) return false
      if (currentCategory !== 'Все' && product.category !== currentCategory) return false
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const inName = product.name.toLowerCase().includes(query)
        const inDesc = product.description.toLowerCase().includes(query)
        if (!inName && !inDesc) return false
      }
      return true
    })

    // Сортировка
    switch (sortBy) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name, 'ru'))
        break
      default:
        // По популярности — по кол-ву отзывов
        result = [...result].sort((a, b) => b.reviews - a.reviews)
    }

    return result
  }, [currentSport, currentCategory, searchQuery, sortBy])

  // Диапазон цен
  const priceRange = useMemo(() => {
    if (filtered.length === 0) return null
    const prices = filtered.map((p) => p.price)
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    }
  }, [filtered])

  const hasActiveFilters = currentSport !== 'Все' || currentCategory !== 'Все' || searchQuery

  // Получение правильного склонения для количества товаров
  const getProductWord = (count) => {
    if (count === 1) return t('catalog.product_one')
    if (count >= 2 && count <= 4) return t('catalog.product_few')
    return t('catalog.product_many')
  }

  return (
    <main className="catalog">
      {/* Хлебные крошки */}
      <nav className="catalog-breadcrumbs">
        <Link to="/">{t('catalog.home')}</Link>
        <span>/</span>
        <span className="catalog-breadcrumb-current">{t('catalog.catalog')}</span>
        {currentSport !== 'Все' && (
          <>
            <span>/</span>
            <span className="catalog-breadcrumb-current">{currentSport}</span>
          </>
        )}
      </nav>

      <div className="catalog-header">
        <h1 className="catalog-title">
          {searchQuery
            ? t('catalog.searchResults', { query: searchQuery })
            : currentSport !== 'Все'
            ? t('catalog.sportCatalog', { sport: currentSport })
            : t('catalog.catalogTitle')}
        </h1>
      </div>

      {/* Фильтры */}
      <div className="catalog-filters">
        <SportFilter active={currentSport} onChange={handleSportChange} />
        <CategoryFilter active={currentCategory} onChange={handleCategoryChange} />
      </div>

      {/* Панель инструментов */}
      <div className="catalog-toolbar">
        <div className="catalog-toolbar-left">
          <p className="catalog-count">
            {filtered.length} {getProductWord(filtered.length)}
          </p>
          {priceRange && filtered.length > 1 && (
            <span className="catalog-price-range">
              {t('catalog.from')} ${priceRange.min.toLocaleString('en-US')} {t('catalog.to')} ${priceRange.max.toLocaleString('en-US')}
            </span>
          )}
        </div>

        <div className="catalog-toolbar-right">
          {hasActiveFilters && (
            <button className="catalog-reset-btn" onClick={handleResetFilters}>
              {t('catalog.resetFilters')}
            </button>
          )}
          <select
            className="catalog-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Сетка товаров */}
      <ProductGrid products={filtered} />
    </main>
  )
}

export default Catalog
