var getClientSchema = require("../models/clientProfileModal");
var path = require("path");
var clientProfileRef = getClientSchema(); //call

async function doSaveProviderProfile(req, resp) {
  console.log(req.body);

  var obj = new clientProfileRef(req.body);
  const profilePic = req.files?.profilePic;
  let profilePicPath=""
  if (profilePic) {
    profilePicPath = path.join(
      __dirname,
      "..",
      "uploads",
      profilePic.name
    );
    profilePic.mv(profilePicPath);
  }

  const idPic = req.files?.idPic;
  let idPicPath=""
  if (idPic) {
    idPicPath = path.join(
      __dirname,
      "..",
      "uploads",
      idPic.name
    );
    profilePic.mv(idPicPath);
  }

  req.body.profilePic = profilePic.name;
  req.body.idPic = idPic.name;

  var obj = new clientProfileRef(req.body);
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

  const { email, name, phone, address, city } = req.body;
  const profilePic = req.files?.profilePic;
  const idPic = req.files?.idPic;
  let profilePicPath =""
  if (profilePic) {
    profilePicPath = path.join(
      __dirname,
      "..",
      "uploads",
      profilePic.name
    );
    profilePic.mv(profilePicPath);
  }
  let idPicPath=""
  if (idPic) {
    idPicPath = path.join(__dirname, "..", "uploads", idPic.name);
    idPic.mv(idPicPath);
  }

  const updateData = {
    name,
    phone,
    address,
    city,
  };

  if (profilePic) {
    updateData.profilePic = profilePic.name;
  }
  if (idPic) {
    updateData.idPic = idPic.name;
  }

  await clientProfileRef
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

  await clientProfileRef
    .findOne({ email: req.body.email })
    .then((doc) => {
      resp.send(doc);
    })
    .catch((err) => {
      resp.send(err.message);
    });
}

module.exports = {
  doSaveProviderProfile,
  doUpdateProviderProfile,
  dofind,
};
