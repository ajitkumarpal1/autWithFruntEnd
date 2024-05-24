
const userInterface = {
    home:(req,res,next)=>{
        res.render("home")
    },
    signIn:(req,res,next)=>{
        res.render("user_sign_in",{
            layout:false
        })
    }
    ,
    signUp:(req,res,next)=>{
        res.render("user_sign_up",{
            layout:false
        })
    },
    forgotpassword:(req,res,next)=>{
        res.render("forgoten_password",{
            layout:false
        })
    },
    verify:(req,res,next)=>{
        res.render("otpVar",{
            layout:false
        })
    },
    resetpassword:(req,res,next)=>{
        res.render("resetpassword",{
            layout:false
        })
    }
}
export default userInterface