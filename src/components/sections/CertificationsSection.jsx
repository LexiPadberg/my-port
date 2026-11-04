import { certifications, securityClearance } from '../../data/skills_data';
import BentoTile from '../ui/BentoTile';
import SectionHeading from '../ui/SectionHeading';

// Certifications and training, shown as its own tile next to Education.
function CertificationsSection({ background = 'dusty', className = '', revealDelayMs = 0 }) {
  const headingId = 'certifications-heading';

  return (
    <BentoTile
      id="certifications"
      labelledBy={headingId}
      background={background}
      revealDelayMs={revealDelayMs}
      className={className}
    >
      <SectionHeading id={headingId} eyebrow="Credentials" title="Certifications" />

      {securityClearance && (
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-1.5 text-sm font-semibold text-ivory">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-dusty" />
          {securityClearance}
        </p>
      )}

      {/* Compact list: one line per certification, issuer and year on the right. */}
      <ul className="divide-y divide-navy/15">
        {certifications.map((certification) => (
          <li
            key={certification.name}
            className="flex items-baseline justify-between gap-4 py-2 first:pt-0 last:pb-0"
          >
            <span className="text-sm font-semibold leading-snug sm:text-base">
              {certification.name}
            </span>
            <span className="shrink-0 text-xs font-semibold text-tone-body/80 sm:text-sm">
              {certification.issuer} · {certification.year}
            </span>
          </li>
        ))}
      </ul>
    </BentoTile>
  );
}

export default CertificationsSection;
