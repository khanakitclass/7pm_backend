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

const nodemailer = require("nodemailer");

const sendMail = async (email, subject, message) => {
  try {
    // Create reusable transporter
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      secure: true, // true for port 465, false for port 587
    });

    // Verify connection config
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.error("Verification error: ", error);
          reject(error);
        } else {
          console.log("Server is ready to send mail.");
          resolve(success);
        }
      });
    });

    // Email data
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: message,
      html: `<p>${message}</p>`,
    };

    // Send mail
    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("SendMail error: ", err);
          reject(err);
        } else {
          console.log("Email sent: " + info.response);
          resolve(info);
        }
      });
    });

    return true;

  } catch (error) {
    console.log("Mail error: ", error.message);
    return false;
  }
};

module.exports = sendMail;
