import { useState, useEffect } from 'react';
import SectionLabel from './SectionLabel';
import './ProjectsList.css';

import menuIcon from '../../assets/icons/sidebar/menu.svg';

const LOCAL_STORAGE_KEY = 'projects';

const ProjectsList = () => {
  const [projects, setProjects] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = () => {
    const newProject = {
      id: Date.now(),
      name: 'Страница',
      isFavorite: false,
    };
    setProjects([...projects, newProject]);
  };

  const handleStartEdit = (id, currentName) => {
    setEditingId(id);
    setEditingValue(currentName);
    setOpenMenuId(null);
  };

  const handleFinishEdit = () => {
    if (editingValue.trim() === '') {
      setEditingId(null);
      setEditingValue('');
      return;
    }

    setProjects((prev) =>
      prev.map((project) =>
        project.id === editingId ? { ...project, name: editingValue } : project
      )
    );
    setEditingId(null);
    setEditingValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleFinishEdit();
    if (e.key === 'Escape') {
      setEditingId(null);
      setEditingValue('');
    }
  };

  const handleDelete = (id) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
    setOpenMenuId(null);
  };

  const handleDuplicate = (id) => {
    const original = projects.find((p) => p.id === id);
    if (!original) return;

    const newProject = {
      ...original,
      id: Date.now(),
      name: `${original.name} (копия)`,
    };

    setProjects([...projects, newProject]);
    setOpenMenuId(null);
  };

  const handleToggleFavorite = (id) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id ? { ...project, isFavorite: !project.isFavorite } : project
      )
    );
    setOpenMenuId(null);
  };

  return (
    <div className="projects-wrapper">
      {/* Избранное */}
      {projects.some((p) => p.isFavorite) && (
        <>
          <SectionLabel text="Избранное" />
          <ul className="projects-list">
            {projects
              .filter((p) => p.isFavorite)
              .map((project) => (
                <li key={project.id} className="project-item">
                  <div className="project-view">
                    <span className="project-name">
                      {project.name}
                    </span>
                  </div>
                </li>
              ))}
          </ul>

          <div className="sidebar-divider" />
        </>
      )}

      {/* Проекты */}
      <SectionLabel text="Проекты" onPlusClick={handleAddProject} />
      <ul className="projects-list">
        {projects.map((project) => (
          <li key={project.id} className="project-item">
            {editingId === project.id ? (
              <input
                className="project-input"
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
                onBlur={handleFinishEdit}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            ) : (
              <div
                className="project-view"
                onMouseLeave={() => setOpenMenuId(null)}
              >
                <span
                  className="project-name"
                  onClick={() => handleStartEdit(project.id, project.name)}
                >
                  {project.name}
                </span>

                <div className="project-actions">
                  <img
                    src={menuIcon}
                    alt="Меню"
                    className="project-menu-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(project.id);
                    }}
                  />

                  {openMenuId === project.id && (
                    <div className="project-menu">
                      <div
                        className="project-menu-item"
                        onClick={() => handleStartEdit(project.id, project.name)}
                      >
                        Переименовать
                      </div>
                      <div
                        className="project-menu-item"
                        onClick={() => handleDuplicate(project.id)}
                      >
                        Дублировать
                      </div>
                      <div
                        className="project-menu-item"
                        onClick={() => handleToggleFavorite(project.id)}
                      >
                        {project.isFavorite
                          ? 'Убрать из избранного'
                          : 'Добавить в избранное'}
                      </div>
                      <div
                        className="project-menu-item"
                        onClick={() => handleDelete(project.id)}
                      >
                        Удалить
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsList;