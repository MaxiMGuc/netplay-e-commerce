import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// ScrollToTop — прокручивает страницу вверх при переходе на новый маршрут
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
