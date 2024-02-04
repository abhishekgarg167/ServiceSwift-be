var mongoose = require("mongoose");
function getClientSchema() {
  var SchemaClass = mongoose.Schema;
  var colSchema = new SchemaClass(
    {
      email: { type: String, required: true, unique: true, index: true },
      name: String,
      phone: String,
      address: String,
      city: String,
      profilePic: String,
      idPic: String,
      dos: { type: Date, default: Date.now },
    },
    {
      versionKey: false, // to avoid __v field in table come by default
    }
  );

  var userColRef = mongoose.model("clientProfile", colSchema);
  return userColRef;
}
module.exports = getClientSchema;
