import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'

const menuData = [
  {
    title: 'Ракетки',
    icon: '🏸',
    columns: [
      {
        heading: 'Серии для тенниса',
        links: [
          { label: 'Все ракетки', to: '/catalog?sport=Теннис&category=Ракетки' },
          { label: 'Профессиональные', to: '/catalog?sport=Теннис&category=Ракетки&level=pro' },
          { label: 'Любительские', to: '/catalog?sport=Теннис&category=Ракетки&level=amateur' },
        ],
      },
      {
        heading: 'Магазин тенниса',
        links: [
          { label: 'Сумки', to: '/catalog?sport=Теннис&category=Сумки' },
          { label: 'Струны', to: '/catalog?sport=Теннис&category=Струны' },
          { label: 'Обмотки', to: '/catalog?sport=Теннис&category=Обмотки' },
          { label: 'Мячи', to: '/catalog?sport=Теннис&category=Мячи' },
          { label: 'Аксессуары', to: '/catalog?sport=Теннис&category=Аксессуары' },
        ],
      },
      {
        heading: 'Серии для бадминтона',
        links: [
          { label: 'Все ракетки', to: '/catalog?sport=Бадминтон&category=Ракетки' },
          { label: 'Профессиональные', to: '/catalog?sport=Бадминтон&category=Ракетки&level=pro' },
          { label: 'Для начинающих', to: '/catalog?sport=Бадминтон&category=Ракетки&level=beginner' },
        ],
      },
      {
        heading: 'Магазин бадминтона',
        links: [
          { label: 'Сумки', to: '/catalog?sport=Бадминтон&category=Сумки' },
          { label: 'Струны', to: '/catalog?sport=Бадминтон&category=Струны' },
          { label: 'Обмотки', to: '/catalog?sport=Бадминтон&category=Обмотки' },
          { label: 'Воланы', to: '/catalog?sport=Бадминтон&category=Воланы' },
          { label: 'Аксессуары', to: '/catalog?sport=Бадминтон&category=Аксессуары' },
        ],
      },
    ],
  },
  {
    title: 'Виды спорта',
    icon: '🏅',
    columns: [
      {
        heading: 'Теннис',
        links: [
          { label: 'Все для тенниса', to: '/catalog?sport=Теннис' },
          { label: 'Ракетки', to: '/catalog?sport=Теннис&category=Ракетки' },
          { label: 'Струны', to: '/catalog?sport=Теннис&category=Струны' },
          { label: 'Мячи', to: '/catalog?sport=Теннис&category=Мячи' },
          { label: 'Одежда', to: '/catalog?sport=Теннис&category=Одежда' },
          { label: 'Обувь', to: '/catalog?sport=Теннис&category=Обувь' },
          { label: 'Аксессуары', to: '/catalog?sport=Теннис&category=Аксессуары' },
        ],
      },
      {
        heading: 'Бадминтон',
        links: [
          { label: 'Все для бадминтона', to: '/catalog?sport=Бадминтон' },
          { label: 'Ракетки', to: '/catalog?sport=Бадминтон&category=Ракетки' },
          { label: 'Струны', to: '/catalog?sport=Бадминтон&category=Струны' },
          { label: 'Воланы', to: '/catalog?sport=Бадминтон&category=Воланы' },
          { label: 'Одежда', to: '/catalog?sport=Бадминтон&category=Одежда' },
          { label: 'Обувь', to: '/catalog?sport=Бадминтон&category=Обувь' },
          { label: 'Аксессуары', to: '/catalog?sport=Бадминтон&category=Аксессуары' },
        ],
      },
      {
        heading: 'Настольный теннис',
        links: [
          { label: 'Все для настольного тенниса', to: '/catalog?sport=Настольный теннис' },
          { label: 'Ракетки', to: '/catalog?sport=Настольный теннис&category=Ракетки' },
          { label: 'Мячи', to: '/catalog?sport=Настольный теннис&category=Мячи' },
          { label: 'Одежда', to: '/catalog?sport=Настольный теннис&category=Одежда' },
          { label: 'Обувь', to: '/catalog?sport=Настольный теннис&category=Обувь' },
        ],
      },
      {
        heading: 'Сквош',
        links: [
          { label: 'Все для сквоша', to: '/catalog?sport=Сквош' },
          { label: 'Ракетки', to: '/catalog?sport=Сквош&category=Ракетки' },
          { label: 'Мячи', to: '/catalog?sport=Сквош&category=Мячи' },
          { label: 'Обувь', to: '/catalog?sport=Сквош&category=Обувь' },
        ],
      },
    ],
  },
  {
    title: 'Мужчинам',
    icon: '👔',
    columns: [
      {
        heading: 'Новинки',
        links: [
          { label: 'Новые поступления', to: '/catalog?gender=Мужчинам&tag=new' },
          { label: 'Хиты продаж', to: '/catalog?gender=Мужчинам&tag=bestseller' },
        ],
      },
      {
        heading: 'Обувь',
        links: [
          { label: 'Вся обувь', to: '/catalog?gender=Мужчинам&category=Обувь' },
          { label: 'Для тенниса', to: '/catalog?gender=Мужчинам&category=Обувь&sport=Теннис' },
          { label: 'Для бадминтона', to: '/catalog?gender=Мужчинам&category=Обувь&sport=Бадминтон' },
          { label: 'Для бега', to: '/catalog?gender=Мужчинам&category=Обувь&type=running' },
        ],
      },
      {
        heading: 'Одежда',
        links: [
          { label: 'Футболки', to: '/catalog?gender=Мужчинам&category=Футболки' },
          { label: 'Шорты', to: '/catalog?gender=Мужчинам&category=Шорты' },
          { label: 'Толстовки', to: '/catalog?gender=Мужчинам&category=Толстовки' },
          { label: 'Куртки', to: '/catalog?gender=Мужчинам&category=Куртки' },
        ],
      },
      {
        heading: 'Аксессуары',
        links: [
          { label: 'Носки', to: '/catalog?gender=Мужчинам&category=Носки' },
          { label: 'Сумки и рюкзаки', to: '/catalog?gender=Мужчинам&category=Сумки' },
          { label: 'Кепки', to: '/catalog?gender=Мужчинам&category=Кепки' },
          { label: 'Напульсники', to: '/catalog?gender=Мужчинам&category=Напульсники' },
        ],
      },
    ],
  },
  {
    title: 'Женщинам',
    icon: '👗',
    columns: [
      {
        heading: 'Новинки',
        links: [
          { label: 'Новые поступления', to: '/catalog?gender=Женщинам&tag=new' },
          { label: 'Хиты продаж', to: '/catalog?gender=Женщинам&tag=bestseller' },
        ],
      },
      {
        heading: 'Обувь',
        links: [
          { label: 'Вся обувь', to: '/catalog?gender=Женщинам&category=Обувь' },
          { label: 'Для тенниса', to: '/catalog?gender=Женщинам&category=Обувь&sport=Теннис' },
          { label: 'Для бадминтона', to: '/catalog?gender=Женщинам&category=Обувь&sport=Бадминтон' },
          { label: 'Для бега', to: '/catalog?gender=Женщинам&category=Обувь&type=running' },
        ],
      },
      {
        heading: 'Одежда',
        links: [
          { label: 'Футболки', to: '/catalog?gender=Женщинам&category=Футболки' },
          { label: 'Платья и юбки', to: '/catalog?gender=Женщинам&category=Платья' },
          { label: 'Шорты', to: '/catalog?gender=Женщинам&category=Шорты' },
          { label: 'Толстовки', to: '/catalog?gender=Женщинам&category=Толстовки' },
          { label: 'Куртки', to: '/catalog?gender=Женщинам&category=Куртки' },
        ],
      },
      {
        heading: 'Аксессуары',
        links: [
          { label: 'Носки', to: '/catalog?gender=Женщинам&category=Носки' },
          { label: 'Сумки и рюкзаки', to: '/catalog?gender=Женщинам&category=Сумки' },
          { label: 'Кепки', to: '/catalog?gender=Женщинам&category=Кепки' },
          { label: 'Напульсники', to: '/catalog?gender=Женщинам&category=Напульсники' },
        ],
      },
    ],
  },
  {
    title: 'Детям',
    icon: '🧒',
    columns: [
      {
        heading: 'Детский ассортимент',
        links: [
          { label: 'Детская одежда', to: '/catalog?gender=Детям&category=Одежда' },
          { label: 'Детская обувь', to: '/catalog?gender=Детям&category=Обувь' },
          { label: 'Детские ракетки для тенниса', to: '/catalog?gender=Детям&sport=Теннис&category=Ракетки' },
          { label: 'Все сумки', to: '/catalog?gender=Детям&category=Сумки' },
        ],
      },
    ],
  },
  {
    title: 'Спортсмены',
    icon: '⭐',
    columns: [
      {
        heading: 'Профили спортсменов',
        links: [
          { label: 'Все спортсмены', to: '/about#athletes' },
        ],
      },
    ],
  },
  {
    title: 'О компании',
    icon: 'ℹ️',
    columns: [
      {
        heading: 'О нас',
        links: [
          { label: 'О компании', to: '/about' },
          { label: 'Контакты', to: '/about#contacts' },
        ],
      },
    ],
  },
]

function Sidebar() {
  const [openMenu, setOpenMenu] = useState(null)

  return (
    <aside className="sidebar">
      <div className="sidebar-label">Меню</div>
      <nav className="sidebar-nav">
        {menuData.map((menu, index) => (
          <div
            key={menu.title}
            className={`sidebar-item ${openMenu === index ? 'active' : ''}`}
            onMouseEnter={() => setOpenMenu(index)}
            onMouseLeave={() => setOpenMenu(null)}
          >
            <span className="sidebar-trigger">
              <span className="sidebar-trigger-icon">{menu.icon}</span>
              <span className="sidebar-trigger-text">{menu.title}</span>
              <span className="sidebar-trigger-arrow">›</span>
            </span>

            {openMenu === index && (
              <div className="sidebar-flyout">
                <div className="sidebar-flyout-inner">
                  {menu.columns.map((col) => (
                    <div key={col.heading} className="sidebar-flyout-column">
                      <h4 className="sidebar-flyout-heading">{col.heading}</h4>
                      <ul className="sidebar-flyout-links">
                        {col.links.map((link) => (
                          <li key={link.label}>
                            <Link
                              to={link.to}
                              onClick={() => setOpenMenu(null)}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
