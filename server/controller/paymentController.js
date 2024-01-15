const paymentCollection = require('../model/payment');
const stripe = require('stripe')(process.env.STRIPE_KEY);

exports.find = async (req, res) => {
    const orderId = req.query.id;
    console.log(orderId);
    const paymentDetails = await paymentCollection.find({ orderId });
    const session = await stripe.checkout.sessions.retrieve(paymentDetails[0].paymentSessionId);
    console.log(session);
    res.status(200).json(session);
}