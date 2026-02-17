import { useState, useMemo } from 'react'
import './App.css'
import products from './data/products'
import Header from './components/Header/Header'
import HeroBanner from './components/HeroBanner/HeroBanner'
import SearchBar from './components/SearchBar/SearchBar'
import CategoryFilter from './components/CategoryFilter/CategoryFilter'
import ProductGrid from './components/ProductGrid/ProductGrid'
import Footer from './components/Footer/Footer'

function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState([])

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchesCategory =
        category === 'All' || p.category === category
      return matchesSearch && matchesCategory
    })
  }, [search, category])

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product])
  }

  return (
    <div className="app">
      <Header cartCount={cart.length} />
      <HeroBanner />

      <main className="main" id="products">
        <div className="toolbar">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter active={category} onChange={setCategory} />
        </div>

        <p className="results-count">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </p>

        <ProductGrid
          products={filteredProducts}
          onAddToCart={handleAddToCart}
        />
      </main>

      <Footer />
    </div>
  )
}

export default App
