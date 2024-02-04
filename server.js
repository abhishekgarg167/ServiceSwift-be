var express = require("express");
var mongoose = require("mongoose");
var userRouter = require("./routers/user.router");
var clientRouter= require("./routers/client-router");
var providerRouter= require("./routers/provider-router");
var cors = require("cors");
var fileupload=require("express-fileupload");
var env=require("dotenv")

var app = express();
app.use(fileupload());
env.config()
// app.use('/uploads', express.static('/Users/tnluser/Documents/FDrive/mern/be/uploads'));

app.use(cors());
app.use(express.json({extended:true}))
app.use('/uploads',express.static('uploads'))

app.listen(3003, () => {
  console.log("Server Started...");
});


app.use("/user",userRouter);
app.use("/client",clientRouter);
app.use("/provider",providerRouter);


//---------------------------------------------
var configObj = require("./config/dbconfig");
const dburl = configObj.dburl;

var dbCon = mongoose
  .connect(dburl)
  .then(() => {
    console.log("Connected...");
  })
  .catch((err) => {
    console.log(err.toString());
  });
