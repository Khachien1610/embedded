const express = require("express");
const app = express();

app.get("/api/test", (req, res) => {
  res.status(200).json({
    message: "Duy oc cho!",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App is listening!`);
});
