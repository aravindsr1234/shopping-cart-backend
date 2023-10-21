const mongoose = require('mongoose');

const cart = mongoose.Schema({
    userId: String,
    items: [
        {
            productId: String,
        }
    ]
})

const cartDb = mongoose.model('cart', cart);

module.exports = cartDb;