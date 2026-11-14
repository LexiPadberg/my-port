import { act, fireEvent, render, screen } from '@testing-library/react';
import ImageWithFallback from './ImageWithFallback';

afterEach(() => {
  jest.useRealTimers();
});

test('shows the image when it loads', () => {
  render(<ImageWithFallback src="photo.jpg" alt="Profile photo" />);
  expect(screen.getByRole('img', { name: 'Profile photo' }).tagName).toBe('IMG');
});

test('tries a failed image again before giving up', () => {
  jest.useFakeTimers();
  render(<ImageWithFallback src="photo.jpg" alt="Profile photo" fallbackLabel="AB" />);

  fireEvent.error(screen.getByRole('img', { name: 'Profile photo' }));
  act(() => {
    jest.runOnlyPendingTimers();
  });

  const retriedImage = screen.getByRole('img', { name: 'Profile photo' });
  expect(retriedImage.tagName).toBe('IMG');
  expect(retriedImage).toHaveAttribute('src', 'photo.jpg?retry=1');

  fireEvent.load(retriedImage);
  expect(screen.getByRole('img', { name: 'Profile photo' }).tagName).toBe('IMG');
});

test('shows a placeholder instead of a broken image when loading keeps failing', () => {
  jest.useFakeTimers();
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  render(<ImageWithFallback src="missing.jpg" alt="Profile photo" fallbackLabel="AB" />);

  fireEvent.error(screen.getByRole('img', { name: 'Profile photo' }));
  act(() => {
    jest.runOnlyPendingTimers();
  });
  fireEvent.error(screen.getByRole('img', { name: 'Profile photo' }));

  const placeholder = screen.getByRole('img', { name: 'Profile photo' });
  expect(placeholder.tagName).toBe('DIV');
  expect(placeholder).toHaveTextContent('AB');
  warnSpy.mockRestore();
});

test('shows a placeholder when no image is provided', () => {
  render(<ImageWithFallback alt="Project screenshot" fallbackLabel="Screenshot coming soon" />);
  expect(screen.getByRole('img', { name: 'Project screenshot' })).toHaveTextContent(
    'Screenshot coming soon'
  );
});
