import { useEffect, useRef, useState } from 'react';

/**
 * Tracks when an element first scrolls into view, so it can fade in.
 * Returns [ref, isVisible]: attach `ref` to the element.
 * If the browser can't track scrolling this way, content is shown right away.
 */
function useRevealOnScroll() {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(
    () => typeof window === 'undefined' || !('IntersectionObserver' in window)
  );

  useEffect(() => {
    if (isVisible || !elementRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      // Reveal once the element's top edge is a little way onto the screen.
      { rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  return [elementRef, isVisible];
}

export default useRevealOnScroll;
