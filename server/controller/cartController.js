const cartDb = require('../model/cart');
const userDb = require('../model/user');

exports.createPost = async (id) => {
    const userId = id;
    const cartResult = await cartDb.create({
        userId: userId,
        items: []
    });
}

exports.createItemToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let userCart = await cartDb.findById(userId);

        userCart.items.push({ productId });

        const cart = await userCart.save();
        res.status(200).json(cart);
    } catch (err) {
        console.log(err);
    }
}


exports.find = async (req, res) => {
    try {
        const userId = req.query.id;
        const result = await cartDb.findById(userId);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}


exports.deleteFromCart = async (req, res) => {
    try {
        const productId = req.body.productId;
        const cartItemId = req.query.id;
        const cart = await cartDb.findById(cartItemId)
        const resultIndex = await cart.items.findIndex(item => item.productId === productId);
        const result = cart.items.splice(resultIndex, 1);
        const data = await cart.save();
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}