import nodemailer from "nodemailer";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

function getTransporter() {
  const host = process.env.EMAIL_HOST;
  const port = parseInt(process.env.EMAIL_PORT || "587");
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass || !host) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendEmail({ to, subject, html }: SendEmailOptions): Promise<{ success: boolean; simulated?: boolean }> {
  const transporter = getTransporter();
  const from = `"${process.env.EMAIL_FROM_NAME || "Crest & Sterling Alliance"}" <${
    process.env.EMAIL_FROM || "counsel@crestandsterling.com"
  }>`;

  if (!transporter) {
    console.log(`[SIMULATED EMAIL DISPATCH] To: ${to} | Subject: ${subject}`);
    return { success: true, simulated: true };
  }

  try {
    await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to dispatch email via SMTP:", error);
    return { success: false };
  }
}

// -------------------------------------------------------------
// Branded Email HTML Templates
// -------------------------------------------------------------

export function consultationClientEmailTemplate(data: {
  fullName: string;
  referenceNumber: string;
  matterType: string;
}): string {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #0b192c; margin: 0; padding: 40px 10px; }
      .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.2); }
      .header { background-color: #0b192c; color: #ffffff; padding: 36px 30px; text-align: center; border-bottom: 3px solid #c5a880; }
      .header h1 { margin: 0; font-size: 24px; letter-spacing: 1px; font-weight: 600; text-transform: uppercase; color: #c5a880; }
      .header p { margin: 8px 0 0 0; font-size: 13px; color: #9fb3c8; letter-spacing: 0.5px; }
      .content { padding: 36px 30px; color: #1e3a5f; line-height: 1.6; }
      .ref-badge { display: inline-block; background-color: #f5eee0; color: #5a4324; border: 1px solid #dec69d; padding: 6px 14px; border-radius: 4px; font-weight: bold; font-size: 14px; margin: 15px 0; }
      .steps { background-color: #fcfbf9; border-left: 4px solid #c5a880; padding: 18px; margin: 20px 0; }
      .disclaimer { font-size: 12px; color: #829ab1; border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px; }
      .footer { background-color: #f0f4f8; padding: 20px 30px; text-align: center; font-size: 12px; color: #627d98; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Crest & Sterling Alliance</h1>
        <p>LEGAL PRACTITIONERS & ARBITRATORS</p>
      </div>
      <div class="content">
        <p>Dear <strong>${data.fullName}</strong>,</p>
        <p>Thank you for contacting Crest & Sterling Alliance. We have formally received your preliminary evaluation request regarding <strong>${data.matterType}</strong>.</p>
        
        <div>Reference Code: <span class="ref-badge">${data.referenceNumber}</span></div>

        <div class="steps">
          <strong style="color:#0b192c;">Next Steps in Our Intake Process:</strong>
          <ol style="margin: 10px 0 0 0; padding-left: 20px;">
            <li>Our Practice Intake Committee performs an initial conflict-of-interest check.</li>
            <li>A Practice Group Leader or Senior Associate will contact you within two business hours to confirm your consultation schedule.</li>
            <li>Please prepare any relevant contracts, court notices, or documentation for your meeting.</li>
          </ol>
        </div>

        <p>If you require immediate emergency intervention (e.g. unlawful asset seizure, emergency injunction), please reach our 24/7 priority line directly at <strong>+234 (01) 453-8900</strong>.</p>

        <div class="disclaimer">
          <strong>Notice:</strong> This email confirms receipt of your inquiry only. Receipt of this communication or submission of preliminary information does not constitute legal advice or establish an attorney-client relationship.
        </div>
      </div>
      <div class="footer">
        &copy; 2026 Crest & Sterling Alliance.<br/>
        Lagos Principal Chambers: 18A Adeola Odeku St, Victoria Island | Abuja | London | Dallas
      </div>
    </div>
  </body>
  </html>
  `;
}

export function consultationAdminAlertTemplate(data: {
  fullName: string;
  email: string;
  phone: string;
  matterType: string;
  referenceNumber: string;
  description: string;
  preferredContact: string;
}): string {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; }
      .box { background: white; max-width: 650px; margin: 0 auto; border-radius: 8px; border-top: 4px solid #0b192c; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
      h2 { color: #0b192c; margin-top: 0; }
      .field { margin-bottom: 12px; }
      .label { font-weight: bold; color: #486581; font-size: 13px; text-transform: uppercase; }
      .val { color: #0b192c; font-size: 15px; margin-top: 3px; }
      .desc-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; margin-top: 15px; }
    </style>
  </head>
  <body>
    <div class="box">
      <h2>⚖️ New Consultation Request Received</h2>
      <p style="color:#627d98;">A new prospective client has submitted an inquiry via the portal.</p>
      
      <div class="field">
        <div class="label">Reference Number</div>
        <div class="val" style="color:#c5a880; font-weight:bold;">${data.referenceNumber}</div>
      </div>
      <div class="field">
        <div class="label">Client Name</div>
        <div class="val">${data.fullName}</div>
      </div>
      <div class="field">
        <div class="label">Contact Details</div>
        <div class="val">${data.email} | ${data.phone} (${data.preferredContact})</div>
      </div>
      <div class="field">
        <div class="label">Practice Area / Matter Category</div>
        <div class="val"><strong>${data.matterType}</strong></div>
      </div>
      <div class="field">
        <div class="label">Matter Summary</div>
        <div class="desc-box">${data.description}</div>
      </div>
      <div style="margin-top: 25px; text-align: center;">
        <p style="font-size: 13px; color: #829ab1;">Log in to the Admin CMS to review and manage this intake record.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}
