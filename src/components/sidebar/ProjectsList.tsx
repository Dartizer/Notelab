import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  Ref,
  KeyboardEvent,
  ChangeEvent,
  MouseEvent,
  useCallback,
} from 'react';
import SectionLabel from './SectionLabel';
import './ProjectsList.scss';
import menuIcon from '../../assets/icons/sidebar/menu.svg';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';

interface Project {
  id: number;
  name: string;
  isFavorite: boolean;
}

interface SortableProjectItemProps {
  id: string;
  project: Project;
  isActive: boolean;
  editingId: number | null;
  editingValue: string;
  setEditingValue: (value: string) => void;
  onStartEdit: (id: number, currentName: string) => void;
  onFinishEdit: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onSetActive: (id: string) => void;
  openMenuId: number | null;
  setOpenMenuId: React.Dispatch<React.SetStateAction<number | null>>;
  menuIcon: string;
  handleDuplicate: (id: number) => void;
  handleToggleFavorite: (id: number) => void;
  confirmAndDelete: (id: number) => void;
  menuPosition: { x: number; y: number } | null;
  setMenuPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number } | null>
  >;
}

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
}: SortableProjectItemProps) {
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

  const handleContextMenu = (e: MouseEvent<HTMLLIElement>) => {
    e.preventDefault();
    setOpenMenuId(project.id);
    setMenuPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest('.project-menu') &&
        !target.closest('.project-menu-icon')
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
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEditingValue(e.target.value)
          }
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

export interface ProjectsListHandle {
  addProject: () => void;
}

// ... [все импорты без изменений]

const ProjectsList = forwardRef<ProjectsListHandle>((_, ref: Ref<ProjectsListHandle>) => {
  const LOCAL_STORAGE_KEY = 'projects';
  const ACTIVE_ID_KEY = 'activeProjectId';

  const [projects, setProjects] = useState<Project[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<string | null>(() => localStorage.getItem(ACTIVE_ID_KEY));

  const [favoritesOpen, setFavoritesOpen] = useState(true);
  const [projectsOpen, setProjectsOpen] = useState(true);

  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
  }, [projects]);

  const addProject = useCallback(() => {
    const newProject: Project = {
      id: Date.now(),
      name: 'Новая страница',
      isFavorite: false,
    };
    setProjects((prev) => [...prev, newProject]);
    setActiveId(String(newProject.id));
    localStorage.setItem(ACTIVE_ID_KEY, String(newProject.id));
  }, []);

  useImperativeHandle(ref, () => ({ addProject }));

  const handleSetActive = (id: string) => {
    setActiveId(id);
    localStorage.setItem(ACTIVE_ID_KEY, id);
    setMenuPosition(null);
  };

  const handleStartEdit = (id: number, currentName: string) => {
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleFinishEdit();
    if (e.key === 'Escape') {
      setEditingId(null);
      setEditingValue('');
    }
  };

  const handleDelete = (id: number) => {
    setProjects((prev) => prev.filter((p) => String(p.id) !== String(id)));
    if (activeId === String(id)) {
      setActiveId(null);
      localStorage.removeItem(ACTIVE_ID_KEY);
    }
    if (editingId === id) {
      setEditingId(null);
      setEditingValue('');
    }
    setOpenMenuId(null);
    setMenuPosition(null);
  };

  const confirmAndDelete = (id: number) => {
    handleDelete(id);
  };

  const handleDuplicate = (id: number) => {
    const original = projects.find((p) => p.id === id);
    if (!original) return;
    const newProject: Project = {
      ...original,
      id: Date.now(),
      name: `${original.name} (копия)`,
      isFavorite: false,
    };
    setProjects((prev) => [...prev, newProject]);
    setOpenMenuId(null);
    setMenuPosition(null);
  };

  const handleToggleFavorite = (id: number) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
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

  const handleDragEnd = (event: DragEndEvent) => {
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
    const handleDeleteKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Delete' && activeId !== null) {
        e.preventDefault();
        confirmAndDelete(Number(activeId));
      }
    };
    document.addEventListener('keydown', handleDeleteKey);
    return () => {
      document.removeEventListener('keydown', handleDeleteKey);
    };
  }, [activeId, projects]);

  return (
    <div className="projects-wrapper">
      <div className="projects-scroll-container">
        {projects.some((p) => p.isFavorite) && (
          <>
            <SectionLabel text="Избранное" onTitleClick={() => setFavoritesOpen((v) => !v)} />
            {favoritesOpen && (
              <>
                <ul className="projects-list">
                  {projects
                    .filter((p) => p.isFavorite)
                    .map((project) => (
                      <li
                        key={project.id}
                        className={`project-item ${String(project.id) === activeId ? 'active' : ''}`}
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

        <SectionLabel
          text="Проекты"
          onTitleClick={() => setProjectsOpen((v) => !v)}
          onPlusClick={addProject}
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
    </div>
  );
});

export default ProjectsList;

