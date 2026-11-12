// Auto-reply to every verified Netlify Forms submission, sent from hello@lynexa.co.
// Netlify calls this function automatically (event-triggered by its name) after a submission passes spam checks.
//
// Switch it on in Netlify > Site configuration > Environment variables (scope: Functions):
//   SMTP_PASS  the password of the hello@lynexa.co mailbox (Namecheap Private Email)   required
//   SMTP_USER  defaults to hello@lynexa.co
//   SMTP_HOST  defaults to mail.privateemail.com      SMTP_PORT  defaults to 465 (SSL)
// Until SMTP_PASS is set, the function does nothing and the form still works as before.
import nodemailer from 'nodemailer';

const BOOKING = 'https://cal.com/kelvin-ekuhoho-0qvxb6';
const WHATSAPP = 'https://wa.me/2347038271812';

type Copy = { subject: string; lines: string[] };

const COPY: Record<string, (d: Record<string, string>) => Copy> = {
  'project-enquiry': (d) => ({
    subject: 'We received your project brief',
    lines: [
      `Thank you for telling us about your project${d.company ? ` at ${d.company}` : ''}. Your brief is with the team now.`,
      'What happens next: we read it carefully and reply within 24 hours on working days, usually with a few questions and a suggested time to talk.',
      `If you would rather talk first, you can book a 20-minute intro call here: ${BOOKING}`
    ]
  }),
  'general-message': () => ({
    subject: 'Thanks for your message',
    lines: [
      'Thank you for getting in touch. Your message has reached the team.',
      'A person, not a bot, will reply within 24 hours on working days.',
      `For anything urgent you can also reach us on WhatsApp: ${WHATSAPP}`
    ]
  }),
  'venture-application': () => ({
    subject: 'We received your startup idea',
    lines: [
      'Thank you for sharing your startup idea with Lynexa. We treat every submission as confidential.',
      'We will reply within 24 hours on working days to confirm we have read it, and with next steps if there is a fit. We are happy to sign a mutual NDA before deeper conversations.',
      `You can also book a 20-minute call to talk it through: ${BOOKING}`
    ]
  }),
  testimonial: () => ({
    subject: 'Thank you for your feedback',
    lines: [
      'Thank you for taking the time to share your experience of working with us. It means a lot to a small team.',
      'If you gave permission to publish it, we will email you the exact wording to approve before anything goes live. Nothing is published without your approval.'
    ]
  })
};

const esc = (t: string) => t.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));
const linkify = (t: string) => esc(t).replace(/(https:\/\/[^\s]+)/g, '<a href="$1" style="color:#5a35fe">$1</a>');

export default async (req: Request) => {
  const pass = Netlify.env.get('SMTP_PASS');
  if (!pass) return new Response('Auto-reply not configured', { status: 200 });

  let payload: any;
  try { payload = (await req.json()).payload; } catch { return new Response('Bad payload', { status: 200 }); }
  const form: string = payload?.form_name || '';
  const data: Record<string, string> = payload?.data || {};
  const to = String(data.email || payload?.email || '').trim();
  const make = COPY[form];
  if (!make || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to) || to.toLowerCase().endsWith('@lynexa.co')) {
    return new Response('Skipped', { status: 200 });
  }

  const name = String(data.name || '').trim().split(/\s+/)[0] || '';
  const { subject, lines } = make(data);
  const greeting = name ? `Hi ${name},` : 'Hello,';
  const sign = ['Kelvin Ekuhoho and the Lynexa team', 'Lynexa Innovations Limited, Lagos', 'lynexa.co'];
  const text = [greeting, '', ...lines.flatMap((l) => [l, '']), sign.join('\n'), '', 'This is an automatic confirmation. Just reply to this email to reach us.'].join('\n');
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#18171c;max-width:560px">
    <p>${esc(greeting)}</p>${lines.map((l) => `<p>${linkify(l)}</p>`).join('')}
    <p style="margin-top:24px">${sign.map(esc).join('<br>')}</p>
    <p style="color:#6b6872;font-size:13px;margin-top:24px">This is an automatic confirmation. Just reply to this email to reach us.</p></div>`;

  const user = Netlify.env.get('SMTP_USER') || 'hello@lynexa.co';
  const transporter = nodemailer.createTransport({
    host: Netlify.env.get('SMTP_HOST') || 'mail.privateemail.com',
    port: Number(Netlify.env.get('SMTP_PORT') || 465),
    secure: Number(Netlify.env.get('SMTP_PORT') || 465) === 465,
    auth: { user, pass }
  });
  try {
    await transporter.sendMail({ from: `Lynexa <${user}>`, replyTo: user, to, subject, text, html });
    return new Response('Sent', { status: 200 });
  } catch (err) {
    console.error('Auto-reply failed:', err instanceof Error ? err.message : err);
    return new Response('Send failed', { status: 200 });
  }
};
