var mongoose = require("mongoose");
function getProviderSchema() {
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
      category: String,
      expertIn: String,
      experience: String,
      officeAddress: String,
      info: String,
      dos: { type: Date, default: Date.now },
    },
    {
      versionKey: false, // to avoid __v field in table come by default
    }
  );

  var userColRef = mongoose.model("providerProfile", colSchema);
  return userColRef;
}
module.exports = getProviderSchema;
