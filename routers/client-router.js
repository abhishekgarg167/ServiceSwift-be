var express = require("express");
var clientProfile = require("../controllers/clientProfile")
var postReq = require("../controllers/postReq")

var app = express.Router();

app.post("/profile", clientProfile.doSaveProviderProfile);
app.post("/profile-update", clientProfile.doUpdateProviderProfile);
app.post("/profile-fill", clientProfile.dofind);
app.post("/post-req", postReq.doSavePostReq);

module.exports = app;
