const nodemailer = require('nodemailer');

const sendMail = async (email, subject, message) => {
  try {
    var transporter = await nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'khanakitclass@gmail.com',
        pass: 'rgzt opnz sdwp ahtg'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    var mailOptions = {
      from: 'khanakitclass@gmail.com',
      to: email,
      subject: subject,
      text: message
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        return true;
      }
    });
  } catch (error) {
    console.log("mail error: ", error);
  }
}

module.exports = sendMail