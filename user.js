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
        payment:[{
            cardNumber:String,
            cardHolderName:String,
            cardType:String,
            cardValidTime:String,
            cardCVC:String,
        }],

        // cardNumber:{
        //     type:Array
        // },
        // cardHolderName:{
        //     type:Array
        // },
        // cardType:{
        //     type:Array
        // },
        // cardValidTime:{
        //     type:Array
        // },
        // cardCVC:{
        //     type:Array
        // },
        



    },);

    const User = mongoose.model('User',userSchema);

    module.exports = User;