// Loads GoatCounter's counting script so page views show up in your private dashboard.
// No cookies are used, and nothing is displayed on the site itself.

const GOATCOUNTER_SCRIPT_URL = 'https://gc.zgo.at/count.js';
// GoatCounter codes become part of a web address, so only letters, numbers, and hyphens work.
const VALID_CODE_PATTERN = /^[a-z0-9-]+$/i;

/**
 * Adds the GoatCounter script to the page.
 * Does nothing (and returns false) when the code is missing or invalid, or outside production,
 * so local development visits are never counted.
 */
export function loadPageViewCounter(goatCounterCode, environment = process.env.NODE_ENV) {
  if (!goatCounterCode || environment !== 'production') {
    return false;
  }

  if (!VALID_CODE_PATTERN.test(goatCounterCode)) {
    console.warn(
      `Page view counter is off: "${goatCounterCode}" is not a valid GoatCounter code. ` +
        'Use only letters, numbers, and hyphens (see src/data/site_config.js).'
    );
    return false;
  }

  if (document.querySelector('script[data-goatcounter]')) {
    return true; // Already loaded.
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = GOATCOUNTER_SCRIPT_URL;
  script.dataset.goatcounter = `https://${goatCounterCode}.goatcounter.com/count`;
  script.onerror = () => {
    // Common when a visitor uses an ad blocker; the site works normally either way.
    console.warn('Page view counter could not load (it may be blocked by an ad blocker).');
  };
  document.head.appendChild(script);
  return true;
}
