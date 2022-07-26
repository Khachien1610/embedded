const express = require("express");
const app = express();

const db = require("./utils/db");
db.connect();

const userRoute = require("./routes/user");
const servoRoute = require("./routes/servo");
const piRoute = require("./routes/pi");

app.use(express.json());

app.use("/api/users/", userRoute);
app.use("/api/servos/", servoRoute);
app.use("/api/pis/", piRoute);

app.use((req, res, next) => {
  res.status(404).send({
    message: "Not Found",
  });
});

// process.env.PORT
app.listen(process.env.PORT, () => {
  console.log(`App is listening!`);
});
