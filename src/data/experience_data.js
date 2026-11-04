// Work history shown in the Experience tile, newest first.
// Source: résumé (Padberg resume 8.2026.pdf), rewritten in plain language.
// Each paragraph is shown as normal readable text (no bullet points).
//
// Fields:
//   paragraphs    - short paragraphs describing the role
//   keyStat       - optional highlighted number, e.g. a cost saving
//   technologies  - optional skill tags
//   isCompact     - true shows only the title, dates, and first paragraph in a smaller style

const experienceData = [
  {
    id: 'fathom4',
    title: 'Computer Scientist II',
    organization: 'Fathom 4',
    location: 'Charleston, SC',
    dateRange: 'June 2024 – Present',
    paragraphs: [
      'I build software for U.S. Marine Corps users, solving real problems reported by Marines in ' +
        'the fleet and delivering timely solutions for defense and tactical software.',
      'I am the primary developer of Athena, a map-based route analysis tool built around features ' +
        'Marines asked for directly, including a customizable tool that automatically creates ' +
        'PowerPoint presentations from user input. Athena replaces older applications and saves ' +
        '$1.2 million in costs each year.',
      'I also designed simple desktop tools that let Marines change their network settings with a ' +
        'few clicks instead of typing commands, and built a proof of concept showing the TAKX ' +
        'application could connect to sensors and other systems and display incoming messages on ' +
        'screen. I am currently developing a fingerprint scanning service that connects to scanner ' +
        'hardware, processes fingerprints, and sends the results to a database.',
    ],
    keyStat: {
      value: '$1.2M',
      label: 'saved each year by replacing older applications with Athena',
    },
    technologies: ['C#', 'Java', 'TAK ecosystem'],
  },
  {
    id: 'wave_sciences',
    title: 'Junior Developer',
    organization: 'Wave Sciences',
    location: 'Charleston, SC',
    dateRange: 'Jan 2023 – June 2024',
    paragraphs: [
      'I built an Android app that records audio from several selected microphones at the same time ' +
        'and saves each recording separately. I also created a reusable code library that reads ' +
        'common audio file types (FLAC, WAV, AIFF, and AU) and reports details such as the number ' +
        'of channels, sample rate, and bitrate.',
      'Beyond audio, I improved website features using JavaScript and React, built interactive web ' +
        'pages for a better user experience, and wrote and ran tests to make sure the code worked ' +
        'as expected.',
    ],
    technologies: ['Kotlin', 'Android', 'JavaScript', 'React'],
  },
  {
    id: 'cs_tutor',
    title: 'Computer Science Tutor',
    // Organization confirmed by Alexa (not listed on the résumé).
    organization: 'College of Charleston',
    location: 'Charleston, SC',
    dateRange: 'Dec 2022 – May 2023',
    paragraphs: [
      'Taught students in entry-level programming classes in person, helping them understand ' +
        'coding concepts in Java, Python, C, and assembly language.',
    ],
    isCompact: true,
  },
];

export default experienceData;
