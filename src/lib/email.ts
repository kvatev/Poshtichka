import nodemailer from "nodemailer";
import { Resend } from "resend";

export interface ContactEmailPayload {
  name: string;
  email: string;
  service: string;
  message: string;
  phone?: string;
  timestamp?: string;
}

export interface BookingEmailPayload {
  fullName: string;
  email: string;
  phone?: string;
  eventDate: string;
  eventType: string;
  venueLocation: string;
  guestCount?: number | string;
  requestedProducts?: string[];
  message?: string;
  estimatedPrice?: number | string;
  preferredContact?: string;
}

/**
 * Get Nodemailer Transporter configured for Zoho SMTP
 */
function getTransporter() {
  const host = process.env.SMTP_HOST || "smtp.zoho.eu";
  const port = Number(process.env.SMTP_PORT) || 465;
  const isSecure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER || "no-reply@poshtichka.eu";
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

  // Fallback to smtp.zoho.eu if smtppro.zoho.eu requires organization configuration
  const actualHost = host === "smtppro.zoho.eu" ? "smtp.zoho.eu" : host;

  return nodemailer.createTransport({
    host: actualHost,
    port,
    secure: isSecure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Generates an elegant, responsive HTML email template for Contact Form inquiries
 */
export function generateContactEmailHtml({
  name,
  email,
  service,
  message,
  phone,
  timestamp,
}: ContactEmailPayload): string {
  const formattedTime =
    timestamp ||
    new Intl.DateTimeFormat("bg-BG", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Europe/Sofia",
    }).format(new Date());

  return `
<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ново запитване от сайта | Пощичка</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4efe6;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #182b2c;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #f4efe6;
      padding: 30px 10px;
    }
    .main-card {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid #e2ded7;
      box-shadow: 0 4px 20px rgba(24, 43, 44, 0.06);
    }
    .header-banner {
      background-color: #00b4b6;
      padding: 32px 24px;
      text-align: center;
      color: #ffffff;
    }
    .header-banner h1 {
      margin: 0 0 6px 0;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 0.5px;
      line-height: 1.3;
    }
    .header-banner p {
      margin: 0;
      font-size: 14px;
      opacity: 0.92;
    }
    .content-body {
      padding: 30px 24px;
    }
    .info-card {
      background-color: #f9f6f0;
      border: 1px solid #e8e2d8;
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 24px;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
    }
    .info-table td {
      padding: 8px 0;
      vertical-align: top;
      font-size: 15px;
    }
    .info-label {
      width: 38%;
      color: #5b6968;
      font-weight: 600;
    }
    .info-value {
      width: 62%;
      color: #182b2c;
      font-weight: 700;
    }
    .info-value a {
      color: #00b4b6;
      text-decoration: underline;
    }
    .badge {
      display: inline-block;
      background-color: #00b4b6;
      color: #ffffff;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 13px;
      font-weight: 600;
    }
    .message-title {
      font-size: 15px;
      font-weight: 700;
      color: #182b2c;
      margin: 0 0 10px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .message-box {
      background-color: #fdfbf7;
      border: 1px solid #e8e2d8;
      border-left: 5px solid #00b4b6;
      border-radius: 10px;
      padding: 18px 20px;
      font-size: 15px;
      line-height: 1.6;
      color: #2d3a37;
      white-space: pre-wrap;
      word-break: break-word;
    }
    .footer-bar {
      background-color: #182b2c;
      padding: 20px 24px;
      text-align: center;
      color: #a4b3b2;
      font-size: 12px;
      line-height: 1.5;
    }
    .footer-bar a {
      color: #00b4b6;
      text-decoration: none;
    }
    .cta-button {
      display: inline-block;
      background-color: #00b4b6;
      color: #ffffff !important;
      text-decoration: none;
      font-weight: 700;
      font-size: 14px;
      padding: 12px 24px;
      border-radius: 50px;
      margin-top: 15px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="main-card">
      <!-- Header -->
      <div class="header-banner">
        <h1>ПОЩИЧКА</h1>
        <p>Получено е ново клиентско запитване през poshtichka.eu</p>
      </div>

      <!-- Content -->
      <div class="content-body">
        <!-- Client Details Table -->
        <div class="info-card">
          <table class="info-table">
            <tr>
              <td class="info-label">👤 Клиент:</td>
              <td class="info-value">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td class="info-label">✉️ Имейл адрес:</td>
              <td class="info-value">
                <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
              </td>
            </tr>
            ${
              phone && phone !== "От контактна форма"
                ? `
            <tr>
              <td class="info-label">📞 Телефон:</td>
              <td class="info-value">
                <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a>
              </td>
            </tr>
            `
                : ""
            }
            <tr>
              <td class="info-label">✨ Избрана услуга:</td>
              <td class="info-value">
                <span class="badge">${escapeHtml(service)}</span>
              </td>
            </tr>
            <tr>
              <td class="info-label">🕒 Дата и час:</td>
              <td class="info-value" style="font-weight: normal; color: #4a5756;">${escapeHtml(formattedTime)}</td>
            </tr>
          </table>
        </div>

        <!-- Message Box -->
        <div class="message-title">💬 Съобщение от клиента:</div>
        <div class="message-box">${escapeHtml(message)}</div>

        <!-- Direct Reply Action -->
        <div style="text-align: center; margin-top: 25px;">
          <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent(`Re: Запитване за ${service} - Пощичка`)}" class="cta-button">
            ОТГОВОРИ ДИРЕКТНО НА КЛИЕНТА
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer-bar">
        Този имейл е генериран автоматично от контактната форма на 
        <a href="https://poshtichka.eu" target="_blank">poshtichka.eu</a>.<br>
        Можете да отговорите директно на този имейл, за да се свържете с клиента.
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generates an HTML email for Full Event Bookings & Calculator Inquiries
 */
export function generateBookingEmailHtml(payload: BookingEmailPayload): string {
  const nowFormatted = new Intl.DateTimeFormat("bg-BG", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Sofia",
  }).format(new Date());

  const productsList = (payload.requestedProducts || []).join(", ") || "Персонализирани картички";

  return `
<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Нова Резервация | Пощичка</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f4efe6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #182b2c; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #f4efe6; padding: 30px 10px; }
    .main-card { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2ded7; box-shadow: 0 4px 20px rgba(24, 43, 44, 0.06); }
    .header-banner { background-color: #00b4b6; padding: 32px 24px; text-align: center; color: #ffffff; }
    .header-banner h1 { margin: 0 0 6px 0; font-size: 24px; font-weight: 700; }
    .content-body { padding: 30px 24px; }
    .info-card { background-color: #f9f6f0; border: 1px solid #e8e2d8; border-radius: 14px; padding: 20px; margin-bottom: 20px; }
    .info-table { width: 100%; border-collapse: collapse; }
    .info-table td { padding: 8px 0; vertical-align: top; font-size: 15px; }
    .info-label { width: 38%; color: #5b6968; font-weight: 600; }
    .info-value { width: 62%; color: #182b2c; font-weight: 700; }
    .info-value a { color: #00b4b6; text-decoration: underline; }
    .badge { display: inline-block; background-color: #00b4b6; color: #ffffff; padding: 4px 10px; border-radius: 12px; font-size: 13px; font-weight: 600; }
    .price-box { background-color: #00b4b6; color: #ffffff; padding: 14px; border-radius: 12px; text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px; }
    .message-box { background-color: #fdfbf7; border: 1px solid #e8e2d8; border-left: 5px solid #00b4b6; border-radius: 10px; padding: 16px 20px; font-size: 15px; line-height: 1.6; color: #2d3a37; white-space: pre-wrap; word-break: break-word; }
    .footer-bar { background-color: #182b2c; padding: 20px 24px; text-align: center; color: #a4b3b2; font-size: 12px; }
    .footer-bar a { color: #00b4b6; text-decoration: none; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="main-card">
      <div class="header-banner">
        <h1>ПОЩИЧКА</h1>
        <p>Получена е нова онлайн резервация за Вендинг машина</p>
      </div>
      <div class="content-body">
        ${
          payload.estimatedPrice
            ? `<div class="price-box">Ориентировъчна цена: ${escapeHtml(String(payload.estimatedPrice))} лв.</div>`
            : ""
        }
        <div class="info-card">
          <table class="info-table">
            <tr>
              <td class="info-label">👤 Клиент:</td>
              <td class="info-value">${escapeHtml(payload.fullName)}</td>
            </tr>
            <tr>
              <td class="info-label">✉️ Имейл:</td>
              <td class="info-value"><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td>
            </tr>
            ${
              payload.phone
                ? `<tr><td class="info-label">📞 Телефон:</td><td class="info-value"><a href="tel:${escapeHtml(payload.phone)}">${escapeHtml(payload.phone)}</a></td></tr>`
                : ""
            }
            <tr>
              <td class="info-label">📅 Дата на събитието:</td>
              <td class="info-value" style="color: #00b4b6;">${escapeHtml(payload.eventDate)}</td>
            </tr>
            <tr>
              <td class="info-label">🎉 Тип събитие:</td>
              <td class="info-value"><span class="badge">${escapeHtml(payload.eventType)}</span></td>
            </tr>
            <tr>
              <td class="info-label">📍 Локация / Зала:</td>
              <td class="info-value">${escapeHtml(payload.venueLocation)}</td>
            </tr>
            <tr>
              <td class="info-label">👥 Брой гости:</td>
              <td class="info-value">${escapeHtml(String(payload.guestCount || "Не е посочен"))}</td>
            </tr>
            <tr>
              <td class="info-label">🎁 Избрани подаръци:</td>
              <td class="info-value">${escapeHtml(productsList)}</td>
            </tr>
            <tr>
              <td class="info-label">🕒 Изпратено на:</td>
              <td class="info-value" style="font-weight: normal; color: #4a5756;">${escapeHtml(nowFormatted)}</td>
            </tr>
          </table>
        </div>

        ${
          payload.message
            ? `
        <div style="font-size: 15px; font-weight: 700; color: #182b2c; margin-bottom: 8px;">💬 Бележки / Пожелания:</div>
        <div class="message-box">${escapeHtml(payload.message)}</div>
        `
            : ""
        }

        <div style="text-align: center; margin-top: 25px;">
          <a href="mailto:${escapeHtml(payload.email)}?subject=${encodeURIComponent(`Потвърждение на резервация за ${payload.eventDate} - Пощичка`)}" style="display: inline-block; background-color: #00b4b6; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 12px 24px; border-radius: 50px;">
            ОТГОВОРИ НА КЛИЕНТА
          </a>
        </div>
      </div>
      <div class="footer-bar">
        Пощичка CRM & Email Dispatcher | <a href="https://poshtichka.eu/admin" target="_blank">Към Админ панела</a>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Sends Contact Email to info@poshtichka.eu
 */
export async function sendContactEmail(payload: ContactEmailPayload): Promise<{
  success: boolean;
  messageId?: string;
  provider?: string;
  error?: string;
}> {
  const fromAddress = "Пощичка <no-reply@poshtichka.eu>";
  const toAddress = process.env.CONTACT_RECIPIENT_EMAIL || "info@poshtichka.eu";
  const subject = `Ново запитване от сайта: ${payload.name} – ${payload.service}`;
  const htmlContent = generateContactEmailHtml(payload);
  const plainText = `
Ново запитване от сайта:
Клиент: ${payload.name}
Имейл: ${payload.email}
${payload.phone ? `Телефон: ${payload.phone}\n` : ""}Услуга: ${payload.service}

Съобщение:
${payload.message}
  `.trim();

  // 1. Try Zoho / SMTP Transporter
  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      replyTo: payload.email,
      subject: subject,
      text: plainText,
      html: htmlContent,
    });

    console.log("[Email] Sent successfully via Zoho SMTP. MessageId:", info.messageId);
    return { success: true, messageId: info.messageId, provider: "zoho_smtp" };
  } catch (smtpErr: any) {
    console.error("[Email] Zoho SMTP send error:", smtpErr?.message);

    // 2. Fallback to Resend if configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const res = await resend.emails.send({
          from: fromAddress,
          to: [toAddress],
          replyTo: payload.email,
          subject: subject,
          html: htmlContent,
        });

        if (!res.error) {
          return { success: true, messageId: res.data?.id, provider: "resend" };
        }
      } catch (resendErr) {
        console.error("[Email] Resend fallback error:", resendErr);
      }
    }

    return { success: false, error: smtpErr?.message || "Грешка при изпращане на имейл." };
  }
}

/**
 * Sends Full Event Booking / Calculator Email to info@poshtichka.eu
 */
export async function sendBookingEmail(payload: BookingEmailPayload): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  const fromAddress = "Пощичка <no-reply@poshtichka.eu>";
  const toAddress = process.env.CONTACT_RECIPIENT_EMAIL || "info@poshtichka.eu";
  const subject = `Нова Резервация: ${payload.fullName} – ${payload.eventDate} (${payload.eventType})`;
  const htmlContent = generateBookingEmailHtml(payload);
  const plainText = `
Нова резервация за Вендинг машина:
Клиент: ${payload.fullName}
Имейл: ${payload.email}
Телефон: ${payload.phone || "Не е посочен"}
Дата: ${payload.eventDate}
Събитие: ${payload.eventType}
Локация: ${payload.venueLocation}
Брой гости: ${payload.guestCount || "Не е посочен"}
Цена: ${payload.estimatedPrice ? `${payload.estimatedPrice} лв.` : "Не е посочена"}

Бележки:
${payload.message || "Няма допълнителни бележки"}
  `.trim();

  try {
    const transporter = getTransporter();
    const info = await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      replyTo: payload.email,
      subject: subject,
      text: plainText,
      html: htmlContent,
    });

    console.log("[Booking Email] Sent successfully via Zoho SMTP. MessageId:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (err: any) {
    console.error("[Booking Email] Zoho SMTP send error:", err?.message);
    return { success: false, error: err?.message };
  }
}
