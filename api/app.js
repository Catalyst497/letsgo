const express = require("express");
const app = express();
const cors = require("cors");
const https = require("https");
const adminRoutes = require("./routes/adminRoutes")
const appRoutes = require("./routes/appRoutes")


require("dotenv").config();

const connectDB = require("./database");
connectDB();

app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

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



app.use("/admin", adminRoutes)
app.use(appRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = 3000;
app.listen(PORT, function () {
  console.log("Online");
});
