const checkoutRequest = new XMLHttpRequest();
const checkoutURL = '/loadcards';
var parsedResponse2="";

loadbillingcards();
function loadbillingcards(){
    checkoutRequest.open('GET',checkoutURL,true);
    checkoutRequest.addEventListener('load',onLoad2);
   // checkoutRequest.addEventListener('error',onError);
    checkoutRequest.send();
}

function onLoad2(){
    var response =this.responseText;
    parsedResponse2=JSON.parse(response);
    console.log(parsedResponse2);
}

