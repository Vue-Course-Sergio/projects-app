import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { createPinia, setActivePinia } from 'pinia';
import { localProjects } from '../../../mocks/projects.fake';

describe('useProjectsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  test('should return default values', () => {
    const {
      noProjects,
      addProject,
      addTaskToProject,
      projectList,
      projects,
      projectsWithCompletion,
      toggleTask,
    } = useProjectsStore();

    expect(noProjects).toBe(true);
    expect(projectList).toEqual([]);
    expect(projects).toEqual([]);
    expect(projectsWithCompletion).toEqual([]);

    expect(addProject).toBeInstanceOf(Function);
    expect(addTaskToProject).toBeInstanceOf(Function);
    expect(toggleTask).toBeInstanceOf(Function);
  });

  test('should add a new project', () => {
    const projectName = 'New Project';

    const store = useProjectsStore();

    store.addProject(projectName);

    expect(store.projects.length).toBe(1);
    expect(store.projects[0]).toEqual({
      id: expect.any(String),
      name: projectName,
      tasks: [],
    });
  });

  test('should add a new task on an existing project', () => {
    const store = useProjectsStore();
    store.addProject('New Project');

    const project = store.projects.at(0)!;
    const taskName = 'New Task';

    store.addTaskToProject(project.id, taskName);

    expect(project.tasks.length).toBe(1);
    expect(project.tasks.at(0)!).toEqual({
      id: expect.any(String),
      name: taskName,
      completedAt: undefined,
    });
  });

  test('should toggle a task', () => {
    const store = useProjectsStore();
    store.addProject('New Project');

    const project = store.projects.at(0)!;
    const taskName = 'New Task';

    store.addTaskToProject(project.id, taskName);
    const task = project.tasks.at(0)!;
    store.toggleTask(project.id, task.id);

    expect(task).toEqual({
      id: expect.any(String),
      name: taskName,
      completedAt: expect.any(Date),
    });
  });

  test('should load from localStorage', () => {
    localStorage.setItem('projects', JSON.stringify(localProjects));

    const store = useProjectsStore();

    const [project1] = store.projects;

    expect(project1).toEqual({
      id: '1',
      name: 'Project 1',
      tasks: expect.any(Array),
    });

    expect(store.projects.length).toBe(localProjects.length);
  });

  test('should return the projects with completion', () => {
    const store = useProjectsStore();
    store.$patch((state) => {
      state.projects = localProjects;
    });

    expect(store.projectsWithCompletion).toEqual([
      { id: '1', name: 'Project 1', taskCount: 4, completion: 25 },
      { id: '2', name: 'Project 2', taskCount: 0, completion: 0 },
      { id: '3', name: 'Project 3', taskCount: 3, completion: 33 },
    ]);
  });
});
