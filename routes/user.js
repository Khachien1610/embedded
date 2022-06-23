const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/", (req, res) => {
  let user = new User({
    name: req.body.name,
    password: req.body.password,
  });
  user
    .save()
    .then(() => {
      res.status(201).json({
        message: "Create successfully!",
        data: null,
      });
    })
    .catch((err) => console.log(err));
});

router.get("/", (req, res) => {
  User.find({})
    .then((data) => {
      res.status(200).json({
        message: "Get list successfully",
        data,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
