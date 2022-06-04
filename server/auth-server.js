if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

// server configs
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors(
    {origin: 'http://localhost:3000',methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// db configs
const mongoose = require("mongoose");
mongoose.connect(process.env.CLOUD_URL,{useNewUrlParser:true,useUnifiedTopology:true});
const db = mongoose.connection;
db.on("error",console.error.bind(console,"Auth Server Couldn't connect to cloud"));
db.once("open",() => {
    console.log("Auth Server has connected succesfully");
})

// tools inits
const jwt = require("jsonwebtoken");

// models
const Token = require("./models/Token");

//routes init
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const tokenRouter = require("./routes/token");


// routes
app.use("/register",registerRouter)
app.use("/login",loginRouter);
app.use("/token",tokenRouter);
app.delete("/logout",async (req,res) => {
    try{
        const refreshToken = req.body.token;
        const deletedToken = await Token.deleteOne({token:refreshToken});
        res.json(deletedToken);
    }catch(err){
        res.status(400).json({message:err.message});
    }
})

function authenticatedToken(req,res,next){
    const bearerHeader = req.headers["authorization"];
    if(!bearerHeader){
        return res.status(400).json({message:"There is no authorization"})
    }
    const token = bearerHeader.split(" ")[1];
    if(!token){
        return res.status(404).json({message:"There is no token"});
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        if(err){
            return res.status(403).json({message:err.message})
        }
        req.user = user;
        next();
    })
}

app.get("/",(req,res) => {
    res.json("Auth Server")
})




app.listen(process.env.AUTH_SERVER_PORT);
