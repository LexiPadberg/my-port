import { SKILL_LEVELS } from '../../data/skills_data';

/**
 * A 3-segment bar plus the level word (e.g. "Intermediate"), so the level is clear
 * without relying on color. Renders nothing if the level is missing.
 */
function SkillLevelIndicator({ level }) {
  if (!level) return null;

  const filledSegments = SKILL_LEVELS.indexOf(level) + 1;

  if (filledSegments === 0) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `SkillLevelIndicator: unknown level "${level}". Use one of: ${SKILL_LEVELS.join(', ')}.`
      );
    }
    return null;
  }

  return (
    <span className="flex shrink-0 items-center gap-2">
      <span aria-hidden="true" className="flex gap-1">
        {SKILL_LEVELS.map((segmentLevel, index) => (
          <span
            key={segmentLevel}
            className={`h-1.5 w-5 rounded-full ${
              index < filledSegments ? 'bg-coral' : 'bg-tone-accent/20'
            }`}
          />
        ))}
      </span>
      <span className="w-[5.5rem] text-xs font-semibold text-tone-body/75">{level}</span>
    </span>
  );
}

export default SkillLevelIndicator;
