import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">Страница не найдена</h1>
        <p className="not-found-text">
          Возможно, страница была удалена или адрес введён неверно
        </p>
        <div className="not-found-actions">
          <Link to="/" className="not-found-btn not-found-btn--primary">
            На главную
          </Link>
          <Link to="/catalog" className="not-found-btn not-found-btn--outline">
            В каталог
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFound
