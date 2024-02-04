var webtoken = require("jsonwebtoken");
var jawth = (req, resp, next) => {
  const token = req.headers["authorization"].split(" ")[1];
  // authorizationHeader.split(' ')[1];
  console.log("token");
  console.log(token);
  let isValid;
  try {
    isValid = webtoken.verify(token, process.env.s_key);
  } catch (e) {
    console.log("token expired");
  }
  // console.log(isValid)
  // console.log(isValid.exp)
  const dt = Math.floor(Date.now() / 1000);
  console.log(dt);
  if (isValid) {
    const dtoken = webtoken.decode(token);
    req.email = dtoken.user.email;
    next();
  } else {
    resp.json({ status: false, message: "Invalid token" });
    return;
  }
};

module.exports = { jawth };
