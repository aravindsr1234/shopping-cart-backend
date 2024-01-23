const stripe = require('stripe');
require('dotenv').config();
const Stripe = stripe(process.env.STRIPE_KEY);
const orderDb = require('../model/order');
const paymentCollection = require('../model/payment');

exports.create = async (req, res) => {
    const dataItems = req.body;
    const date = new Date();

    const order = await orderDb.create({
        cartData: req.body.cartData,
        userId: dataItems.userId,
        totalPrice: dataItems.totalPrice,
        orderDate: date,
        status: 'pending'
    })

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
        });

        res.send({ url: session.url });

    } catch (error) {
        console.log("error from stripe", error);
    }
};

exports.find = async (req, res) => {
    const data = req.body;
    console.log(data);
};

exports.update = async (req, res) => {
    const id = req.query.id;
    const { userName, shippingAddress, billingAddress } = req.body;
    const data = {
        userName,
        shippingAddress,
        billingAddress,
    };
    console.log('data', data);
    const updatedData = await orderDb.findByIdAndUpdate(id, data, { new: true });
    console.log("updated", updatedData);
};