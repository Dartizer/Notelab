// Импортируем компонент поисковой строки
import SearchBar from './SearchBar';

// Импортируем стили верхней панели
import './Topbar.css';

// Импортируем иконки, переключатель темы и кнопку профиля
import TopbarIcons from './TopbarIcons';
import ThemeToggle from './ThemeToggle';
import ProfileButton from './ProfileButton';

// Компонент верхней панели
const Topbar = () => {
  return (
    <header className="topbar">
      {/* Левая часть: логотип + поиск */}
      <div className="topbar-left">
        <div className="topbar-logo">Notelab</div>
        <SearchBar />
      </div>

      {/* Правая часть топбара: иконки, тема, профиль */}
      <div className="topbar-right">
        <TopbarIcons />
        <ThemeToggle />
        <ProfileButton />
      </div>
    </header>
  );
};

export default Topbar;
