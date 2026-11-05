/**
 * Consistent heading block for each tile: optional small label above,
 * the title, a short accent line, and an optional intro line.
 * Colors adapt to the tile's background automatically (tone colors).
 */
function SectionHeading({ id, eyebrow, title, subtitle, align = 'left' }) {
  const isCentered = align === 'center';

  return (
    <header className={`mb-6 md:mb-8 ${isCentered ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-tone-accent">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      <span
        aria-hidden="true"
        className={`mt-4 block h-1 w-12 rounded-full bg-coral ${isCentered ? 'mx-auto' : ''}`}
      />
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed text-tone-body/80 sm:text-lg ${
            isCentered ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}

export default SectionHeading;
