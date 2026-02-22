import { Link } from 'react-router-dom'
import './Footer.css'

// Footer — подвал сайта с ссылками, контактами и копирайтом
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-columns">
          {/* Логотип и описание */}
          <div className="footer-col">
            <h3 className="footer-logo">🏸 РакеткаМаркет</h3>
            <p className="footer-desc">
              Интернет-магазин снаряжения для ракеточного спорта.
              Бадминтон, теннис, настольный теннис, сквош.
            </p>
          </div>

          {/* Каталог */}
          <div className="footer-col">
            <h4 className="footer-heading">Каталог</h4>
            <ul className="footer-links">
              <li><Link to="/catalog?sport=Бадминтон">Бадминтон</Link></li>
              <li><Link to="/catalog?sport=Теннис">Теннис</Link></li>
              <li><Link to="/catalog?sport=Настольный теннис">Настольный теннис</Link></li>
              <li><Link to="/catalog?sport=Сквош">Сквош</Link></li>
            </ul>
          </div>

          {/* Информация */}
          <div className="footer-col">
            <h4 className="footer-heading">Информация</h4>
            <ul className="footer-links">
              <li><Link to="/about">О компании</Link></li>
              <li><Link to="/categories">Категории</Link></li>
              <li><Link to="/catalog">Каталог</Link></li>
            </ul>
          </div>

          {/* Контакты */}
          <div className="footer-col">
            <h4 className="footer-heading">Контакты</h4>
            <ul className="footer-links">
              <li>📞 +7 (999) 123-45-67</li>
              <li>✉️ info@racketmarket.ru</li>
              <li>📍 Москва, ул. Спортивная, 10</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 РакеткаМаркет. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
