const productdb = require('../model/product');
const newId = require('../functions/uid');

exports.find = async (req, res) => {
    try {
        const id = req.query.id;
        if (id) {
            const result = await productdb.findById(id);
            res.status(200).json(result);
            return;
        }
        const result = await productdb.find();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.create = async (req, res) => {
    try {
        const ID = newId("PR");
        const mainImage = req.files[0] ? req.files[0].filename : '';
        const imageArray = req.files.map((file) => file.path);
        const imageArrays = imageArray.map((path) => path.split('\\').pop());
        console.log(imageArrays);

        const product = await productdb.create({
            productName: req.body.productName,
            productId: ID,
            categoryId: req.body.categoryId,
            quantity: req.body.quantity,
            price: req.body.price,
            image: mainImage,
            images: imageArrays.map((path) => "http://localhost:4000/uploads/" + path),
            description: req.body.description
        })
        console.log(product)

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.update = async (req, res) => {
    const id = req.query.id;
    console.log("res from update ", id, req.body);
    // const updateData = await productdb.findByIdAndUpdate(id, req.body, { new: true });
    // console.log(updateData);
    // res.status(200).json(updateData);
}

exports.delete = async (req, res) => {
    try {
        const id = req.query.id;
        await productdb.findByIdAndDelete(id)
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ Error: "an internal error", err });
    }
}

exports.findByCategoryId = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const products = await productdb.find({ categoryId });
        console.log(products);
        res.json(products);
    } catch (error) {
        res.status(500).json({ Error: "an internal error", error });
    }
}