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
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
