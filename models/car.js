const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
  make: {
    type: String
  },
  model: {
    type: number
  },
  year: {
    type: number
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

model.export = mongoose.model("car", carSchema);
