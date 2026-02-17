import './ProductCard.css'

function ProductCard({ product, onAddToCart }) {
  const { name, price, image, rating, category } = product

  const renderStars = (rating) => {
    const full = Math.floor(rating)
    const half = rating % 1 >= 0.5
    const stars = []
    for (let i = 0; i < full; i++) stars.push('★')
    if (half) stars.push('½')
    return stars.join('')
  }

  return (
    <div className="product-card">
      <div className="card-image-wrapper">
        <img src={image} alt={name} className="card-image" loading="lazy" />
        <span className="card-category">{category}</span>
      </div>

      <div className="card-body">
        <h3 className="card-title">{name}</h3>

        <div className="card-meta">
          <span className="card-rating">
            <span className="stars">{renderStars(rating)}</span>
            <span className="rating-num">{rating}</span>
          </span>
        </div>

        <div className="card-footer">
          <span className="card-price">${price.toFixed(2)}</span>
          <button className="add-to-cart" onClick={() => onAddToCart(product)}>
            + Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
