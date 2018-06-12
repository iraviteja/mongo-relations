const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  make: {
    type: String
  },
  model: {
    type: String
  },
  year: {
    type: Number
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = mongoose.model("car", carSchema);
