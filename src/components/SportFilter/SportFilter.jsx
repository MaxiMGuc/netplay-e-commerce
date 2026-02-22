import './SportFilter.css'

// SportFilter — кнопки для фильтрации по виду спорта
const sports = [
  { label: 'Все', value: 'Все', icon: '🏅' },
  { label: 'Бадминтон', value: 'Бадминтон', icon: '🏸' },
  { label: 'Теннис', value: 'Теннис', icon: '🎾' },
  { label: 'Настольный теннис', value: 'Настольный теннис', icon: '🏓' },
  { label: 'Сквош', value: 'Сквош', icon: '💥' },
]

function SportFilter({ active, onChange }) {
  return (
    <div className="sport-filter">
      {sports.map((sport) => (
        <button
          key={sport.value}
          className={`sport-filter-btn ${active === sport.value ? 'active' : ''}`}
          onClick={() => onChange(sport.value)}
        >
          <span className="sport-filter-icon">{sport.icon}</span>
          {sport.label}
        </button>
      ))}
    </div>
  )
}

export default SportFilter
