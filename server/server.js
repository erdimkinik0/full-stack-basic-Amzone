if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

//server configs
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({origin:"http://localhost:3000",methods:['GET','POST','DELETE','UPDATE','PUT','PATCH']}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/uploads" , express.static("uploads"))

// db configs
const mongoose = require("mongoose");
mongoose.connect(process.env.CLOUD_URL,{useNewUrlParser:true,useUnifiedTopology:true});
const db = mongoose.connection;
db.on("error",console.error.bind(console,"Server couldn't connect to cloud"));
db.once("open",() => {
    console.log("Server has connected to cloud successfully");
})

// tools init
const jwt = require("jsonwebtoken");


// routes init
const productsRouter = require("./routes/products");
const advertsRouter = require("./routes/adverts");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/orders");


// routes
app.use("/products",productsRouter) // 
app.use("/adverts",advertsRouter);
app.use("/cart",authorizatedToken,cartRouter);
app.use("/orders",authorizatedToken,orderRouter); 





function authorizatedToken (req,res,next) {
    const bearerHeader = req.headers["authorization"];
    if(bearerHeader === null || bearerHeader === "undefined"){
        return res.status(404).json({message:"There is no Authorization Header on request"});
    }
    const token = bearerHeader.split(" ")[1];
    if (token === null || token === "undefined"){
        return res.status(404).json({message:"There is no token o header"});
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user) => {
        if (err){
            return res.status(403).json({message:err.message})
        }
        req.user = user;
        next();
    })
}

app.get("/",(req,res) => {
    res.json("RESTful server");
})







app.listen(process.env.SERVER_PORT);
