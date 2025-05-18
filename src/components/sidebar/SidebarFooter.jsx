// src/components/sidebar/SidebarFooter.tsx

import './SidebarFooter.css';

import settingIcon from '../../assets/icons/sidebar/setting.svg';
import deleteIcon from '../../assets/icons/sidebar/delete.svg';
import closeIcon from '../../assets/icons/sidebar/sideclose.svg';

const SidebarFooter = () => {
  return (
    <div className="sidebar-footer">
      <img src={settingIcon} alt="Setting" className="sidebar-footer-icon" />
      <img src={deleteIcon} alt="Delete" className="sidebar-footer-icon" />
      <img src={closeIcon} alt="Close" className="sidebar-footer-icon right" />
    </div>
  );
};

export default SidebarFooter;
