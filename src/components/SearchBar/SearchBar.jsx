import './SearchBar.css'

// SearchBar — запасной компонент поиска (основной поиск в Header)
// Можно использовать на отдельных страницах при необходимости
function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-bar">
      <span className="search-bar-icon">🔍</span>
      <input
        type="text"
        className="search-bar-input"
        placeholder={placeholder || 'Поиск...'}
        value={value || ''}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchBar
