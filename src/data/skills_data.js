// Skills (with proficiency levels) and certifications.
// Source: résumé (Padberg resume 8.2026.pdf) and bio (Node.js).
//
// `level` must be one of SKILL_LEVELS below (or null to hide the indicator).
// Levels are self-assessed by Alexa. Within each category, list strongest first.

export const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export const skillCategories = [
  {
    id: 'languages',
    title: 'Programming languages',
    skills: [
      { name: 'C#', level: 'Advanced' },
      { name: 'XAML', level: 'Advanced' },
      { name: 'Java', level: 'Intermediate' },
      { name: 'JavaScript', level: 'Intermediate' },
      { name: 'Python', level: 'Intermediate' },
      { name: 'XML', level: 'Intermediate' },
      { name: 'Kotlin', level: 'Beginner' },
      { name: 'R', level: 'Beginner' },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & platforms',
    skills: [
      { name: '.NET', level: 'Advanced' },
      { name: 'React', level: 'Intermediate' },
      { name: 'TAK ecosystem', level: 'Intermediate' },
      { name: 'Node.js', level: 'Beginner' },
      { name: 'React Native', level: 'Beginner' },
      { name: 'Android', level: 'Beginner' },
    ],
  },
  {
    id: 'systems_tools',
    title: 'Systems & tools',
    skills: [
      { name: 'Windows', level: 'Advanced' },
      { name: 'Agile development', level: 'Advanced' },
      { name: 'Linux', level: 'Intermediate' },
      { name: 'Virtualization', level: 'Beginner' },
      { name: 'Figma (web & mobile prototyping)', level: 'Beginner' },
    ],
  },
];

// Shown above the certifications list. Set to null to hide.
export const securityClearance = 'Active Secret Security Clearance';

// Newest first.
export const certifications = [
  { name: 'Red Hat Certified System Administrator', issuer: 'Red Hat', year: '2026' },
  { name: 'Red Hat Cloud Native Application Developer', issuer: 'Red Hat', year: '2026' },
  { name: 'Certified Scrum Master', issuer: 'Scrum Alliance', year: '2025' },
  { name: 'Security+', issuer: 'CompTIA', year: '2024' },
  { name: 'Windows Operating System Security', issuer: 'CISA', year: '2024' },
];
