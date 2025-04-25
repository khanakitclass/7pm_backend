const accountSid = process.env.TWILLIO_accountSid;
const authToken = process.env.TWILLIO_authToken;
const client = require('twilio')(accountSid, authToken);

const sendOTP = async () => {
  try {
    await client.verify.v2.services(process.env.TWILLIO_services)
      .verifications
      .create({
        to: '+918866173826',
        channel: 'sms',
        
      })
      .then(verification => console.log(verification.sid));
  } catch (error) {
    console.log(error);

  }
}

const createVerificationCheck = async (otp) => {
  console.log("ddd", otp);
  try {
    const verificationCheck = await client.verify.v2
      .services("VA036ffb38fd9ecf39c07b0e6da6541e1f")
      .verificationChecks.create({
        code: otp,
        to: "+918866173826",
      })

      console.log("verificationCheckverificationCheck",verificationCheck);
      

      return verificationCheck.status;
    } catch (error) {
      throw new Error(error.message)
  }
}

module.exports = {
  sendOTP,
  createVerificationCheck
}