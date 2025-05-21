import React from 'react';
import './SidebarButton.scss';

interface SidebarButtonProps {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ onClick }) => {
  return (
    <div
      className="sidebar-button"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(e as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>);
        }
      }}
    >
      <span className="sidebar-button-icon">+</span>
      <span className="sidebar-button-text">Создать страницу</span>
    </div>
  );
};

export default SidebarButton;
