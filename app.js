const express = require("express");
// const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const app = express();
const User = require('./user');
var loggedIn=false;
const dbURI = 'mongodb+srv://admin:omar1998@e-tech.w0r6k.mongodb.net/e-tech?retryWrites=true&w=majority';

mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
.then((results) => app.listen(process.env.PORT || 3000))
.catch((err) => console.log(err));;

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
 // console.log(req.body);
  const user = new User (req.body);
  user.save()
  .then(results => {res.redirect('/'); } )
  .catch(err => console.log(err));
 
});

app.post("/login", (req, res) => {
  // console.log(req.body);
    const query = User.where({
        email: req.body.email,
        password : req.body.password,
    });
    query.findOne(function(err,user){
        if(err)
        console.log(err);
        if(user){
            loggedIn=true;
            console.log(user.firstName +" "+user.lastName +" is now logged in");
        }
        else{
            console.log("Email or password may be invalid.");
            loggedIn=false;
        }
    });
  res.redirect("/");
});

//app.listen(process.env.port || 3000);
