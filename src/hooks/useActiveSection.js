import { useEffect, useState } from 'react';

/**
 * Returns the ID of the section currently in the middle of the screen,
 * so the navigation bar can highlight it.
 * Falls back to the first section if the browser can't track scrolling this way.
 */
function useActiveSection(sectionIds) {
  const [activeSectionId, setActiveSectionId] = useState(sectionIds[0]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return undefined;
    }

    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sectionElements.length !== sectionIds.length && process.env.NODE_ENV !== 'production') {
      const missingIds = sectionIds.filter((id) => !document.getElementById(id));
      console.warn(`useActiveSection: no element found for section ID(s): ${missingIds.join(', ')}`);
    }

    // A section counts as "active" when it crosses a thin band around the middle of the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSectionId(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sectionElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSectionId;
}

export default useActiveSection;
