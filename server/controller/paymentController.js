const paymentCollection = require('../model/payment');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const orderDb = require('../model/order')

exports.find = async (req, res) => {
    const orderId = req.query.id;
    console.log(orderId);
    const paymentDetails = await paymentCollection.find({ orderId });
    const session = await stripe.checkout.sessions.retrieve(paymentDetails[0].paymentSessionId);
    // console.log(session);
    const data = {
        userName: session.customer_details.name,
        shippingAddress: session.shipping_details.address,
        billingAddress: session.customer_details.address
    }
    // console.log("data=================================.,=========.,===",data);
    const updatedData = await orderDb.findByIdAndUpdate(orderId, data, { new: true });
    console.log("updated=======================>++++++++++++++.++=======", updatedData);
    // res.status(200).json(session);
}