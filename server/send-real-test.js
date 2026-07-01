const nodemailer = require("nodemailer");
require("dotenv").config({ path: require("path").join(__dirname, ".env") });

console.log("Sending real test email...");
console.log("User:", process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: "tanishajain1804@gmail.com",
  subject: "Nodemailer Real Connection Test",
  text: "Hello! This is a real test email sent to verify your SMTP connection.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("❌ Email sending failed:", error);
  } else {
    console.log("✅ Email sent successfully!");
    console.log("Message ID:", info.messageId);
    console.log("Response:", info.response);
  }
  process.exit();
});
