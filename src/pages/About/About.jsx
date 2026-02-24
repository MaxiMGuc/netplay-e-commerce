import { useTranslation } from 'react-i18next'
import './About.css'

// About — страница «О компании»
function About() {
  const { t } = useTranslation()

  const team = [
    { name: 'Алексей Иванов', role: t('about.teamFounder', { defaultValue: 'Основатель' }), icon: '👨‍💼' },
    { name: 'Мария Петрова', role: t('about.teamPurchasing', { defaultValue: 'Менеджер по закупкам' }), icon: '👩‍💼' },
    { name: 'Дмитрий Сидоров', role: t('about.teamConsultant', { defaultValue: 'Консультант по снаряжению' }), icon: '🧑‍🏫' },
    { name: 'Екатерина Козлова', role: t('about.teamDelivery', { defaultValue: 'Менеджер по доставке' }), icon: '👩‍💻' },
  ]

  const partners = [
    { name: 'Yonex', desc: 'Мировой лидер в бадминтоне', icon: '🏸' },
    { name: 'Wilson', desc: 'Теннисное снаряжение премиум-класса', icon: '🎾' },
    { name: 'Butterfly', desc: 'Настольный теннис №1', icon: '🏓' },
    { name: 'Li-Ning', desc: 'Инновации из Китая', icon: '🥇' },
    { name: 'Head', desc: 'Ракетки для профессионалов', icon: '🎯' },
    { name: 'Babolat', desc: 'Струны и ракетки с историей', icon: '💪' },
    { name: 'Tecnifibre', desc: 'Сквош и теннис', icon: '⚡' },
    { name: 'Dunlop', desc: 'Классика спортивного инвентаря', icon: '🔥' },
  ]

  const faq = [
    { q: 'Как оформить заказ?', a: 'Добавьте товары в корзину и перейдите к оформлению. Оплата возможна картой или при получении.' },
    { q: 'Сколько стоит доставка?', a: 'Доставка бесплатна при заказе от $99. Для остальных заказов — от $10.' },
    { q: 'Можно ли вернуть товар?', a: 'Да, возврат возможен в течение 14 дней с момента получения, если товар не был в использовании.' },
    { q: 'Как подобрать ракетку?', a: 'Свяжитесь с нашими консультантами — поможем подобрать ракетку под ваш стиль игры и уровень.' },
    { q: 'Есть ли гарантия?', a: 'На всю продукцию распространяется гарантия производителя от 6 до 24 месяцев.' },
    { q: 'Работаете ли вы с юридическими лицами?', a: 'Да, мы работаем с клубами, школами и магазинами. Свяжитесь для обсуждения условий.' },
  ]

  return (
    <main className="about-page">
      <h1 className="about-title">{t('about.title')}</h1>

      {/* Описание */}
      <section className="about-section">
        <h2>{t('about.companyName')}</h2>
        <p>{t('about.companyDesc1')}</p>
        <p>{t('about.companyDesc2')}</p>
      </section>

      {/* Преимущества */}
      <section className="about-section">
        <h2>{t('about.advantages')}</h2>
        <div className="about-advantages">
          <div className="about-advantage">
            <span className="about-advantage-icon">✅</span>
            <h3>{t('about.originalProducts')}</h3>
            <p>{t('about.originalProductsDesc')}</p>
          </div>
          <div className="about-advantage">
            <span className="about-advantage-icon">🚚</span>
            <h3>{t('about.deliveryRussia')}</h3>
            <p>{t('about.deliveryRussiaDesc')}</p>
          </div>
          <div className="about-advantage">
            <span className="about-advantage-icon">💬</span>
            <h3>{t('about.expertConsultation')}</h3>
            <p>{t('about.expertConsultationDesc')}</p>
          </div>
          <div className="about-advantage">
            <span className="about-advantage-icon">🔄</span>
            <h3>{t('about.guaranteeReturn')}</h3>
            <p>{t('about.guaranteeReturnDesc')}</p>
          </div>
        </div>
      </section>

      {/* Наша команда */}
      <section className="about-section">
        <h2>{t('about.ourTeam')}</h2>
        <div className="about-team">
          {team.map((member) => (
            <div key={member.name} className="about-team-card">
              <span className="about-team-icon">{member.icon}</span>
              <h3 className="about-team-name">{member.name}</h3>
              <p className="about-team-role">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Бренды-партнёры */}
      <section className="about-section">
        <h2>{t('about.brandPartners')}</h2>
        <div className="about-partners">
          {partners.map((partner) => (
            <div key={partner.name} className="about-partner-card">
              <span className="about-partner-icon">{partner.icon}</span>
              <h3 className="about-partner-name">{partner.name}</h3>
              <p className="about-partner-desc">{partner.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Часто задаваемые вопросы */}
      <section className="about-section">
        <h2>{t('about.faq')}</h2>
        <div className="about-faq">
          {faq.map((item, index) => (
            <div key={index} className="about-faq-card">
              <h3 className="about-faq-question">{item.q}</h3>
              <p className="about-faq-answer">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Контакты */}
      <section className="about-section" id="contacts">
        <h2>{t('about.contactsTitle')}</h2>
        <div className="about-contacts">
          <div className="about-contact-item">
            <span>📞</span>
            <div>
              <strong>{t('about.phoneLabel')}</strong>
              <p>{t('footer.phone')}</p>
            </div>
          </div>
          <div className="about-contact-item">
            <span>✉️</span>
            <div>
              <strong>{t('about.emailLabel')}</strong>
              <p>{t('footer.emailContact')}</p>
            </div>
          </div>
          <div className="about-contact-item">
            <span>📍</span>
            <div>
              <strong>{t('about.addressLabel')}</strong>
              <p>{t('footer.city')}, {t('footer.address')}</p>
            </div>
          </div>
          <div className="about-contact-item">
            <span>🕐</span>
            <div>
              <strong>{t('about.workHoursLabel')}</strong>
              <p>{t('about.workHoursValue')}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
