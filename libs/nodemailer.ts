import nodemail from "nodemailer";

const nodemailer = nodemail.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SECURE_TLS,
  auth: {
    user: process.env.LOGIN,
    pass: process.env.EMAIL_PWD,
  },
} as any);

export default nodemailer;
