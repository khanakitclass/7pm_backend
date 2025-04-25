const nodemailer = require('nodemailer');

const sendMail = async (email, subject, message) => {
  try {
    var transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: message
    };

    // await transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //     return true;
    //   }
    // });
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true;

  } catch (error) {
    console.log("mail error: ", error);
  }
}

module.exports = sendMail