import React from 'react';
import './SearchBar.scss';
import searchIcon from '../../assets/icons/topbar/search-icon.svg';

const SearchBar: React.FC = () => {
  return (
    <div className="search-bar" role="search">
      <div className="search-icon">
        <img src={searchIcon} alt="Иконка поиска" />
      </div>
      <input
        type="text"
        className="search-input"
        placeholder="Поиск"
        aria-label="Поле поиска"
      />
    </div>
  );
};

export default SearchBar;
