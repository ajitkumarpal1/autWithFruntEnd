import 'dotenv/config'
import express from "express";
import { connectDB } from './config/mongoose.js';
import cookieParser from "cookie-parser";
import expressLayout from "express-ejs-layouts"
import router from './routes/index.js';

import {
    errorHandlerMiddleware,
    handleUncaughtError,
  } from "./middlewares/errorHandlerMiddleware.js";
const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.set('view engine', 'ejs');
app.use(expressLayout)

app.use("/",router)
// errorHandlerMiddleware
app.use(errorHandlerMiddleware);

app.listen(process.env.port,(error)=>{
    if(!error){
        console.log("port is runig on port "+process.env.port)
        connectDB()
    }else{
        console.log("portError => "+error)
    }
    
})