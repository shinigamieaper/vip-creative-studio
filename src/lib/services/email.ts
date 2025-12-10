import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST;
const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const fromEmail = process.env.SMTP_FROM_EMAIL;
const contactRecipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;

const transporter =
  smtpHost && smtpPort && smtpUser && smtpPass
    ? nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })
    : null;

type SendEmailParams = {
  to: string | string[];
  subject: string;
  html: string;
};

async function sendEmail(params: SendEmailParams) {
  if (!transporter) {
    throw new Error("Email service is not configured. Missing SMTP settings.");
  }

  const fromAddress = fromEmail || smtpUser;

  if (!fromAddress) {
    throw new Error("SMTP_FROM_EMAIL or SMTP_USER must be configured.");
  }

  await transporter.sendMail({
    from: fromAddress,
    to: params.to,
    subject: params.subject,
    html: params.html,
  });
}

export async function sendContactNotificationEmail(options: {
  name: string;
  email: string;
  company?: string;
  message: string;
  source?: string;
}) {
  if (!contactRecipientEmail) {
    throw new Error("CONTACT_RECIPIENT_EMAIL is not configured.");
  }

  const { name, email, company, message, source } = options;

  const subject = `New contact form submission from ${name}`;
  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
    ${source ? `<p><strong>Source:</strong> ${source}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${message.replace(/\n/g, "<br />")}</p>
  `;

  await sendEmail({
    to: contactRecipientEmail,
    subject,
    html,
  });
}

export async function sendContactConfirmationEmail(options: {
  name: string;
  email: string;
}) {
  const { name, email } = options;

  const subject = "We received your message  VIP Creative Studio";
  const html = `
    <h2>Thank you for reaching out, ${name || "there"}!</h2>
    <p>We've received your message and our team will get back to you within one business day.</p>
    ${
      contactRecipientEmail
        ? `<p>If this is urgent, you can also reach us at <a href="mailto:${contactRecipientEmail}">${contactRecipientEmail}</a>.</p>`
        : ""
    }
    <p> VIP Creative Studio</p>
  `;

  await sendEmail({
    to: email,
    subject,
    html,
  });
}

export async function sendResourceLeadEmails(options: {
  email: string;
  companyName: string;
  resourceTitle: string;
  resourceType: "download" | "webinar";
  downloadUrl?: string;
  webinarUrl?: string;
}) {
  const { email, companyName, resourceTitle, resourceType, downloadUrl, webinarUrl } =
    options;

  if (!contactRecipientEmail) {
    throw new Error("CONTACT_RECIPIENT_EMAIL is not configured.");
  }

  const isDownload = resourceType === "download";

  const internalSubject = `New ${isDownload ? "download" : "webinar"} lead: ${resourceTitle}`;
  const internalHtml = `
    <h2>New resource lead captured</h2>
    <p><strong>Resource:</strong> ${resourceTitle}</p>
    <p><strong>Type:</strong> ${resourceType}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Company:</strong> ${companyName}</p>
    ${downloadUrl ? `<p><strong>Download URL:</strong> ${downloadUrl}</p>` : ""}
    ${webinarUrl ? `<p><strong>Webinar URL:</strong> ${webinarUrl}</p>` : ""}
  `;

  await sendEmail({
    to: contactRecipientEmail,
    subject: internalSubject,
    html: internalHtml,
  });

  const leadSubject = isDownload
    ? `Your download: ${resourceTitle}`
    : `You're registered: ${resourceTitle}`;

  const leadHtml = isDownload
    ? `
      <h2>Here's your download</h2>
      <p>Thanks for your interest, ${companyName}.</p>
      <p>You can access <strong>${resourceTitle}</strong> using the link below:</p>
      ${
        downloadUrl
          ? `<p><a href="${downloadUrl}">Download your resource</a></p>`
          : "<p>(The download link will be shared with you separately.)</p>"
      }
      <p> VIP Creative Studio</p>
    `
    : `
      <h2>You're registered for ${resourceTitle}</h2>
      <p>Thanks for saving your seat, ${companyName}.</p>
      ${
        webinarUrl
          ? `<p>You can join or watch using this link: <a href="${webinarUrl}">${webinarUrl}</a></p>`
          : "<p>The webinar details will be shared with you separately.</p>"
      }
      <p> VIP Creative Studio</p>
    `;

  await sendEmail({
    to: email,
    subject: leadSubject,
    html: leadHtml,
  });
}
