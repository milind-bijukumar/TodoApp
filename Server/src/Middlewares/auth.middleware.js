const jwt =require("jsonwebtoken");
const UserModel = require("../Model/user.model");
const verifyJWT = (req,res,next)=>{
    const token  = req.headers['access-token'];
    if(!token){
        return res.status(400).send({success:false, message:"Token not passed"});
    }
    jwt.verify(token,process.env.SECRET_KEY,async (err,payload)=>{
        if (err){
            return res.status(403).send({success:false, message:"You are not authenthicated this route"})
        }
        try{
            const userId = payload.userId;
            const userDetails = await UserModel.findById(userId);
            req.userDetails=userDetails;
            next();
        }catch(error){
            return res.status(500).send({message:"Internal Server Error"})
        }
    })
}
module.exports= {
    verifyJWT
}