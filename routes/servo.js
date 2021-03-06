const express = require("express");
const router = express.Router();

const mqtt = require("mqtt");
const { v4: uuidv4 } = require("uuid");
const Pi = require("../models/pi");

// Config
const host = "broker.emqx.io";
const port = "1883";
const clientId = `nodejs_${uuidv4()}`;
const topicServo = "/mqtt/servo";
const topicRegister = "mqtt/register";
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
  client.subscribe([topicRegister], () => {
    console.log(`Subscribe to topic '${topicRegister}'`);
  });
});

// Message
client.on("message", async (topic, payload) => {
  let data = JSON.parse(payload.toString());
  let pi = await Pi.findOne({ serial: data.serial });
  if (!pi) {
    let pi = new Pi({
      serial: data.serial,
      rooms: data.rooms,
      floor: data.floor,
    });
    pi.save();
  }
});

router.post("/on", (req, res) => {
  let data = {
    serial: req.body.serial,
    room: req.body.room,
    active: true,
  };
  client.publish(
    topicServo,
    JSON.stringify(data),
    { qos: 0, retain: false },
    (error) => {
      if (error) {
        console.error(error);
      }
      res.status(200).json({
        message: "Serve is on",
        data: null,
      });
    }
  );
});

router.post("/off", (req, res) => {
  let data = {
    serial: req.body.serial,
    room: req.body.room,
    active: false,
  };
  client.publish(
    topicServo,
    JSON.stringify(data),
    { qos: 0, retain: false },
    (error) => {
      if (error) {
        console.error(error);
      }
      res.status(200).json({
        message: "Serve is off",
        data: null,
      });
    }
  );
});

module.exports = router;
