const accountTab =document.getElementById('navbarDropdownMenuLink');
var child1 = document.getElementById('option1')
var child2 = document.getElementById('option2');
var child3 = document.getElementById('option3');
var child4 = document.getElementById('option4');
var deleted=false;

const loginReq = new XMLHttpRequest();
const url= '/logincheck';
const logoutReq = new XMLHttpRequest();
var parsedResponse="";
accountTab.addEventListener('click',checkLogin);
child4.addEventListener('click',checkLogout);

function checkLogout(){
        if(child1.classList.contains('display-state')){
            //console.log("IN CONDITION")
            child3.classList.toggle('display-state');
            child4.classList.toggle('display-state');
            child1.classList.toggle('display-state');
            child2.classList.toggle('display-state');
            

            logoutReq.open('POST','/logout',true);
            logoutReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            var data ={
                "loggedIn":"false",
                "loggedEmail" : "false",
                "loggedPassword" : "false"
            }
            logoutReq.send(JSON.stringify(data));
        }
        
     
    
}

function checkLogin(){
    loginReq.open('GET',url,true);
    loginReq.addEventListener('load',onLoad);
    loginReq.addEventListener('error',onError);
    loginReq.send();
}


function onLoad() {
    var response = this.responseText;
    parsedResponse=JSON.parse(response);
    if(parsedResponse['loggedIn']){
        child1.classList.toggle('display-state');
        child2.classList.toggle('display-state');
        child3.classList.toggle('display-state');
        child4.classList.toggle('display-state');
        

    }
    // else if(deleted){
    //     child1.classList.toggle('display-state');
    //     child2.classList.toggle('display-state');
    //     child3.classList.toggle('display-state');
    //     child4.classList.toggle('display-state');
    //     deleted=false;
    // }
 

}
 
 function onError() {
   // handle error here, print message perhaps
   console.log('error receiving async AJAX call');
 }


 function deleteAccount () {
    
    deleted=true;
   
 }