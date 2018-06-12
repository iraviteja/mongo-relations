const express = require("express");
const logger = require("morgan");
const bodyparser = require("body-parser");
const db = require("./dbconnect.js");

const app = express();

//middleware
app.use(logger("dev"));
app.use(bodyparser.json());

//Routes
const users = require("./routes/users");

//Routes
app.use("/users", users);

const port = process.env.PORT || 3000;
app.listen(port, err => {
  if (err) throw err;
  console.log(`server is running at port ${port}`);
});
