const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Info = new Schema(
  {
    id: String,
    user: String,
    keyword: String,
    start: String,
    close: String,
  },
  {
    collection: "infos",
  }
);

module.exports = mongoose.model("Info", Info);
