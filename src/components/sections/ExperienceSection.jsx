import experienceData from '../../data/experience_data';
import { SECTION_IDS } from '../../data/navigation_data';
import BentoTile from '../ui/BentoTile';
import SectionHeading from '../ui/SectionHeading';
import TimelineItem from '../ui/TimelineItem';

function ExperienceSection({ background = 'ivory', className = '', revealDelayMs = 0 }) {
  const headingId = `${SECTION_IDS.experience}-heading`;

  return (
    <BentoTile
      id={SECTION_IDS.experience}
      labelledBy={headingId}
      background={background}
      revealDelayMs={revealDelayMs}
      className={className}
    >
      <SectionHeading id={headingId} eyebrow="Career" title="Experience" />

      <ol>
        {experienceData.map((job) => (
          <TimelineItem
            key={job.id}
            title={job.title}
            organization={job.organization}
            location={job.location}
            dateRange={job.dateRange}
            paragraphs={job.paragraphs}
            keyStat={job.keyStat}
            technologies={job.technologies}
            isCompact={job.isCompact}
          />
        ))}
      </ol>
    </BentoTile>
  );
}

export default ExperienceSection;
