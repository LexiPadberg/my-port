import { useEffect, useState } from 'react';
import contactLinks from '../../data/contact_data';
import { SECTION_IDS } from '../../data/navigation_data';
import BentoTile from '../ui/BentoTile';
import { CheckIcon, CopyIcon, ICONS_BY_NAME } from '../ui/icons';
import SectionHeading from '../ui/SectionHeading';

const COPY_FEEDBACK_MS = 2000;

/** Copies text to the clipboard, with a fallback for browsers without the Clipboard API. */
async function copyTextToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  const didCopy = document.execCommand('copy');
  document.body.removeChild(textArea);

  if (!didCopy) {
    throw new Error('The browser blocked copying to the clipboard.');
  }
}

/** Small copy button that shows "Copied" (or an error) for a moment after clicking. */
function CopyButton({ value, label }) {
  const [copyStatus, setCopyStatus] = useState('idle'); // 'idle' | 'copied' | 'error'

  useEffect(() => {
    if (copyStatus === 'idle') return undefined;
    const timer = setTimeout(() => setCopyStatus('idle'), COPY_FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [copyStatus]);

  const handleCopy = async () => {
    try {
      await copyTextToClipboard(value);
      setCopyStatus('copied');
    } catch (error) {
      console.error(`Could not copy ${label.toLowerCase()} to the clipboard:`, error);
      setCopyStatus('error');
    }
  };

  const statusText = { idle: '', copied: 'Copied', error: 'Copy failed' }[copyStatus];

  return (
    <>
      {/* Small icon button in the card's top-right corner, so the address keeps its full width. */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${label.toLowerCase()} address`}
        title={`Copy ${label.toLowerCase()} address`}
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg border border-navy/20 bg-ivory text-navy transition-colors hover:bg-navy hover:text-ivory"
      >
        {copyStatus === 'copied' ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
      </button>
      {statusText && (
        <span
          aria-hidden="true"
          className="absolute right-12 top-4 rounded-md bg-navy px-2 py-0.5 text-xs font-bold text-ivory"
        >
          {statusText}
        </span>
      )}
      {/* Announces the result to screen reader users. */}
      <span className="sr-only" aria-live="polite">
        {copyStatus === 'copied' && `${label} address copied to clipboard.`}
        {copyStatus === 'error' && `Could not copy the ${label.toLowerCase()} address.`}
      </span>
    </>
  );
}

/**
 * One contact card: icon, label (e.g. "Email"), and the address or profile.
 * If `copyValue` is set, a Copy button sits beside the link (not inside it, which isn't valid HTML).
 */
function ContactCard({ label, icon, href, displayValue, isExternal, copyValue }) {
  const Icon = ICONS_BY_NAME[icon];
  const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  if (!Icon && process.env.NODE_ENV !== 'production') {
    console.warn(`ContactSection: no icon named "${icon}" for "${label}".`);
  }

  return (
    <div
      data-background="ivory"
      className={[
        'group/contact relative h-full rounded-2xl bg-ivory shadow-md shadow-navy/10',
        'transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/15',
        'motion-reduce:transition-none motion-reduce:hover:translate-y-0',
      ].join(' ')}
    >
      <a
        href={href}
        aria-label={`${label}: ${displayValue}${isExternal ? ' (opens in a new tab)' : ''}`}
        className="flex h-full items-center gap-4 rounded-2xl p-5"
        {...externalProps}
      >
        {Icon && (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-ivory transition-colors group-hover/contact:bg-steel">
            <Icon className="h-5 w-5" />
          </span>
        )}
        <span className="min-w-0">
          <span className="block text-xs font-bold uppercase tracking-[0.15em] text-tone-accent">
            {label}
          </span>
          {/* Lets long addresses wrap instead of overflowing on narrow screens. */}
          <span className="mt-1 block font-semibold text-navy [overflow-wrap:anywhere]">
            {displayValue}
          </span>
        </span>
      </a>
      {copyValue && <CopyButton value={copyValue} label={label} />}
    </div>
  );
}

function ContactSection({ background = 'mist', className = '', revealDelayMs = 0 }) {
  const headingId = `${SECTION_IDS.contact}-heading`;

  return (
    <BentoTile
      id={SECTION_IDS.contact}
      labelledBy={headingId}
      background={background}
      revealDelayMs={revealDelayMs}
      className={className}
    >
      {/* Soft decorative shape (decorative only). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-coral/30 blur-3xl"
      />
      <div className="relative">
        <SectionHeading
          id={headingId}
          eyebrow="Say hello"
          title="Let's connect"
          subtitle="Want to talk about an opportunity or a project? Reach out through any of the links below."
        />

        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {contactLinks.map((contactLink) => (
            <li key={contactLink.label}>
              <ContactCard {...contactLink} />
            </li>
          ))}
        </ul>
      </div>
    </BentoTile>
  );
}

export default ContactSection;
