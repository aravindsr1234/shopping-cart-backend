const orderDb = require('../model/order');
const newId = require('../functions/uid');

exports.find = async (req, res) => {
    try {
        const id = req.query.id;
        if (id) {
            const result = await orderDb.findById(id);
            res.status(200).json(result);
            return;
        }
        const result = await orderDb.find();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.create = async (req, res) => {
    try {
        const ID = newId("OR");

        const product = await orderDb.create({
            orderId: ID,
            productId: req.body.productId,
            adminId: req.body.adminId,
            totalPrice: req.body.totalPrice,
            quantity: req.body.quantity,
            orderDate: req.body.orderDate
        });

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.update = async (req, res) => {
    const id = req.query.id;
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