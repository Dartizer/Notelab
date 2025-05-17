import { useState } from 'react';
import settingIcon from '../../assets/icons/topbar/settings.svg';
import pomodoroIcon from '../../assets/icons/topbar/pomodoro.svg';
import bellIcon from '../../assets/icons/topbar/bell.svg';

// Массив с иконками и их действиями
const icons = [
  {
    name: 'settings',
    src: settingIcon,
    alt: 'Настройки',
    tooltip: 'Настройки',
    onClick: () => {
      console.log('Открываем настройки...');
      // Здесь можно вызвать openSettingsModal() и т.д.
    },
  },
  {
    name: 'pomodoro',
    src: pomodoroIcon,
    alt: 'Pomodoro',
    tooltip: 'Таймер Pomodoro',
    onClick: () => {
      console.log('Запуск Pomodoro...');
      // Пример: startPomodoro();
    },
  },
  {
    name: 'bell',
    src: bellIcon,
    alt: 'Уведомления',
    tooltip: 'Уведомления',
    onClick: () => {
      console.log('Открываем уведомления...');
      // Пример: openNotifications();
    },
  },
];

const TopbarIcons = () => {
  const [clickedIcon, setClickedIcon] = useState(null);

  const handleClick = (icon) => {
    setClickedIcon(icon.name);
    icon.onClick(); // Выполняем действие

    setTimeout(() => setClickedIcon(null), 200);
  };

  return (
    <div className="topbar-icons">
      {icons.map((icon) => (
        <img
          key={icon.name}
          src={icon.src}
          alt={icon.alt}
          title={icon.tooltip} // Это и есть простой tooltip
          className={`topbar-icon ${clickedIcon === icon.name ? 'clicked' : ''}`}
          onClick={() => handleClick(icon)}
        />
      ))}
    </div>
  );
};

export default TopbarIcons;
