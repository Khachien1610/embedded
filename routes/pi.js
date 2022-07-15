const express = require("express");
const router = express.Router();

const Pi = require("../models/pi");

router.get("/", (req, res) => {
  Pi.find({})
    .then((data) => {
      res.status(200).json({
        message: "Get list successfully!",
        data,
      });
    })
    .catch((err) => console.log(err));
});
module.exports = router;
