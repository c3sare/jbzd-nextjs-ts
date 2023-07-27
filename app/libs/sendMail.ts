import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export default async function sendMail(
  to: string,
  subject: string,
  text: string
) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SECURE_TLS,
      auth: {
        user: process.env.LOGIN,
        pass: process.env.EMAIL_PWD,
      },
    } as any);

    const mailOptions: Mail.Options = {
      from: process.env.EMAIL,
      to,
      envelope: {
        from: `Jbzd <${process.env.EMAIL}>`,
        to,
      },
      subject,
      text,
    };

    transporter.sendMail(mailOptions, function (err: any, data: any) {
      if (err) {
        throw new Error("Internal error!");
      }
    });
  } catch (err: any) {
    throw new Error("Internal error!");
  }
}
