import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import './App.scss';

const App: React.FC = () => (
  <div className="app-container">
    <Sidebar />
    <main className="main-content">
      <Topbar />
      <section className="page-content"></section>
    </main>
  </div>
);

export default App;
