// Подключаем стили
import './SearchBar.css';

// Импортируем иконку поиска
import searchIcon from '../../assets/icons/topbar/search-icon.svg';

// Компонент поисковой строки
const SearchBar = () => {
  return (
    <div className="search-bar">
      {/* Иконка поиска */}
      <div className="search-icon">
        <img src={searchIcon} alt="Поиск" />
      </div>

      {/* Поле ввода */}
      <input
        type="text"
        className="search-input"
        placeholder="Поиск"
        aria-label="Поиск"
      />
    </div>
  );
};

export default SearchBar;
