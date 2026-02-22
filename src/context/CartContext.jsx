import { createContext, useContext, useState } from 'react'

// Создаём контекст
const CartContext = createContext()

// Хук для удобного доступа к корзине из любого компонента
export function useCart() {
  return useContext(CartContext)
}

// Провайдер — оборачивает приложение и даёт доступ к корзине
export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  // Добавить товар в корзину
  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        // Если уже есть — увеличиваем количество
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      // Если нет — добавляем с количеством 1
      return [...prev, { ...product, quantity: 1 }]
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

  // Очистить корзину
  const clearCart = () => {
    setItems([])
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
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
