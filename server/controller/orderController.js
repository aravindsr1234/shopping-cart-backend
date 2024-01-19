const orderDb = require('../model/order');
const newId = require('../functions/uid');
const Cart = require('../model/cart');
const User = require('../model/user');
const cartDb = require('../model/cart');
const userDb = require('../model/user');
const { default: Stripe } = require('stripe');
require('dotenv').config();

exports.find = async (req, res) => {
    try {
        const id = req.query.id;
        console.log("order in for data in order collection", id);
        if (id) {
            const data = await orderDb.findById(id);
            console.log("data in order collection", data);
            res.status(200).json(data);
        }
        const result = await orderDb.find();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.create = async (req, res) => {
    console.log(req.body);
    // try {
    // const ID = newId("OR");
    // const userId = req.params.id;
    // console.log(userId);
    // const data = req.body;
    // console.log(data);
    // const cart = await cartDb.findOne({ userId })
    // console.log("data from cart", cart)
    // const user = await userDb.findOne({ userId });
    // console.log("get data from userId   ", user);
    // const mail = user.email;
    // console.log(mail);
    // if (cart) {
    //     const charge = await Stripe.charges.create({

    //     })
    // }
    //     const product = await orderDb.create({
    //         orderId: ID,
    //         productId: req.body.productId,
    //         adminId: req.body.adminId,
    //         totalPrice: req.body.totalPrice,
    //         quantity: req.body.quantity,
    //         orderDate: req.body.orderDate
    //     });

    //     res.status(200).json(product);
    // } catch (err) {
    //     res.status(500).json(err);
    // }
}

exports.update = async (req, res) => {
    const id = req.query.id;
    console.log("update data to this", req.body);
    const updateData = await orderDb.findByIdAndUpdate(id, req.body, { new: true });
    console.log(updateData);
    res.status(200).json(updateData);
}

exports.delete = async (req, res) => {
    try {
        const id = req.query.id;
        await orderDb.findByIdAndDelete(id)
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ Error: "an internal error", err });
    }
}