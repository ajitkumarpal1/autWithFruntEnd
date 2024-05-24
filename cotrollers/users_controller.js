import User from "../models/user.js"
import bcrypt from "bcrypt"
import { ErrorHandler } from "../utils/errorHandler.js";
import { sendToken } from "../utils/sendToken.js";
import { otp } from "../middlewares/otp.js";
import { resetotp } from "../middlewares/resetotp.js";
import passport from "passport";

export const user = {
    signup: async (req, res, next) => {
        const { name, email, password } = req.body;
        try {
            try {
                const newUser = await new User({ name, email, password }).save();
                await otp(newUser);
                res.json({ status: true })
            } catch (error) {
                if (error.code === 11000 && error.keyPattern.email) {
                    throw new Error("Email already exists");
                }
                throw error; // Re-throw other errors
            }

            // Implement sendWelcomeEmail function to send welcome message
            /* await sendWelcomeEmail(newUser);
 */
        } catch (err) {
            //  handle error for duplicate email
            return next(new ErrorHandler(400, err));
        }

    },
    signin: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return next(new ErrorHandler(400, "please enter email/password"));
            }
            const user = await User.findOne({ email }).select("+password");
            if (user.status) {
                if (!user) {
                    return next(
                        new ErrorHandler(401, "user not found! register yourself now!!")
                    );
                }
                console.log(password, user)
                const passwordMatch = await user.comparePassword(password);
                console.log("com>", passwordMatch)
                if (!passwordMatch) {
                    return next(new ErrorHandler(401, "Invalid email or passswor!"));
                }
                await sendToken(user, res, 200);
            } else {
                return res.json({
                    success: false,
                    error: "you are not varifide"
                })
            }

        } catch (error) {
            return next(new ErrorHandler(400, error));
        }
    },
    verify: async (req, res, next) => {
        console.log(req.params)
        try {
            const user = await User.findOne({ email: req.params.email });
            if (user) {
                if (user.tampOtp != req.body.otp) {
                    res.json({
                        success: false,
                        error: "OTP is incorrect"
                    });
                } else {
                    await User.updateOne({ email: req.params.email }, { status: true });
                    res.json({
                        success: true,
                        message: "You are verified"
                    });
                }
            } else {
                res.json({
                    success: false,
                    error: "Incorrect email"
                });
            }
        } catch (error) {
            return next(new ErrorHandler(400, error.message));
        }
    },
    signout: async (req, res, next) => {
        try {
            res
                .cookie("token", "")
                .redirect("/signin");
        } catch (error) {
            return next(new ErrorHandler(400, error));
        }
    },
    resetpassword: async (req, res, next) => {
        try {
            console.log(req.body)
            const user = User.findOne({ email: req.body.email })
            await user.updateOne({ email: req.body.email }, { status: false, tampOtp: Math.floor(1000 + Math.random() * 9000) })
            await resetotp({ email: req.body.email })
            res.cookie("token", "")
            return res.redirect("/resetpassword?email=" + req.body.email);
        } catch (error) {
            console.log(error)

            return res.redirect("/");
        }
    },
    updatepasswors: async (req, res, next) => {
        try {
            console.log(req.body)
            const user = await User.findOne({ email: req.body.email })
            if (user.tampOtp == req.body.otp) {
                user.password = req.body.password; // Corrected typo from 'passport' to 'password'
                user.status = true;
                delete user.tampOtp;
                await user.save();

                res.json({ success: true });
            }else{
                res.json({ success: false,error:"increct otp" });
            }

        } catch (error) {
            console.log(error)

            return res.json({ success: false,error:error });
        }
    }
}