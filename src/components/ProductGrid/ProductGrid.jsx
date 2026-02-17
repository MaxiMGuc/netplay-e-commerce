import './ProductGrid.css'
import ProductCard from '../ProductCard/ProductCard'

function ProductGrid({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className="no-results">
        <span className="no-results-icon">😕</span>
        <p>No products found. Try a different search or category.</p>
      </div>
    )
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}

export default ProductGrid
