import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import './Register.css'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { signUp, user } = useAuth()
  const { showToast } = useToast()
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Если уже авторизован
  if (user) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1 className="auth-title">{t('register.alreadyRegistered')}</h1>
          <p className="auth-subtitle">
            {user.user_metadata?.name || user.email}
          </p>
          <Link to="/" className="auth-submit" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
            {t('register.goHome')}
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      showToast(t('register.passwordsMismatch'), 'error')
      return
    }

    if (password.length < 6) {
      showToast(t('register.passwordTooShort'), 'error')
      return
    }

    setIsLoading(true)

    const { error } = await signUp(email, password, name)

    if (error) {
      showToast(error.message, 'error')
    } else {
      showToast(t('register.success'), 'success')
      navigate('/login')
    }

    setIsLoading(false)
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">{t('register.title')}</h1>
        <p className="auth-subtitle">{t('register.subtitle')}</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="name">{t('register.name')}</label>
            <input
              id="name"
              type="text"
              placeholder={t('register.namePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="email">{t('register.email')}</label>
            <input
              id="email"
              type="email"
              placeholder={t('register.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">{t('register.password')}</label>
            <input
              id="password"
              type="password"
              placeholder={t('register.passwordPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={isLoading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="confirmPassword">{t('register.confirmPassword')}</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder={t('register.confirmPasswordPlaceholder')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="auth-submit" disabled={isLoading}>
            {isLoading ? t('register.loading') : t('register.submit')}
          </button>
        </form>

        <p className="auth-switch">
          {t('register.hasAccount')} <Link to="/login">{t('register.login')}</Link>
        </p>
      </div>
    </div>
  )
}

export default Register
