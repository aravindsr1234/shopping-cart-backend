const mongoose = require('mongoose');

const cart = mongoose.Schema({
    userId: String,
    items: [
        {
            productId: Object,
        }
    ]
})

const cartDb = mongoose.model('cart', cart);

module.exports = cartDb;