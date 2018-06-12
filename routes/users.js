const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router
  .route("/")
  //   .get((req, res, next) => {
  //     User.find({}, (err, users) => {
  //       if (err) throw err;
  //       console.log(users);
  //     });
  //     res.status(200).json({ message: "This is home router" });
  //   })
  .get((req, res, next) => {
    User.find({})
      .then(users => {
        res.json(users);
      })
      .catch(err => {
        next(err);
      });
  })
  //   .post((req, res, next) => {
  //     const newuser = new User(req.body);
  //     newuser.save((err, user) => {
  //       if (err) throw err;
  //       res.json(user);
  //     });
  //   });
  .post((req, res, err) => {
    const newuser = new User(req.body);
    newuser
      .save()
      .then(user => {
        res.json(user);
      })
      .catch(err => {
        next(err);
      });
  });

module.exports = router;
