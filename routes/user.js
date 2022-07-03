const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const verifyToken = require("../middlewares/auth");
const user = require("../models/user");

router.post("/sign-up", async (req, res) => {
  let passwordHash = await bcrypt.hash(req.body.password, saltRounds);

  let user = new User({
    username: req.body.username,
    password: passwordHash,
    email: req.body.email,
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

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(404).json({
      message: "User not found!",
      data: null,
    });
  }

  let checkPassword = await bcrypt.compare(req.body.password, user.password);
  if (!checkPassword) {
    return res.status(401).json({
      message: "Password incorrect!",
      data: null,
    });
  }

  const accessToken = jwt.sign(
    { id: user._id, username: user.username },
    "mysecret",
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({
    message: "Login successfully!",
    accessToken: accessToken,
    userId: user._id,
    data: null,
  });
});

router.get("/:id", (req, res) => {
  User.findById({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({
        message: "Get successfully!",
        data: {
          _id: data._id,
          username: data.username,
          email: data.email,
        },
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
