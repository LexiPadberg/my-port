// Contact links shown in the Contact tile and the footer.
// Approved by Alexa: email, LinkedIn, and GitHub (phone number intentionally not shown).
// `icon` must match a key in ICONS_BY_NAME in src/components/ui/icons/index.jsx.
// `showInFooter: false` keeps a link out of the footer icons (shown by default).

const contactLinks = [
  {
    label: 'Email',
    icon: 'email',
    href: 'mailto:lexipadberg11@gmail.com',
    displayValue: 'lexipadberg11@gmail.com',
    // Shows a "Copy" button, for visitors whose computer has no email app set up for mailto links.
    copyValue: 'lexipadberg11@gmail.com',
    isExternal: false,
    // Hidden in the footer: mailto links do nothing without an email app, and the footer
    // has no room for a Copy button. The Contact tile still shows it.
    showInFooter: false,
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
