import React, { useState, useEffect } from 'react';
import './ThemeToggle.scss';
import white from '../../assets/icons/topbar/white.svg';
import black from '../../assets/icons/topbar/black.svg';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(true);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div
      className="theme-toggle"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label="Переключатель темы"
    >
      <div className={`circle ${isDark ? 'left' : 'right'}`} />
      <img
        src={isDark ? white : black}
        alt={isDark ? 'Светлая тема' : 'Тёмная тема'}
        className={`icon ${isDark ? 'left-of-circle' : 'right-of-circle'}`}
        draggable={false}
      />
    </div>
  );
};

export default ThemeToggle;
