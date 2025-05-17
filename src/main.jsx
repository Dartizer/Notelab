// Импортируем StrictMode — это инструмент React для выявления потенциальных проблем
import { StrictMode } from 'react';

// Импортируем createRoot — это новый способ "монтировать" приложение в React 18+
import { createRoot } from 'react-dom/client';

// Импортируем главный компонент приложения
import App from './App.jsx';

// Находим в HTML-документе элемент с id="root", куда будет вставлено React-приложение
const rootElement = document.getElementById('root');

// Если по каким-то причинам элемент не найден — выбрасываем ошибку
if (!rootElement) throw new Error('Root element not found');

// Создаём корневой React-объект, связанный с DOM-элементом
const root = createRoot(rootElement);

// Рендерим (вставляем) наше приложение внутрь найденного root-элемента
// Оборачиваем <App /> в <StrictMode> — это активирует проверки и предупреждения во время разработки
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
