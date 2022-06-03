const User = require("../models/User");
const bcrypt = require("bcrypt");

const loginController = async (req,res) => {
    try {   
        const user = await User.findOne({email:req.body.email});
        if(!user) {
            return res.status(404).json({message:"User couldn't be found"});
        }
        if (!await bcrypt.compare(req.body.password,user.password)){
            return res.status(400).json({message:"Password is incorrect"});
        }
        res.status(200).json(user);

    }catch(err){
        res.status(400).json({message:err.message});
    }   
} 
module.exports = loginController;