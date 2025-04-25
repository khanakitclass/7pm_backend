const Users = require("../model/users.model")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const sendMail = require("../utils/nodemailer");
const { createVerificationCheck, sendOTP } = require("../utils/twillio");
const createPDF = require("../utils/pdfmake");

const generateTokens = async (userId) => {
  try {
    const user = await Users.findById(userId);

    const accessToken = await jwt.sign({
      _id: user._id,
      role: user.role,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

    const refreshToken = await jwt.sign({
      _id: user._id,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken }

  } catch (error) {
    console.log(error);

  }
}

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000);

    console.log(email, password, req.body);

    const statusEmail = sendMail(email, "Verify Your Fruitable Account", `Your OTP is: ${otp}`); 

    console.log("statusEmail", statusEmail);
    

    const user = await Users.findOne({ email: email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist.",
        data: null
      });
    }

    try {
      const hashPass = await bcrypt.hash(password, 10);

      console.log(hashPass);

      const user = await Users.create({ ...req.body, password: hashPass });

      const userData = await Users.findById(user._id).select("-password");

      

      

      if (statusEmail) {
        req.session.email = email;
        req.session.otp = otp;

        return res.status(201).json({
          success: true,
          message: "Please verified OTP.",
          data: userData
        });
      }




    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error: " + error.message,
        data: null
      });
    }


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
      data: null
    });
  }
}



const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password, req.body);


    const user = await Users.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
        data: null
      });
    }

    if (!user.isVerified) {
      return res.status(404).json({
        success: false,
        message: "Please verify OTP first.",
        data: null
      });
    }


    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
        data: null
      });
    }

    const { accessToken, refreshToken } = await generateTokens(user._id)



    console.log(accessToken, refreshToken);

    const userData = await Users.findById(user._id).select("-password -refreshToken");

    const options = {
      httpOnly: true,
      secure: true
    }

    res.status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        data: userData,
        message: "Login Successfully."
      })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
      data: null
    });
  }
}

const generateNewTokens = async (req, res) => {
  try {
    console.log(req.cookies.refreshToken, req.headers.authorization?.replace("Bearer ", ""));

    const token = req.cookies.refreshToken || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(404).json({
        success: false,
        message: 'Refresh Token not found'
      });
    }

    try {
      const verifyToken = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

      if (!verifyToken) {
        return res.status(400).json({
          success: false,
          message: 'Invalid credential: Token invalid/expired'
        });
      }

      const user = await Users.findById(verifyToken._id);

      console.log("token !== user.toObject().refreshToken", token !== user.toObject().refreshToken, token, user.toObject().refreshToken);

      if (token !== user.toObject().refreshToken) {
        return res.status(400).json({
          success: false,
          message: 'Invalid user Token'
        });
      }

      const { accessToken, refreshToken } = await generateTokens(user._id)



      console.log(accessToken, refreshToken);

      const userData = await Users.findById(user._id).select("-password -refreshToken");

      const options = {
        httpOnly: true,
        secure: true
      }

      res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({
          success: true,
          data: userData,
          message: "New token generated."
        })

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error: " + error.message,
        data: null
      });

    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
      data: null
    });
  }
}

const logOutUser = async (req, res) => {
  try {
    console.log(req.body._id);

    const data = await Users.findByIdAndUpdate(
      req.body._id,
      {
        $unset: {
          refreshToken: 1
        }
      },
      {
        new: true
      }
    );

    const options = {
      httpOnly: true,
      secure: true
    }

    res.status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({
        success: true,
        message: "Logout successfully."
      })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
      data: null
    });
  }
}

const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.accessToken || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access Token not found'
      });
    }

    const verifyToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!verifyToken) {
      return res.status(400).json({
        success: false,
        message: 'Invalid credential: Token invalid/expired'
      });
    }

    const userData = await Users.findById(verifyToken._id).select("-password -refreshToken");

    res.status(200)
      .json({
        success: true,
        data: userData,
        message: "User authenticated"
      });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
      data: null
    });
  }
}

const checkOTP = async (req, res) => {
  try {
    const { email, otp } = req.body

    console.log("dddww", otp);

    const checkStatus = await createVerificationCheck(otp);

    console.log("checkStatuscheckStatus", checkStatus);


    if (checkStatus === "approved") {
      const user = await Users.findOne({ email: email });

      user.isVerified = true;

      await user.save({ validateBeforeSave: false });

      const docDefinition = {
        content: [
          { text: 'Your Details', style: 'mainHeading' },
          {
            style: 'userTable',
            table: {
              body: [
                ['Name', 'Email', 'Role'],
                [`${user.name}`, `${user.email}`, `${user.role}`]
              ]
            }
          },
        ],
        styles: {
          mainHeading: {
            fontSize: 18,
            alignment: "center",
            bold: true,
            margin: [0, 0, 0, 10]
          },
          userTable: {

          }
        }
      }

      await createPDF(docDefinition, user.name);

      return res.status(200).json({ success: true, message: "OTP verified successfully. Please Login." });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message
    });
  }
}

const checkOTPEmail = async (req, res) => {
  try {
    const { email, otp } = req.body

    console.log("dddww", otp, req.session, req.session.otp, req.session.email);

    if (req.session.otp == otp && req.session.email == email) {
      const user = await Users.findOne({ email: email });

      user.isVerified = true;

      await user.save({ validateBeforeSave: false });

      const docDefinition = {
        content: [
          { text: 'Your Details', style: 'mainHeading' },
          {
            style: 'userTable',
            table: {
              body: [
                ['Name', 'Email', 'Role'],
                [`${user.name}`, `${user.email}`, `${user.role}`]
              ]
            }
          },
        ],
        styles: {
          mainHeading: {
            fontSize: 18,
            alignment: "center",
            bold: true,
            margin: [0, 0, 0, 10]
          },
          userTable: {

          }
        }
      }

      await createPDF(docDefinition, user.name);

      req.session.otp = null;
      req.session.email = null;

      return res.status(200).json({ success: true, message: "OTP verified successfully. Please Login." });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  generateNewTokens,
  logOutUser,
  checkAuth,
  generateTokens,
  checkOTP,
  checkOTPEmail
}