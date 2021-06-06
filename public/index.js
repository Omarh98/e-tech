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
    var filteredResponse=[];
    var j=0;
    for(var i=0;i<parsedResponse.length;i++){
        if(parsedResponse[i]['hot']){
            filteredResponse[j]=parsedResponse[i];
            j++;
        }
    }
   for(var i=0;i<filteredResponse.length;i++){
       if(filteredResponse[i]['hot']){
        cardImg[i].setAttribute('src',filteredResponse[i]['image'][0]);
        cardTitle[i].innerHTML=filteredResponse[i]['title'];
        cardText[i].innerHTML = filteredResponse[i]['description'];
       }
       
   }
}

function onError() {
    // handle error here, print message perhaps
    console.log('error receiving async AJAX call');
  }