const express = require("express");
// const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + "/public"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

app.get("/login", (req, res) => {
  res.sendFile("/login.html");
});

app.get("/register", (req, res) => {
  res.sendFile("/register.html");
});

app.post("/register", (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

app.post("/login", (req, res) => {
  console.log(req.body);

  res.redirect("/");
});

app.listen(process.env.port || 3000);
