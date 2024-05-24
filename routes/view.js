import express from "express";
import userInterface from "../cotrollers/ui_controller.js";
import { auth } from "../middlewares/auth.js";
const viewRouter = express.Router();

viewRouter.get("",auth,userInterface.home)
viewRouter.get("/signin",userInterface.signIn)
viewRouter.get("/signup",userInterface.signUp)
viewRouter.get("/forgot-password",userInterface.forgotpassword)
viewRouter.get("/verify",userInterface.verify)
viewRouter.get("/resetpassword",userInterface.resetpassword)


export default viewRouter