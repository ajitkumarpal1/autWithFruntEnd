import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { match } from "assert";
import { type } from "os";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user name is requires"],
    maxLength: [30, "user name can't exceed 30 characters"],
    minLength: [2, "name should have atleast 2 charcters"],
  },
  email: {
    type: String,
    required: [true, "user email is requires"],
    unique: true,
    validate: [validator.isEmail, "pls enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    select: false,
  },
  status:{
    type:Boolean,
    default:false
  },
  tampOtp:{
    type:Number,
    default:Math.floor(1000 + Math.random() * 9000)
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  //  hash user password before saving using bcrypt
  if (!this.isModified("password")) {
    console.log(this)
    next();
  }
  console.log(this)
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_Secret, {
    expiresIn: process.env.JWT_Expire,
  });
};
// user password compare
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// generatePasswordResetToken
userSchema.methods.getResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hashing and updating user resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
