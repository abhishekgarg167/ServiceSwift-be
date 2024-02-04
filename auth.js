var express = require("express");
var jsonwebtoken = require("jsonwebtoken");
var app = express();
app.use(express.json());
var dotenv = require("dotenv");

dotenv.config();

app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, resp) => {
  console.log(process.env.s_key);
  var { email, pwd } = req.body;
  console.log(email);
  console.log(pwd);
  try {
    var token = jsonwebtoken.sign({ email, pwd }, process.env.s_key, {
      expiresIn: 60 * 1,
    });
    resp.json({ message: "Successful", token: token });
  } catch (err) {
    resp.json({ message: "Error", error: err.message });
  }
});

app.post("/decode", (req, resp) => {
  try {
    var token = req.body.token;
    var decodedToken = jsonwebtoken.decode(token, process.env.s_key);
    resp
      .status(200)
      .json({ message: "Successfully decoded", data: decodedToken });
  } catch (err) {
    resp.status(500).json({ message: "Server error", error: err });
  }
});

app.post("/verify", (req, resp) => {
  try {
    var token = req.body.token;
    var decodedToken = jsonwebtoken.verify(token, process.env.s_key);
    resp
      .status(200)
      .json({ message: "Successfully Verified", data: decodedToken });
  } catch (err) {
    resp.status(500).json({ message: "Token Expired", error: err });
  }
});

app.listen(8004, function () {
  console.log("Server Started");
});
