const express = require("express");
const { UsersController } = require("../../../controller");
const passport = require("passport");
const { generateTokens } = require("../../../controller/users.controller");
const Users = require("../../../model/users.model");

const router = express.Router();

router.post(
    "/register-user",
    UsersController.registerUser
);

router.post(
    "/login-user",
    UsersController.loginUser
);

router.get(
    "/generate-new-tokens",
    UsersController.generateNewTokens
);

router.post(
    "/logout-user",
    UsersController.logOutUser
);

router.get(
    "/check-auth",
    UsersController.checkAuth
);

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    async function (req, res) {
        console.log("dddd", req.user);

        if (req.user) {
            const { accessToken, refreshToken } = await generateTokens(req.user._id)



            console.log(accessToken, refreshToken);

            const userData = await Users.findById(req.user._id).select("-password -refreshToken");

            const options = {
                httpOnly: true,
                secure: true
            }

            res.status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)

            res.redirect('http://localhost:3000');


        }
        // Successful authentication, redirect home.

    });

router.post(
    "/verify-otp",
    UsersController.checkOTP
);

router.post(
    "/verify-otp-email",
    UsersController.checkOTPEmail
);

module.exports = router;
