require("./config/config");
const mongoose = require("mongoose");

const express = require("express");
const path = require("path");
const app = express();
var cors = require("cors");
const fs = require("fs");

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(cors());
app.options("*", cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Configuración global de rutas
app.use(require("./routes/index"));
const distDirectory = path.join(__dirname, "/public");

app.get("*", function (req, res, next) {
  const file_path = path.join(distDirectory, req.url.split("?").shift());
  if (fs.existsSync(file_path)) next();
  else res.sendFile(path.join(distDirectory, "index.html"));
});
app.use(express.static(distDirectory));
mongoose.connect(process.env.URLDB, (err, res) => {
  if (err) throw err;

  console.log("DATA BASE ONLINE");
});

app.listen(process.env.PORT, () => {
  console.log("Listening port: ", process.env.PORT);
});
