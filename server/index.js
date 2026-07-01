const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config({ path: require("path").join(__dirname, ".env"), override: true });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: "*" })); // Allow requests from all origins (useful for local frontend testing)
app.use(express.json());

// Request Logger Middleware
app.use((req, res, next) => {
  console.log(`📥 Received ${req.method} request on ${req.url}`);
  if (req.method === "POST") {
    console.log("   Body:", req.body);
  }
  next();
});

// Transporter setup
let transporter;

async function initMailTransporter() {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    // Production / Configured SMTP (e.g. Gmail, SendGrid, Resend)
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log("⚡ Nodemailer: Configured with custom SMTP credentials.");
  } else {
    // Fallback: Create a dynamic Ethereal test account for easy testing
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    console.log("✨ Nodemailer: No SMTP credentials found in .env.");
    console.log(`✨ Nodemailer: Generated Ethereal Test Account:`);
    console.log(`   - User: ${testAccount.user}`);
    console.log(`   - Pass: ${testAccount.pass}`);
    console.log(`   - All sent emails can be viewed in the console log links below!`);
  }
}

initMailTransporter().catch((err) => {
  console.error("❌ Failed to initialize email transporter:", err);
});

// HTML Email Templates Builder
const buildEmailTemplate = (title, contentHTML) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #0b1120;
      color: #e8e4d9;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #0b1120;
      padding: 40px 20px;
      box-sizing: border-box;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #0f1729;
      border: 1px solid rgba(96, 165, 250, 0.15);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }
    .header {
      background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%);
      padding: 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      color: #ffffff;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
    }
    .content {
      padding: 40px 30px;
      line-height: 1.6;
    }
    .content h2 {
      margin-top: 0;
      color: #60a5fa;
      font-size: 20px;
      font-weight: 700;
    }
    .content p {
      color: #a8bdd8;
      font-size: 15px;
    }
    .details-box {
      background-color: #162040;
      border: 1px solid rgba(96, 165, 250, 0.2);
      border-radius: 12px;
      padding: 20px;
      margin: 24px 0;
    }
    .details-row {
      margin-bottom: 12px;
      font-size: 14px;
    }
    .details-row:last-child {
      margin-bottom: 0;
    }
    .label {
      color: #60a5fa;
      font-weight: 600;
      display: inline-block;
      width: 130px;
    }
    .value {
      color: #e8e4d9;
    }
    .footer {
      background-color: #0b1120;
      padding: 24px;
      text-align: center;
      border-top: 1px solid rgba(96, 165, 250, 0.1);
    }
    .footer p {
      margin: 0;
      color: #7a93b8;
      font-size: 12px;
    }
    .footer a {
      color: #60a5fa;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1>HANUXTECH</h1>
      </div>
      <div class="content">
        ${contentHTML}
      </div>
      <div class="footer">
        <p>This is an automated acknowledgment from Hanux Tech Pvt. Ltd.</p>
        <p><a href="https://hanuxtech.com">Visit our website</a> | Noida, India</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

// API Endpoint: Service Inquiries
app.post("/api/inquiry", async (req, res) => {
  const { name, email, serviceName, projectDetails } = req.req ? req.req.body : req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, error: "Name and Email are required." });
  }

  try {
    // 1. Send Acknowledgment Email to User
    const userMailHTML = buildEmailTemplate(
      "Thank you for contacting Hanux Tech",
      `
      <h2>Hi ${name},</h2>
      <p>Thank you for reaching out to Hanux Tech. We have successfully received your service inquiry regarding <strong>${serviceName}</strong>.</p>
      <p>Our lead solutions architects and engineering managers are currently reviewing your request. We will draft a customized technical roadmap and contact you within the next 24 hours.</p>
      
      <div class="details-box">
        <div class="details-row"><span class="label">Inquiry Service:</span><span class="value">${serviceName}</span></div>
        <div class="details-row"><span class="label">Client Name:</span><span class="value">${name}</span></div>
        <div class="details-row"><span class="label">Client Email:</span><span class="value">${email}</span></div>
        <div class="details-row"><span class="label">Project Details:</span><span class="value">${projectDetails || "No details provided."}</span></div>
      </div>

      <p>If you have any additional project briefs, wireframes, or reference docs to share, feel free to reply directly to this email.</p>
      <p>Let's build something great together!</p>
      <br>
      <p>Warm regards,<br><strong>The Hanux Tech Solutions Team</strong></p>
      `
    );

    const sender = process.env.EMAIL_USER || (transporter && transporter.options && transporter.options.auth ? transporter.options.auth.user : "no-reply@hanuxtech.com");

    const userMailOptions = {
      from: sender,
      to: email,
      subject: `Thank You for Your Inquiry - Hanux Tech [${serviceName}]`,
      text: `Hi ${name},\n\nThank you for reaching out to Hanux Tech. We have successfully received your service inquiry regarding ${serviceName}.\n\nOur team is currently reviewing your request and we will get back to you within 24 hours.\n\nBest regards,\nThe Hanux Tech Team`,
      html: userMailHTML,
    };

    const userResult = await transporter.sendMail(userMailOptions);

    // 2. Send Alert Email to Admin
    const adminMailOptions = {
      from: sender,
      to: process.env.ADMIN_RECEIVER || process.env.EMAIL_USER || "sales@hanuxtech.com",
      subject: `🔥 NEW INQUIRY: ${name} - ${serviceName}`,
      text: `New Inquiry from ${name} (${email}) for ${serviceName}.\nDetails: ${projectDetails || "None"}`,
      html: `
        <h3>New Project Inquiry Received</h3>
        <table border="1" cellpadding="8" style="border-collapse:collapse; border-color:#ccc; font-family:sans-serif;">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Service</strong></td><td>${serviceName}</td></tr>
          <tr><td><strong>Project Description</strong></td><td>${projectDetails || "N/A"}</td></tr>
        </table>
      `,
    };

    let adminResult;
    try {
      adminResult = await transporter.sendMail(adminMailOptions);
    } catch (e) {
      console.warn("⚠️ Nodemailer: Failed to send admin alert email:", e.message);
    }

    // Log email link if using Ethereal
    if (!process.env.EMAIL_USER) {
      console.log(`✉️ Email Sent! View user receipt here: ${nodemailer.getTestMessageUrl(userResult)}`);
    }

    return res.status(200).json({
      success: true,
      message: "Inquiry processed and emails sent successfully.",
      userMailUrl: !process.env.EMAIL_USER ? nodemailer.getTestMessageUrl(userResult) : null,
    });

  } catch (error) {
    console.error("❌ Error sending inquiry emails:", error);
    return res.status(500).json({ success: false, error: "Failed to process inquiry emails." });
  }
});

// API Endpoint: Meeting Bookings
app.post("/api/booking", async (req, res) => {
  const { name, email, serviceName, date, timeSlot, bookingRef, notes } = req.body;

  if (!name || !email || !date || !timeSlot || !bookingRef) {
    return res.status(400).json({ success: false, error: "Missing required booking details." });
  }

  try {
    // 1. Send Confirmation Email to Client
    const userMailHTML = buildEmailTemplate(
      "Meeting Booking Confirmed - Hanux Tech",
      `
      <h2>Hi ${name},</h2>
      <p>Your technical consultation session has been successfully booked. A Calendar invite containing the video consultation link has been generated and sent to your email.</p>
      
      <div class="details-box">
        <div class="details-row"><span class="label">Booking Ref:</span><span class="value" style="font-family:monospace; font-weight:bold; color:#fbbf24;">${bookingRef}</span></div>
        <div class="details-row"><span class="label">Consultation:</span><span class="value">${serviceName}</span></div>
        <div class="details-row"><span class="label">Scheduled Date:</span><span class="value">${date}</span></div>
        <div class="details-row"><span class="label">Scheduled Time:</span><span class="value">${timeSlot}</span></div>
        <div class="details-row"><span class="label">Meeting Format:</span><span class="value">Video Call (Google Meet)</span></div>
        <div class="details-row"><span class="label">Notes / Requests:</span><span class="value">${notes || "No special requests."}</span></div>
      </div>

      <p>If you need to reschedule or cancel this appointment, please do so using the calendar invite links or write to us directly at hello@hanuxtech.com.</p>
      <p>We look forward to meeting you and discussing your product architecture.</p>
      <br>
      <p>Best regards,<br><strong>The Hanux Tech Scheduling Team</strong></p>
      `
    );

    const sender = process.env.EMAIL_USER || (transporter && transporter.options && transporter.options.auth ? transporter.options.auth.user : "no-reply@hanuxtech.com");

    const userMailOptions = {
      from: sender,
      to: email,
      subject: `Booking Confirmed: Consultation Strategy Session [Ref: ${bookingRef}]`,
      text: `Hi ${name},\n\nYour meeting has been successfully booked.\nBooking Reference: ${bookingRef}\nService: ${serviceName}\nDate: ${date}\nTime Slot: ${timeSlot}\n\nWe look forward to meeting you!\n\nBest regards,\nThe Hanux Tech Team`,
      html: userMailHTML,
    };

    const userResult = await transporter.sendMail(userMailOptions);

    // 2. Send Alert Email to Admin
    const adminMailOptions = {
      from: sender,
      to: process.env.ADMIN_RECEIVER || process.env.EMAIL_USER || "consulting@hanuxtech.com",
      subject: `📆 NEW BOOKING CONFIRMED: ${name} - ${bookingRef}`,
      text: `New Booking from ${name} (${email}) [Ref: ${bookingRef}].\nService: ${serviceName}\nDate: ${date}\nTime Slot: ${timeSlot}\nNotes: ${notes || "None"}`,
      html: `
        <h3>New Strategy Consultation Booking</h3>
        <table border="1" cellpadding="8" style="border-collapse:collapse; border-color:#ccc; font-family:sans-serif;">
          <tr><td><strong>Client Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Client Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Booking Ref</strong></td><td>${bookingRef}</td></tr>
          <tr><td><strong>Service System</strong></td><td>${serviceName}</td></tr>
          <tr><td><strong>Date</strong></td><td>${date}</td></tr>
          <tr><td><strong>Time Slot</strong></td><td>${timeSlot}</td></tr>
          <tr><td><strong>Special Requests</strong></td><td>${notes || "N/A"}</td></tr>
        </table>
      `,
    };

    let adminResult;
    try {
      adminResult = await transporter.sendMail(adminMailOptions);
    } catch (e) {
      console.warn("⚠️ Nodemailer: Failed to send booking alert to admin:", e.message);
    }

    if (!process.env.EMAIL_USER) {
      console.log(`✉️ Email Sent! View user booking receipt here: ${nodemailer.getTestMessageUrl(userResult)}`);
    }

    return res.status(200).json({
      success: true,
      message: "Booking confirmation sent successfully.",
      userMailUrl: !process.env.EMAIL_USER ? nodemailer.getTestMessageUrl(userResult) : null,
    });

  } catch (error) {
    console.error("❌ Error sending booking confirmation:", error);
    return res.status(500).json({ success: false, error: "Failed to process booking confirmation." });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date() });
});

// Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Hanux Tech Express Server running at http://0.0.0.0:${PORT}`);
});
