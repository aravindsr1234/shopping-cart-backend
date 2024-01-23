const mongoose = require('mongoose');

const order = mongoose.Schema({
    // productId: String,
    cartData: [],
    userId: String,
    adminId: String,
    totalPrice: String,
    quantity: String,
    orderDate: String,
    status: String,
    userName: String,
    shippingAddress: {},
    billingAddress: {},
})

const orderDb = mongoose.model('order', order);
module.exports = orderDb;

//

// const mongoose = require('mongoose');

// const order = mongoose.Schema({
//     userId: {
//         type: String,
//     },
//     items: [{
//         productId: {
//             type: String,
//         },
//         name: String,
//         quantity: {
//             type: Number,
//             required: true,
//         },
//         price: Number
//     }],
//     bill: {
//         type: Number,
//     },
//     date_added: {
//         type: Date,
//         default: Date.now
//     }
// })

// const orderDb = mongoose.model('order', order);
