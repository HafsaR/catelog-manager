const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    barcodeNumber:{
        type: String
    },
    brand :{
        type: String
    },
    category: {
        type: String
    },
    created: {
        type: Date
    },
    description: {
        type: String
    },
    id: {
        type: String
    },
    image: {
       //// store it directly
    },
    name: {
        type: String
    },
    path: {
        type: String
    },
    rentalPrice :{type:String},
    retailPrice: {
        type:Number
    },
    sku: {
        type: String
    },
    updated: {
        type: Date
    }
});

mongoose.model('Category',categorySchema);