/**
 * Small pill label for a technology or skill (e.g. "React").
 * Colors adapt to the tile background (tone colors).
 */
function TechTag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-tone-accent/30 px-3 py-1 text-xs font-semibold text-tone-accent">
      {children}
    </span>
  );
}

export default TechTag;
