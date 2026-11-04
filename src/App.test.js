import { render, screen, within } from '@testing-library/react';
import App from './App';
import { NAV_LINKS } from './data/navigation_data';

test('renders the navigation, every section, and the footer', () => {
  const { container } = render(<App />);

  expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  expect(screen.getByRole('main')).toBeInTheDocument();
  expect(screen.getByRole('contentinfo')).toBeInTheDocument();

  NAV_LINKS.forEach((link) => {
    expect(container.querySelector(`section#${link.id}`)).toBeInTheDocument();
  });
});

test('every navigation link points to a section that exists', () => {
  const { container } = render(<App />);
  const desktopLinks = within(screen.getByRole('navigation', { name: 'Main navigation' }))
    .getAllByRole('link')
    .map((link) => link.getAttribute('href'));

  desktopLinks.forEach((href) => {
    expect(container.querySelector(href)).toBeInTheDocument();
  });
});

test('the page has exactly one main heading', () => {
  render(<App />);
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
});
