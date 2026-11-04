import { SECTION_IDS } from '../../data/navigation_data';
import { skillCategories } from '../../data/skills_data';
import BentoTile from '../ui/BentoTile';
import SectionHeading from '../ui/SectionHeading';
import SkillLevelIndicator from '../ui/SkillLevelIndicator';

// Full-width tile with one column per skill category.
function SkillsSection({ background = 'mist', className = '', revealDelayMs = 0 }) {
  const headingId = `${SECTION_IDS.skills}-heading`;

  return (
    <BentoTile
      id={SECTION_IDS.skills}
      labelledBy={headingId}
      background={background}
      revealDelayMs={revealDelayMs}
      className={className}
    >
      <SectionHeading id={headingId} eyebrow="Toolkit" title="Skills" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {skillCategories.map((category) => (
          <section
            key={category.id}
            aria-labelledby={`skills-${category.id}`}
            className="rounded-2xl bg-ivory/70 p-5 sm:p-6"
          >
            <h3 id={`skills-${category.id}`} className="text-lg font-semibold">
              {category.title}
            </h3>
            <ul className="mt-4 divide-y divide-navy/10">
              {category.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0"
                >
                  <span className="text-sm font-semibold sm:text-base">{skill.name}</span>
                  <SkillLevelIndicator level={skill.level} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </BentoTile>
  );
}

export default SkillsSection;
