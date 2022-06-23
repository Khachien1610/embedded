const express = require("express");
const router = express.Router();

const Info = require("../models/info");

router.post("/", (req, res) => {
  let info = new Info({
    name: req.body.name,
    password: req.body.password,
  });
  info
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
  Info.find({})
    .then((data) => {
      res.status(200).json({
        message: "Get list successfully",
        data,
      });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
