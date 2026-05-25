import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { first_name, last_name, company, email, phone, partnership_interest } = req.body;

  if (!first_name || !last_name || !email || !partnership_interest) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const htmlBody = `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #fff;">
  <h2 style="color: #111; margin-bottom: 4px;">New Sponsorship Inquiry</h2>
  <p style="color: #888; margin-top: 0; font-size: 14px;">Touch Grass Music Fest &mdash; ${new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}</p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
  <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
    <tr><td style="padding: 8px 0; color: #999; width: 120px; vertical-align: top;">Name</td><td style="padding: 8px 0; font-weight: 600;">${first_name} ${last_name}</td></tr>
    <tr><td style="padding: 8px 0; color: #999; vertical-align: top;">Company</td><td style="padding: 8px 0;">${company || '&mdash;'}</td></tr>
    <tr><td style="padding: 8px 0; color: #999; vertical-align: top;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #111;">${email}</a></td></tr>
    <tr><td style="padding: 8px 0; color: #999; vertical-align: top;">Phone</td><td style="padding: 8px 0;">${phone || '&mdash;'}</td></tr>
  </table>
  <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
  <p style="color: #999; font-size: 13px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: .05em;">Partnership Interest</p>
  <p style="font-size: 15px; line-height: 1.7; color: #111; white-space: pre-wrap;">${partnership_interest}</p>
</div>`.trim();

  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Touch Grass Music Fest <partnerships@touchgrassmusicfest.com>',
      to: ['partnerships@touchgrassmusicfest.com'],
      reply_to: email,
      subject: `Sponsorship Inquiry — ${first_name} ${last_name}${company ? ` (${company})` : ''}`,
      text: `New Sponsorship Inquiry\n\nName: ${first_name} ${last_name}\nCompany: ${company || '—'}\nEmail: ${email}\nPhone: ${phone || '—'}\n\nPartnership Interest:\n${partnership_interest}`,
      html: htmlBody,
    }),
  });

  if (!emailRes.ok) {
    console.error('Resend error:', await emailRes.text());
    return res.status(500).json({ error: 'Failed to send email' });
  }

  return res.status(200).json({ success: true });
}
