import { useEffect, useState } from 'react';

/**
 * Shows an image, or a styled placeholder if the image is missing or fails to load,
 * so the page never shows a broken-image icon.
 * - `fallbackLabel`: short text or an icon shown in the placeholder (e.g. initials).
 * - `fallbackClassName`: placeholder colors (keep text readable on the chosen background).
 * - `loading`: "lazy" (default, loads when scrolled near) or "eager" (for images at the top of the page).
 */
function ImageWithFallback({
  src,
  alt,
  loading = 'lazy',
  className = '',
  fallbackLabel = '',
  fallbackClassName = 'bg-mist text-steel',
}) {
  const [hasError, setHasError] = useState(false);

  // If a new image path is passed in, try loading it again.
  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!alt && alt !== '' && process.env.NODE_ENV !== 'production') {
    console.warn(`ImageWithFallback: missing "alt" text for image "${src}".`);
  }

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt || 'Image unavailable'}
        className={`flex items-center justify-center text-center ${fallbackClassName} ${className}`}
      >
        {fallbackLabel && (
          <span aria-hidden="true" className="px-4 font-heading text-lg">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onError={() => {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`ImageWithFallback: could not load "${src}". Showing placeholder instead.`);
        }
        setHasError(true);
      }}
      className={`object-cover ${className}`}
    />
  );
}

export default ImageWithFallback;
