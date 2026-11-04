import contactLinks from '../../data/contact_data';
import { SECTION_IDS } from '../../data/navigation_data';
import BentoTile from '../ui/BentoTile';
import { ICONS_BY_NAME } from '../ui/icons';
import SectionHeading from '../ui/SectionHeading';

/** One clickable contact card: icon, label (e.g. "Email"), and the address or profile. */
function ContactCard({ label, icon, href, displayValue, isExternal }) {
  const Icon = ICONS_BY_NAME[icon];
  const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  if (!Icon && process.env.NODE_ENV !== 'production') {
    console.warn(`ContactSection: no icon named "${icon}" for "${label}".`);
  }

  return (
    <a
      href={href}
      data-background="ivory"
      aria-label={`${label}: ${displayValue}${isExternal ? ' (opens in a new tab)' : ''}`}
      className={[
        'group/contact flex h-full items-center gap-4 rounded-2xl bg-ivory p-5',
        'shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/10',
        'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
      ].join(' ')}
      {...externalProps}
    >
      {Icon && (
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-ivory transition-colors group-hover/contact:bg-steel">
          <Icon className="h-5 w-5" />
        </span>
      )}
      <span className="min-w-0">
        <span className="block text-xs font-bold uppercase tracking-[0.15em] text-tone-accent">
          {label}
        </span>
        {/* Lets long addresses wrap instead of overflowing on narrow screens. */}
        <span className="mt-1 block font-semibold text-navy [overflow-wrap:anywhere]">
          {displayValue}
        </span>
      </span>
    </a>
  );
}

function ContactSection({ background = 'mist', className = '', revealDelayMs = 0 }) {
  const headingId = `${SECTION_IDS.contact}-heading`;

  return (
    <BentoTile
      id={SECTION_IDS.contact}
      labelledBy={headingId}
      background={background}
      revealDelayMs={revealDelayMs}
      className={className}
    >
      {/* Soft decorative shape (decorative only). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-dusty/60 blur-3xl"
      />
      <div className="relative">
        <SectionHeading
          id={headingId}
          eyebrow="Say hello"
          title="Let's connect"
          subtitle="Want to talk about an opportunity or a project? Reach out through any of the links below."
        />

        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {contactLinks.map((contactLink) => (
            <li key={contactLink.label}>
              <ContactCard {...contactLink} />
            </li>
          ))}
        </ul>
      </div>
    </BentoTile>
  );
}

export default ContactSection;
