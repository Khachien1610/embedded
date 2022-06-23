const mongoose = require("mongoose");

function connect() {
  try {
    mongoose.connect(
      "mongodb+srv://test:al31DuFTECvrytZd@cluster-0.39ey24n.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connect DB successfully");
  } catch (err) {
    console.log(err);
  }
}

module.exports = { connect };
