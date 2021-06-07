const cardNumberRegex=/^[0-9]{16}$/;
const cardCVCRegex=/^[0-9]{3}$/
const textRegex=/^[a-zA-Z\s]*$/;
var btn = document.getElementById('submitBtn');
var correctList=document.createElement('ul');
const billingReq = new XMLHttpRequest();
const url1= '/loadcards';
var parsedResponse="";
var flag2=true;
var billingBtn = document.getElementById('billingBtn');
billingBtn.addEventListener('click',loadcards);
function loadcards(){
    billingReq.open('GET',url1,true);
    billingReq.addEventListener('load',onLoad);
    billingReq.addEventListener('error',onError);
    billingReq.send();
}


function onLoad() {
    var response = this.responseText;
    parsedResponse=JSON.parse(response);
    //console.log(parsedResponse);
    console.log(parsedResponse.length);
    
    var card=document.getElementById("addedcard");
      
    var cardChild = [];
    var cardChildHeader = [];
    var cardChildBody = [];
   if(flag2){
    for (var i=0;i<parsedResponse.length;i++ )
    {
        
         cardChild[i] = document.createElement("div");
         cardChild[i].classList.add('card');
        cardChildHeader[i]=document.createElement('div');
        cardChildHeader[i].classList.add('card-header');
        cardChildBody[i]=document.createElement('div');
        cardChildBody[i].classList.add('card-body');
         labelChild1 = document.createElement("label");
         listChild1 = document.createElement("span");
         labelChild1.innerHTML="Card Holder Name:";
         newBR1 = document.createElement("br");
        listChild1.innerHTML=" "+parsedResponse[i].cardHolderName;
         newLine = document.createElement("hr");

         labelChild2 = document.createElement("label");
       listChild2 = document.createElement("span");
       labelChild2.innerHTML="Card Number:";
       newBR2 = document.createElement("br");
        listChild2.innerHTML=" "+parsedResponse[i].cardNumber;
         newLine = document.createElement("hr");

         labelChild3 = document.createElement("label");
       listChild3 = document.createElement("span");
       labelChild3.innerHTML="Card Type:";
       newBR3 = document.createElement("br");
        listChild3.innerHTML=" "+parsedResponse[i].cardType;
         newLine = document.createElement("hr");

         labelChild4 = document.createElement("label");
       listChild4 = document.createElement("span");
       labelChild4.innerHTML="Card Valid till:";
       newBR4 = document.createElement("br");
        listChild4.innerHTML=" "+parsedResponse[i].cardValidTime;
         newLine = document.createElement("hr");

        cardChildHeader[i].innerHTML="Card "+(i+1);
        cardChildBody[i].append(labelChild1,listChild1,newBR1,labelChild2,listChild2,newBR2,labelChild3,listChild3,newBR3,labelChild4,listChild4,newBR4);

        cardChild[i].append(cardChildHeader[i],cardChildBody[i]);
        
        
    }
  for (var i=0;i<cardChild.length;i++)
  {
      card.append(cardChild[i] ,document.createElement('br'));
  }
  flag2=false;
}
}



function onError() {
    // handle error here, print message perhaps
    console.log('error receiving async AJAX call');
  }
function validate(){
    
    const name = document.getElementById("cardHolderName").value;
    
    const cardNum = document.getElementById("cardNumber").value;
    
    const cardCVCnum = document.getElementById("cardCVC").value;
    
     var CardValidTimeNum = document.getElementById("cardValidTime").value.toString();
    var CardTypevalue = document.getElementById("CardType").value;
    console.log(cardValidTime);
    console.log(CardTypevalue);
    var flag=false;
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
      }
    
        if(!name.match(textRegex)){
            li=document.createElement('li');
            li.innerHTML="Name can only contain letters!";
            correctList.appendChild(li);
            flag=true;
    
        }
        if(!cardNum.match(cardNumberRegex)){
            li1=document.createElement('li');
            li1.innerHTML="Card number must be 16 digits!";
            correctList.appendChild(li1);
            flag=true;
        }
        if(!cardCVCnum.match(cardCVCRegex)){
            li2=document.createElement('li');
            li2.innerHTML="CVC must be 3 digits only!";
            correctList.appendChild(li2);
            flag=true;
        }
     if(CardValidTimeNum=="")
    {
       li3=document.createElement('li');
        li3.innerHTML="Please insert card valid time";
        correctList.appendChild(li3);
        flag=true;
    }
    if(CardTypevalue=="Choose..."||CardTypevalue==" ")
    {
       li4=document.createElement('li');
        li4.innerHTML="Please select card type";
        correctList.appendChild(li4);
        flag=true;
    }
        
        if(!flag){
            document.getElementById("billingVald").submit();
        }
        else{
            insertAfter(btn,correctList);
        }
    }
    
       
    
    
    
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
      }