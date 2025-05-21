import React, { useState, useCallback } from 'react';

import settingIcon from '../../assets/icons/topbar/settings.svg';
import pomodoroIcon from '../../assets/icons/topbar/pomodoro.svg';
import bellIcon from '../../assets/icons/topbar/bell.svg';

type Icon = {
  name: string;
  src: string;
  alt: string;
  tooltip: string;
  onClick: () => void;
};

const icons: Icon[] = [
  {
    name: 'settings',
    src: settingIcon,
    alt: 'Настройки',
    tooltip: 'Настройки',
    onClick: () => console.log('Открываем настройки...'),
  },
  {
    name: 'pomodoro',
    src: pomodoroIcon,
    alt: 'Pomodoro',
    tooltip: 'Таймер Pomodoro',
    onClick: () => console.log('Запуск Pomodoro...'),
  },
  {
    name: 'bell',
    src: bellIcon,
    alt: 'Уведомления',
    tooltip: 'Уведомления',
    onClick: () => console.log('Открываем уведомления...'),
  },
];

const TopbarIcons: React.FC = () => {
  const [clickedIcon, setClickedIcon] = useState<string | null>(null);

  const handleClick = useCallback(
    (icon: Icon) => {
      if (clickedIcon) return;

      setClickedIcon(icon.name);
      icon.onClick();
      setTimeout(() => setClickedIcon(null), 200);
    },
    [clickedIcon]
  );

  return (
    <div className="topbar-icons">
      {icons.map((icon) => (
        <img
          key={icon.name}
          src={icon.src}
          alt={icon.alt}
          title={icon.tooltip}
          className={`topbar-icon ${clickedIcon === icon.name ? 'clicked' : ''}`}
          onClick={() => handleClick(icon)}
          draggable={false}
        />
      ))}
    </div>
  );
};

export default TopbarIcons;
