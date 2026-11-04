import { SECTION_IDS } from '../../data/navigation_data';
import showcaseData, { getShowcaseAnchor } from '../../data/showcase_data';
import BentoTile from '../ui/BentoTile';
import SectionHeading from '../ui/SectionHeading';
import ShowcaseCard from '../ui/ShowcaseCard';

// The dark navy feature tile with a grid of project and award cards.
function ShowcaseSection({ background = 'navy', className = '', revealDelayMs = 0 }) {
  const headingId = `${SECTION_IDS.projects}-heading`;

  return (
    <BentoTile
      id={SECTION_IDS.projects}
      labelledBy={headingId}
      background={background}
      revealDelayMs={revealDelayMs}
      className={className}
    >
      {/* Soft glow in the corner of the dark tile (decorative only). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-steel/40 blur-3xl"
      />
      <div className="relative">
        <SectionHeading id={headingId} eyebrow="Selected work" title="Projects & Awards" />

        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {showcaseData.map((item) => (
            <li key={item.id}>
              <ShowcaseCard
                id={getShowcaseAnchor(item.id)}
                type={item.type}
                context={item.context}
                title={item.title}
                description={item.description}
                technologies={item.technologies}
                githubUrl={item.githubUrl}
                images={item.images}
              />
            </li>
          ))}
        </ul>
      </div>
    </BentoTile>
  );
}

export default ShowcaseSection;
