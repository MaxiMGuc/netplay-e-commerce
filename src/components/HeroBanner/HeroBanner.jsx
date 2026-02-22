import { Link } from 'react-router-dom'
import './HeroBanner.css'

// HeroBanner — главный баннер на главной странице
function HeroBanner() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-badge">Бесплатная доставка от 5 000 ₽</span>
        <h1 className="hero-title">
          Всё для ракеточного<br />спорта в одном месте
        </h1>
        <p className="hero-subtitle">
          Оригинальные ракетки, обувь, одежда и аксессуары от ведущих мировых
          брендов. Бадминтон, теннис, настольный теннис и сквош.
        </p>
        <div className="hero-buttons">
          <Link to="/catalog" className="hero-btn hero-btn--primary">
            Перейти в каталог
          </Link>
          <Link to="/catalog?badge=Скидка" className="hero-btn hero-btn--outline">
            🔥 Акции и скидки
          </Link>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <strong>500+</strong>
            <span>товаров</span>
          </div>
          <div className="hero-stat">
            <strong>8</strong>
            <span>брендов</span>
          </div>
          <div className="hero-stat">
            <strong>10 000+</strong>
            <span>покупателей</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-visual-card">🏸</div>
        <div className="hero-visual-card">🎾</div>
        <div className="hero-visual-card">🏓</div>
      </div>
    </section>
  )
}

export default HeroBanner
