const checkoutRequest = new XMLHttpRequest();
const checkoutURL = '/loadcards';
var parsedResponse2="";

loadbillingcards();
function loadbillingcards(){
    checkoutRequest.open('GET',checkoutURL,true);
    checkoutRequest.addEventListener('load',onLoad);
   // checkoutRequest.addEventListener('error',onError);
    checkoutRequest.send();
}

function onLoad(){
    var response =this.responseText;
    parsedResponse2=JSON.parse(response);
    console.log(parsedResponse2);
}

