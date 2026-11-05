import { loadPageViewCounter } from './page_view_counter';

afterEach(() => {
  document.head.querySelectorAll('script[data-goatcounter]').forEach((script) => script.remove());
});

test('does nothing when no GoatCounter code is set', () => {
  expect(loadPageViewCounter('', 'production')).toBe(false);
  expect(document.querySelector('script[data-goatcounter]')).toBeNull();
});

test('does not count visits during local development', () => {
  expect(loadPageViewCounter('alexapadberg', 'development')).toBe(false);
  expect(document.querySelector('script[data-goatcounter]')).toBeNull();
});

test('rejects codes that cannot be part of a web address', () => {
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  expect(loadPageViewCounter('alexa_padberg!', 'production')).toBe(false);
  expect(warnSpy).toHaveBeenCalled();
  warnSpy.mockRestore();
});

test('adds the counting script once on the live site', () => {
  expect(loadPageViewCounter('alexapadberg', 'production')).toBe(true);
  expect(loadPageViewCounter('alexapadberg', 'production')).toBe(true);

  const scripts = document.querySelectorAll('script[data-goatcounter]');
  expect(scripts).toHaveLength(1);
  expect(scripts[0].dataset.goatcounter).toBe('https://alexapadberg.goatcounter.com/count');
  expect(scripts[0].src).toBe('https://gc.zgo.at/count.js');
});
