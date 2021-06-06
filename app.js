const express = require("express");
// const bodyParser = require('body-parser');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const mongoose = require ('mongoose');
const app = express();
const User = require('./user');
const Product = require('./product');

var loggedIn=false;
var loggedEmail="";
var loggedPassword="";
var encEmail="";
var encPassword="";
const dbURI = 'mongodb+srv://admin:omar1998@e-tech.w0r6k.mongodb.net/e-tech?retryWrites=true&w=majority';

mongoose.connect(dbURI,{useNewUrlParser: true, useUnifiedTopology: true})
.then((results) => app.listen(process.env.PORT || 3000))
.catch((err) => console.log(err));;
mongoose.set('useFindAndModify', false);

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
app.get("/Account-Management",(req,res)=>{
  res.sendFile("/Account-Management.html");
});
app.get("/billingInfo",(req,res)=>{
  res.sendFile("/");
});

// const product = new Product ({
//   title: "MSI GL65 Leopard 10SEK-022",
// modelnumber: "#12345",
// specs: ["aasd","afafaf","afafafafa"],
// price: "500",
// description: "Intel Core i7-10750H - RTX 2060 - 16 GB Memory - 1 TB HDD - 512 GB SSD - Gaming Laptop" ,
// color:"black",
// quantity:"10",
// image:"https://images10.newegg.com/ProductImageCompressAll1280/34-155-402-V19.jpg",
// category:"laptop"
// });

//   product.save()
//   .then(results => console.log("done"))
//   .catch(err => console.log(err));

app.post("/register", (req, res) => {
 // console.log(req.body);
  const user = new User (req.body);
  user.save()
  .then(results => {res.redirect('/'); } )
  .catch(err => console.log(err));
 
});



app.post("/Account-Management",(req,res)=>{
  console.log(req.body);
  
  const query = User.where({
    email: decrypt(encEmail),});
    
    query.findOneAndUpdate(query,{firstName: req.body.firstName , lastName: req.body.lastName , phoneNumber: req.body.phoneNumber , streetAddress: req.body.streetAddress , unitAddress: req.body.streetAddress , city: req.body.city , zip: req.body.zip, email:req.body.email ,password: req.body.password,password2: req.body.password },{new:true} ,function(err,user){
      if (err) {
        res.send(err);
      } 
      else if (user)
      {
        console.log(user);
      }
    });
    res.redirect("/");
    
  });

  app.post("/Account-Management-Password",(req,res)=>{
   //console.log(req.body);
    const query = User.where({
      email: decrypt(encEmail),});
      query.findOneAndUpdate(query,{password: req.body.oldPassword , password:req.body.password , password2:req.body.password},{new:true} ,function(err,user){
        if (err) {
          res.send(err);
        } 
        else if (user)
        {
          console.log(user);
        }
      });
      res.redirect("/");
    });

    app.post("/delAccount",(req,res)=>{
     // console.log(req.body);
      const query = User.where({
        email: decrypt(encEmail),});
        query.FindOneAndDelete(query,{email:req.body.email},{new:true} ,function(err,user){
          if (err) {
            res.send(err);
          } 
          else if (user)
          {
            console.log(user);
            loggedIn=false;
          }
        });
        res.redirect("/");
      });
      app.post("/billingInfo",(req,res)=>{
        //console.log(req.body);
        const query = User.where({
          email: decrypt(encEmail),});
          query.findOneAndUpdate(query,{cardNumber:req.body.cardNumber , cardHolderName:req.body.cardHolderName , cardType:req.body.cardType ,cardValidTime:req.body.cardValidTime, cardCVC:req.body.cardCVC},{new:true} ,function(err,user){
            if (err) {
              res.send(err);
            } 
            else if (user)
            {
              console.log(user);
            }
          });
          res.redirect("/");
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


app.get('/productload',(req,res)=>{
  Product.find(function(err,product){
    if(err)
    console.log(err);
    if(product){
      console.log(product);
      console.log("Product Found");
    
      }
    else{
      
        console.log("there is no product");
    }
    res.send(product);

})
});


app.get('/logincheck',(req,res)=>{
       console.log(loggedPassword.length);
       if(loggedPassword.length!=0 && loggedPassword!="false"){
         encEmail=encrypt(loggedEmail);
         encPassword=encrypt(loggedPassword);
       }
       else{
          encEmail=loggedEmail;
          encPassword = loggedPassword
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
