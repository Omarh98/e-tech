const accountTab =document.getElementById('navbarDropdownMenuLink');

const req = new XMLHttpRequest();
const url= '/check';

accountTab.addEventListener('click',checkState);

function checkState(){
    req.open('GET',url,true);
    req.addEventListener('load',onLoad);
    req.addEventListener('error',onError);
    req.send()
}


function onLoad() {
    var response = this.responseText;
    var parsedResponse=JSON.parse(response);
    console.log(parsedResponse);
    if(parsedResponse['loggedIn']){
       
        var child1 = document.getElementById('option1')
        var child2 = document.getElementById('option2');
        child1.innerHTML="Account Management";
        child1.href="Account-Management.html";
        child2.innerHTML ="Logout";
        child2.href ="";
    }
 }
 
 function onError() {
   // handle error here, print message perhaps
   console.log('error receiving async AJAX call');
 }