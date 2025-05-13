import React, { useState } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      <div className={`circle ${isDark ? 'left' : 'right'}`} />
      <img
        src={isDark ? '/white.svg' : '/black.svg'}
        alt={isDark ? 'Light mode' : 'Dark mode'}
        className={`icon ${isDark ? 'left-of-circle' : 'right-of-circle'}`}
      />
    </div>
  );
};

export default ThemeToggle;
