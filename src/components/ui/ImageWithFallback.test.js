import { fireEvent, render, screen } from '@testing-library/react';
import ImageWithFallback from './ImageWithFallback';

test('shows the image when it loads', () => {
  render(<ImageWithFallback src="photo.jpg" alt="Profile photo" />);
  expect(screen.getByRole('img', { name: 'Profile photo' }).tagName).toBe('IMG');
});

test('shows a placeholder instead of a broken image when loading fails', () => {
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  render(<ImageWithFallback src="missing.jpg" alt="Profile photo" fallbackLabel="AB" />);

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
