const cartDb = require('../model/cart');
const userDb = require('../model/user');
const mongoose = require('mongoose');

exports.createPost = async (id) => {
    const userId = id;
    const cartResult = await cartDb.create({
        userId: userId,
        items: []
    });
    return cartResult
}

exports.createItemToCart = async (req, res) => {
    console.log('start')
    console.log('body', req.body)
    try {
        const { userId, productIds } = req.body;
        console.log(userId, productIds)
        let userCart = await cartDb.findById(userId);
        console.log(userCart)
        var productId = new mongoose.Types.ObjectId(productIds);
        console.log("==========", productId);
        await userCart.items.push({ productId });

        const cart = await userCart.save();
        console.log("cart", cart)
        res.status(200).json(cart);
    } catch (err) {
        console.log(err);
    }
};


exports.find = async (req, res) => {
    try {
        const userId = req.query.id;
        console.log(userId);
        if (!userId) {
            const result = await cartDb.find();
            console.log(result);
            return res.status(200).json(result);
        }
        const result = await cartDb.findById(userId);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.findByUserId = async (req, res) => {
    try {
        const userId = req.query.id;
        console.log(userId)
        const result = await cartDb.aggregate([
            { $match: { userId: userId } },
            // { $unwind: { path: "$items", preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: "products",
                    localField: "items.productId",
                    foreignField: "_id",
                    as: "items.product"
                },
            },
            // { $unwind: { path: "$items.product", preserveNullAndEmptyArrays: true } }
        ])
        console.log("product from product collection", result);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
// exports.findByUserId = async (req, res) => {
//     try {
//         const userId = req.query.id;
//         console.log(userId)
//         const result = await cartDb.findOne( {userId} );
//         console.log(result);
//         res.status(200).json(result);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// }

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

exports.deleteAllDataFromCart = async (req, res) => {
    console.log('hello');
    // try {
    //     const result = await cartDb.deleteMany({});
    //     res.status(200).json(result);
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json(error);
    // }
}