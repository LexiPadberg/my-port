// Contact links shown in the Contact tile and the footer.
// Approved by Alexa: email, LinkedIn, and GitHub (phone number intentionally not shown).
// `icon` must match a key in ICONS_BY_NAME in src/components/ui/icons/index.jsx.

const contactLinks = [
  {
    label: 'Email',
    icon: 'email',
    href: 'mailto:lexipadberg11@gmail.com',
    displayValue: 'lexipadberg11@gmail.com',
    isExternal: false,
  },
  {
    label: 'LinkedIn',
    icon: 'linkedin',
    href: 'https://www.linkedin.com/in/alexa-padberg/',
    displayValue: 'linkedin.com/in/alexa-padberg',
    isExternal: true,
  },
  {
    label: 'GitHub',
    icon: 'github',
    href: 'https://github.com/LexiPadberg',
    displayValue: 'github.com/LexiPadberg',
    isExternal: true,
  },
];

export default contactLinks;
