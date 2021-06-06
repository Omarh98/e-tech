const cardNumberRegex=/^[0-9]{16}$/;
const cardCVCRegex=/^[0-9]{3}$/
const textRegex=/^[a-zA-Z]+$/;
var btn = document.getElementById('submitBtn');
var correctList=document.createElement('ul');
function validate(){
    
    const name = document.getElementById("cardHolderName").value;
    
    const cardNum = document.getElementById("cardNumber").value;
    
    const cardCVCnum = document.getElementById("cardCVC").value;
    
    
    var flag=false;function insertAfter(referenceNode, newNode) {
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