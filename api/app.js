const express = require("express");
const Order = require("./models/Order");
const app = express();
const cors = require("cors");
const https = require("https");

require("dotenv").config();

const connectDB = require("./database");
connectDB();

app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const initPayStackTransaction = () => {
  const params = JSON.stringify({
    email: "penman@email.com",
    amount: "20000",
  });

  const options = {
    hostname: "api.paystack.co",
    port: 443,
    path: "/transaction/initialize",
    method: "POST",
    headers: {
      Authorization: "Bearer SECRET_KEY",
      "Content-Type": "application/json",
    },
  };

  const req = https
    .request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log(JSON.parse(data));
      });
    })
    .on("error", (error) => {
      console.error(error);
    });

  req.write(params);
  req.end();
};


app.post("/bookform", async function (req, res) {
  try {
    const { email, fromCity, toCity, time } = req.body;
    const newFormData = new Order({
      email,
      fromCity,
      toCity,
      selectedTime: time,
    });
    await newFormData.save();
    res.status(201).json("Order Successful");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log("Online");
});
