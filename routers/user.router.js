var express = require("express");
var userController = require("../controllers/user.controller");
var auth=require("../middleware/auth")
// var auth=require("../middleware/auth")

var app = express.Router();

app.post("/signup-process", userController.doSignup);
app.post("/login-process", userController.doLogin);
app.get("/currentUser",auth.jawth, userController.currentuser);

module.exports = app;
