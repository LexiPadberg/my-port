import TechTag from './TechTag';

/**
 * One entry on a vertical timeline (used for jobs; reusable for other dated items).
 * Shows a title, organization and location, a date range, plain-text paragraphs,
 * an optional highlighted number (`keyStat`), and optional technology tags.
 * `isCompact` shows a smaller version with only the first paragraph.
 */
function TimelineItem({
  title,
  organization,
  location,
  dateRange,
  paragraphs = [],
  keyStat,
  technologies = [],
  isCompact = false,
}) {
  const subtitle = [organization, location].filter(Boolean).join(' · ');
  const visibleParagraphs = isCompact ? paragraphs.slice(0, 1) : paragraphs;

  return (
    <li className="group/timeline relative pb-10 pl-8 last:pb-0 sm:pl-10">
      {/* Timeline line and dot (decorative). */}
      <span
        aria-hidden="true"
        className="absolute left-[5px] top-3 h-full w-px bg-dusty group-last/timeline:hidden"
      />
      <span
        aria-hidden="true"
        className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 ${
          isCompact ? 'border-dusty bg-ivory' : 'border-coral bg-coral'
        }`}
      />

      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className={`font-semibold leading-snug ${isCompact ? 'text-lg' : 'text-xl sm:text-2xl'}`}>
          {title}
        </h3>
        <p className="shrink-0 text-sm font-semibold text-tone-accent">{dateRange}</p>
      </div>
      {subtitle && <p className="mt-1 text-sm font-semibold text-tone-body/70">{subtitle}</p>}

      <div className={`mt-4 space-y-4 leading-relaxed text-tone-body/85 ${isCompact ? 'text-sm' : 'text-base'}`}>
        {visibleParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>

      {keyStat && (
        <div className="mt-5 flex items-center gap-4 rounded-2xl border-l-4 border-coral bg-mist px-5 py-4">
          <span className="font-heading text-3xl font-semibold text-navy sm:text-4xl">
            {keyStat.value}
          </span>
          <span className="text-sm font-medium leading-snug text-navy">{keyStat.label}</span>
        </div>
      )}

      {technologies.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Technologies used${organization ? ` at ${organization}` : ''}`}>
          {technologies.map((technology) => (
            <li key={technology}>
              <TechTag>{technology}</TechTag>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default TimelineItem;
