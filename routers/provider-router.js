var express = require("express");
var providerProfile = require("../controllers/providerProfile")

var app = express.Router();

app.post("/profile", providerProfile.doSaveProviderProfile);
app.post("/profile-update", providerProfile.doUpdateProviderProfile);
app.post("/profile-fill", providerProfile.dofind);
app.post("/fetch-cities", providerProfile.fetchCities);
app.post("/fetch-categories", providerProfile.fetchCategories);
app.post("/fetch-providers", providerProfile.fetchProviders);

module.exports = app;
