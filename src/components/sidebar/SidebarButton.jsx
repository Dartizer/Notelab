import React from 'react';
import './SidebarButton.css';

const SidebarButton = () => {
  return (
    <div className="sidebar-button">
      <span className="sidebar-button-icon">+</span>
      <span className="sidebar-button-text">Создать страницу</span>
    </div>
  );
};

export default SidebarButton;
