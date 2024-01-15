const mongoose = require('mongoose');

const payment = mongoose.Schema({
    paymentSessionId: String,
    orderId: String,
})

const paymentCollection = mongoose.model('payment', payment);
module.exports = paymentCollection;