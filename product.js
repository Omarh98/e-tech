const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    modelnumber:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    specs:{
        type:[String],
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    color:{
        type:String,
        required:true,
    },
    quantity:{
        type:String,
        required:true,
    },
<<<<<<< HEAD
    hot:{
        type:Boolean,
        required:true,
    },
    image:{
        type:[String],
        required:true,
    }
=======
    image:[String],
        
    
>>>>>>> 94fa8005c487ccc342ef966a9a4a156432fe8931

},);

const Product = mongoose.model('Product',productSchema);

    module.exports = Product;


    