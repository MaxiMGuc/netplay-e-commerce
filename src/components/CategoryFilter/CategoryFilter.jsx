import './CategoryFilter.css'

const categories = ['All', 'Electronics', 'Fashion', 'Home']

function CategoryFilter({ active, onChange }) {
  return (
    <div className="category-filter">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`filter-btn ${active === cat ? 'active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
