const multer = require('multer');
const productdb = require('../model/product');
const upload = require('../functions/multer');

exports.find = async (req, res) => {
    try {
        const id = req.query.id;
        if (id) {
            const result = await productdb.findById(id);
            res.status(200).json(result);
        }
        const result = await productdb.find();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

exports.create = upload.array('files', 5), (req, res) => {
    console.log(req.body)
    console.log("hello");
}