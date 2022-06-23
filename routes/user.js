const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/", (req, res) => {
  let user = new User(req.body);
  user.save();
});

module.exports = router;
