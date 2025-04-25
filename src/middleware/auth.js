const Users = require("../model/users.model")
var jwt = require('jsonwebtoken');

const auth = (roles) => async (req, res, next) => {
  try {
    const token = req.cookies.accessToken || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(404).json({
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

    if (!roles.includes(verifyToken.role)) {
      return res.status(400).json({
        success: false,
        message: 'You have not access'
      });
    }

    const user = await Users.findById(verifyToken._id).select("-password -refreshToken");;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    req.user = user

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
      data: null
    });
  }
}

module.exports = auth