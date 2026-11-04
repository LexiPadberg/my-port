import { render, screen } from '@testing-library/react';
import ButtonLink from './ButtonLink';

test('internal links stay in the same tab', () => {
  render(<ButtonLink href="#projects">View my work</ButtonLink>);
  const link = screen.getByRole('link', { name: 'View my work' });
  expect(link).toHaveAttribute('href', '#projects');
  expect(link).not.toHaveAttribute('target');
});

test('external links open safely in a new tab', () => {
  render(
    <ButtonLink href="https://github.com" isExternal>
      GitHub
    </ButtonLink>
  );
  const link = screen.getByRole('link', { name: 'GitHub' });
  expect(link).toHaveAttribute('target', '_blank');
  expect(link).toHaveAttribute('rel', 'noopener noreferrer');
});

test('download links include the download attribute', () => {
  render(
    <ButtonLink href="resume.pdf" download>
      Download résumé
    </ButtonLink>
  );
  expect(screen.getByRole('link', { name: 'Download résumé' })).toHaveAttribute('download');
});
