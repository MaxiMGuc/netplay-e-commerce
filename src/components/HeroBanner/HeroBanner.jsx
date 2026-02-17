import './HeroBanner.css'

function HeroBanner() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Discover Premium <br />
          <span>Products</span> for You
        </h1>
        <p className="hero-subtitle">
          Shop the latest trends in electronics, fashion, and home decor.
          Quality products at unbeatable prices.
        </p>
        <a href="#products" className="hero-cta">
          Shop Now →
        </a>
      </div>
      <div className="hero-visual">
        🛍️
      </div>
    </section>
  )
}

export default HeroBanner
