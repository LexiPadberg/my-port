// Education shown in the Education tile, newest first.
// Sources: résumé (Padberg resume 8.2026.pdf) and user-provided details (Purdue).
// Certifications are shown with Skills instead (see iteration 8).
//
// Fields:
//   isInProgress     - true shows an "In progress" badge
//   graduationDate   - shown as a highlight box, labeled by `graduationLabel`
//   division, location - optional line under the degree (e.g. "Mitch Daniels School of Business")
//   gpa, capstoneProject - optional

const educationData = [
  {
    id: 'purdue',
    school: 'Purdue University',
    division: 'Mitch Daniels School of Business',
    degree: 'Master of Business and Technology (MBT)',
    isInProgress: true,
    graduationDate: 'Fall 2028',
    graduationLabel: 'Expected graduation',
  },
  {
    id: 'college_of_charleston',
    school: 'College of Charleston',
    location: 'Charleston, SC',
    degree: 'Bachelor of Arts in Computer Science',
    graduationDate: 'May 2024',
    graduationLabel: 'Graduated',
    gpa: '3.98',
    // Short note linking to the full project card in Projects & Awards.
    // `showcaseId` must match an `id` in src/data/showcase_data.js. Set to null to hide.
    capstoneProject: {
      label: 'Senior capstone',
      title: 'Cummins Teardown Label Application',
      showcaseId: 'cummins_label_app',
    },
  },
];

export default educationData;
