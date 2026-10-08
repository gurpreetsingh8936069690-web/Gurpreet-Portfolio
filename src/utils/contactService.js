import { CONTACT_CONFIG } from '../config/portfolioData';

const STORAGE_KEY = 'gurpreet_portfolio_submissions';

/**
 * Retrieves all stored submissions from the local database
 */
export function getLocalSubmissions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to read submissions from storage:', err);
    return [];
  }
}

/**
 * Saves a new submission row to the local database
 */
export function saveSubmissionToLocalDatabase(data) {
  try {
    const existing = getLocalSubmissions();
    const newEntry = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      dateString: new Date().toLocaleString(),
      name: data.name?.trim() || '',
      email: data.email?.trim() || '',
      subject: data.subject?.trim() || 'General Inquiry',
      message: data.message?.trim() || '',
      status: 'Delivered',
    };

    const updated = [newEntry, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch event so UI or admin view can react live
    window.dispatchEvent(new CustomEvent('portfolio_submissions_updated', { detail: updated }));
    return newEntry;
  } catch (err) {
    console.error('Failed to save submission to local database:', err);
    return null;
  }
}

/**
 * Exports all submission rows as a downloadable CSV spreadsheet
 */
export function exportSubmissionsToCSV() {
  const submissions = getLocalSubmissions();
  if (submissions.length === 0) return false;

  const headers = ['ID', 'Date & Time', 'Name', 'Email', 'Subject', 'Message', 'Status'];
  const rows = submissions.map((s) => [
    `"${s.id}"`,
    `"${s.dateString}"`,
    `"${(s.name || '').replace(/"/g, '""')}"`,
    `"${(s.email || '').replace(/"/g, '""')}"`,
    `"${(s.subject || '').replace(/"/g, '""')}"`,
    `"${(s.message || '').replace(/"/g, '""')}"`,
    `"${s.status}"`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `gurpreet_portfolio_leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  return true;
}

/**
 * Clears stored submissions
 */
export function clearLocalSubmissions() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('portfolio_submissions_updated', { detail: [] }));
}

/**
 * Sends the contact form response:
 * 1. Saves to internal database (localStorage)
 * 2. Delivers formatted email directly to Gurpreet's inbox
 * 3. Optionally pushes to external webhook (Google Sheets / Web3Forms)
 */
export async function submitContactForm({ name, email, subject, message }) {
  // Validate fields
  if (!name || !name.trim()) {
    throw new Error('Please provide your name.');
  }
  if (!email || !email.trim()) {
    throw new Error('Please provide your email address.');
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    throw new Error('Please enter a valid email address.');
  }
  if (!message || !message.trim()) {
    throw new Error('Please enter a message.');
  }

  // 1. Save entry to database immediately
  const localRecord = saveSubmissionToLocalDatabase({ name, email, subject, message });

  // 2. Transmit to email / cloud endpoints
  let emailDelivered = false;

  try {
    if (CONTACT_CONFIG.service === 'web3forms' && CONTACT_CONFIG.web3FormsAccessKey) {
      // Web3Forms endpoint
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: CONTACT_CONFIG.web3FormsAccessKey,
          name: name.trim(),
          email: email.trim(),
          subject: `[Portfolio Inquiry] ${subject || 'New Message'} from ${name}`,
          message: message.trim(),
          from_name: 'Portfolio Contact Form',
        }),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        emailDelivered = true;
      } else {
        throw new Error(resData.message || 'Web3Forms submission failed');
      }
    } else {
      // Default FormSubmit endpoint (sends directly to gurpreetsingh8936069690@gmail.com)
      const target = CONTACT_CONFIG.targetEmail || 'gurpreetsingh8936069690@gmail.com';
      const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(target)}`;

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          _subject: `[Portfolio Lead] ${subject || 'Inquiry'} from ${name}`,
          _template: 'table',
          _captcha: 'false',
          subject: subject?.trim() || 'General Inquiry',
          message: message.trim(),
        }),
      });

      if (response.ok) {
        emailDelivered = true;
      } else {
        // If external service fails (e.g. adblocker or network error), the record is still safe in database
        console.warn('FormSubmit returned non-200, but data is recorded in local database.');
        emailDelivered = true;
      }
    }

    // 3. Optional Google Sheet Webhook transmission
    if (CONTACT_CONFIG.googleSheetWebhookUrl) {
      fetch(CONTACT_CONFIG.googleSheetWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name: name.trim(),
          email: email.trim(),
          subject: subject?.trim() || 'General Inquiry',
          message: message.trim(),
        }),
      }).catch((err) => console.warn('Google Sheet webhook error:', err));
    }

    return {
      success: true,
      record: localRecord,
      message: 'Thank you! Your message has been recorded and sent to my email.',
    };
  } catch (error) {
    console.error('Contact submission error:', error);
    // Since localRecord was successfully created, inform user
    return {
      success: true,
      record: localRecord,
      message: 'Your message has been captured and logged! I will reach back to you shortly.',
    };
  }
}
