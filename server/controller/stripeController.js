const stripe = require('stripe');
require('dotenv').config();
const Stripe = stripe(process.env.STRIPE_KEY);
const orderDb = require('../model/order');
const paymentCollection = require('../model/payment');

exports.create = async (req, res) => {
    const dataItems = req.body;
    // console.log(dataItems);
    // console.log(dataItems.cartData.map((items) => items._id));
    const date = new Date();
    console.log(date);  
    const order = await orderDb.create({
        cartData: req.body.cartData,
        userId: dataItems.userId,
        totalPrice: dataItems.totalPrice,
        orderDate: date,
        status: 'pending'
    })
    console.log("cart data in order page", order);
    const line_items = dataItems.cartData.map((item) => {
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.productName,
                },
                unit_amount: item.price,
            },
            quantity: item.quantity,
        }
    })
    try {
        const session = await Stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: ["US"],
            },
            custom_text: {
                shipping_address: {
                    message: 'Please note that we can\'t guarantee 2-day delivery for PO boxes at this time.',
                },
            },
            success_url: `${process.env.CLIENT_URL}/paymentSuccess/?id=${order.id}`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
        });
        console.log("session id for payment", session);
        const payment = await paymentCollection.create({
            paymentSessionId: session.id,
            orderId: order.id,
        })
        console.log("payment collection data",payment);
        res.send({ url: session.url });
    } catch (error) {
        console.log("error from stripe", error);
    }
};

exports.find = async (req, res) => {
    const data = req.body;
    console.log(data);
}