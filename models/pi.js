const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pi = new Schema(
  {
    serial: String,
    rooms: [String],
    floor: String,
  },
  {
    collection: "pis",
  }
);

module.exports = mongoose.model("Pi", Pi);
