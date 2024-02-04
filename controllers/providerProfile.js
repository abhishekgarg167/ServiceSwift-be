var getProviderSchema = require("../models/providerProfileModel");
var path = require("path");
var providerProfileRef = getProviderSchema(); //call

async function doSaveProviderProfile(req, resp) {
  console.log(req.body);

  var obj = new providerProfileRef(req.body);
  const idPic = req.files?.idPic;
  let idPicPath = "";
  if (idPic) {
    idPicPath = path.join(__dirname, "..", "uploads", idPic.name);
    idPic.mv(idPicPath);
  }

  req.body.idPic = idPic?.name;

  var obj = new providerProfileRef(req.body);
  console.log(req.body);

  await obj
    .save()
    .then((doc) => {
      resp.send("Profile Data Saved");
    })
    .catch((err) => {
      resp.send(err.message);
    });
}

async function doUpdateProviderProfile(req, resp) {
  console.log(req.body);

  const {
    email,
    name,
    phone,
    address,
    city,
    category,
    expertIn,
    experience,
    officeAddress,
    info,
  } = req.body;
  const profilePic = req.files?.profilePic;
  const idPic = req.files?.idPic;
  let profilePicPath = "";
  if (profilePic) {
    profilePicPath = path.join(__dirname, "..", "uploads", profilePic.name);
    profilePic.mv(profilePicPath);
  }
  let idPicPath = "";
  if (idPic) {
    idPicPath = path.join(__dirname, "..", "uploads", idPic.name);
    idPic.mv(idPicPath);
  }

  const updateData = {
    name,
    phone,
    address,
    city,
    category,
    expertIn,
    experience,
    officeAddress,
    info,
  };

  if (profilePic) {
    updateData.profilePic = profilePic.name;
  }
  if (idPic) {
    updateData.idPic = idPic.name;
  }

  await providerProfileRef
    .updateOne({ email }, { $set: updateData })
    .then((doc) => {
      resp.send("Profile Data Saved");
    })
    .catch((err) => {
      resp.send(err.message);
    });
}

async function dofind(req, resp) {
  console.log(req.body);

  await providerProfileRef
    .findOne({ email: req.body.email })
    .then((doc) => {
      resp.send(doc);
    })
    .catch((err) => {
      resp.send(err.message);
    });
}

async function fetchCities(req, resp) {
  try {
    const distinctCities = await providerProfileRef.distinct("city");
    resp.json(distinctCities);
  } catch (error) {
    resp.status(500).send(error.message);
  }
}
async function fetchCategories(req, resp) {
  try {
    const distinctCategories = await providerProfileRef.distinct("category");
    resp.json(distinctCategories);
  } catch (error) {
    resp.status(500).send(error.message);
  }
}

async function fetchProviders(req, resp) {
  console.log(req.body);
  try {
    const providersInfo = await providerProfileRef.find({
      category: req.body.category,
      city: req.body.city,
    });
    resp.json(providersInfo);
  } catch (error) {
    resp.status(500).send(error.message);
  }
}

module.exports = {
  doSaveProviderProfile,
  doUpdateProviderProfile,
  dofind,
  fetchCities,
  fetchCategories,
  fetchProviders,
};
