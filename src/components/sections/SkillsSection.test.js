import { render, screen } from '@testing-library/react';
import { certifications, securityClearance, skillCategories } from '../../data/skills_data';
import CertificationsSection from './CertificationsSection';
import SkillsSection from './SkillsSection';

test('shows every skill category and skill', () => {
  render(<SkillsSection />);
  skillCategories.forEach((category) => {
    expect(screen.getByRole('heading', { level: 3, name: category.title })).toBeInTheDocument();
    category.skills.forEach((skill) => {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    });
  });
});

test('shows every certification with its issuer and year, plus the clearance', () => {
  render(<CertificationsSection />);
  certifications.forEach((certification) => {
    expect(screen.getByText(certification.name)).toBeInTheDocument();
    // Several certifications can share an issuer and year (e.g. two from Red Hat in 2026).
    expect(
      screen.getAllByText(`${certification.issuer} · ${certification.year}`).length
    ).toBeGreaterThan(0);
  });
  if (securityClearance) {
    expect(screen.getByText(securityClearance)).toBeInTheDocument();
  }
});
