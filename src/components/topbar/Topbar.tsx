import React from 'react';
import Logo from './Logo';
import SearchBar from './SearchBar';
import TopbarIcons from './TopbarIcons';
import ThemeToggle from './ThemeToggle';
import ProfileButton from './ProfileButton';

import './Topbar.scss';

const Topbar: React.FC = () => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <Logo />
        <SearchBar />
      </div>
      <div className="topbar-right">
        <TopbarIcons />
        <ThemeToggle />
        <ProfileButton />
      </div>
    </header>
  );
};

export default Topbar;
