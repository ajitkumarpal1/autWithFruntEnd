import mongoose from "mongoose";
export function connectDB(){
    mongoose.connect(process.env.MONGODB_URI)
    .then((donnected)=>{
        console.log("DataBase is connected")
    }).catch((error)=>{
        console.log("DB connection error "+error)
    })   
}
