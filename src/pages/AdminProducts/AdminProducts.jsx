import { useMemo, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useProducts } from '../../context/ProductsContext'
import { useToast } from '../../context/ToastContext'
import './AdminProducts.css'

const sports = ['Бадминтон', 'Теннис', 'Настольный теннис', 'Сквош']
const categories = ['Ракетки', 'Обувь', 'Одежда', 'Воланы', 'Струны', 'Сумки', 'Аксессуары', 'Мячи']
const badges = ['', 'Хит', 'Новинка', 'Скидка']

const initialForm = {
  name: '',
  description: '',
  sport: sports[0],
  category: categories[0],
  price: '',
  oldPrice: '',
  rating: '4.5',
  reviews: '0',
  badge: '',
  image: '',
}

function AdminProducts() {
  const { user, isAdmin, loading } = useAuth()
  const {
    addCustomProduct,
    customProducts,
    customProductsLoading,
    customProductsError,
    removeCustomProduct,
  } = useProducts()
  const { showToast } = useToast()
  const [form, setForm] = useState(initialForm)
  const [imagePreview, setImagePreview] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const sortedCustomProducts = useMemo(
    () => [...customProducts].sort((a, b) => b.id - a.id),
    [customProducts]
  )

  if (!loading && !user) {
    return <Navigate to="/login" replace />
  }

  if (!loading && user && !isAdmin) {
    return <Navigate to="/catalog" replace />
  }

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (file.size > 3 * 1024 * 1024) {
      showToast('Изображение слишком большое (макс. 3MB)', 'error')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const base64 = String(reader.result || '')
      setImagePreview(base64)
      handleChange('image', base64)
    }
    reader.readAsDataURL(file)
  }

  const resetForm = () => {
    setForm(initialForm)
    setImagePreview('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!form.name.trim() || !form.description.trim() || !form.image) {
      showToast('Заполни название, описание и загрузи изображение', 'error')
      return
    }

    const price = Number(form.price)
    const oldPrice = form.oldPrice ? Number(form.oldPrice) : null
    const rating = Number(form.rating)
    const reviews = Number(form.reviews)

    if (Number.isNaN(price) || price <= 0) return showToast('Цена должна быть больше 0', 'error')
    if (Number.isNaN(rating) || rating < 0 || rating > 5) return showToast('Рейтинг: 0-5', 'error')
    if (Number.isNaN(reviews) || reviews < 0) return showToast('Отзывы не могут быть отрицательными', 'error')

    setIsSaving(true)
    const { error } = await addCustomProduct({
      name: form.name.trim(),
      description: form.description.trim(),
      sport: form.sport,
      category: form.category,
      image: form.image,
      price,
      oldPrice,
      rating,
      reviews,
      badge: form.badge || null,
    })
    setIsSaving(false)

    if (error) {
      showToast(`Не удалось сохранить товар: ${error.message}`, 'error')
      return
    }

    resetForm()
    showToast('Новый товар добавлен', 'success')
  }

  const handleDelete = async (dbId) => {
    const { error } = await removeCustomProduct(dbId)
    if (error) {
      showToast(`Не удалось удалить товар: ${error.message}`, 'error')
      return
    }
    showToast('Товар удален', 'info')
  }

  return (
    <main className="admin-products-page">
      <div className="admin-products-header">
        <div>
          <h1>Админ: управление товарами</h1>
          <p>Создавай новые карточки товаров. Они сразу появятся на сайте.</p>
        </div>
        <Link to="/catalog" className="admin-products-back-link">В каталог</Link>
      </div>

      <section id="create-product" className="admin-products-section">
        <h2>Добавить товар</h2>
        {customProductsError && (
          <p className="admin-products-error">
            {customProductsError.message}
          </p>
        )}
        <form className="admin-products-form" onSubmit={handleSubmit}>
          <label>
            Название товара
            <input value={form.name} onChange={(e) => handleChange('name', e.target.value)} required />
          </label>

          <label>
            Описание
            <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} rows={4} required />
          </label>

          <div className="admin-products-grid">
            <label>
              Вид спорта
              <select value={form.sport} onChange={(e) => handleChange('sport', e.target.value)}>
                {sports.map((sport) => <option key={sport} value={sport}>{sport}</option>)}
              </select>
            </label>
            <label>
              Категория
              <select value={form.category} onChange={(e) => handleChange('category', e.target.value)}>
                {categories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </label>
            <label>
              Цена
              <input type="number" min="0" step="0.01" value={form.price} onChange={(e) => handleChange('price', e.target.value)} required />
            </label>
            <label>
              Старая цена
              <input type="number" min="0" step="0.01" value={form.oldPrice} onChange={(e) => handleChange('oldPrice', e.target.value)} />
            </label>
            <label>
              Рейтинг (0-5)
              <input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={(e) => handleChange('rating', e.target.value)} />
            </label>
            <label>
              Отзывы
              <input type="number" min="0" value={form.reviews} onChange={(e) => handleChange('reviews', e.target.value)} />
            </label>
            <label>
              Бейдж
              <select value={form.badge} onChange={(e) => handleChange('badge', e.target.value)}>
                {badges.map((badge) => <option key={badge || 'none'} value={badge}>{badge || 'Нет'}</option>)}
              </select>
            </label>
            <label>
              Изображение
              <input type="file" accept="image/*" onChange={handleImageUpload} required />
            </label>
          </div>

          {imagePreview && (
            <div className="admin-products-preview">
              <img src={imagePreview} alt="Предпросмотр" />
            </div>
          )}

          <div className="admin-products-actions">
            <button type="button" className="admin-products-reset" onClick={resetForm}>Очистить</button>
            <button type="submit" className="admin-products-submit" disabled={isSaving}>
              {isSaving ? 'Сохраняем...' : 'Сохранить товар'}
            </button>
          </div>
        </form>
      </section>

      <section className="admin-products-section">
        <h2>Добавленные админом товары ({sortedCustomProducts.length})</h2>
        {customProductsLoading ? (
          <p className="admin-products-empty">Загружаем товары из Supabase...</p>
        ) : sortedCustomProducts.length === 0 ? (
          <p className="admin-products-empty">Пока нет добавленных товаров.</p>
        ) : (
          <div className="admin-products-list">
            {sortedCustomProducts.map((item) => (
              <article key={item.id} className="admin-products-card">
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.sport} / {item.category}</p>
                  <p>${item.price.toLocaleString('en-US')}</p>
                </div>
                <button onClick={() => handleDelete(item.dbId)}>Удалить</button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default AdminProducts

