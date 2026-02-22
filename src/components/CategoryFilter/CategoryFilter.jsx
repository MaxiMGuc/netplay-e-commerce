import './CategoryFilter.css'

// CategoryFilter — кнопки для фильтрации по категории
// active — текущая выбранная категория
// onChange — функция, вызываемая при клике
const categories = ['Все', 'Ракетки', 'Обувь', 'Одежда', 'Мячи', 'Воланы', 'Струны', 'Сумки', 'Аксессуары']

function CategoryFilter({ active, onChange }) {
  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`category-filter-btn ${active === cat ? 'active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
