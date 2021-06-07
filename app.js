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
var title="";
var titleArr=[];
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
  res.sendFile(__dirname+"/public/login.html");
});

app.get("/register", (req, res) => {
  res.sendFile(__dirname+"/public/register.html");
});

app.get("/productList", (req, res) => {
  res.sendFile(__dirname+"/public/productList.html");
});
app.get("/contactUs", (req, res) => {
  res.sendFile(__dirname+"/public/contactUs.html");
});
app.get("/Account-Management",(req,res)=>{
  res.sendFile(__dirname+"/public/Account-Management.html");
});
app.get("/billingInfo",(req,res)=>{
  res.sendFile("/");
});
app.get("/changeEmail",(req,res)=>{
  res.sendFile("/");
});

app.post("/register", (req, res) => {
 // console.log(req.body);
  const user = new User (req.body);
  user.save()
  .then(results => {res.redirect('/login'); } )
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
      
       if(loggedPassword.length!=0 && loggedPassword!="false"){
         encEmail=encrypt(loggedEmail);
         encPassword=encrypt(loggedPassword);
       }
       else if(!loggedIn){
          encEmail="";
          encPassword ="";
          
          console.log("NOT LOGGED IN");
       }
      //  console.log("IN LOGIN CHECK");
      //  console.log(loggedEmail);
      //  console.log(loggedPassword);
      //  console.log(encEmail);
      //  console.log(encPassword);
    var data ={
        loggedIn,
       encEmail,
       encPassword
    };
    var JSONdata = JSON.stringify(data);
    res.send(JSONdata);
})

app.post('/logout',(req,res)=>{

  loggedIn=JSON.parse(req.body.loggedIn);
  loggedEmail=JSON.parse(req.body.loggedEmail);
  loggedPassword=JSON.parse(req.body.loggedPassword);
  console.log(req.body);
});




app.post("/Account-Management",(req,res)=>{
  console.log(req.body);
  console.log(loggedEmail);
  const query = User.where({
    email: loggedEmail,});
    
    query.findOneAndUpdate(query,{firstName: req.body.firstName , lastName: req.body.lastName , phoneNumber: req.body.phoneNumber , streetAddress: req.body.streetAddress , unitAddress: req.body.streetAddress , city: req.body.city , zip: req.body.zip },{new:true} ,function(err,user){
      if (err) {
        res.send(err);
      } 
      else if (user)
      {
        console.log(user);
      }
    });
    res.redirect("/Account-Management");
    
  });

  app.post("/Account-Management-Password",(req,res)=>{
   //console.log(req.body);
    const query = User.where({
      email: loggedEmail,});
      query.findOneAndUpdate(query,{ password:req.body.password , password2:req.body.password},{new:true} ,function(err,user){
        if (err) {
          res.send(err);
        } 
        else if (user)
        {
          //console.log(user);
        }
      });
      res.redirect("/Account-Management");
    });
    app.post("/changeEmail",(req,res)=>{
      //console.log(req.body);
       const query = User.where({
         email: loggedEmail,});
         query.findOneAndUpdate(query,{email:req.body.email},{new:true} ,function(err,user){
           if (err) {
             res.send(err);
           } 
           else if (user)
           {
             //console.log(user);
           }
         });
         res.redirect("/Account-Management");
       });


    app.post("/delAccount",(req,res)=>{
     // console.log(req.body);
      const query = User.where({
        email: decrypt(encEmail)});
        query.findOneAndDelete(query,{email:req.body.email},{new:true} ,function(err,user){
          if (err) {
            res.send(err);
          } 
         if (!user)
          {
           console.log("IN DELTE");
           
          }
        });
        loggedIn=false;
           loggedEmail="";
           loggedPassword="";
        res.redirect('/');
      });
      
      app.post("/billingInfo",(req,res)=>{
        //console.log(req.body);
        const query = User.where({
          email: loggedEmail,});
          query.findOneAndUpdate(query,{
            $push:{'payment':{
              "cardHolderName":req.body.cardHolderName,
              "cardNumber":req.body.cardNumber,
              "cardType":req.body.cardType,
              "cardValidTime":req.body.cardValidTime,
              "cardCVC":req.body.cardCVC
              
            }}},{new:true} ,function(err,user){
            if (err) {
              res.send(err);
            } 
            else if (user)
            {
             // console.log(user);
            }
          });
          res.redirect("/Account-Management");
        });

        app.get('/productload',(req,res)=>{
          Product.find(function(err,product){
            if(err)
            console.log(err);
            if(product){
              //console.log(product);
              //console.log("Product Found");
            
              }
            else{
              
                console.log("there is no product");
            }
            res.send(product);
        
        })
        });
        app.get('/loadcards',(req,res)=>{
          const query = User.where(
            {email:loggedEmail,}
          );
          query.findOne(function(err,user){
            if(err)
            console.log(err)
            if(user){
              console.log("hi");
              
            }
            console.log(user.payment);
            var payment =user.payment ;
           // console.log("NEW\n"+payment);
            res.send(payment);
          })
        });

        app.post('/senditem',(req,res)=>{
          //  console.log(req.body);
           title=req.body.title;
          
        });

        app.get('/senditem', (req,res)=>{
          const query = Product.where({
            title: title
          });
            
            query.findOne(function(err,product){
              if (err) {
                res.send(err);
              } 
             if (product)
              {
                res.send(product);

               // console.log(product);
              }
            });
            
        });

        app.post('/sendcartitem',(req,res)=>{
          titleArr.push(req.body.title);
          console.log(titleArr);
        });

        app.get('/sendcartitem',(req,res)=>{
          Product.find({title:{$in:titleArr}},function(err,product){
            if(err){
              console.log(err);
            }
            if(product){
              res.send(product);
            }
          });
          
        });

        // app.post('/checkout'(req,res)=>{
        //   orderId=
        // })

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
