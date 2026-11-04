import contactLinks from '../../data/contact_data';
import profileData from '../../data/profile_data';
import { ICONS_BY_NAME } from '../ui/icons';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-ivory">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-4 py-10 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <p className="text-center text-sm text-ivory/80 sm:text-left">
          © {currentYear} {profileData.fullName}. All rights reserved.
        </p>

        <ul className="flex items-center gap-2" aria-label="Contact and social links">
          {contactLinks.map((contactLink) => {
            const Icon = ICONS_BY_NAME[contactLink.icon];
            if (!Icon) {
              if (process.env.NODE_ENV !== 'production') {
                console.warn(`Footer: no icon named "${contactLink.icon}" for "${contactLink.label}".`);
              }
              return null;
            }

            return (
              <li key={contactLink.label}>
                <a
                  href={contactLink.href}
                  aria-label={contactLink.label}
                  className="flex rounded-lg p-2 text-ivory/80 transition-colors hover:bg-ivory/10 hover:text-ivory"
                  {...(contactLink.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
