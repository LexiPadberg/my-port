import { render, screen } from '@testing-library/react';
import profileData from '../../data/profile_data';
import HeroSection from './HeroSection';

test('shows the name as the main heading, plus headline and tagline', () => {
  render(<HeroSection />);
  expect(screen.getByRole('heading', { level: 1, name: profileData.fullName })).toBeInTheDocument();
  expect(screen.getByText(profileData.headline)).toBeInTheDocument();
  expect(screen.getByText(profileData.tagline)).toBeInTheDocument();
});

test('shows the value statement and the About me bio', () => {
  render(<HeroSection />);
  expect(screen.getByText(profileData.valueStatement)).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: /hi, i'm alexa/i })).toBeInTheDocument();
  expect(screen.getByText(profileData.bio)).toBeInTheDocument();
});

test('shows the portrait with descriptive alt text', () => {
  render(<HeroSection />);
  expect(screen.getByRole('img', { name: `Portrait of ${profileData.fullName}` })).toBeInTheDocument();
});

test('"View my work" jumps to projects and the résumé button downloads the PDF', () => {
  render(<HeroSection />);
  expect(screen.getByRole('link', { name: 'View my work' })).toHaveAttribute('href', '#projects');

  const resumeLink = screen.getByRole('link', { name: 'Download résumé' });
  expect(resumeLink.getAttribute('href')).toMatch(/resume\.pdf$/);
  expect(resumeLink).toHaveAttribute('download', profileData.resumeDownloadName);
});
