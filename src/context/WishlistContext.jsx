import { createContext, useContext, useState, useEffect } from 'react'

const WISHLIST_STORAGE_KEY = 'racketmarket_wishlist'

function loadWishlist() {
  try {
    const data = localStorage.getItem(WISHLIST_STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function saveWishlist(items) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Если localStorage недоступен
  }
}

const WishlistContext = createContext()

// Хук для доступа к избранному
export function useWishlist() {
  return useContext(WishlistContext)
}

// Провайдер избранного
export function WishlistProvider({ children }) {
  const [items, setItems] = useState(loadWishlist)

  useEffect(() => {
    saveWishlist(items)
  }, [items])

  // Добавить / убрать из избранного (toggle)
  const toggleWishlist = (product) => {
    setItems((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.filter((item) => item.id !== product.id)
      }
      return [...prev, product]
    })
  }

  // Проверить, в избранном ли товар
  const isInWishlist = (id) => {
    return items.some((item) => item.id === id)
  }

  // Количество товаров в избранном
  const totalWishlist = items.length

  return (
    <WishlistContext.Provider
      value={{
        items,
        toggleWishlist,
        isInWishlist,
        totalWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}
