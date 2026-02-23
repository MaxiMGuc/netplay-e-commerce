import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useToast } from '../../context/ToastContext'
import './Footer.css'

// Footer — подвал сайта
function Footer() {
  const [email, setEmail] = useState('')
  const { showToast } = useToast()
  const { t } = useTranslation()

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      showToast(t('footer.subscribed'), 'success')
      setEmail('')
    }
  }

  return (
    <footer className="footer">
      {/* Блок подписки */}
      <div className="footer-newsletter">
        <div className="footer-newsletter-inner">
          <div className="footer-newsletter-text">
            <h3>{t('footer.newsletterTitle')}</h3>
            <p>{t('footer.newsletterDesc')}</p>
          </div>
          <form className="footer-newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder={t('footer.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">{t('footer.subscribe')}</button>
          </form>
        </div>
      </div>

      {/* Основной контент */}
      <div className="footer-main">
        <div className="footer-inner">
          <div className="footer-columns">
            {/* Логотип и описание */}
            <div className="footer-col footer-col--brand">
              <h3 className="footer-logo">{t('footer.brandName')}</h3>
              <p className="footer-desc">
                {t('footer.brandDesc')}
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
              <h4 className="footer-heading">{t('footer.catalogHeading')}</h4>
              <ul className="footer-links">
                <li><Link to="/catalog?sport=Бадминтон">{t('home.badminton')}</Link></li>
                <li><Link to="/catalog?sport=Теннис">{t('home.tennis')}</Link></li>
                <li><Link to="/catalog?sport=Настольный теннис">{t('home.tableTennis')}</Link></li>
                <li><Link to="/catalog?sport=Сквош">{t('home.squash')}</Link></li>
                <li><Link to="/catalog">{t('footer.allProducts')}</Link></li>
              </ul>
            </div>

            {/* Покупателям */}
            <div className="footer-col">
              <h4 className="footer-heading">{t('footer.customersHeading')}</h4>
              <ul className="footer-links">
                <li><Link to="/about">{t('footer.aboutCompany')}</Link></li>
                <li><Link to="/categories">{t('footer.categoriesLink')}</Link></li>
                <li><Link to="/about#contacts">{t('footer.contacts')}</Link></li>
                <li><Link to="/cart">{t('footer.cartLink')}</Link></li>
                <li><Link to="/wishlist">{t('footer.wishlistLink')}</Link></li>
              </ul>
            </div>

            {/* Контакты */}
            <div className="footer-col">
              <h4 className="footer-heading">{t('footer.contactsHeading')}</h4>
              <ul className="footer-links footer-contacts">
                <li>
                  <span className="footer-contact-icon">📞</span>
                  <div>
                    <strong>{t('footer.phone')}</strong>
                    <span>{t('footer.workHours')}</span>
                  </div>
                </li>
                <li>
                  <span className="footer-contact-icon">✉️</span>
                  <div>
                    <strong>{t('footer.emailContact')}</strong>
                    <span>{t('footer.emailResponseTime')}</span>
                  </div>
                </li>
                <li>
                  <span className="footer-contact-icon">📍</span>
                  <div>
                    <strong>{t('footer.city')}</strong>
                    <span>{t('footer.address')}</span>
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
          <p>{t('footer.copyright')}</p>
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
