import { render, screen } from '@testing-library/react';
import educationData from '../../data/education_data';
import showcaseData, { getShowcaseAnchor } from '../../data/showcase_data';
import EducationSection from './EducationSection';

const college = educationData.find((school) => school.id === 'college_of_charleston');
const masters = educationData.find((school) => school.id === 'purdue');

test('lists schools newest first', () => {
  render(<EducationSection />);
  const schoolNames = screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);
  expect(schoolNames).toEqual(educationData.map((school) => school.school));
});

test("shows the in-progress master's degree with its expected graduation", () => {
  render(<EducationSection />);
  expect(screen.getByText(masters.degree)).toBeInTheDocument();
  expect(screen.getByText('In progress')).toBeInTheDocument();
  expect(screen.getByText(masters.graduationDate)).toBeInTheDocument();
  expect(screen.getByText('Expected graduation')).toBeInTheDocument();
});

test('shows the bachelor’s degree, GPA, and graduation date', () => {
  render(<EducationSection />);
  expect(screen.getByText(college.degree)).toBeInTheDocument();
  expect(screen.getByText(college.gpa)).toBeInTheDocument();
  expect(screen.getByText('GPA')).toBeInTheDocument();
  expect(screen.getByText(college.graduationDate)).toBeInTheDocument();
  expect(screen.getByText('Graduated')).toBeInTheDocument();
});

test('the capstone note links to a project card that exists', () => {
  render(<EducationSection />);
  const { capstoneProject } = college;

  expect(screen.getByText(capstoneProject.title)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'See the project' })).toHaveAttribute(
    'href',
    `#${getShowcaseAnchor(capstoneProject.showcaseId)}`
  );
  expect(showcaseData.some((item) => item.id === capstoneProject.showcaseId)).toBe(true);
});
