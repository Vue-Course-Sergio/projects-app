vi.mock('@/router', () => ({
  default: 'router',
}));

vi.mock('pinia', async (importReal) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mod: any = await importReal();

  return {
    ...mod,
    createPinia: vi.fn().mockReturnValue('pinia'),
  };
});

describe('Main.ts', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const vue = require('vue');

  const useSpy = vi.fn();
  const mountSpy = vi.fn();

  const createApp = vi.fn().mockReturnValue({
    use: useSpy,
    mount: mountSpy,
  });

  vue.createApp = createApp;

  test('should be configured as defaults', async () => {
    await import('@/main');

    expect(vue.createApp).toHaveBeenCalled();
    expect(mountSpy).toHaveBeenCalledWith('#app');

    expect(useSpy).toHaveBeenCalledWith('router');
    expect(useSpy).toHaveBeenCalledWith('pinia');
  });
});
