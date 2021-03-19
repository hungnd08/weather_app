const express = require("express");
const fetch = require("node-fetch");
const { API } = require("./config");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.post("/current-weather", (req, res) => {
  const zipcode = req.body.zipcode;
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?zip=" +
      zipcode +
      ",us&appid=" +
      API
  )
    .then((res) => res.json())
    .then((data) => {
      res.send({ data });
    })
    .catch((err) => {
      res.redirect("/error");
    });
});

app.listen({ port: 5000 });
