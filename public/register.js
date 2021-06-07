


const textRegex=/^[a-zA-Z]+$/;
const emailRegex=/\S+@\S+\.\S+/
const phoneRegex=/^(?=\d{11}$)(01)\d+/
const numberRegex=/[0-9]{5}/
var correctList = document.createElement('ul');
const address2bpassed=document.getElementById("inputAddress").value;
const s=5;

function validate(){
    
const firstName = document.getElementById("inputFirstName").value;
const lastName = document.getElementById("inputLastName").value;
const email = document.getElementById("inputEmail4").value;
const phoneNo = document.getElementById("inputMobile").value;
const password = document.getElementById("inputPassword1").value;
const confirmPassword = document.getElementById("inputPassword2").value;
const address = document.getElementById("inputAddress").value;
const city = document.getElementById("inputCity").value;
const zip = document.getElementById("inputZip").value;

var flag=false;

    if(!firstName.match(textRegex)){
        li=document.createElement('li');
        li.innerHTML="First name can only contain letters";
        correctList.appendChild(li);
        flag=true;

    }
    if(!lastName.match(textRegex)){
        li=document.createElement('li');
        li.innerHTML="Last name can only contain letters";
        correctList.appendChild(li);
        flag=true;
    }
    if(!email.match(emailRegex)){
        li=document.createElement('li');
        li.innerHTML="Email is invalid";
        correctList.appendChild(li);
        flag=true;
    }
    if(!phoneNo.match(phoneRegex)){
        li=document.createElement('li');
        li.innerHTML="Phone number length is invalid";
        correctList.appendChild(li);
        flag=true;
    }
    if(password!=confirmPassword){
        li=document.createElement('li');
        li.innerHTML="Password mismatch";
        correctList.appendChild(li);
        flag=true;
    }
    else if(password==""){
        li=document.createElement('li');
        li.innerHTML="Password field empty";
        correctList.appendChild(li);
        flag=true;
    }
    if(!city.match(textRegex)){
        li=document.createElement('li');
        li.innerHTML="City name can only contain letters";
        correctList.appendChild(li);
        flag=true;

    }
    if(!zip.match(numberRegex)){
        li=document.createElement('li');
        li.innerHTML="Zip code consists of 5 digits";
        correctList.appendChild(li);
        flag=true;

    }
    
   var row= document.getElementById("last-row");
   setTimeout(()=>{
    document.getElementsByTagName('ul')[0].innerHTML="";
   },3000);
   insertAfter(row,correctList);

   if(!flag){
       document.getElementById("register-form").submit();
   }
    
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }
  export {s, address2bpassed};