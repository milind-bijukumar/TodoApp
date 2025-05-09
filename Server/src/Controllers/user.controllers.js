
const UserModel = require("../Model/user.model");
const jwt =require("jsonwebtoken");
const bcrypt = require('bcrypt');
//Controller for Register
const onRegister= async (req,res)=>{
    const{name,email,password}= req.body;
    if(!name || !email || !password){
       return res.status(400).send({success:false, message:"Missing Fields for Register"});
    }
    try{

        const existingUser = await UserModel.findOne({email:email});
        if(existingUser){
          return res.status(400).send({success:false, message:"User already Present with provided Email id"})
        }
        //Salting
        const salt = await bcrypt.genSaltSync(10);
        //Hashing
        const hashedPassword = await bcrypt.hashSync(password,salt)
        //updating password with hased password
        req.body.password=hashedPassword;
        
        const newUser= new UserModel(req.body);
        await newUser.save();
        return res.status(201).send({success:true, message:"Registeration Successful, Please Login"});

    }catch(err){
        return res.status(500).send({message:"Internal Server Error",error:err})
    }
}
//Controller for Login
const onLogin = async (req,res)=>{

    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).send({success:false, message:"Either Email or Password is missing"});
    }
    try{
        const existingUser = await UserModel.findOne({email:email});
        if(!existingUser){
            return res.status(400).send({success:false, message:"User with provided Email id not Present"})
        }
        //Coverting input passwrod to hashpassword and comparing it with stored password
        const hashCorrectedPassword = existingUser.password;
        const isPasswordValid = bcrypt.compareSync(password,hashCorrectedPassword)
        if(!isPasswordValid){
            return res.status(400).send({success:false, message:"Invalid password"})
        }
        const token = jwt.sign({userId:existingUser._id},process.env.SECRET_KEY);
        return res.status(201).send({
            success:true, 
            message:"Login Successful",
            accessToken:token
        });
    }catch(err){
        return res.status(500).send({message:"Internal Server Error"})
    }
}
module.exports = {onRegister, onLogin}