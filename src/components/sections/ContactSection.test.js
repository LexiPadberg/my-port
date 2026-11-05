import { fireEvent, render, screen } from '@testing-library/react';
import contactLinks from '../../data/contact_data';
import ContactSection from './ContactSection';

test('shows a card for each contact link with the right address', () => {
  render(<ContactSection />);

  contactLinks.forEach((contactLink) => {
    const link = screen.getByRole('link', { name: new RegExp(`^${contactLink.label}:`) });
    expect(link).toHaveAttribute('href', contactLink.href);
    expect(link).toHaveTextContent(contactLink.displayValue);
  });
});

test('email opens the mail app; social links open safely in a new tab', () => {
  render(<ContactSection />);

  const emailLink = screen.getByRole('link', { name: /^Email:/ });
  expect(emailLink.getAttribute('href')).toMatch(/^mailto:/);
  expect(emailLink).not.toHaveAttribute('target');

  ['LinkedIn', 'GitHub'].forEach((label) => {
    const link = screen.getByRole('link', { name: new RegExp(`^${label}:`) });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

test('the Copy button copies the email address and confirms it', async () => {
  const writeText = jest.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });
  render(<ContactSection />);

  fireEvent.click(screen.getByRole('button', { name: 'Copy email address' }));

  expect(writeText).toHaveBeenCalledWith('lexipadberg11@gmail.com');
  expect(await screen.findByText('Copied')).toBeInTheDocument();
});

test('the Copy button shows an error if copying is blocked', async () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  Object.assign(navigator, {
    clipboard: { writeText: jest.fn().mockRejectedValue(new Error('blocked')) },
  });
  render(<ContactSection />);

  fireEvent.click(screen.getByRole('button', { name: 'Copy email address' }));

  expect(await screen.findByText('Copy failed')).toBeInTheDocument();
  errorSpy.mockRestore();
});

test('no placeholder contact details remain', () => {
  contactLinks.forEach((contactLink) => {
    expect(contactLink.href).not.toMatch(/example\.com|your-profile|your-username/);
  });
});
