const express = require("express");
const app = express();
const PORT = 3000;

app.get("/api/test", (req, res) => {
  res.status(200).json({
    message: "Duy oc cho!",
  });
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
