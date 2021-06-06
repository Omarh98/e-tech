const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema (
    {
        firstName:{
            type:String,
            required:true,
        },
        lastName:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
        },
        phoneNumber:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
        },
        password2:{
            type:String,
            required:true,
        },
        streetAddress:{
            type:String,
            required:true,
        },
        unitAddress:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        zip:{
            type:String,
            required:true,
        },
        cardNumber:{
            type:String
        },
        cardHolderName:{
            type:String
        },
        cardType:{
            type:String
        },
        cardValidTime:{
            type:String
        },
        cardCVC:{
            type:String
        },
        



    },);

    const User = mongoose.model('User',userSchema);

    module.exports = User;