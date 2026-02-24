import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import staticProducts from '../data/products'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const ProductsContext = createContext(null)
const CUSTOM_PRODUCTS_TABLE = 'custom_products'
const HIDDEN_PRODUCTS_TABLE = 'hidden_products'
const CUSTOM_ID_OFFSET = 100000

function formatSupabaseError(error) {
  if (!error) return null
  const code = error.code || ''
  const message = error.message || 'Unknown Supabase error'

  if (code === '42P01') {
    return new Error('Таблица не найдена. Выполни SQL-скрипты supabase_custom_products.sql и supabase_hidden_products.sql в Supabase SQL Editor.')
  }

  if (code === '42501' || message.toLowerCase().includes('row-level security')) {
    return new Error('Нет прав для сохранения. Проверь RLS policy: insert/delete разрешены только для maksym.huk@gmail.com.')
  }

  if (message.toLowerCase().includes('jwt') || message.toLowerCase().includes('auth')) {
    return new Error('Проблема с авторизацией Supabase. Перезайди в аккаунт и проверь VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.')
  }

  return new Error(message)
}

function mapCustomProduct(row) {
  return {
    id: CUSTOM_ID_OFFSET + Number(row.id),
    dbId: Number(row.id),
    name: row.name,
    description: row.description,
    sport: row.sport,
    category: row.category,
    image: row.image,
    price: Number(row.price),
    oldPrice: row.old_price === null ? null : Number(row.old_price),
    rating: Number(row.rating),
    reviews: Number(row.reviews),
    badge: row.badge,
    isCustom: true,
  }
}

async function fetchCustomProductsFromSupabase() {
  const { data, error } = await supabase
    .from(CUSTOM_PRODUCTS_TABLE)
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    throw error
  }

  return (data || []).map(mapCustomProduct)
}

async function fetchHiddenProductIdsFromSupabase() {
  const { data, error } = await supabase
    .from(HIDDEN_PRODUCTS_TABLE)
    .select('product_id')

  if (error) {
    throw error
  }

  return (data || [])
    .map((row) => Number(row.product_id))
    .filter((id) => Number.isFinite(id))
}


export function ProductsProvider({ children }) {
  const [customProducts, setCustomProducts] = useState([])
  const [hiddenProductIds, setHiddenProductIds] = useState([])
  const [customProductsLoading, setCustomProductsLoading] = useState(true)
  const [customProductsError, setCustomProductsError] = useState(null)

  useEffect(() => {
    let mounted = true

    const load = async () => {
      if (!isSupabaseConfigured || !supabase) {
        if (mounted) setCustomProductsLoading(false)
        return
      }

      try {
        const [items, hiddenIds] = await Promise.all([
          fetchCustomProductsFromSupabase(),
          fetchHiddenProductIdsFromSupabase(),
        ])
        if (mounted) {
          setCustomProducts(items)
          setHiddenProductIds(hiddenIds)
        }
      } catch (error) {
        const friendlyError = formatSupabaseError(error)
        if (mounted) setCustomProductsError(friendlyError)
        console.error('Failed to load custom products from Supabase:', error)
      } finally {
        if (mounted) setCustomProductsLoading(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [])

  const products = useMemo(
    () =>
      [...staticProducts, ...customProducts]
        .filter((item) => !hiddenProductIds.includes(item.id))
        .sort((a, b) => a.id - b.id),
    [customProducts, hiddenProductIds]
  )

  const addCustomProduct = async (payload) => {
    if (!isSupabaseConfigured || !supabase) {
      return { data: null, error: new Error('Supabase is not configured') }
    }

    const { data, error } = await supabase
      .from(CUSTOM_PRODUCTS_TABLE)
      .insert({
        name: payload.name,
        description: payload.description,
        sport: payload.sport,
        category: payload.category,
        image: payload.image,
        price: payload.price,
        old_price: payload.oldPrice,
        rating: payload.rating,
        reviews: payload.reviews,
        badge: payload.badge,
      })
      .select()
      .single()

    if (error) {
      return { data: null, error: formatSupabaseError(error) }
    }

    const next = mapCustomProduct(data)
    setCustomProductsError(null)
    setCustomProducts((prev) => [...prev, next])
    return { data: next, error: null }
  }

  const removeCustomProduct = async (dbId) => {
    if (!isSupabaseConfigured || !supabase) {
      return { error: new Error('Supabase is not configured') }
    }

    const { error } = await supabase
      .from(CUSTOM_PRODUCTS_TABLE)
      .delete()
      .eq('id', dbId)

    if (error) {
      return { error: formatSupabaseError(error) }
    }

    setCustomProductsError(null)
    setCustomProducts((prev) => prev.filter((item) => item.dbId !== dbId))
    return { error: null }
  }

  const hideProduct = async (productId) => {
    if (!isSupabaseConfigured || !supabase) {
      return { error: new Error('Supabase is not configured') }
    }

    const { error } = await supabase
      .from(HIDDEN_PRODUCTS_TABLE)
      .insert({ product_id: productId })

    if (error) {
      return { error: formatSupabaseError(error) }
    }

    setHiddenProductIds((prev) => [...prev, productId])
    return { error: null }
  }

  const removeProduct = async (product) => {
    if (product?.isCustom && product?.dbId) {
      return removeCustomProduct(product.dbId)
    }
    return hideProduct(product.id)
  }

  const value = {
    products,
    customProducts,
    customProductsLoading,
    customProductsError,
    addCustomProduct,
    removeCustomProduct,
    removeProduct,
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}

