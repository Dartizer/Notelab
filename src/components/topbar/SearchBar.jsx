import './SearchBar.css'; // Подключаем стили

const SearchBar = () => {
  return (
    <div className="search-bar">
      <div className="search-icon">
        <img src="/search-icon.svg" alt="Поиск" />
      </div>
      <input
        className="search-input"
        type="text"
        placeholder="Поиск"
      />
    </div>
  );
};

export default SearchBar;
