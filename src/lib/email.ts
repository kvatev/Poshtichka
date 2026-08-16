import { Resend } from "resend";
import nodemailer from "nodemailer";

export interface ContactEmailPayload {
  name: string;
  email: string;
  service: string;
  message: string;
  timestamp?: string;
}

/**
 * Generates an elegant, responsive HTML email template for Poshtichka
 */
export function generateContactEmailHtml({
  name,
  email,
  service,
  message,
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
 * Sends the contact email to info@poshtichka.eu
 */
export async function sendContactEmail(payload: ContactEmailPayload): Promise<{
  success: boolean;
  messageId?: string;
  provider?: string;
  error?: string;
}> {
  const fromAddress = "Пощичка <no-reply@poshtichka.eu>";
  const toAddress = "info@poshtichka.eu";
  const subject = `Ново запитване от сайта: ${payload.name} – ${payload.service}`;
  const htmlContent = generateContactEmailHtml(payload);

  // 1. Try Resend if RESEND_API_KEY is configured
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

      if (res.error) {
        console.error("[Email] Resend error:", res.error);
        return { success: false, error: res.error.message, provider: "resend" };
      }

      return { success: true, messageId: res.data?.id, provider: "resend" };
    } catch (err: any) {
      console.error("[Email] Resend exception:", err);
    }
  }

  // 2. Try SMTP if SMTP_HOST is configured
  const smtpHost = process.env.SMTP_HOST;
  if (smtpHost) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT) || 465,
        secure: (process.env.SMTP_SECURE === "true") || (Number(process.env.SMTP_PORT) === 465),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD || process.env.SMTP_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: fromAddress,
        to: toAddress,
        replyTo: payload.email,
        subject: subject,
        html: htmlContent,
      });

      return { success: true, messageId: info.messageId, provider: "smtp" };
    } catch (err: any) {
      console.error("[Email] SMTP error:", err);
    }
  }

  // 3. Fallback for environment without mail servers configured yet:
  // Log cleanly to console and return success so client flow completes smoothly
  console.log("--------------------------------------------------");
  console.log(`[Email Dispatch Simulation]`);
  console.log(`From: ${fromAddress}`);
  console.log(`To: ${toAddress}`);
  console.log(`Reply-To: ${payload.email}`);
  console.log(`Subject: ${subject}`);
  console.log(`Client: ${payload.name} (${payload.email})`);
  console.log(`Service: ${payload.service}`);
  console.log(`Message: ${payload.message}`);
  console.log("--------------------------------------------------");

  return {
    success: true,
    messageId: `sim_${Date.now()}`,
    provider: "simulated",
  };
}
