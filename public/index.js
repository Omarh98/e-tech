const productRequest = new XMLHttpRequest();
const reqURL = '/productload';


loadproducts();


function loadproducts(){
    productRequest.open('GET',reqURL,true);
    productRequest.addEventListener('load',onLoad);
    productRequest.addEventListener('error',onError);
    productRequest.send();
}


function onLoad() {
    var response = this.responseText;
    parsedResponse=JSON.parse(response);
    console.log(parsedResponse[0]);
    console.log(parsedResponse.length);


   var cardImg = document.getElementsByClassName('card-img-top');
   var cardTitle = document.getElementsByClassName('card-title');
   var cardText = document.getElementsByClassName ('card-text');
   var cardBtn = document.getElementsByClassName ('card-btn');
   for(var i=0;i<parsedResponse.length;i++){
       cardImg[i].setAttribute('src',parsedResponse[i]['image']);
       cardTitle[i].innerHTML=parsedResponse[i]['title'];
       cardText[i].innerHTML = parsedResponse[i]['description'];
   }
}

function onError() {
    // handle error here, print message perhaps
    console.log('error receiving async AJAX call');
  }