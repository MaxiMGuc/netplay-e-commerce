import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '../../context/ToastContext'
import './Footer.css'

// Footer — подвал сайта
function Footer() {
  const [email, setEmail] = useState('')
  const { showToast } = useToast()

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      showToast('Спасибо за подписку! Скоро пришлём промокод.', 'success')
      setEmail('')
    }
  }

  return (
    <footer className="footer">
      {/* Блок подписки */}
      <div className="footer-newsletter">
        <div className="footer-newsletter-inner">
          <div className="footer-newsletter-text">
            <h3>Подпишитесь на рассылку</h3>
            <p>Получайте скидки до 15% и узнавайте о новинках первыми</p>
          </div>
          <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Подписаться</button>
          </form>
        </div>
      </div>

      {/* Основной контент */}
      <div className="footer-main">
        <div className="footer-inner">
          <div className="footer-columns">
            {/* Логотип и описание */}
            <div className="footer-col footer-col--brand">
              <h3 className="footer-logo">🏸 РакеткаМаркет</h3>
              <p className="footer-desc">
                Интернет-магазин снаряжения для ракеточного спорта.
                Бадминтон, теннис, настольный теннис, сквош.
              </p>
              <div className="footer-social">
                <a href="#" className="footer-social-link" title="Telegram">📱</a>
                <a href="#" className="footer-social-link" title="VK">💬</a>
                <a href="#" className="footer-social-link" title="YouTube">📹</a>
                <a href="#" className="footer-social-link" title="Instagram">📷</a>
              </div>
            </div>

            {/* Каталог */}
            <div className="footer-col">
              <h4 className="footer-heading">Каталог</h4>
              <ul className="footer-links">
                <li><Link to="/catalog?sport=Бадминтон">Бадминтон</Link></li>
                <li><Link to="/catalog?sport=Теннис">Теннис</Link></li>
                <li><Link to="/catalog?sport=Настольный теннис">Настольный теннис</Link></li>
                <li><Link to="/catalog?sport=Сквош">Сквош</Link></li>
                <li><Link to="/catalog">Все товары</Link></li>
              </ul>
            </div>

            {/* Покупателям */}
            <div className="footer-col">
              <h4 className="footer-heading">Покупателям</h4>
              <ul className="footer-links">
                <li><Link to="/about">О компании</Link></li>
                <li><Link to="/categories">Категории</Link></li>
                <li><Link to="/about#contacts">Контакты</Link></li>
                <li><Link to="/cart">Корзина</Link></li>
                <li><Link to="/wishlist">Избранное</Link></li>
              </ul>
            </div>

            {/* Контакты */}
            <div className="footer-col">
              <h4 className="footer-heading">Контакты</h4>
              <ul className="footer-links footer-contacts">
                <li>
                  <span className="footer-contact-icon">📞</span>
                  <div>
                    <strong>+7 (999) 123-45-67</strong>
                    <span>Пн–Пт: 9:00–20:00</span>
                  </div>
                </li>
                <li>
                  <span className="footer-contact-icon">✉️</span>
                  <div>
                    <strong>info@racketmarket.ru</strong>
                    <span>Ответим в течение часа</span>
                  </div>
                </li>
                <li>
                  <span className="footer-contact-icon">📍</span>
                  <div>
                    <strong>Москва</strong>
                    <span>ул. Спортивная, д. 10</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Нижняя полоса */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© 2026 РакеткаМаркет. Все права защищены.</p>
          <div className="footer-payments">
            <span className="footer-payment" title="Visa">💳</span>
            <span className="footer-payment" title="Mastercard">💳</span>
            <span className="footer-payment" title="Мир">💳</span>
            <span className="footer-payment" title="СБП">🏦</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
