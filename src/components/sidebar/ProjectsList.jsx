import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import SectionLabel from './SectionLabel';
import './ProjectsList.css';
import menuIcon from '../../assets/icons/sidebar/menu.svg';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

// Компонент одного перетаскиваемого проекта
function SortableProjectItem({
  id,
  project,
  isActive,
  editingId,
  editingValue,
  setEditingValue,
  onStartEdit,
  onFinishEdit,
  onKeyDown,
  onSetActive,
  openMenuId,
  setOpenMenuId,
  menuIcon,
  handleDuplicate,
  handleToggleFavorite,
  confirmAndDelete,
  menuPosition,
  setMenuPosition,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : 'auto',
    cursor: isDragging ? 'grabbing' : 'grab',
    opacity: isDragging ? 0.5 : 1,
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setOpenMenuId(project.id);
    setMenuPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest('.project-menu') &&
        !e.target.closest('.project-menu-icon')
      ) {
        setOpenMenuId(null);
        setMenuPosition(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [setOpenMenuId, setMenuPosition]);

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`project-item ${isActive ? 'active' : ''}`}
      onContextMenu={handleContextMenu}
    >
      {editingId === project.id ? (
        <input
          className="project-input"
          value={editingValue}
          onChange={(e) => setEditingValue(e.target.value)}
          onBlur={onFinishEdit}
          onKeyDown={onKeyDown}
          autoFocus
        />
      ) : (
        <div
          className="project-view"
          onMouseLeave={() => setOpenMenuId(null)}
          onClick={() => onSetActive(String(project.id))}
          onDoubleClick={() => onStartEdit(project.id, project.name)}
        >
          <span className="project-name">{project.name}</span>

          <div className="project-actions">
            <img
              src={menuIcon}
              alt="Меню"
              className="project-menu-icon"
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuId(project.id);
                setMenuPosition(null);
              }}
            />

            {openMenuId === project.id && (
              <div
                className="project-menu"
                style={
                  menuPosition
                    ? {
                        position: 'fixed',
                        top: menuPosition.y,
                        left: menuPosition.x,
                        width: '150px',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        backgroundColor: '#2b2b2b',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        zIndex: 10,
                      }
                    : {
                        position: 'absolute',
                        top: '20px',
                        right: 0,
                        backgroundColor: '#2b2b2b',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        zIndex: 10,
                      }
                }
              >
                <div
                  className="project-menu-item"
                  onClick={() => onStartEdit(project.id, project.name)}
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
                  onClick={() => confirmAndDelete(project.id)}
                >
                  Удалить
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

const ProjectsList = forwardRef((props, ref) => {
  const LOCAL_STORAGE_KEY = 'projects';
  const ACTIVE_ID_KEY = 'activeProjectId';

  const [projects, setProjects] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [activeId, setActiveId] = useState(() => {
    return localStorage.getItem(ACTIVE_ID_KEY);
  });

  // Новые состояния для сворачивания групп
  const [favoritesOpen, setFavoritesOpen] = useState(true);
  const [projectsOpen, setProjectsOpen] = useState(true);

  // Состояние позиции меню для ПКМ
  const [menuPosition, setMenuPosition] = useState(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = () => {
    const newProject = {
      id: Date.now(),
      name: 'Страница',
      isFavorite: false,
    };
    setProjects((prev) => [...prev, newProject]);
    setActiveId(String(newProject.id));
    localStorage.setItem(ACTIVE_ID_KEY, String(newProject.id));
  };

  useImperativeHandle(ref, () => ({
    addProject: handleAddProject,
  }));

  const handleSetActive = (id) => {
    setActiveId(id);
    localStorage.setItem(ACTIVE_ID_KEY, id);
    setMenuPosition(null);
  };

  const handleStartEdit = (id, currentName) => {
    setEditingId(id);
    setEditingValue(currentName);
    setOpenMenuId(null);
    setMenuPosition(null);
  };

  const handleFinishEdit = () => {
    if (editingValue.trim() === '') {
      setEditingId(null);
      setEditingValue('');
      return;
    }

    setProjects((prev) =>
      prev.map((project) =>
        String(project.id) === String(editingId)
          ? { ...project, name: editingValue }
          : project
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
    setProjects((prev) =>
      prev.filter((project) => String(project.id) !== String(id))
    );
    if (activeId === String(id)) {
      setActiveId(null);
      localStorage.removeItem(ACTIVE_ID_KEY);
    }
    setOpenMenuId(null);
    setMenuPosition(null);
    if (editingId === id) {
      setEditingId(null);
      setEditingValue('');
    }
  };

  const confirmAndDelete = (id) => {
    const project = projects.find((p) => String(p.id) === String(id));
    if (!project) return;

    const isConfirmed = window.confirm(`Удалить страницу "${project.name}"?`);
    if (isConfirmed) {
      handleDelete(id);
    }
  };

  const handleDuplicate = (id) => {
    const original = projects.find((p) => String(p.id) === String(id));
    if (!original) return;

    const newProject = {
      ...original,
      id: Date.now(),
      name: `${original.name} (копия)`,
      isFavorite: false,
    };

    setProjects((prev) => [...prev, newProject]);
    setOpenMenuId(null);
    setMenuPosition(null);
  };

  const handleToggleFavorite = (id) => {
    setProjects((prev) =>
      prev.map((project) =>
        String(project.id) === String(id)
          ? { ...project, isFavorite: !project.isFavorite }
          : project
      )
    );
    setOpenMenuId(null);
    setMenuPosition(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setProjects((items) => {
      const oldIndex = items.findIndex((item) => String(item.id) === active.id);
      const newIndex = items.findIndex((item) => String(item.id) === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });

    setOpenMenuId(null);
    setMenuPosition(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' && activeId !== null) {
        e.preventDefault();
        confirmAndDelete(activeId);
        setOpenMenuId(null);
        setEditingId(null);
        setEditingValue('');
        setMenuPosition(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeId]);

  // Функции переключения сворачивания групп
  const toggleFavorites = () => setFavoritesOpen((v) => !v);
  const toggleProjects = () => setProjectsOpen((v) => !v);

  return (
    <div className="projects-wrapper">
      {/* Избранное */}
      {projects.some((p) => p.isFavorite) && (
        <>
          <SectionLabel text="Избранное" onTitleClick={toggleFavorites} />
          {favoritesOpen && (
            <>
              <ul className="projects-list">
                {projects
                  .filter((p) => p.isFavorite)
                  .map((project) => (
                    <li
                      key={project.id}
                      className={`project-item ${
                        String(project.id) === activeId ? 'active' : ''
                      }`}
                      onClick={() => handleSetActive(String(project.id))}
                    >
                      <div className="project-view">
                        <span className="project-name">{project.name}</span>
                      </div>
                    </li>
                  ))}
              </ul>
              <div className="sidebar-divider" />
            </>
          )}
        </>
      )}

      {/* Основные проекты с drag & drop */}
      <SectionLabel
        text="Проекты"
        onPlusClick={handleAddProject}
        onTitleClick={toggleProjects}
      />
      {projectsOpen && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={projects.map((p) => String(p.id))}
            strategy={verticalListSortingStrategy}
          >
            <ul className="projects-list">
              {projects.map((project) => (
                <SortableProjectItem
                  key={project.id}
                  id={String(project.id)}
                  project={project}
                  isActive={String(project.id) === activeId}
                  editingId={editingId}
                  editingValue={editingValue}
                  setEditingValue={setEditingValue}
                  onStartEdit={handleStartEdit}
                  onFinishEdit={handleFinishEdit}
                  onKeyDown={handleKeyDown}
                  onSetActive={handleSetActive}
                  openMenuId={openMenuId}
                  setOpenMenuId={setOpenMenuId}
                  menuIcon={menuIcon}
                  handleDuplicate={handleDuplicate}
                  handleToggleFavorite={handleToggleFavorite}
                  confirmAndDelete={confirmAndDelete}
                  menuPosition={menuPosition}
                  setMenuPosition={setMenuPosition}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
});

export default ProjectsList;
