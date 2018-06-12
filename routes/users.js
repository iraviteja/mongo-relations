const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router
  .route("/")
  //   Callbacks
  //   .get((req, res, next) => {
  //     User.find({}, (err, users) => {
  //       if (err) throw err;
  //       console.log(users);
  //     });
  //     res.status(200).json({ message: "This is home router" });
  //   })

  //   Promises
  //   .get((req, res, next) => {
  //     User.find({})
  //       .then(users => {
  //         res.json(users);
  //       })
  //       .catch(err => {
  //         next(err);
  //       });
  //   })

  //   Async/Await (Promises)
  .get(async (req, res, next) => {
    const users = await User.find({});
    res.json(users);
  })

  //   Callbacks
  //   .post((req, res, next) => {
  //     const newuser = new User(req.body);
  //     newuser.save((err, user) => {
  //       if (err) throw err;
  //       res.json(user);
  //     });
  //   });

  //   Promises
  //   .post((req, res, err) => {
  //     const newuser = new User(req.body);
  //     newuser
  //       .save()
  //       .then(user => {
  //         res.json(user);
  //       })
  //       .catch(err => {
  //         next(err);
  //       });
  //   });

  //   Async/Await (Promises)
  .post(async (req, res, next) => {
    const newuser = new User(req.body);
    const user = await newuser.save();
    res.json(user);
  });

router.route("/:userId").get(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  res.status(200).json(user);
});

module.exports = router;
