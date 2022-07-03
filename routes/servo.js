const express = require("express");
const router = express.Router();

const mqtt = require("mqtt");
const { v4: uuidv4 } = require("uuid");

// Config
const host = "broker.emqx.io";
const port = "1883";
const clientId = `nodejs_${uuidv4()}`;
const topic = "/mqtt/servo";
const username = "emqx";
const password = "public";

// Connect
const connectUrl = `mqtt://${host}:${port}`;
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: username,
  password: password,
  reconnectPeriod: 1000,
});

client.on("connect", function () {
  console.log("MQTT connected");
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`);
  });
});

router.get("/on", (req, res) => {
  client.publish(topic, "servo on", { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error);
    }
    res.status(200).json({
      message: "Serve is on",
      data: null,
    });
  });
});

router.get("/off", (req, res) => {
  client.publish(topic, "servo off", { qos: 0, retain: false }, (error) => {
    if (error) {
      console.error(error);
    }
    res.status(200).json({
      message: "Serve is off",
      data: null,
    });
  });
});

module.exports = router;
