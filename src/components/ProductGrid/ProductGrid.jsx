import ProductCard from '../ProductCard/ProductCard'
import './ProductGrid.css'

// ProductGrid — сетка карточек товаров
// Принимает массив products и отображает их в виде сетки
function ProductGrid({ products }) {
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
}

export default ProductGrid
