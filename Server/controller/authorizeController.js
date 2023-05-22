const User = require('../models/user')
const Token = require('../models/token')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const util = require('util')


const signToken = id => {
    return jwt.sign({id}, "secret", {expiresIn: "1h"})
}

const tokenResponse = (user, statuscode, res) => {
    const token = signToken(user._id)
    res.status(statuscode).json({
        Status: "success",
        token,
        data: {
            user: user
        }
    })
}
const register = async (req, res, next) => {
    const registerResponse = req.body
    const existingUser = await User.findOne({email: registerResponse.email})
    const mailOptions={
        from :"My Psychiatrist",
        to : "Verify Email first",
        subject: "You can join a chat room to get counseling",
        html:`
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: teal;">Join the chat room</h2>
        <pYou can join and chat with the psychiatrist and get counseling after payment using roomId: 123
        </p>
        
        <a href="http://localhost:3000/room" style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Room</a>
      
        <p>If the button doesn't work for any reason, you can also click on the link below:</p>
      
        <div>Join room using that room id: http://localhost:3000/room </div>
        </div>
        `
      }
    if(!existingUser){
        try{
            if(registerResponse.password === registerResponse.confirmPassword){
                registerResponse.password = bcrypt.hashSync(registerResponse.password, 12)
                registerResponse.confirmPassword = bcrypt.hashSync(registerResponse.confirmPassword, 12)
                const registration = await new User(registerResponse).save()

                //code for email not verified

                if(registration.verified === false){  //checking if the use is verified
                    let tokens = await Token.findOne({userId: registration._id});  //finding the user based on its ID from Token
                    if(!tokens){ //Checking if token is available
                        tokens = await new Token({  //creating the new token for the user
                            userId: registration._id,  //giving user the ID
                            token: crypto.randomBytes(32).toString('hex')  //creating random token using the crypto package
                        }).save()

                        const url = `${process.env.BASE_URL}users/${registration._id}/verify/${tokens.token}`
                        
                        console.log(url)
                        await sendEmail(registration.email, `From. ${mailOptions.from}. Subject. ${mailOptions.subject}. to.${mailOptions.to}`, `Verify Email. ${url} .Room ID. ${mailOptions.html}`)
                        console.log("Email has been sent for verification")
                        return res.json("Email has been send for verification")
                    }
                }

                tokenResponse(registration, 200, res)
            }
        }catch(err){
          return res.json(err.message, "err")
        }
    }else{
        return res.json("User Already exist")
    }
}
const login = async (req, res, next) => {
    const loginObject = {
        email: req.body.email,
        password: req.body.password
    }
    if(!loginObject.email || !loginObject.password){
        return res.status(500).json("Input all fields")
    }
    const existingUser = await User.findOne({email: loginObject.email})
    if(!existingUser){
        return res.status(500).json("Register First")
    }
    else{
        try{
            if (existingUser.password, bcrypt.compareSync(loginObject.password, existingUser.password)){
                if(existingUser.verified === false){
                    return res.status(400).json("Verify user First")
                } else {
                    tokenResponse(existingUser, 200, res)
                }
            }else {
                return res.status(400).json("Incorrect Password");
            }
        }catch(err){
            res.json(err.message)
        }
        // return res.status(200).json("Logged in")
    }

}


// const resendVerification = async(req, res, next => {

// })

const verifiedVerification = async(req, res, next) => {
    try{
         const user = await User.findOne({_id: req.params.id})
         if(!user){
            return res.status(400).json({   message: "Invalid link "})
         } 
        const tokens = await Token.findOne({id: req.params.id, token: req.params.token})

        console.log(req.params.id)

         if(!tokens){
            return res.status(400).json({ message: "Invalid link" })
         }

            await User.findOneAndUpdate({_id: user._id}, {verified: true})
            await tokens.remove()
            res.status(200).json("email verified successful")

    }catch(err){
        return res.status(500).json({ message: "Internal Server Error", err})
    }
}
//token validation if user has logged in

const tokenValidation = async(req, res, next) => {
    let token //creating token variable
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){  //checking if headers.authorization starts with bearer
        token = req.headers.authorization.split(' ')[1];   //separating with the space and storing token value in index
    }
    if(!token){
        return res.status(400).json("Need login for this activity")  //error if there is no token value
    }
    try{
        const decode = await util.promisify(jwt.verify)(token, "secret")  //Validating token
        console.log(decode)
        const user = await User.findById(decode.id)  //finding the token based on id from token 
        if(!user){
            return res.status(400).json("no such user")  //checking if there is user 
        }
        req.user = user  //storing user details in req.user
        next()
    }catch(err){
        res.status(500).json("Internal Server error")
    }
}

const authorization = (...roles) => {  //storing the roles in array
    return(req, res, next)=>{
        if(!roles.includes(req.user.role)){  //checking if user role is in roles
            return next(res.json("this task cannot be performed"))
        }
        next()
    }
}

module.exports = {
    register,
    login,
    tokenValidation,
    verifiedVerification,
    authorization
}