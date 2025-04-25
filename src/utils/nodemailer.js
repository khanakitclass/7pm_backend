// const nodemailer = require('nodemailer');

// const sendMail = async (email, subject, message) => {
//   try {
//     var transporter = await nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       },
//       tls: {
//         rejectUnauthorized: false
//       }
//     });

//     var mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: subject,
//       text: message
//     };


//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ' + info.response);
//     return true;

//   } catch (error) {
//     console.log("mail error: ", error);
//   }
// }

// module.exports = sendMail

const { Resend } = require('resend');

const sendMail = async (email, subject, message) => {
  try {
    const resend = new Resend(process.env.RESEND_KEY);

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: subject,
      html: message
    });

    return true
  } catch (error) {
    console.log(error);

  }
};

module.exports = sendMail;
