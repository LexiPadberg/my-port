import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('shows LinkedIn and GitHub icons but not the email icon', () => {
  render(<Footer />);
  expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'GitHub' })).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: 'Email' })).not.toBeInTheDocument();
});
