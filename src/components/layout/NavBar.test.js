import { fireEvent, render, screen } from '@testing-library/react';
import NavBar from './NavBar';

function getMobileMenu() {
  return document.getElementById('mobile-navigation-menu');
}

test('the mobile menu starts closed and opens when the menu button is pressed', () => {
  render(<NavBar />);
  const menuButton = screen.getByRole('button', { name: 'Open menu' });

  expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  expect(getMobileMenu()).not.toBeVisible();

  fireEvent.click(menuButton);

  expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
  expect(getMobileMenu()).toBeVisible();
});

test('the mobile menu closes when a link is chosen', () => {
  render(<NavBar />);
  fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

  const mobileLinks = getMobileMenu().querySelectorAll('a');
  fireEvent.click(mobileLinks[1]);

  expect(getMobileMenu()).not.toBeVisible();
});

test('the mobile menu closes with the Escape key', () => {
  render(<NavBar />);
  fireEvent.click(screen.getByRole('button', { name: 'Open menu' }));

  fireEvent.keyDown(window, { key: 'Escape' });

  expect(getMobileMenu()).not.toBeVisible();
});
