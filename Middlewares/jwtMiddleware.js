// importing jwt
const jwt = require("jsonwebtoken")

//router specific middlewear
const jwtmiddlewear=(req,res,next)=>{
    console.log("inside jwt middlewear")
    //logic
    //verify token
    //1)first access token
    const token = req.headers['authorization'].split(' ')[1]
    console.log(token)
    try{
        //verify by using verify() method
        //first argument as the token and the second argument as secret key from  usercontroller
        const jwtResponse = jwt.verify(token,"supersecretkey1234")
        console.log(jwtResponse)
        //we used to create a key for sending userid to controller
//we create a key just we create req,paylod key may be anything
req.payload=jwtResponse.user //here we use userId because we get id in userId key in the controller
next()

    }catch(err){
        res.status(401).json("Autherization failed...please login")
    }
  //next() here we place next control returns to controller when an error occured that is if in the case of authentication failed
}
module.exports=jwtmiddlewear