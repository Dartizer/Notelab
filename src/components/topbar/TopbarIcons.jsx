import { useState } from 'react';

const TopbarIcons = () => {
  const [clickedIcon, setClickedIcon] = useState(null);

  const handleClick = (iconName) => {
    setClickedIcon(iconName);
    setTimeout(() => {
      setClickedIcon(null);
    }, 200); // вернёт в дефолт через 200 мс
  };

  return (
    <div className="topbar-icons">
      <img
        src="/settings.svg"
        alt="Настройки"
        className={`topbar-icon ${clickedIcon === 'settings' ? 'clicked' : ''}`}
        onClick={() => handleClick('settings')}
      />
      <img
        src="/pomodoro.svg"
        alt="Pomodoro"
        className={`topbar-icon ${clickedIcon === 'pomodoro' ? 'clicked' : ''}`}
        onClick={() => handleClick('pomodoro')}
      />
      <img
        src="/bell.svg"
        alt="Уведомления"
        className={`topbar-icon ${clickedIcon === 'bell' ? 'clicked' : ''}`}
        onClick={() => handleClick('bell')}
      />
    </div>
  );
};

export default TopbarIcons;
