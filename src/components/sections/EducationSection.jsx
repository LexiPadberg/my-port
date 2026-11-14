import educationData from '../../data/education_data';
import { SECTION_IDS } from '../../data/navigation_data';
import { getShowcaseAnchor } from '../../data/showcase_data';
import BentoTile from '../ui/BentoTile';
import SectionHeading from '../ui/SectionHeading';

/** One big number with a small label underneath, e.g. "3.98" / "GPA". */
function EducationStat({ value, label }) {
  return (
    // Label comes first in the HTML (as required), but is shown under the value.
    <div className="flex flex-col-reverse rounded-2xl border-l-4 border-coral bg-ivory/70 px-4 py-3">
      <dt className="mt-0.5 text-xs font-bold uppercase tracking-[0.15em] text-navy">{label}</dt>
      <dd className="font-heading text-2xl font-semibold text-navy sm:text-3xl">{value}</dd>
    </div>
  );
}

function EducationSection({ background = 'mist', className = '', revealDelayMs = 0 }) {
  const headingId = `${SECTION_IDS.education}-heading`;

  return (
    <BentoTile
      id={SECTION_IDS.education}
      labelledBy={headingId}
      background={background}
      revealDelayMs={revealDelayMs}
      className={className}
    >
      <SectionHeading id={headingId} eyebrow="Learning" title="Education" />

      <ul className="divide-y divide-navy/15">
        {educationData.map((school) => (
          <li key={school.id} className="py-8 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 className="text-xl font-semibold leading-snug sm:text-2xl">{school.school}</h3>
              {school.isInProgress && (
                <span className="inline-flex items-center gap-2 rounded-full bg-navy px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-ivory">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-coral" />
                  In progress
                </span>
              )}
            </div>
            <p className="mt-1 text-base font-medium">{school.degree}</p>
            {(school.division || school.location) && (
              <p className="mt-1 text-sm font-semibold text-tone-body/70">
                {[school.division, school.location].filter(Boolean).join(' · ')}
              </p>
            )}

            {/* Definition list of label/value pairs, e.g. GPA: 3.98. */}
            <dl className="mt-5 grid grid-cols-2 gap-3">
              {school.gpa && <EducationStat value={school.gpa} label="GPA" />}
              {school.graduationDate && (
                <EducationStat
                  value={school.graduationDate}
                  label={school.graduationLabel || 'Graduated'}
                />
              )}
            </dl>

            {school.capstoneProject && (
              <div className="mt-5 rounded-2xl border border-tone-accent/30 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-tone-accent">
                  {school.capstoneProject.label}
                </p>
                <p className="mt-1 font-semibold">{school.capstoneProject.title}</p>
                <a
                  href={`#${getShowcaseAnchor(school.capstoneProject.showcaseId)}`}
                  className="mt-2 inline-block text-sm font-semibold text-tone-accent underline underline-offset-4 hover:no-underline"
                >
                  See the project
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </BentoTile>
  );
}

export default EducationSection;
