const mongoose = require('mongoose');

const order = mongoose.Schema({
    orderId: String,
    productId: String,
    adminId: String,
    totalPrice: String,
    quantity: String,
    orderDate: String
})

const orderDb = mongoose.model('order', order);

module.exports = orderDb;