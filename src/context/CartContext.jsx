import { createContext, useContext, useState, useEffect } from 'react'

// Ключ для localStorage
const CART_STORAGE_KEY = 'racketmarket_cart'

// Загрузить корзину из localStorage
function loadCart() {
  try {
    const data = localStorage.getItem(CART_STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

// Сохранить корзину в localStorage
function saveCart(items) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Если localStorage недоступен — ничего не делаем
  }
}

// Создаём контекст
const CartContext = createContext()

// Хук для удобного доступа к корзине из любого компонента
export function useCart() {
  return useContext(CartContext)
}

// Провайдер — оборачивает приложение и даёт доступ к корзине
export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)

  // Сохраняем корзину при каждом изменении
  useEffect(() => {
    saveCart(items)
  }, [items])

  // Добавить товар в корзину
  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  // Удалить товар из корзины
  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Изменить количество (+1 или -1)
  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  // Установить конкретное количество
  const setQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  // Очистить корзину
  const clearCart = () => {
    setItems([])
  }

  // Проверить, есть ли товар в корзине
  const isInCart = (id) => {
    return items.some((item) => item.id === id)
  }

  // Общее количество товаров
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  // Общая сумма
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        setQuantity,
        clearCart,
        isInCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
