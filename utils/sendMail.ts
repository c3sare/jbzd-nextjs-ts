import Mail from "nodemailer/lib/mailer";
import nodemailer from "@/libs/nodemailer";

type SendMailType = {
  to: string;
  subject: string;
  text: string;
};

export default async function sendMail({ to, subject, text }: SendMailType) {
  try {
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

    nodemailer.sendMail(mailOptions, function (err: any, data: any) {
      if (err) {
        throw new Error("Internal error!");
      }
    });
  } catch (err: any) {
    throw new Error("Internal error!");
  }
}
