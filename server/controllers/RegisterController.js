const User = require("../models/User");
const bcrypt = require("bcrypt");
const Company = require("../models/Company");
const Customer = require("../models/Customer");


const registerCompanyControllerPost = async (req,res) => {
    try{
        const exstEmail = await User.findOne({email:req.body.email});
        const exstUsername = await User.findOne({username:req.body.username});
        if(exstEmail){
            return res.status(400).json({message:"This email has been already taken"});
        }
        if(exstUsername){
            return res.status(400).json({message:"This username has been already taken"});
        }
        const password = await bcrypt.hash(req.body.password,10);
        
        // const cpassword = req.body.cpassword;
        // const password = "";
        // if (fpassword === cpassword){
        //     password = bcrypt.hash(cpassword,10);
        // }
        // else {
        //     return res.status(401).json({message:err.message});
        // }
        const newCo = await Company.create({
            company_name:req.body.company_name,
            //established_date:req.body.established_date,
            address:{
                country:req.body.country,
                city:req.body.city,
                street:req.body.street,
                zip:req.body.zip
            }
        })
        const newCoUser = await User.create({
            username:req.body.username,
            email:req.body.email,
            password:password,
            onType:"Company",
            acc_type:newCo.id
        })
        res.status(201).json(newCoUser);
        
    }catch(err){
        res.status(401).json({message:err.message});
    }
}


const registerCustomerControllerPost = async (req,res) => {
    try{
        const exstEmail = await User.findOne({email:req.body.email});
        if(exstEmail) {
            return res.status(400).json({message:"This email has been already taken"});
        }
        const exstsUsername = await User.findOne({username:req.body.username});
        if(exstsUsername){
            return res.status(400).json({message:"This username has been already taken"});
        }
        const password = await bcrypt.hash(req.body.password,10);
        const newCust = await Customer.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            address:{
                country:req.body.country,
                city:req.body.city,
                street:req.body.street,
                zip:req.body.zip
            }
        })
        const newCustUser = await User.create({
            username:req.body.username,
            email:req.body.email,
            password:password,
            onType:"Customer",
            acc_type:newCust._id
        })
        console.log(newCustUser);
        res.status(201).json(newCustUser);
        


    }catch(err){
        res.status(400).json({message:err.message});
    }

}






module.exports = {registerCompanyControllerPost,registerCustomerControllerPost};