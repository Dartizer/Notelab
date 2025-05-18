import './SidebarItem.css';

const SidebarItem = ({ icon, text, isActive = false }) => {
  const itemClass = isActive ? 'sidebar-content active' : 'sidebar-content';

  return (
    <div className="sidebar-item">
      <div className={itemClass}>
        <img src={icon} alt={text} className="sidebar-icon" />
        <span className="sidebar-text">{text}</span>
      </div>
    </div>
  );
};

export default SidebarItem;
