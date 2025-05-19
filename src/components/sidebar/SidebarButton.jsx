import './SidebarButton.css';

const SidebarButton = ({ onClick }) => {
  return (
    <div className="sidebar-button" onClick={onClick}>
      <span className="sidebar-button-icon">+</span>
      <span className="sidebar-button-text">Создать страницу</span>
    </div>
  );
};

export default SidebarButton;
