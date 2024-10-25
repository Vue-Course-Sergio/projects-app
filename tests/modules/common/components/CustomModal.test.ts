import CustomModal from '@/modules/common/components/CustomModal.vue';
import { mount } from '@vue/test-utils';

describe('<CustomModal/>', () => {
  test('should render dialog with default state', () => {
    const wrapper = mount(CustomModal);

    const modal = wrapper.find('.modal');
    expect(modal.attributes('open')).toBeUndefined();
  });

  test('should render dialog with header, body and footer slots', () => {
    const wrapper = mount(CustomModal, {
      slots: {
        header: '<span>Header content</span>',
        body: '<span>Body content</span>',
        'footer-actions': '<span>Footer content</span>',
      },
    });

    expect(wrapper.text()).toContain('Header content');
    expect(wrapper.find('.my-5').text()).toContain('Body content');
    expect(wrapper.text()).toContain('Footer content');
  });

  test('should open and close dialog when open prop changes', async () => {
    const wrapper = mount(CustomModal, {
      props: {
        open: true,
      },
    });
    const modal = wrapper.find('.modal');
    const modalBackdrop = wrapper.find('.modal-backdrop');

    expect(modal.attributes('open')).toBeDefined();
    expect(modalBackdrop.exists()).toBeTruthy();

    await wrapper.setProps({ open: false });
    expect(modal.attributes('open')).toBeUndefined();
  });
});
