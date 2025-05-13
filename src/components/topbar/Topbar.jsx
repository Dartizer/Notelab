import SearchBar from './SearchBar';
import './Topbar.css';
import TopbarIcons from './TopbarIcons';
import ThemeToggle from './ThemeToggle';
import ProfileButton from './ProfileButton';

const Topbar = () => {
  return (
    <header className="topbar">
      <SearchBar />
      <div className="topbar-right">
        <TopbarIcons />
        <ThemeToggle />
        <ProfileButton />
      </div>
    </header>
  );
};

export default Topbar;
