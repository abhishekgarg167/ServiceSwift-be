var mongoose = require("mongoose");
function getPostReqSchema() {
  var SchemaClass = mongoose.Schema;
  var colSchema = new SchemaClass(
    {
      email: String,
      category: String,
      taskDetails: String,
      upToDate: String,
      location: String,
      contact: String,
      dos: { type: Date, default: Date.now },
    },
    {
      versionKey: false, // to avoid __v field in table come by default
    }
  );

  var userColRef = mongoose.model("postReq", colSchema);
  return userColRef;
}
module.exports = getPostReqSchema;
