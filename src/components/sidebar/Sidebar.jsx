import { useRef } from 'react';
import './Sidebar.css';
import SidebarItem from './SidebarItem';
import SidebarButton from './SidebarButton';
import ProjectsList from './ProjectsList';
import SidebarFooter from './SidebarFooter';

import homeIcon from '../../assets/icons/sidebar/home.svg';
import habitsIcon from '../../assets/icons/sidebar/habits.svg';

const Sidebar = () => {
  const projectsRef = useRef();

  return (
    <aside className="sidebar">
      <div className="sidebar-nav">
        <SidebarItem icon={homeIcon} text="Домашняя страница" />
        <SidebarItem icon={habitsIcon} text="Привычки" />
      </div>

      <SidebarButton onClick={() => projectsRef.current?.addProject()} />

      <div className="sidebar-divider" />

      <ProjectsList ref={projectsRef} />

      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;
