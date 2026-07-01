const nodemailer = require("nodemailer");
require("dotenv").config();

console.log("Testing SMTP Connection...");
console.log("Host:", process.env.EMAIL_HOST);
console.log("Port:", process.env.EMAIL_PORT);
console.log("User:", process.env.EMAIL_USER);
console.log("Pass:", process.env.EMAIL_PASS ? "Set" : "Not Set");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ Transporter verification failed:", error);
  } else {
    console.log("✅ Transporter is ready to send messages!");
  }
  process.exit();
});
