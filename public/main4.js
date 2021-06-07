const cartRequest = new XMLHttpRequest();
const cartURL = "/sendcartitem";
var parsedResponse2 = "";
var subtotal=0;
var total=0;

loadcartitems();
function loadcartitems() {
  cartRequest.open("GET", cartURL, true);
  cartRequest.addEventListener("load", onLoad);
  cartRequest.addEventListener("error", onError);
  cartRequest.send();
}

function onLoad() {
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
    subtotal+=parsedResponse2[i].price*document.getElementsByClassName("productOrder")[i].value;
    console.log(subtotal);
    document.getElementsByClassName("productQuantity")[i].innerHTML=parsedResponse2[i].quantity;
    document.getElementsByClassName("productImage")[i].setAttribute("src",parsedResponse2[i].image[0]);
    document.getElementsByClassName("productImage")[i].setAttribute("width","50px");
    document.getElementsByClassName("productImage")[i].setAttribute("height","50px");
    

  }


}

function cal (x){
subtotal+=eval(x.nextElementChild.innerHTML.replace("$",""));

}