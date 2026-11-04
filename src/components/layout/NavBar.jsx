import { useEffect, useState } from 'react';
import { NAV_LINKS, SECTION_IDS } from '../../data/navigation_data';
import profileData from '../../data/profile_data';
import useActiveSection from '../../hooks/useActiveSection';
import { CloseIcon, MenuIcon } from '../ui/icons';

// Defined outside the component so the list stays the same between renders.
const SECTION_ID_LIST = NAV_LINKS.map((link) => link.id);
const MOBILE_MENU_ID = 'mobile-navigation-menu';
// Matches Tailwind's `md` breakpoint, where the full link list appears.
const DESKTOP_MEDIA_QUERY = '(min-width: 768px)';

function NavLink({ link, isActive, onClick, className = '' }) {
  return (
    <a
      href={`#${link.id}`}
      onClick={onClick}
      aria-current={isActive ? 'location' : undefined}
      className={`transition-colors duration-200 ${
        isActive ? 'text-navy' : 'text-steel hover:text-navy'
      } ${className}`}
    >
      {link.label}
    </a>
  );
}

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSectionId = useActiveSection(SECTION_ID_LIST);

  const closeMenu = () => setIsMenuOpen(false);

  // Close the mobile menu with the Escape key, or if the screen grows to desktop size.
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };
    const desktopQuery = window.matchMedia ? window.matchMedia(DESKTOP_MEDIA_QUERY) : null;
    const handleResize = (event) => {
      if (event.matches) closeMenu();
    };

    window.addEventListener('keydown', handleKeyDown);
    desktopQuery?.addEventListener('change', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      desktopQuery?.removeEventListener('change', handleResize);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-dusty/40 bg-ivory/85 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
      >
        <a
          href={`#${SECTION_IDS.home}`}
          onClick={closeMenu}
          className="min-w-0 truncate font-heading text-xl font-semibold text-navy"
        >
          {profileData.fullName}
        </a>

        {/* Desktop and tablet links */}
        <ul className="hidden shrink-0 items-center gap-6 md:flex lg:gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = activeSectionId === link.id;
            return (
              <li key={link.id}>
                <NavLink
                  link={link}
                  isActive={isActive}
                  className={`relative py-1 text-sm font-semibold after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-dusty after:transition-transform after:duration-200 ${
                    isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                  }`}
                />
              </li>
            );
          })}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
          aria-expanded={isMenuOpen}
          aria-controls={MOBILE_MENU_ID}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="-mr-2 rounded-lg p-2 text-navy transition-colors hover:bg-mist md:hidden"
        >
          {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile links */}
      <nav
        id={MOBILE_MENU_ID}
        aria-label="Mobile navigation"
        hidden={!isMenuOpen}
        className="border-t border-dusty/40 bg-ivory md:hidden"
      >
        <ul className="mx-auto flex w-full max-w-6xl flex-col px-4 py-3 sm:px-6">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <NavLink
                link={link}
                isActive={activeSectionId === link.id}
                onClick={closeMenu}
                className="block rounded-lg px-3 py-3 text-base font-semibold hover:bg-mist"
              />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
