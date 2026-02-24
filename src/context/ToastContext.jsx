import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

// Хук для показа уведомлений из любого компонента
export function useToast() {
  return useContext(ToastContext)
}

// Типы уведомлений: success, error, info
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  // Показать уведомление
  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])

    // Автоматически убрать через duration мс
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }, [])

  // Закрыть конкретное уведомление
  const closeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Контейнер уведомлений */}
      {toasts.length > 0 && (
        <div className="toast-container">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`toast toast--${toast.type}`}
            >
              <span className="toast-icon">
                {toast.type === 'success' && '✓'}
                {toast.type === 'error' && '✕'}
                {toast.type === 'info' && 'ℹ'}
              </span>
              <span className="toast-message">{toast.message}</span>
              <button
                className="toast-close"
                onClick={() => closeToast(toast.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}
