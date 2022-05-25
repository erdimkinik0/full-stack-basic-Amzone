if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

// server configs
const express = require("express");
const app = express();
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


// models

app.get("/",(req,res) => {
    res.json("Auth Server")
})




app.listen(process.env.AUTH_SERVER_PORT);
