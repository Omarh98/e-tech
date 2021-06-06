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
    image:[String],
        
    

},);

const Product = mongoose.model('Product',productSchema);

    module.exports = Product;


    