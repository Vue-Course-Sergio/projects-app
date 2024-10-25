import { shallowMount } from '@vue/test-utils';
import FabButton from '@/modules/common/components/FabButton.vue';

describe('<FabButton/>', () => {
  test('should render with default position ', () => {
    const wrapper = shallowMount(FabButton);

    expect(wrapper.props().position).toBe('bottom-right');

    const buttonClasses = wrapper.find('button').classes();
    const classes = ['btn', 'btn-circle', 'btn-secondary', 'p-1', 'fixed', 'bottom-right'];

    buttonClasses.forEach((c) => {
      expect(classes).toContain(c);
    });
  });

  test('should render with top-right position', () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        position: 'top-right',
      },
    });

    const button = wrapper.find('button');

    expect(button.classes()).toContain('top-right');
  });

  test('should render with top-left position', () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        position: 'top-left',
      },
    });

    const button = wrapper.find('button');

    expect(button.classes()).toContain('top-left');
  });

  test('should render with bottom-left position', () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        position: 'bottom-left',
      },
    });

    const button = wrapper.find('button');

    expect(button.classes()).toContain('bottom-left');
  });

  test('should render slot content inside button', () => {
    const wrapper = shallowMount(FabButton, {
      slots: {
        default: '<span>Hola</span>',
      },
    });

    const slotContent = wrapper.find('button span');
    expect(slotContent.exists()).toBeTruthy();
    expect(slotContent.text()).toBe('Hola');
  });
});
