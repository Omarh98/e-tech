const cartRequest = new XMLHttpRequest();
const cartURL = '/sendcartitem';
var parsedResponse2="";


loadcartitems();
function loadcartitems(){
    cartRequest.open('GET',cartURL,true);
    cartRequest.addEventListener('load',onLoad);
    cartRequest.addEventListener('error',onError);
    cartRequest.send();
}

function onLoad(){
    var response =this.responseText;
    parsedResponse2=JSON.parse(response);
    console.log(parsedResponse2);
}