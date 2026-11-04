// Single source of truth for the page sections.
// The navigation bar and the section components both read from here,
// so a section ID only ever needs to change in one place.

export const SECTION_IDS = {
  home: 'home',
  experience: 'experience',
  education: 'education',
  projects: 'projects',
  skills: 'skills',
  contact: 'contact',
};

// Order here is the order links appear in the navigation bar.
export const NAV_LINKS = [
  { id: SECTION_IDS.home, label: 'Home' },
  { id: SECTION_IDS.experience, label: 'Experience' },
  { id: SECTION_IDS.education, label: 'Education' },
  { id: SECTION_IDS.projects, label: 'Projects' },
  { id: SECTION_IDS.skills, label: 'Skills' },
  { id: SECTION_IDS.contact, label: 'Contact' },
];
