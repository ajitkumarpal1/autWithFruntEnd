import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/errorHandler.js";
import UserModel from "../models/user.js";

export const auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.redirect('/signin');
  }
  const decodedData = await jwt.verify(token, process.env.JWT_Secret);
  if(decodedData){
    req.user = await UserModel.findById(decodedData.id);
    next();
  }else{
    return res.redirect('/signin');
  }
  
};
 
export const authByUserRole = (...roles) => {
  // Fix this middleware for admin access only
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          403,
          `Role: ${req.user.role} is not allowed to access this resource`
        )
      );
    }
    next();
  };
};
