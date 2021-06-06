const productRequest = new XMLHttpRequest();
const url1= '/productload';
var parsedResponse="";

loadproducts();
function loadproducts(){
    productRequest.open('GET',url1,true);
    productRequest.addEventListener('load',onLoad);
    productRequest.addEventListener('error',onError);
    productRequest.send();
}

function onLoad() {
    var response = this.responseText;
    parsedResponse=JSON.parse(response);
    console.log(parsedResponse[0]);
    console.log(parsedResponse.length);


    for(var i=0;i<parsedResponse.length-1;i++){
        var col = document.querySelector('.col-md-4');
        var cln = col.cloneNode(true);
        col.after(cln);
   }

   for(var i=0;i<parsedResponse.length;i++){
    var item=document.getElementsByClassName("item");  //card nafso

    var image=item[i].getElementsByClassName("image"); //image div
    var img= image[0].firstChild;
    img.setAttribute("src",parsedResponse[i]['image'][0]);
    
    //console.log(parsedResponse[i]['image'][0]);

    var category=item[i].getElementsByClassName("category");//category div
    var cat= category[0].firstChild;
    cat.innerHTML=parsedResponse[i]['Category'];

    var itemName=item[i].getElementsByClassName("itemName");//category div
    console.log(itemName);
    itemName[0].innerHTML=parsedResponse[i]['title'];

    var price=item[i].getElementsByClassName("itemPrice");//category div
    price[0].innerHTML=parsedResponse[i]['price'];
}
    
    // var item=document.getElementsByClassName("item");  //card nafso
    // var image=item[0].getElementsByClassName("image"); //image div
    // var img= image[0].firstChild;
    // img.setAttribute("src",parsedResponse[0]['image']);

    // var category=item[0].getElementsByClassName("category");
    // var cat= category[0].firstChild;
    // cat.innerHTML=parsedResponse[0]['category'];

    
 }

 function onError() {
    // handle error here, print message perhaps
    console.log('error receiving async AJAX call');
  }