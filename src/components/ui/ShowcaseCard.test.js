import { fireEvent, render, screen } from '@testing-library/react';
import ShowcaseCard from './ShowcaseCard';

const sampleProject = {
  id: 'project-sample',
  type: 'project',
  context: 'Sample context',
  title: 'Sample Project',
  description: 'A sample description.',
  technologies: ['React', 'Node.js'],
  githubUrl: 'https://github.com/example/sample',
  images: [],
};

const sampleImages = [
  { src: 'first.png', alt: 'First screen' },
  { src: 'second.png', alt: 'Second screen' },
];

test('shows a project with its badge, details, tags, and a safe GitHub link', () => {
  render(<ShowcaseCard {...sampleProject} />);

  expect(screen.getByText('Project')).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 3, name: 'Sample Project' })).toBeInTheDocument();
  expect(screen.getByText('A sample description.')).toBeInTheDocument();
  expect(screen.getByText('React')).toBeInTheDocument();

  const githubLink = screen.getByRole('link', { name: /view sample project on github/i });
  expect(githubLink).toHaveAttribute('href', sampleProject.githubUrl);
  expect(githubLink).toHaveAttribute('target', '_blank');
  expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
});

test('shows a placeholder instead of a broken image when there are no screenshots', () => {
  render(<ShowcaseCard {...sampleProject} />);
  expect(screen.getByRole('img', { name: /sample project/i }).tagName).toBe('DIV');
  expect(screen.queryByRole('group', { name: /screenshots of/i })).not.toBeInTheDocument();
});

test('with several screenshots, the dots switch between them', () => {
  render(<ShowcaseCard {...sampleProject} images={sampleImages} />);

  expect(screen.getByRole('img', { name: 'First screen' })).toBeInTheDocument();
  const secondDot = screen.getByRole('button', { name: 'Show screenshot 2 of 2' });
  expect(secondDot).toHaveAttribute('aria-pressed', 'false');

  fireEvent.click(secondDot);

  expect(screen.getByRole('img', { name: 'Second screen' })).toBeInTheDocument();
  expect(secondDot).toHaveAttribute('aria-pressed', 'true');
});

test('a single screenshot shows no dots', () => {
  render(<ShowcaseCard {...sampleProject} images={[sampleImages[0]]} />);
  expect(screen.getByRole('img', { name: 'First screen' })).toBeInTheDocument();
  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

test('an award without tags or a link hides those parts', () => {
  render(
    <ShowcaseCard id="award-sample" type="award" title="Sample Award" description="Won a thing." />
  );

  expect(screen.getByText('Award')).toBeInTheDocument();
  expect(screen.queryByRole('link')).not.toBeInTheDocument();
  expect(screen.queryByRole('list')).not.toBeInTheDocument();
});
