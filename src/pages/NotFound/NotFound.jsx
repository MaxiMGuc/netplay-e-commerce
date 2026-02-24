import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './NotFound.css'

function NotFound() {
  const { t } = useTranslation()

  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">{t('notFound.title')}</h1>
        <p className="not-found-text">
          {t('notFound.text')}
        </p>
        <div className="not-found-actions">
          <Link to="/" className="not-found-btn not-found-btn--primary">
            {t('notFound.home')}
          </Link>
          <Link to="/catalog" className="not-found-btn not-found-btn--outline">
            {t('notFound.catalog')}
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFound
