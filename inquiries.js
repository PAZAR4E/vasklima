import nodemailer from 'nodemailer';
import supabase from './db-client.js';

const TO_EMAIL = 'chafi_89@abv.bg';
const SUBJECT = 'запитване';
const FROM_EMAIL = 'vasklima@outlook.com';
const SMTP_HOST = 'smtp-relay.brevo.com';
const SMTP_PORT = 587;
const SMTP_LOGIN = 'b6aea4001@smtp-brevo.com';

function cleanEnv(...names) {
  for (const name of names) {
    const raw = process.env[name];
    if (raw) return String(raw).trim().replace(/^['"]|['"]$/g, '');
  }
  return '';
}

function inquiryHtml(row) {
  const kind = row.type === 'quote' ? 'Оферта' : 'Контакт';
  return `
    <div style="font-family:Arial,sans-serif;font-size:15px;color:#111;line-height:1.55">
      <h2 style="margin:0 0 16px">${SUBJECT}</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
        <tr><td><strong>Тип</strong></td><td>${kind}</td></tr>
        <tr><td><strong>Име</strong></td><td>${escapeHtml(row.name)}</td></tr>
        <tr><td><strong>Телефон</strong></td><td>${escapeHtml(row.phone)}</td></tr>
        <tr><td><strong>Имейл</strong></td><td>${escapeHtml(row.email || '—')}</td></tr>
        <tr><td><strong>Град</strong></td><td>${escapeHtml(row.city || '—')}</td></tr>
        <tr><td><strong>Продукт</strong></td><td>${escapeHtml(row.product_name || '—')}</td></tr>
        <tr><td valign="top"><strong>Съобщение</strong></td><td>${escapeHtml(row.message || '—').replace(/\n/g, '<br>')}</td></tr>
      </table>
      <p style="color:#666;font-size:12px;margin-top:20px">ВАС КЛИМА · Пловдив, ул. Йосиф Шнитер 10 · 0877 020 320</p>
    </div>
  `;
}

function inquiryText(row) {
  const kind = row.type === 'quote' ? 'Оферта' : 'Контакт';
  return [
    SUBJECT,
    '',
    `Тип: ${kind}`,
    `Име: ${row.name}`,
    `Телефон: ${row.phone}`,
    `Имейл: ${row.email || '—'}`,
    `Град: ${row.city || '—'}`,
    `Продукт: ${row.product_name || '—'}`,
    `Съобщение: ${row.message || '—'}`,
    '',
    'ВАС КЛИМА · Пловдив, ул. Йосиф Шнитер 10 · 0877 020 320',
  ].join('\n');
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function humanizeError(err) {
  const msg = String(err || '');
  if (/Invalid login|EAUTH|535|Username and Password not accepted/i.test(msg)) {
    return 'Brevo отхвърли паролата. В Secrets сложете SMTP ключа (xsmtpsib-...) като BREVO_SMPT_KEY.';
  }
  if (/sender|unrecognised|unrecognized|not verified|not authorised|not authorized|does not exist/i.test(msg)) {
    return 'vasklima@outlook.com трябва да е Verified в Brevo → Senders.';
  }
  if (/timeout|ETIMEDOUT|ECONN|ENOTFOUND/i.test(msg)) {
    return 'Връзката към smtp-relay.brevo.com:587 се прекъсна.';
  }
  return msg.slice(0, 280);
}

async function sendInquiryEmail(row) {
  const pass = cleanEnv('BREVO_SMTP_KEY', 'BREVO_SMPT_KEY');
  const user = cleanEnv('BREVO_SMTP_LOGIN', 'BREVO_SMPT_LOGIN') || SMTP_LOGIN;
  const fromEmail = cleanEnv('BREVO_FROM_EMAIL') || FROM_EMAIL;
  const extraTo = cleanEnv('BREVO_TO_EMAIL', 'BREV_TO_EMAIL');
  const to = [...new Set([TO_EMAIL, extraTo].filter(Boolean))];

  if (!pass) throw new Error('Липсва SMTP ключ. Добавете BREVO_SMPT_KEY в Secrets.');

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth: { user, pass },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });

  try {
    await transporter.sendMail({
      from: `"ВАС КЛИМА" <${fromEmail}>`,
      to,
      subject: SUBJECT,
      html: inquiryHtml(row),
      text: inquiryText(row),
      replyTo: row.email || fromEmail,
    });
    return { ok: true, provider: 'brevo-smtp:587', to: to.join(', ') };
  } catch (err) {
    throw new Error(humanizeError(err instanceof Error ? err.message : String(err)));
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'GET') {
      return res.status(200).json({
        ready: Boolean(cleanEnv('BREVO_SMTP_KEY', 'BREVO_SMPT_KEY')),
        host: SMTP_HOST,
        port: SMTP_PORT,
        login: SMTP_LOGIN,
        from: cleanEnv('BREVO_FROM_EMAIL') || FROM_EMAIL,
        to: TO_EMAIL,
        subject: SUBJECT,
      });
    }

    if (req.method === 'POST') {
      const { name, phone, email, city, message, product_id, product_name, type } = req.body || {};
      if (!name || !String(name).trim()) {
        return res.status(400).json({ error: 'Моля, въведете име' });
      }
      if (!phone || String(phone).replace(/\D/g, '').length < 8) {
        return res.status(400).json({ error: 'Моля, въведете валиден телефон' });
      }

      const row = {
        name: String(name).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : '',
        city: city ? String(city).trim() : '',
        message: message ? String(message).trim() : '',
        product_id: product_id ? Number(product_id) : null,
        product_name: product_name ? String(product_name).trim() : '',
        type: type === 'quote' ? 'quote' : 'contact',
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase.from('inquiries').insert(row).select().single();
      if (error) throw error;

      try {
        const mail = await sendInquiryEmail(row);
        return res.status(201).json({
          ...data,
          email_sent: true,
          email_provider: mail.provider,
          email_to: mail.to,
        });
      } catch (mailErr) {
        console.error('Email send failed:', mailErr);
        return res.status(201).json({
          ...data,
          email_sent: false,
          warning: mailErr instanceof Error ? mailErr.message : 'Имейлът не можа да се изпрати',
        });
      }
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
