const express = require("express");
const app = express();
app.use(require("./ruling"));
module.exports = app;
