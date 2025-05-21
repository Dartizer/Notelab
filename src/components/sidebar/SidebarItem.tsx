import React from 'react';
import './SidebarItem.scss';

interface SidebarItemProps {
  icon: string;
  text: string;
  isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, isActive = false }) => {
  return (
    <div className="sidebar-item">
      <div
        className={`sidebar-content${isActive ? ' active' : ''}`}
        role="button"
        tabIndex={0}
      >
        <img src={icon} alt={text} className="sidebar-icon" />
        <span className="sidebar-text">{text}</span>
      </div>
    </div>
  );
};

export default SidebarItem;
