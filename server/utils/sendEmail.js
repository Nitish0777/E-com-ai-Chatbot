import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_SERVICE,
    port: 465,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER, // generated gmail user
      pass: process.env.SMTP_PASSWORD, // generated gmail password
    },
  });

  // send mail with defined transport object
  const info = {
    from: `${process.env.SMTP_USER} `, // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
  };

  await transporter.sendMail(info);
};
