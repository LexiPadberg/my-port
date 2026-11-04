/** @type {import('tailwindcss').Config} */

// "Tone" colors change automatically depending on the tile they sit in
// (see the [data-background] rules in src/index.css). Use them for text and buttons
// inside tiles so everything stays readable on ivory, mist, dusty, and navy.
const toneColor = (name) => `rgb(var(--tone-${name}) / <alpha-value>)`;

module.exports = {
  content: ['./src/**/*.{js,jsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        // Site color palette (see CLAUDE.md). Use these names instead of raw hex values.
        ivory: '#F5F2EC', // primary page background
        mist: '#DCE4E8', // secondary backgrounds and section accents
        dusty: '#A4B8C6', // decorative elements (navy text is readable on it; steel is not)
        steel: '#536F85', // buttons and links
        navy: '#293B4A', // headings, body text and contrast elements
        tone: {
          heading: toneColor('heading'),
          body: toneColor('body'),
          accent: toneColor('accent'), // small labels, outlined buttons, links
          'on-accent': toneColor('on-accent'), // text on an accent-colored background
          button: toneColor('button'), // filled button background
          'on-button': toneColor('on-button'), // filled button text
          'button-hover': toneColor('button-hover'),
        },
      },
      fontFamily: {
        heading: ['Fraunces', 'Georgia', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
