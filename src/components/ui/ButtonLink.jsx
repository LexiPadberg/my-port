const BASE_CLASSES =
  'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 ' +
  'text-sm font-semibold uppercase tracking-[0.12em] ' +
  'transition duration-200 hover:-translate-y-0.5 ' +
  'motion-reduce:transition-none motion-reduce:hover:translate-y-0';

// Tone colors adapt to the tile the button sits in (e.g. ivory buttons on the navy tile).
const VARIANT_CLASSES = {
  primary:
    'border border-tone-button bg-tone-button text-tone-on-button shadow-sm ' +
    'hover:border-tone-button-hover hover:bg-tone-button-hover hover:shadow-md',
  secondary:
    'border border-tone-accent text-tone-accent hover:bg-tone-accent hover:text-tone-on-accent',
};

/**
 * A link styled as a button.
 * - `variant`: "primary" (filled) or "secondary" (outlined).
 * - `isExternal`: opens the link in a new tab safely.
 * - `download`: asks the browser to download the file (e.g. a résumé PDF).
 */
function ButtonLink({
  href,
  variant = 'primary',
  isExternal = false,
  download = false,
  className = '',
  children,
}) {
  if (!href && process.env.NODE_ENV !== 'production') {
    console.warn('ButtonLink: missing "href", so this button will not go anywhere.');
  }

  const variantClasses = VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary;
  const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <a
      href={href}
      download={download || undefined}
      className={`${BASE_CLASSES} ${variantClasses} ${className}`}
      {...externalProps}
    >
      {children}
    </a>
  );
}

export default ButtonLink;
