// Импортируем верхнюю панель приложения
import Topbar from './components/topbar/Topbar';

// Импортируем боковую панель
import Sidebar from './components/sidebar/Sidebar';

// Импортируем глобальные стили приложения
import './App.css';

// Главный компонент приложения
const App = () => (
  <div className="app-container">
    {/* Боковая панель */}
    <Sidebar />

    {/* Основная область: включает топбар и содержимое страницы */}
    <main className="main-content">
      <Topbar />
      <section className="page-content">
        {/* Здесь будет отображаться основной контент приложения */}
      </section>
    </main>
  </div>
);

// Экспортируем App для использования в index.js
export default App;
