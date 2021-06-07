//const { response } = require("express");

const cartRequest = new XMLHttpRequest();
const cartURL = "/sendcartitem";
const sendTotal = new XMLHttpRequest();

var parsedResponse2 = "";
var subtotal=0;
var total=0;
var prices1=[];

loadcartitems();
function loadcartitems() {
  cartRequest.open("GET", cartURL, true);
  cartRequest.addEventListener("load", onLoad2);
  cartRequest.addEventListener("error", onError);
  cartRequest.send();
}
function onError(){
  console.log("error");
}
function onLoad2() {
  var response = this.responseText;
  parsedResponse2 = JSON.parse(response);
  console.log(parsedResponse2[0]);
  //console.log(document.querySelector("#productDetails"));
  for (var i = 0; i < parsedResponse2.length - 1; i++) {
    var col = document.querySelector(".productDetails");
    var cln = col.cloneNode(true);
    col.after(cln);
  }
 // console.log(document.getElementById("productName").innerHTML);
  for (var i = 0; i < parsedResponse2.length; i++) {
    document.getElementsByClassName("productName")[i].innerHTML=parsedResponse2[i].title;
    document.getElementsByClassName("productPrice")[i].innerHTML=parsedResponse2[i].price;
    priceStr=parsedResponse2[i].price.replace("$","");
    prices1[i]=eval(priceStr);
  subtotal+=prices1[i]*eval(document.getElementsByClassName("productOrder")[i].value);
    document.getElementsByClassName("productQuantity")[i].innerHTML=parsedResponse2[i].quantity;
    document.getElementsByClassName("productImage")[i].setAttribute("src",parsedResponse2[i].image[0]);
    document.getElementsByClassName("productImage")[i].setAttribute("width","50px");
    document.getElementsByClassName("productImage")[i].setAttribute("height","50px");
    

  }
  document.getElementById('text-right').innerHTML="$"+subtotal;
  document.getElementById('shipping-text').innerHTML="$"+50;
  document.getElementById('total-text').innerHTML="$"+eval(subtotal+50);
  subtotal=0;

}

function cal(x){
  subtotal=0;
   quantityFields= document.getElementsByClassName('productOrder');
   priceFields = document.getElementsByClassName('productPrice');
   quantities=[];
   prices=[];
    for(var i=0;i<quantityFields.length;i++){
      quantities[i]=eval(quantityFields[i].value);
      price=priceFields[i].innerHTML.replace("$","");
      prices[i]=eval(price);
      subtotal+=quantities[i]*prices[i];
    }
    
    document.getElementById('text-right').innerHTML="$"+subtotal;
    document.getElementById('shipping-text').innerHTML="$"+50;
    document.getElementById('total-text').innerHTML="$"+eval(subtotal+50);
    sendTotal.open("POST",'/gettotal',true);
    sendTotal.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    var data2={
      "total":"4000"
    }
    sendTotal.send(JSON.stringify(data2));

}