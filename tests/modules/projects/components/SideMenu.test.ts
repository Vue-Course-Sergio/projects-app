import SideMenu from '@/modules/projects/components/SideMenu.vue';
import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { localProjects } from '../../../mocks/projects.fake';
import { nextTick } from 'vue';

describe('<SideMenu/>', () => {
  const wrapper = mount(SideMenu, {
    global: {
      stubs: ['RouterLink'],
      plugins: [createTestingPinia()],
    },
  });

  const store = useProjectsStore();

  beforeEach(() => {
    store.$patch({
      projects: [],
    });
  });

  test('should render with no projects', () => {
    expect(wrapper.html()).toContain('No hay proyectos');
  });

  test('should render with projects', async () => {
    store.$patch({
      projects: localProjects,
    });

    await nextTick();

    expect(wrapper.html()).not.toContain('No hay proyectos');
  });
});
