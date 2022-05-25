if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

//server configs
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// db configs
const mongoose = require("mongoose");
mongoose.connect(process.env.CLOUD_URL,{useNewUrlParser:true,useUnifiedTopology:true});
const db = mongoose.connection;
db.on("error",console.error.bind(console,"Server couldn't connect to cloud"));
db.once("open",() => {
    console.log("Server has connected to cloud successfully");
})

//models



//routes



app.get("/",(req,res) => {
    res.json("RESTful server");
})

app.listen(process.env.SERVER_PORT);
