var cors = require("cors");
var axios = require("axios");
var express = require("express");
var FormData = require("form-data");
var bodyParser = require("body-parser");
var RentryClient = require("../dist/index");
var env = process.env.NODE_ENV || "development";

var app = express();
app.use(bodyParser.text());
app.use(cors());

function any(req, res) {
  res.json({
    status: 200,
    content: "INFO",
    docs: "https://www.npmjs.com/package/rentry-client",
    try: {
      "/new": "create new entry",
      "/new/:id": "create new entry with id",
      "/edit/:id/:token": "edit entry",
      "/raw/:id": "get raw entry",
    }
  });
}

app.get("/", any);
app.post("/", any);
app.post("/new", async function (req, res) {
  var response = await RentryClient.new({
    data: req.body,
  });
  res.json(response);
});
app.post("/new/:id", async function (req, res) {
  var response = await RentryClient.new({
    id: req.params.id,
    data: req.body,
  });
  res.json(response);
});
app.post("/edit/:id/:token", async function (req, res) {
  var response = await RentryClient.edit({
    id: req.params.id,
    token: req.params.token,
    data: req.body,
  });
  res.json(response);
});
app.get("/raw/:id", async function (req, res) {
  var response = await RentryClient.raw(req.params.id);
  res.json(response);
});

if (env === "development") {
  app.listen(process.env.PORT || 8090, () => {
    console.log(`server listen : ${process.env.PORT || 8090}`);
  });
} else {
  module.exports = app;
}
