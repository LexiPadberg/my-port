import { render, screen } from '@testing-library/react';
import SkillLevelIndicator from './SkillLevelIndicator';

test('shows the level as a word so it does not rely on color', () => {
  render(<SkillLevelIndicator level="Intermediate" />);
  expect(screen.getByText('Intermediate')).toBeInTheDocument();
});

test('fills one segment per level step', () => {
  const { container } = render(<SkillLevelIndicator level="Intermediate" />);
  const segments = container.querySelectorAll('[aria-hidden="true"] > span');
  const filledSegments = [...segments].filter((segment) =>
    segment.className.split(' ').includes('bg-tone-accent')
  );
  expect(segments).toHaveLength(3);
  expect(filledSegments).toHaveLength(2);
});

test('renders nothing when the level is missing or unknown', () => {
  const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  const { container: missing } = render(<SkillLevelIndicator level={null} />);
  const { container: unknown } = render(<SkillLevelIndicator level="Expert" />);
  expect(missing).toBeEmptyDOMElement();
  expect(unknown).toBeEmptyDOMElement();
  warnSpy.mockRestore();
});
