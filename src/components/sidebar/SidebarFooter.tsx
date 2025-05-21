import React, { useState } from 'react';
import './SidebarFooter.scss';

import settingIcon from '../../assets/icons/sidebar/setting.svg';
import deleteIcon from '../../assets/icons/sidebar/delete.svg';
import closeIcon from '../../assets/icons/sidebar/sideclose.svg';

type ClickName = 'setting' | 'delete' | 'close' | null;

const SidebarFooter: React.FC = () => {
  const [clicked, setClicked] = useState<ClickName>(null);

  const handleClick = (name: ClickName) => {
    setClicked(name);
    setTimeout(() => setClicked(null), 200);
  };

  const getClass = (name: ClickName, base: string) =>
    `${base}${clicked === name ? ' clicked' : ''}`;

return (
  <>
    <div className="sidebar-footer-container">
      <div className="sidebar-footer">
        <img
          src={settingIcon}
          alt="Настройки"
          className={getClass('setting', 'sidebar-footer-icon')}
          onClick={() => handleClick('setting')}
          draggable={false}
        />
        <img
          src={deleteIcon}
          alt="Удалить"
          className={getClass('delete', 'sidebar-footer-icon')}
          onClick={() => handleClick('delete')}
          draggable={false}
        />
      </div>
    </div>

    <img
      src={closeIcon}
      alt="Закрыть сайдбар"
      className={getClass('close', 'sidebar-footer-close')}
      onClick={() => handleClick('close')}
      draggable={false}
    />
  </>
);
};

export default SidebarFooter;
