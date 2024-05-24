import express from "express";
import { user } from "../cotrollers/users_controller.js";
const usersRouter = express.Router();

usersRouter.post("/signup",user.signup)
usersRouter.post("/signin",user.signin)
usersRouter.post("/:email/verify",user.verify)
usersRouter.get("/signout",user.signout)
usersRouter.post("/resetpassword",user.resetpassword)
usersRouter.post("/updatepasswors",user.updatepasswors)

export default usersRouter