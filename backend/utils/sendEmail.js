const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  var transport = nodemailer.createTransport({
    service: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    // from: 'mayur.desai@somaiya.edu',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transport.sendMail(message);
};

module.exports = sendEmail;
