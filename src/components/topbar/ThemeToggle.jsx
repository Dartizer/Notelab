// Импорт React и useState — для хранения текущей темы (светлая/тёмная)
import React, { useState } from 'react';

// Подключаем стили для переключателя темы
import './ThemeToggle.css';

// Импортируем иконки (светлая и тёмная тема)
import white from '../../assets/icons/topbar/white.svg';
import black from '../../assets/icons/topbar/black.svg';

// Компонент переключателя темы
const ThemeToggle = () => {
  // Локальное состояние: true — тёмная тема, false — светлая
  const [isDark, setIsDark] = useState(true);

  // Обработчик переключения темы
  const toggleTheme = () => {
    setIsDark((prev) => !prev); // Переключаем значение на противоположное
  };

  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      {/* Подвижный круг (ползунок), позиция зависит от текущей темы */}
      <div className={`circle ${isDark ? 'left' : 'right'}`} />

      {/* Иконка темы: солнце или луна */}
      <img
        src={isDark ? white : black} // Подставляем нужную иконку
        alt={isDark ? 'Light mode' : 'Dark mode'} // Альтернативный текст
        className={`icon ${isDark ? 'left-of-circle' : 'right-of-circle'}`} // Позиционируем иконку
      />
    </div>
  );
};

// Экспортируем компонент
export default ThemeToggle;
