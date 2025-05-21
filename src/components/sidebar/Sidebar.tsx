import React, { useRef } from 'react';
import './Sidebar.scss';
import SidebarItem from './SidebarItem';
import SidebarButton from './SidebarButton';
import ProjectsList, { ProjectsListHandle } from './ProjectsList';
import SidebarFooter from './SidebarFooter';

import homeIcon from '../../assets/icons/sidebar/home.svg';
import habitsIcon from '../../assets/icons/sidebar/habits.svg';

const Sidebar: React.FC = () => {
  const projectsRef = useRef<ProjectsListHandle>(null);

  const navItems = [
    { icon: homeIcon, text: 'Домашняя страница' },
    { icon: habitsIcon, text: 'Привычки' },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {navItems.map(({ icon, text }) => (
          <SidebarItem key={text} icon={icon} text={text} />
        ))}
      </nav>

      <SidebarButton onClick={() => projectsRef.current?.addProject()} />

      <div className="sidebar-divider" />

      <ProjectsList ref={projectsRef} />

      <SidebarFooter />
    </aside>
  );
};

export default Sidebar;
