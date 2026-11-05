import useRevealOnScroll from '../../hooks/useRevealOnScroll';

const BACKGROUND_CLASSES = {
  ivory: 'bg-ivory border border-dusty/60',
  mist: 'bg-mist',
  dusty: 'bg-dusty',
  navy: 'bg-navy',
};

/**
 * One rounded tile in the bento grid.
 * - `background`: "ivory", "mist", "dusty", or "navy". Text and buttons inside adjust
 *   automatically to stay readable (see the tone colors in src/index.css).
 * - `className`: grid placement, e.g. "md:col-span-6 lg:col-span-7".
 * - `as`: the HTML element to use ("section" for nav targets, "div" for decorative tiles).
 * - `isFlush`: removes inner padding (e.g. for a photo that fills the tile).
 * - `revealDelayMs`: small delay for the fade-in, to stagger tiles that appear together.
 */
function BentoTile({
  as: Element = 'section',
  id,
  labelledBy,
  background = 'mist',
  isFlush = false,
  revealDelayMs = 0,
  className = '',
  children,
}) {
  const [tileRef, isVisible] = useRevealOnScroll();
  const backgroundClass = BACKGROUND_CLASSES[background];

  if (!backgroundClass && process.env.NODE_ENV !== 'production') {
    console.warn(
      `BentoTile: unknown background "${background}". Use one of: ${Object.keys(
        BACKGROUND_CLASSES
      ).join(', ')}. Falling back to "mist".`
    );
  }

  return (
    <Element
      ref={tileRef}
      id={id}
      aria-labelledby={labelledBy}
      data-background={backgroundClass ? background : 'mist'}
      style={{ transitionDelay: isVisible ? `${revealDelayMs}ms` : '0ms' }}
      className={[
        'relative overflow-hidden rounded-3xl',
        isFlush ? '' : 'p-6 sm:p-8 lg:p-10',
        backgroundClass || BACKGROUND_CLASSES.mist,
        // Fade-and-rise on first appearance; a soft resting shadow that deepens on hover.
        '[transition:opacity_700ms_ease-out,transform_700ms_ease-out,box-shadow_300ms_ease]',
        'shadow-lg shadow-navy/10 hover:shadow-2xl hover:shadow-navy/15',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        // People who ask their device for less motion see tiles immediately.
        'motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:!transition-none',
        className,
      ].join(' ')}
    >
      {children}
    </Element>
  );
}

export default BentoTile;
