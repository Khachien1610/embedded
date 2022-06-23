const express = require("express");
const app = express();

const db = require("./utils/db");
db.connect();

const userRoute = require("./routes/user");

app.use(express.json());

app.use("/api/users/", userRoute);

app.use((req, res, next) => {
  res.status(404).send({
    message: "Not Found",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App is listening!`);
});
