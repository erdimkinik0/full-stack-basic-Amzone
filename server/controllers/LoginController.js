const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Token = require("../models/Token");


const tokenController = async (req,res) => {
    try{
        const refreshToken = req.body.token;
        if(refreshToken == null){
            return res.status(404).json({message:"token not found"});
        }
        const dbToken = await Token.findOne({token:refreshToken});
        if(dbToken == null){
            return res.status(404).json({message:"token not found (maybe logged out)"});
        }
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,user) => {
            if (err){
                return res.status(400).json({message:err.message});
            } 
            const parsedUser = user.user;
            const accessToken = generateAccessToken(parsedUser);
            res.status(200).json({accessToken:accessToken});
            
        })
    }catch(err){
        res.status(404).json({mongoose:err.message});
    }
    
}
const loginController = async (req,res) => {
    try {   
        const user = await User.findOne({email:req.body.email});
        if(!user) {
            return res.status(404).json({message:"User couldn't be found"});
        }
        if (!await bcrypt.compare(req.body.password,user.password)){
            return res.status(400).json({message:"Password is incorrect"});
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = jwt.sign({user:user},process.env.REFRESH_TOKEN_SECRET);
        await Token.create({token:refreshToken});
        res.status(200).json(
            {
                accessToken:accessToken,
                refreshToken:refreshToken
            }
            );
    }catch(err){
        res.status(400).json({message:err.message});
    }   
} 
function generateAccessToken(user){
    return jwt.sign({user:user},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"30m"});
}
module.exports = {loginController,tokenController};