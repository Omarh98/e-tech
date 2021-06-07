const checkoutRequest = new XMLHttpRequest();
const checkoutURL = '/loadcards';
const totalReq= new XMLHttpRequest();
var parsedResponse2="";
var flag2=true;
var flag3=true;

loadtotal();
loadbillingcards();

function loadtotal(){
totalReq.open('/GET','/gettotal',true);
totalReq.addEventListener('load',onLoad3);

};

function onLoad3(){
    var response =this.responseText;
    parsedResponse2=JSON.parse(response);
    console.log(parsedResponse2);
}
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

    var card=document.getElementById("addedcard");
      
    var cardChild = [];
    var cardChildHeader = [];
    var cardChildBody = [];
   if(flag2){
    for (var i=0;i<parsedResponse2.length;i++ )
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
        listChild1.innerHTML=" "+parsedResponse2[i].cardHolderName;
         newLine = document.createElement("hr");

         labelChild2 = document.createElement("label");
       listChild2 = document.createElement("span");
       labelChild2.innerHTML="Card Number:";
       newBR2 = document.createElement("br");
        listChild2.innerHTML=" "+parsedResponse2[i].cardNumber;
         newLine = document.createElement("hr");

         labelChild3 = document.createElement("label");
       listChild3 = document.createElement("span");
       labelChild3.innerHTML="Card Type:";
       newBR3 = document.createElement("br");
        listChild3.innerHTML=" "+parsedResponse2[i].cardType;
         newLine = document.createElement("hr");

         labelChild4 = document.createElement("label");
       listChild4 = document.createElement("span");
       labelChild4.innerHTML="Card Valid till:";
       newBR4 = document.createElement("br");
        listChild4.innerHTML=" "+parsedResponse2[i].cardValidTime;
         newLine = document.createElement("hr");

         
         btn=document.createElement("button");
         btn.innerHTML="Use Card";
         btn.classList.add("btn", "btn-outline-success", "mybtn");
         btn.setAttribute("onclick","usethiscard(this)");

        cardChildHeader[i].innerHTML="Card "+(i+1);
        cardChildBody[i].append(labelChild1,listChild1,newBR1,labelChild2,listChild2,newBR2,labelChild3,listChild3,newBR3,labelChild4,listChild4,newBR4,btn);

        cardChild[i].append(cardChildHeader[i],cardChildBody[i]);
        
        
    }
  for (var i=0;i<cardChild.length;i++)
  {
      card.append(cardChild[i] ,document.createElement('br'));
  }
  flag2=false;
}
}

function usethiscard(x){
    var cardNumber=x.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
    console.log(cardNumber);

    var card=document.getElementById("sum");


    var cardChild;
    var cardChildHeader;
    var cardChildBody;
   if(flag3){
    
        
         cardChild = document.createElement("div");
         cardChild.classList.add('card');
        cardChildHeader=document.createElement('div');
        cardChildHeader.classList.add('card-header');
        cardChildBody=document.createElement('div');
        cardChildBody.classList.add('card-body');

         labelChild1 = document.createElement("label");
         listChild1 = document.createElement("span");
         labelChild1.innerHTML="Card Number:";
         newBR1 = document.createElement("br");
         listChild1.innerHTML=" "+ cardNumber;
         labelChild2 = document.createElement("label");
         listChild2 = document.createElement("span");
         labelChild2.innerHTML="Total:";
         newBR2 = document.createElement("br");
         listChild2.innerHTML=" "+ "5000";
           newLine = document.createElement("hr");
         
         btn=document.createElement("button");
         btn.innerHTML="Place Order";
         btn.classList.add("btn", "btn-outline-success", "mybtn");
         btn.setAttribute("onclick","usethiscard(this)");

        cardChildHeader.innerHTML="Summary";
        cardChildBody.append(labelChild1,listChild1,newBR1,labelChild2,listChild2,newBR2,btn);

        cardChild.append(cardChildHeader,cardChildBody);
        card.append(cardChild,document.createElement('br'));
        
        
    
//   for (var i=0;i<cardChild.length;i++)
//   {
//       card.append(cardChild[i] ,document.createElement('br'));
//   }
  flag3=false;
}
}

