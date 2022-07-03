const express = require("express");
const app = express();

const db = require("./utils/db");
db.connect();

const infoRoute = require("./routes/info");
const userRoute = require("./routes/user");

app.use(express.json());

app.use("/api/infos/", infoRoute);
app.use("/api/users/", userRoute);

app.use((req, res, next) => {
  res.status(404).send({
    message: "Not Found",
  });
});

// process.env.PORT
app.listen(process.env.PORT, () => {
  console.log(`App is listening!`);
});
