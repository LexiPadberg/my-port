import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import CertificationsSection from './components/sections/CertificationsSection';
import ContactSection from './components/sections/ContactSection';
import EducationSection from './components/sections/EducationSection';
import ExperienceSection from './components/sections/ExperienceSection';
import HeroSection from './components/sections/HeroSection';
import ShowcaseSection from './components/sections/ShowcaseSection';
import SkillsSection from './components/sections/SkillsSection';

const MAIN_CONTENT_ID = 'main-content';

/*
 * Bento grid layout: one column on phones, 6 columns on tablets, 12 on desktop.
 *
 * Desktop:
 *   [ Intro ·················· ][ Photo ····· ]
 *   [ About me ······························· ]
 *   [ Experience ········· ][ Education ······ ]   ← right column: Education keeps its
 *   [                      ][ Certifications · ]     natural height; Certifications fills
 *   [ Skills ································· ]     the rest, so neither has empty space.
 *   [ Projects & Awards (navy feature) ······· ]
 *   [ Contact ································ ]
 *
 * Neighboring tiles use different background colors.
 */
const TILE_LAYOUT = {
  hero: 'md:col-span-6 lg:col-span-8',
  photo: 'md:col-span-2 lg:col-span-4',
  about: 'md:col-span-4 lg:col-span-12',
  experience: 'md:col-span-6 lg:col-span-7',
  rightColumn: 'flex flex-col gap-4 md:col-span-6 md:gap-5 lg:col-span-5',
  certifications: 'flex-1',
  skills: 'md:col-span-6 lg:col-span-12',
  projects: 'md:col-span-6 lg:col-span-12',
  contact: 'md:col-span-6 lg:col-span-12',
};

function App() {
  return (
    <>
      {/* Hidden until focused with the keyboard; lets keyboard users jump past the navigation. */}
      <a
        href={`#${MAIN_CONTENT_ID}`}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to main content
      </a>

      <NavBar />

      <main
        id={MAIN_CONTENT_ID}
        className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-4 py-6 sm:px-6 md:grid-cols-6 md:gap-5 lg:grid-cols-12 lg:px-8 lg:py-8"
      >
        <HeroSection
          className={TILE_LAYOUT.hero}
          photoClassName={TILE_LAYOUT.photo}
          aboutClassName={TILE_LAYOUT.about}
        />
        <ExperienceSection background="ivory" className={TILE_LAYOUT.experience} />
        <div className={TILE_LAYOUT.rightColumn}>
          <EducationSection background="mist" revealDelayMs={100} />
          <CertificationsSection
            background="dusty"
            className={TILE_LAYOUT.certifications}
            revealDelayMs={200}
          />
        </div>
        <SkillsSection background="mist" className={TILE_LAYOUT.skills} />
        <ShowcaseSection background="navy" className={TILE_LAYOUT.projects} />
        <ContactSection background="mist" className={TILE_LAYOUT.contact} />
      </main>

      <Footer />
    </>
  );
}

export default App;
