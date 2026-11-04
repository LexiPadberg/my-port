import { SECTION_IDS } from '../../data/navigation_data';
import profileData from '../../data/profile_data';
import BentoTile from '../ui/BentoTile';
import ButtonLink from '../ui/ButtonLink';
import ImageWithFallback from '../ui/ImageWithFallback';
import SectionHeading from '../ui/SectionHeading';

/**
 * The opening of the page: an intro tile, a tall photo tile, and an "About me" tile.
 * Grid placement for each tile comes from App.jsx.
 */
function HeroSection({ className = '', photoClassName = '', aboutClassName = '' }) {
  const headingId = `${SECTION_IDS.home}-heading`;
  const aboutHeadingId = 'about-heading';
  const firstName = profileData.fullName.split(' ')[0];

  return (
    <>
      {/* Intro */}
      <BentoTile
        id={SECTION_IDS.home}
        labelledBy={headingId}
        background="ivory"
        className={`flex min-h-[22rem] flex-col justify-end lg:min-h-[26rem] ${className}`}
      >
        {/* Soft blurred shapes for depth (decorative only). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-dusty/50 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-mist blur-3xl"
        />

        <div className="relative">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-dusty/70 bg-ivory/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-tone-accent">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-steel" />
            {profileData.headline}
          </p>

          <h1 id={headingId} className="text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
            {profileData.fullName}
          </h1>

          <p className="mt-4 font-heading text-xl italic text-tone-accent sm:text-2xl">
            {profileData.tagline}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-tone-body/80 sm:text-lg">
            {profileData.valueStatement}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={`#${SECTION_IDS.projects}`}>View my work</ButtonLink>
            {profileData.resumeHref && (
              <ButtonLink
                href={profileData.resumeHref}
                variant="secondary"
                download={profileData.resumeDownloadName}
              >
                Download résumé
              </ButtonLink>
            )}
          </div>
        </div>
      </BentoTile>

      {/* Photo */}
      <BentoTile
        as="div"
        background="dusty"
        isFlush
        revealDelayMs={120}
        className={`aspect-square lg:aspect-auto ${photoClassName}`}
      >
        <ImageWithFallback
          src={profileData.photoSrc}
          alt={`Portrait of ${profileData.fullName}`}
          loading="eager"
          fallbackLabel={profileData.initials}
          fallbackClassName="bg-dusty text-navy"
          className="absolute inset-0 h-full w-full object-center"
        />
      </BentoTile>

      {/* About me */}
      <BentoTile
        labelledBy={aboutHeadingId}
        background="mist"
        revealDelayMs={60}
        className={aboutClassName}
      >
        <SectionHeading id={aboutHeadingId} eyebrow="About me" title={`Hi, I'm ${firstName}.`} />
        <p className="text-base leading-relaxed sm:text-lg">{profileData.bio}</p>
      </BentoTile>
    </>
  );
}

export default HeroSection;
