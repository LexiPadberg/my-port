// Personal details shown in the intro, About, nav bar, and footer.
// Edit the text here; the layout updates automatically.
import headshotPhoto from '../assets/images/headshot.jpg';

const profileData = {
  fullName: 'Alexa Padberg',
  initials: 'AP', // shown if the photo can't load
  headline: 'Software Engineer',
  tagline: 'Building Impactful Software Solutions',
  valueStatement:
    "I'm a software developer with experience building applications, developing backend services, " +
    'and working across the full software development lifecycle. I enjoy solving complex problems, ' +
    'learning new technologies, and turning ideas into reliable, practical software.',
  bio:
    'I graduated from the College of Charleston with a degree in Computer Science and have ' +
    'professional experience working on software applications, audio processing systems, and web ' +
    'technologies. My experience spans Python, C#, JavaScript, React, Node.js, and application ' +
    "development. I'm passionate about continuous learning and building technology that makes a " +
    'meaningful impact.',
  photoSrc: headshotPhoto,
  // File lives in public/resume.pdf. Set to null to hide the download button.
  resumeHref: `${process.env.PUBLIC_URL}/resume.pdf`,
  resumeDownloadName: 'Alexa_Padberg_Resume.pdf',
};

export default profileData;
