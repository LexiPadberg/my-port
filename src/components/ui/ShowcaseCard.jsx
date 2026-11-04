import { useState } from 'react';
import { AwardIcon, GitHubIcon } from './icons';
import ImageWithFallback from './ImageWithFallback';
import TechTag from './TechTag';

const TYPE_LABELS = {
  project: 'Project',
  award: 'Award',
};

const IMAGE_CLASSES =
  'h-full w-full transition-transform duration-500 group-hover/card:scale-105 ' +
  'motion-reduce:transition-none motion-reduce:group-hover/card:scale-100';

/**
 * The card's image area. Shows one screenshot, with dots to switch between several.
 * With no screenshots it shows a placeholder (a medal icon for awards).
 */
function CardImageGallery({ images, title, type }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultipleImages = images.length > 1;
  const activeImage = images[activeIndex];

  if (!activeImage) {
    return (
      <ImageWithFallback
        alt={type === 'award' ? `${title} (award)` : `${title} (no screenshot available)`}
        fallbackLabel={type === 'award' ? <AwardIcon className="h-16 w-16" /> : title}
        fallbackClassName="bg-gradient-to-br from-mist to-dusty text-navy"
        className={IMAGE_CLASSES}
      />
    );
  }

  return (
    <>
      <ImageWithFallback
        src={activeImage.src}
        alt={activeImage.alt || `Screenshot of ${title}`}
        fallbackLabel={title}
        fallbackClassName="bg-gradient-to-br from-mist to-dusty text-navy"
        className={IMAGE_CLASSES}
      />

      {hasMultipleImages && (
        <div
          role="group"
          aria-label={`Screenshots of ${title}`}
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-navy/75 px-2 py-1 backdrop-blur-sm"
        >
          {images.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={image.alt || index}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show screenshot ${index + 1} of ${images.length}`}
                aria-pressed={isActive}
                className="flex h-6 w-6 items-center justify-center rounded-full"
              >
                <span
                  aria-hidden="true"
                  className={`block rounded-full transition-all duration-200 ${
                    isActive ? 'h-2.5 w-2.5 bg-ivory' : 'h-2 w-2 bg-ivory/50 hover:bg-ivory/80'
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

/**
 * A card for one project or award. Fields that are missing (screenshots, tech tags,
 * GitHub link) are simply left out, so the same card works for awards.
 * The card is always light (ivory), even inside the dark navy tile.
 */
function ShowcaseCard({
  id,
  type,
  context,
  title,
  description,
  technologies = [],
  githubUrl,
  images = [],
}) {
  const typeLabel = TYPE_LABELS[type];

  if (!typeLabel && process.env.NODE_ENV !== 'production') {
    console.warn(`ShowcaseCard: unknown type "${type}" for "${title}". Use "project" or "award".`);
  }

  return (
    <article
      id={id}
      data-background="ivory"
      className={[
        'group/card flex h-full flex-col overflow-hidden rounded-2xl bg-ivory',
        'shadow-lg shadow-navy/30 transition duration-300 hover:-translate-y-1 hover:shadow-2xl',
        'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
      ].join(' ')}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <CardImageGallery images={images} title={title} type={type} />
        {typeLabel && (
          <span className="absolute left-3 top-3 rounded-full bg-navy/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-ivory">
            {typeLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {context && (
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-tone-accent">{context}</p>
        )}
        <h3 className="mt-2 text-xl font-semibold leading-snug">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-tone-body/85 sm:text-base">{description}</p>

        {technologies.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Technologies used in ${title}`}>
            {technologies.map((technology) => (
              <li key={technology}>
                <TechTag>{technology}</TechTag>
              </li>
            ))}
          </ul>
        )}

        {githubUrl && (
          <div className="mt-auto pt-6">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${title} on GitHub (opens in a new tab)`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-tone-accent underline-offset-4 hover:underline"
            >
              <GitHubIcon className="h-4 w-4" />
              View on GitHub
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

export default ShowcaseCard;
