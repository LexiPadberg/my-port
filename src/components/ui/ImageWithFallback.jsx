import { useEffect, useState } from 'react';

// How long to wait before trying a failed image one more time. A short pause helps when the
// image briefly fails (for example while the development server is rebuilding).
const RETRY_DELAY_MS = 1500;

/**
 * Shows an image, or a styled placeholder while it loads or if it can't be loaded,
 * so the page never shows a broken-image icon.
 * - `fallbackLabel`: short text or an icon shown in the placeholder (e.g. initials).
 *   It appears only when there is no image, or the image still fails after one retry.
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
  // Possible values: "loading", "loaded", "waiting_to_retry", "retrying", "failed".
  const [loadStatus, setLoadStatus] = useState('loading');

  // If a new image path is passed in, start over.
  useEffect(() => {
    setLoadStatus('loading');
  }, [src]);

  // After a failure, wait a moment and then try the image once more.
  useEffect(() => {
    if (loadStatus !== 'waiting_to_retry') return undefined;
    const timerId = setTimeout(() => setLoadStatus('retrying'), RETRY_DELAY_MS);
    return () => clearTimeout(timerId);
  }, [loadStatus]);

  if (!alt && alt !== '' && process.env.NODE_ENV !== 'production') {
    console.warn(`ImageWithFallback: missing "alt" text for image "${src}".`);
  }

  const isFailed = !src || loadStatus === 'failed';

  if (isFailed || loadStatus === 'waiting_to_retry') {
    return (
      <div
        role="img"
        aria-label={alt || 'Image unavailable'}
        className={`flex items-center justify-center text-center ${fallbackClassName} ${className}`}
      >
        {isFailed && fallbackLabel && (
          <span aria-hidden="true" className="px-4 font-heading text-lg">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  const handleError = () => {
    if (loadStatus === 'retrying') {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`ImageWithFallback: could not load "${src}". Showing placeholder instead.`);
      }
      setLoadStatus('failed');
    } else {
      setLoadStatus('waiting_to_retry');
    }
  };

  // On the retry, add a query string so the browser asks the server again
  // instead of reusing the earlier failed response.
  const imageSrc =
    loadStatus === 'retrying' ? `${src}${src.includes('?') ? '&' : '?'}retry=1` : src;

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading={loading}
      onLoad={() => setLoadStatus('loaded')}
      onError={handleError}
      // Until the image has loaded, the placeholder colors show instead of an empty box.
      className={`object-cover ${loadStatus === 'loaded' ? '' : fallbackClassName} ${className}`}
    />
  );
}

export default ImageWithFallback;
