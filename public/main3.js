const productRequest = new XMLHttpRequest();
const url2= '/senditem';
var parsedResponse="";
const cartRequest = new XMLHttpRequest();
const cartURL = '/sendcartitem';

loadproducts();
function loadproducts(){
    productRequest.open('GET',url2,true);
    productRequest.addEventListener('load',onLoad2);
    productRequest.addEventListener('error',onError);
    productRequest.send();
}

function onLoad2() {
    var response = this.responseText;
    parsedResponse=JSON.parse(response);
    //console.log(parsedResponse);
    document.getElementsByClassName("title mb-3")[0].innerHTML=parsedResponse["title"];
    document.getElementById("model").innerHTML=parsedResponse["modelnumber"];
    document.getElementById("desc").innerHTML=parsedResponse["description"];
    document.getElementById("price").innerHTML=parsedResponse["price"];
    document.getElementById("color").innerHTML=parsedResponse["color"];
    var image = document.getElementById("gallery"); //image div
    console.log(image);
    var img = image.firstElementChild;
    var img2 = image.lastElementChild;
    console.log(img);
    img.setAttribute("src", parsedResponse["image"][0]);
    img2.setAttribute("src", parsedResponse["image"][1]);

    var sp = document.getElementById("spec");
    console.log(sp);
    console.log(parsedResponse["specs"].length);
    for (var i=0;i<parsedResponse["specs"].length;i++){
      sp.children[i].innerHTML=parsedResponse["specs"][i];
    }
}



  function onError() {
    // handle error here, print message perhaps
    console.log("error receiving async AJAX call");
  }

  function sendCartItem(btn){
    cartRequest.open('POST',cartURL,true);
    cartRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
        var data= {
          "title":document.getElementById('titleEl').innerHTML
        }
        cartRequest.send(JSON.stringify(data));
        
    cartRequest.send();
    
}