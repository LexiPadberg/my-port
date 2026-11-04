import { render, screen, within } from '@testing-library/react';
import experienceData from '../../data/experience_data';
import ExperienceSection from './ExperienceSection';

test('lists every job with its title and dates, newest first', () => {
  render(<ExperienceSection />);
  const jobTitles = screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);
  expect(jobTitles).toEqual(experienceData.map((job) => job.title));

  experienceData.forEach((job) => {
    expect(screen.getByText(job.dateRange)).toBeInTheDocument();
  });
});

test('shows descriptions as plain paragraphs, not bullet lists', () => {
  const { container } = render(<ExperienceSection />);
  const firstJob = experienceData[0];

  firstJob.paragraphs.forEach((paragraph) => {
    expect(screen.getByText(paragraph).tagName).toBe('P');
  });
  // The only nested lists allowed are the technology tag rows.
  container.querySelectorAll('ol > li ul').forEach((list) => {
    expect(list).toHaveAttribute('aria-label', expect.stringMatching(/^Technologies used/));
  });
});

test('highlights the Athena cost saving', () => {
  render(<ExperienceSection />);
  expect(screen.getByText('$1.2M')).toBeInTheDocument();
});

test('shows technology tags for each job that has them', () => {
  render(<ExperienceSection />);
  const fathomTags = screen.getByRole('list', { name: 'Technologies used at Fathom 4' });
  expect(within(fathomTags).getByText('C#')).toBeInTheDocument();
});
