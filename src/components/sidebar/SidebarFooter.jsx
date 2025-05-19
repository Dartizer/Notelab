import React, { useState } from 'react';
import './SidebarFooter.css';
import settingIcon from '../../assets/icons/sidebar/setting.svg';
import deleteIcon from '../../assets/icons/sidebar/delete.svg';
import closeIcon from '../../assets/icons/sidebar/sideclose.svg';

const SidebarFooter = () => {
  const [clicked, setClicked] = useState(null);

  const handleClick = (name) => {
    setClicked(name);
    setTimeout(() => setClicked(null), 200); // убираем класс после анимации
  };

  return (
    <>
      <div className="sidebar-footer">
        <img
          src={settingIcon}
          alt="Настройки"
          className={`sidebar-footer-icon ${clicked === 'setting' ? 'clicked' : ''}`}
          onClick={() => handleClick('setting')}
        />
        <img
          src={deleteIcon}
          alt="Удалить"
          className={`sidebar-footer-icon ${clicked === 'delete' ? 'clicked' : ''}`}
          onClick={() => handleClick('delete')}
        />
      </div>
      <img
        src={closeIcon}
        alt="Закрыть сайдбар"
        className={`sidebar-footer-close ${clicked === 'close' ? 'clicked' : ''}`}
        onClick={() => handleClick('close')}
      />
    </>
  );
};

export default SidebarFooter;
