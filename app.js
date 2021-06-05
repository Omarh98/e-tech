const express = require("express");
// const bodyParser = require('body-parser');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const mongoose = require ('mongoose');
const app = express();
const User = require('./user');
var loggedIn=false;
var loggedEmail="";
var loggedPassword="";
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

app.get("/productList", (req, res) => {
  res.sendFile("/productList.html");
});
app.get("/contactUs", (req, res) => {
  res.sendFile("/contactUs.html");
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
            loggedEmail=user.email;
            loggedPassword=user.password;
        }
        else{
            console.log("Email or password may be invalid.");
            loggedIn=false;
            loggedEmail="false";
            loggedPassword="false";
        }
    });

  res.redirect("/");
});

app.get('/logincheck',(req,res)=>{
       console.log(loggedPassword.length);
       if(loggedPassword.length!=0 && loggedPassword!="false"){
        var encEmail=encrypt(loggedEmail);
        var encPassword=encrypt(loggedPassword);
       }
       else{
         var encEmail=loggedEmail;
         var encPassword = loggedPassword
       }
        
    var data ={
        loggedIn,
       encEmail,
       encPassword
    };
    var JSONdata = JSON.stringify(data);
    res.send(JSONdata);
})

app.post('/logout',(req,res)=>{
 // console.log("POST CHECK");
  loggedIn=JSON.parse(req.body.loggedIn);
 // console.log(req.body.loggedIn);
});

function encrypt(text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
   }
   
   function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
   }
