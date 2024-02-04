var getUserSchema = require("../models/user.model");

var path = require("path");
var userColRef = getUserSchema(); //call
var webtoken = require("jsonwebtoken");

async function doLogin(req, resp) {
  let email = req.body.email;
  let pwd = req.body.pwd;
  //     console.log(req.body)
  const count = await userColRef.find({ email: email }).count();

  if (count == 0) {
    resp.json({ status: false, message: "Invalid User Id" });
    return;
  }

  const user = await userColRef.findOne({ email, pwd });
  console.log(user);
  const token = webtoken.sign({ user }, process.env.s_key, {
    expiresIn: 60 * 2,
  });
  console.log(token);
  var du = webtoken.decode(token);
  console.log(du);
  if (user != null) {
    resp.json({ status: true, user, token, message: "Logged in" });
  } else {
    resp.json({ status: false, message: "Invalid Password" });
    return;
  }
}

async function doSignup(req, resp) {
  console.log(req.body);

  var obj = new userColRef(req.body);

  await obj
    .save()
    .then((doc) => {
      resp.send("Signedup");
    })
    .catch((err) => {
      resp.send(err.message);
    });
}

async function currentuser(req, resp) {
  console.log("currentuser");
  const count = await userColRef.find({ email: req.email }).count();
  if (count == 0) {
    resp.json({ status: false, message: "Invalid User Id" });
    return;
  } else {
    const user = await userColRef.findOne({ email: req.email });
    resp.json({ status: true, message: "Ok User Id", user });
    return;
  }
}

module.exports = {
  doSignup,
  doLogin,
  currentuser,
};
