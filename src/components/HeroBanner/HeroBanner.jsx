import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './HeroBanner.css'

function HeroBanner() {
  const { t } = useTranslation()

  return (
    <section className="netflix-hero">
      <div className="netflix-hero-bg">
        <div className="netflix-hero-gradient" />
      </div>

      <div className="netflix-hero-content">
        <span className="netflix-hero-badge">🏸 {t('hero.badge')}</span>
        <h1 className="netflix-hero-title">
          {t('hero.title').split('\n').map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}
        </h1>
        <p className="netflix-hero-desc">
          {t('hero.subtitle')}
        </p>
        <div className="netflix-hero-buttons">
          <Link to="/catalog" className="netflix-hero-btn netflix-hero-btn--primary">
            <span className="netflix-hero-btn-icon">▶</span>
            {t('hero.catalogBtn')}
          </Link>
          <Link to="/categories" className="netflix-hero-btn netflix-hero-btn--secondary">
            <span className="netflix-hero-btn-icon">ℹ</span>
            {t('hero.saleBtn')}
          </Link>
        </div>

        <div className="netflix-hero-stats">
          <div className="netflix-hero-stat">
            <strong>500+</strong>
            <span>{t('hero.products')}</span>
          </div>
          <div className="netflix-hero-stat-divider" />
          <div className="netflix-hero-stat">
            <strong>8</strong>
            <span>{t('hero.brands')}</span>
          </div>
          <div className="netflix-hero-stat-divider" />
          <div className="netflix-hero-stat">
            <strong>10K+</strong>
            <span>{t('hero.customers')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroBanner
