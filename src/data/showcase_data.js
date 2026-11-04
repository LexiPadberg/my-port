// Projects and awards shown as cards in the Projects & Awards tile.
//
// Fields:
//   id            - unique, lowercase with underscores (also used for in-page links: #project-<id>)
//   type          - "project" or "award"
//   context       - optional short line above the title (e.g. where or why it was made)
//   title, description
//   technologies  - optional list of tags (usually left empty for awards)
//   githubUrl     - optional link to the code
//   images        - optional screenshots as { src, alt }; import files from src/assets/images.
//                   With 2+ images the card shows dots to switch between them.
//                   Leave empty for a placeholder (or a medal icon for awards).

import crusaderForwardingScreenshot from '../assets/images/crusader_forwarding.png';
import crusaderHealthScreenshot from '../assets/images/crusader_health.png';
import crusaderMapScreenshot from '../assets/images/crusader_map.png';
import crusaderSnapScreenshot from '../assets/images/crusader_snap.png';
import cumminsFirstFitScreenshot from '../assets/images/cummins_first_fit.png';
import cumminsLabelMenuScreenshot from '../assets/images/cummins_label_menu.png';
import cumminsLoginScreenshot from '../assets/images/cummins_login.png';
import outstandingGraduatePhoto from '../assets/images/outstanding_graduate_award.jpg';

const showcaseData = [
  {
    id: 'crusader',
    type: 'project',
    context: 'Fathom 4',
    title: 'Crusader',
    // Source: user notes + screenshots (public use approved by Fathom 4 per Alexa).
    // Screenshots are shown unblurred at Alexa's request.
    description:
      'I built the user interface for Crusader, a radar tracking and configuration application ' +
      'that shows radar tracks on a live map. The interface also includes a system health ' +
      'dashboard, a tool to jump the map to any coordinate, and settings for forwarding data to ' +
      'other systems.',
    technologies: ['React', 'MapLibre', 'Drogon (C++)'],
    images: [
      {
        src: crusaderMapScreenshot,
        alt: 'Crusader main map view with navigation tabs for Map, Publications, Radar, and Tracker',
      },
      {
        src: crusaderHealthScreenshot,
        alt: 'Service Health panel showing the status, activity, and errors of each system component',
      },
      {
        src: crusaderForwardingScreenshot,
        alt: 'Forwarding rules panel for sending data in different formats to other systems',
      },
      {
        src: crusaderSnapScreenshot,
        alt: 'Snap To Coordinate dialog for moving the map to a latitude and longitude',
      },
    ],
  },
  {
    id: 'cummins_label_app',
    type: 'project',
    context: 'Senior Capstone · College of Charleston',
    title: 'Cummins Teardown Label Application',
    // Source: user notes + repository README and package.json.
    description:
      'As team lead and developer on a team of four, I helped build a label application for the ' +
      'Teardown section of Cummins Inc. in Charleston, SC. Over four months of rapid development, ' +
      'we turned ideas into a real, working application that combines their three separate ' +
      'label-making programs into one.',
    technologies: ['React', 'Redux', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Bootstrap'],
    githubUrl: 'https://github.com/markcondon1/Cummins-Teardown-Label-Application',
    images: [
      {
        src: cumminsLoginScreenshot,
        alt: 'Login screen of the Cummins Unified Teardown Label Application',
      },
      {
        src: cumminsLabelMenuScreenshot,
        alt: 'Label menu with buttons for First Fit, Teardown Tray, and Reman labels',
      },
      {
        src: cumminsFirstFitScreenshot,
        alt: 'First Fit Teardown screen for scanning reject tickets and printing component labels',
      },
    ],
  },
  {
    id: 'outstanding_cs_student',
    type: 'award',
    context: 'College of Charleston · 2024',
    title: 'Outstanding Student Award in Computer Science',
    // Source: user-provided description of the College of Charleston Outstanding Student Awards.
    description:
      'A merit-based honor from the College of Charleston, given to top-performing students in ' +
      'the Computer Science program. Each spring before graduation, the department selects ' +
      'students who show exceptional academic achievement, outstanding performance, and ' +
      'leadership in their program.',
    images: [
      {
        src: outstandingGraduatePhoto,
        alt:
          'Alexa holding her College of Charleston 2023–2024 Outstanding Graduate certificate ' +
          'in Computer Science',
      },
    ],
  },
];

/** In-page link target for one card, e.g. "project-cummins_label_app". */
export function getShowcaseAnchor(itemId) {
  return `project-${itemId}`;
}

export default showcaseData;
