import { Link } from 'react-router-dom'
import './HeroBanner.css'

// HeroBanner — главный баннер на главной странице
function HeroBanner() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Всё для ракеточного спорта
        </h1>
        <p className="hero-subtitle">
          Ракетки, обувь, одежда и аксессуары для бадминтона, тенниса,
          настольного тенниса и сквоша
        </p>
        <div className="hero-buttons">
          <Link to="/catalog" className="hero-btn hero-btn--primary">
            Перейти в каталог
          </Link>
          <Link to="/categories" className="hero-btn hero-btn--outline">
            Все категории
          </Link>
        </div>
      </div>

      <div className="hero-image">
        🏸
      </div>
    </section>
  )
}

export default HeroBanner
