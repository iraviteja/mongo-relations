const mongoose = require("mongoose");

module.export = mongoose.connect(
  "mongodb://localhost/mongo-relations",
  err => {
    if (err) throw err;
    console.log("Database connected");
  }
);
