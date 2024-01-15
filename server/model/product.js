const mongoose = require('mongoose');

const product = mongoose.Schema({
    productName: String,
    productId: String,
    categoryId: String,
    quantity: Number,
    price: Number,
    image: String,
    images:[String],
    description: String,
})

const productdb = mongoose.model('product', product);
module.exports = productdb;