import { memo } from 'react'
import ProductCard from '../ProductCard/ProductCard'
import './ProductGrid.css'

// ProductGrid — grid layout for product cards
const ProductGrid = memo(function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="product-grid-empty">
        <span className="product-grid-empty-icon">🔍</span>
        <p>Товары не найдены</p>
        <p className="product-grid-empty-hint">Попробуйте изменить фильтры</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
})

// ProductRow — Netflix-style horizontal scroll row
export const ProductRow = memo(function ProductRow({ products }) {
  if (products.length === 0) return null

  return (
    <div className="product-row">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
})

export default ProductGrid
