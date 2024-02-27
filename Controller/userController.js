// import modal
const users = require('../Models/userSchema')

//import jwt
//to ensure proper login  and gave secret code to user
const jwt = require('jsonwebtoken')


// logic for register
exports.register = async(req,res)=>{
    console.log("inside userController-register logic");

    const {username, email, password} = req.body
    
    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            // so we are sending a response in the 400 series
            res.status(406).json('account already exist... please login')

        }else{
            // if finOne returns null, it mean the email or the user does not exist in the databse
            // 1) we register the user

            const newUser = new users({
                username,
                email,
                password,
            })

            // 2) add the object use save() method in mongoose

            await newUser.save()

            // response
            res.status(200).json(newUser)

            }
    } catch (error) {
        res.status(401).json('register request FAILED due to',err)
    }
}
