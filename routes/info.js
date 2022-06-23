const express = require("express");
const router = express.Router();

const Info = require("../models/info");

router.post("/", (req, res) => {
  let info = new Info({
    id: req.body.id,
    user: req.body.user,
    keyword: req.body.keyword,
    start: req.body.start,
    close: req.body.close,
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
