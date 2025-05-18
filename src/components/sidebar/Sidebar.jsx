import './Sidebar.css';
import SidebarItem from './SidebarItem';
import SidebarButton from './SidebarButton';
import SectionLabel from './SectionLabel';
import ProjectsList from './ProjectsList';

import homeIcon from '../../assets/icons/sidebar/home.svg';
import habitsIcon from '../../assets/icons/sidebar/habits.svg';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-nav">
        <SidebarItem icon={homeIcon} text="Домашняя страница" />
        <SidebarItem icon={habitsIcon} text="Привычки" />
      </div>

      <SidebarButton />

      <div className="sidebar-divider" />

      {/* Заголовок "Проекты" */}
      <ProjectsList />
    </aside>
  );
};

export default Sidebar;
