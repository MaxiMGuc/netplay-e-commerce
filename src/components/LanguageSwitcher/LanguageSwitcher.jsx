import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './LanguageSwitcher.css'

const languages = [
  { code: 'ru', label: 'ru' },
  { code: 'en', label: 'en' },
  { code: 'ro', label: 'ro' },
  { code: 'uk', label: 'ua' },
]

function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  const langCode = i18n.language?.split('-')[0] || 'ru'
  const currentLang = languages.find((l) => l.code === langCode) || languages[0]

  // Закрыть при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleChange = (code) => {
    i18n.changeLanguage(code)
    setIsOpen(false)
  }

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        className="lang-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="lang-code">{currentLang.label}</span>
        <span className={`lang-arrow ${isOpen ? 'open' : ''}`}>▾</span>
      </button>

      {isOpen && (
        <div className="lang-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-option ${lang.code === langCode ? 'active' : ''}`}
              onClick={() => handleChange(lang.code)}
            >
              <span className="lang-name">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
