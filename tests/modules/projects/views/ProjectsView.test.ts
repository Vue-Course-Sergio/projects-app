import { useProjectsStore } from '@/modules/projects/store/projects.store';
import ProjectsView from '@/modules/projects/views/ProjectsView.vue';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { localProjects } from '../../../mocks/projects.fake';
import { nextTick } from 'vue';

describe('<ProjectsView/>', () => {
  const wrapper = mount(ProjectsView, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

  const store = useProjectsStore();

  beforeEach(() => {
    store.$patch({
      projects: [],
    });
  });

  test('should be render with projects', async () => {
    store.$patch({
      projects: localProjects,
    });

    await nextTick();

    const tableRows = wrapper.findAll('tbody tr');
    expect(tableRows.length).toBe(localProjects.length);

    tableRows.forEach((row, i) => {
      const project = localProjects[i];
      const cell = row.findAll('td');

      expect(cell.at(0)?.text()).toBe(project.name);
      expect(cell.at(1)?.text()).toBe(project.tasks.length.toString());
    });
  });

  test('should call addProject method on modal', () => {
    const inputModal = wrapper.findComponent({ name: 'InputModal' });
    const newProjectName = 'New Project';

    inputModal.vm.$emit('value', newProjectName);

    expect(store.addProject).toHaveBeenCalled();
    expect(store.addProject).toHaveBeenCalledWith(newProjectName);
  });
});
