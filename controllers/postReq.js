var getPostReqSchema = require("../models/postReqModal");
var path = require("path");
var postReqRef = getPostReqSchema(); //call

async function doSavePostReq(req, resp) {
  console.log(req.body);

  var obj = new postReqRef(req.body);

  await obj
    .save()
    .then((doc) => {
      resp.send("Request Posted");
    })
    .catch((err) => {
      resp.send(err.message);
    });
}

module.exports = {
  doSavePostReq
};
