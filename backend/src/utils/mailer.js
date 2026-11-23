import nodemailer from 'nodemailer';

const brandBlue = '#0A4D8C';

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getSmtpAuth() {
  return {
    user: (process.env.SMTP_USER || '').trim(),
    // Hostinger app passwords may be pasted with spaces/newlines
    pass: (process.env.SMTP_PASS || '').replace(/\s+/g, ''),
  };
}

function createTransport(overrides = {}) {
  if (!smtpConfigured()) return null;

  const port = Number(overrides.port ?? process.env.SMTP_PORT ?? 465);
  const secure =
    overrides.secure !== undefined
      ? overrides.secure
      : process.env.SMTP_SECURE === 'false'
        ? false
        : port === 465;

  return nodemailer.createTransport({
    host: (process.env.SMTP_HOST || '').trim(),
    port,
    secure,
    auth: getSmtpAuth(),
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
    tls: { minVersion: 'TLSv1.2' },
  });
}

function wrapEmail({ title, bodyHtml }) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f5f7fa;font-family:Segoe UI,Arial,sans-serif;color:#0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f7fa;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
          <tr>
            <td style="background:${brandBlue};padding:20px 28px;">
              <p style="margin:0;color:#ffffff;font-size:18px;font-weight:700;letter-spacing:0.02em;">EWO Technologies</p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <h1 style="margin:0 0 16px;font-size:20px;color:#0f172a;">${escapeHtml(title)}</h1>
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 24px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;">
              EWO Technologies · <a href="https://theewotech.com" style="color:${brandBlue};text-decoration:none;">theewotech.com</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function fieldRow(label, value) {
  if (!value) return '';
  return `<tr>
    <td style="padding:8px 0;width:140px;vertical-align:top;font-size:13px;color:#64748b;font-weight:600;">${escapeHtml(label)}</td>
    <td style="padding:8px 0;font-size:14px;color:#0f172a;">${escapeHtml(value)}</td>
  </tr>`;
}

async function sendWithTransporter(transporter, payload) {
  const from = (process.env.SMTP_FROM || process.env.SMTP_USER || '').trim();
  const adminTo = (process.env.CONTACT_ADMIN_EMAIL || process.env.SMTP_USER || '').trim();
  const { fullName, email, phone, companyName, serviceInterest, message } = payload;

  const userHtml = wrapEmail({
    title: 'We received your message',
    bodyHtml: `
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#334155;">Hi ${escapeHtml(fullName)},</p>
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#334155;">
        Thank you for contacting EWO Technologies. We have received your inquiry and a member of our team will respond within one business day.
      </p>
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#0f172a;">Your message</p>
      <p style="margin:0 0 16px;padding:14px 16px;background:#f8fafc;border-radius:8px;font-size:14px;line-height:1.6;color:#334155;white-space:pre-wrap;">${escapeHtml(message)}</p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#334155;">Best regards,<br/>EWO Technologies Team</p>
    `,
  });

  const adminHtml = wrapEmail({
    title: 'New contact inquiry',
    bodyHtml: `
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
        A new message was submitted on the website contact form.
      </p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:16px;">
        ${fieldRow('Name', fullName)}
        ${fieldRow('Email', email)}
        ${fieldRow('Phone', phone)}
        ${fieldRow('Company', companyName)}
        ${fieldRow('Interest', serviceInterest)}
      </table>
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#0f172a;">Message</p>
      <p style="margin:0;padding:14px 16px;background:#f8fafc;border-radius:8px;font-size:14px;line-height:1.6;color:#334155;white-space:pre-wrap;">${escapeHtml(message)}</p>
    `,
  });

  await Promise.all([
    transporter.sendMail({
      from: `"EWO Technologies" <${from}>`,
      to: email,
      replyTo: from,
      subject: 'Thank you for contacting EWO Technologies',
      html: userHtml,
      text: `Hi ${fullName},\n\nThank you for contacting EWO Technologies. We have received your inquiry and will respond within one business day.\n\nYour message:\n${message}\n\nBest regards,\nEWO Technologies Team`,
    }),
    transporter.sendMail({
      from: `"EWO Website" <${from}>`,
      to: adminTo,
      replyTo: email,
      subject: `New inquiry from ${fullName}`,
      html: adminHtml,
      text: `New contact inquiry\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phone || '-'}\nCompany: ${companyName || '-'}\nInterest: ${serviceInterest || '-'}\n\nMessage:\n${message}`,
    }),
  ]);
}

/** Quick check for Hostinger env + SMTP login (no secrets returned). */
export async function getEmailHealth() {
  const configured = smtpConfigured();
  const status = {
    configured,
    host: process.env.SMTP_HOST || null,
    port: process.env.SMTP_PORT || null,
    user: process.env.SMTP_USER || null,
    admin: process.env.CONTACT_ADMIN_EMAIL || process.env.SMTP_USER || null,
    hasPass: Boolean(process.env.SMTP_PASS),
    verified: false,
    error: null,
  };

  if (!configured) {
    status.error = 'Missing SMTP_HOST, SMTP_USER, or SMTP_PASS environment variables on the server.';
    return status;
  }

  const attempts = [
    { port: Number(process.env.SMTP_PORT || 465), secure: process.env.SMTP_SECURE === 'false' ? false : Number(process.env.SMTP_PORT || 465) === 465 },
    { port: 587, secure: false },
  ];

  let lastError = null;
  for (const attempt of attempts) {
    const transporter = createTransport(attempt);
    try {
      await transporter.verify();
      status.verified = true;
      status.port = String(attempt.port);
      status.error = null;
      return status;
    } catch (err) {
      lastError = err.message;
      console.error(`SMTP verify failed on port ${attempt.port}:`, err.message);
    }
  }

  status.error = lastError;
  return status;
}

export async function sendContactEmails(payload) {
  if (!smtpConfigured()) {
    console.warn('SMTP not configured — skipping contact emails. Set SMTP_HOST, SMTP_USER, SMTP_PASS in Hostinger env.');
    return { sent: false, reason: 'not_configured' };
  }

  const attempts = [
    {
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE === 'false' ? false : Number(process.env.SMTP_PORT || 465) === 465,
    },
    { port: 587, secure: false },
  ];

  let lastError = null;
  for (const attempt of attempts) {
    const transporter = createTransport(attempt);
    try {
      await sendWithTransporter(transporter, payload);
      console.log(`Contact emails sent via SMTP port ${attempt.port}`);
      return { sent: true, port: attempt.port };
    } catch (err) {
      lastError = err.message;
      console.error(`SMTP send failed on port ${attempt.port}:`, err.message);
    }
  }

  return { sent: false, reason: lastError || 'send_failed' };
}

async function sendAppointmentWithTransporter(transporter, payload) {
  const from = (process.env.SMTP_FROM || process.env.SMTP_USER || '').trim();
  const adminTo = (process.env.CONTACT_ADMIN_EMAIL || process.env.SMTP_USER || '').trim();
  const {
    fullName, email, phone, companyName, country, city, service,
    preferredDate, preferredTime, meetingType, projectBudget, projectTimeline,
    projectDescription, attachmentUrl, heardAboutUs,
  } = payload;

  const userHtml = wrapEmail({
    title: 'Appointment request received',
    bodyHtml: `
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#334155;">Dear ${escapeHtml(fullName)},</p>
      <p style="margin:0 0 12px;font-size:15px;line-height:1.6;color:#334155;">
        Thank you! Your appointment request has been received successfully. Our team will contact you within <strong>24 business hours</strong> to confirm your meeting.
      </p>
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#0f172a;">Your request summary</p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:16px;">
        ${fieldRow('Service', service)}
        ${fieldRow('Preferred date', preferredDate)}
        ${fieldRow('Preferred time', preferredTime)}
        ${fieldRow('Meeting type', meetingType)}
      </table>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#334155;">
        If you need to update any details, reply to this email or write to us at ${escapeHtml(from)}.
      </p>
      <p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:#334155;">Warm regards,<br/><strong>EWO Technologies</strong><br/>Consultation Team</p>
    `,
  });

  const adminHtml = wrapEmail({
    title: 'New appointment request',
    bodyHtml: `
      <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#334155;">
        A new free consultation booking was submitted on theewotech.com.
      </p>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:16px;">
        ${fieldRow('Name', fullName)}
        ${fieldRow('Company', companyName)}
        ${fieldRow('Email', email)}
        ${fieldRow('Phone / WhatsApp', phone)}
        ${fieldRow('Country', country)}
        ${fieldRow('City', city)}
        ${fieldRow('Service', service)}
        ${fieldRow('Date', preferredDate)}
        ${fieldRow('Time', preferredTime)}
        ${fieldRow('Meeting', meetingType)}
        ${fieldRow('Budget', projectBudget)}
        ${fieldRow('Timeline', projectTimeline)}
        ${fieldRow('Heard about us', heardAboutUs)}
        ${fieldRow('Attachment', attachmentUrl)}
      </table>
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#0f172a;">Project description</p>
      <p style="margin:0;padding:14px 16px;background:#f8fafc;border-radius:8px;font-size:14px;line-height:1.6;color:#334155;white-space:pre-wrap;">${escapeHtml(projectDescription)}</p>
    `,
  });

  await Promise.all([
    transporter.sendMail({
      from: `"EWO Technologies" <${from}>`,
      to: email,
      replyTo: from,
      subject: 'Your EWO consultation request has been received',
      html: userHtml,
      text: `Dear ${fullName},\n\nThank you! Your appointment request has been received successfully. Our team will contact you within 24 business hours to confirm your meeting.\n\nService: ${service}\nDate: ${preferredDate}\nTime: ${preferredTime}\nMeeting: ${meetingType}\n\nWarm regards,\nEWO Technologies`,
    }),
    transporter.sendMail({
      from: `"EWO Website" <${from}>`,
      to: adminTo,
      replyTo: email,
      subject: `New appointment: ${fullName} — ${service}`,
      html: adminHtml,
      text: `New appointment request\n\nName: ${fullName}\nCompany: ${companyName || '-'}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nDate: ${preferredDate}\nTime: ${preferredTime}\nMeeting: ${meetingType}\n\n${projectDescription}`,
    }),
  ]);
}

export async function sendAppointmentEmails(payload) {
  if (!smtpConfigured()) {
    console.warn('SMTP not configured — skipping appointment emails.');
    return { sent: false, reason: 'not_configured' };
  }

  const attempts = [
    {
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE === 'false' ? false : Number(process.env.SMTP_PORT || 465) === 465,
    },
    { port: 587, secure: false },
  ];

  let lastError = null;
  for (const attempt of attempts) {
    const transporter = createTransport(attempt);
    try {
      await sendAppointmentWithTransporter(transporter, payload);
      console.log(`Appointment emails sent via SMTP port ${attempt.port}`);
      return { sent: true, port: attempt.port };
    } catch (err) {
      lastError = err.message;
      console.error(`Appointment SMTP send failed on port ${attempt.port}:`, err.message);
    }
  }

  return { sent: false, reason: lastError || 'send_failed' };
}
