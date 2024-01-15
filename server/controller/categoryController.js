const categoryDb = require('../model/category');
const newId = require('../functions/uid');

exports.find = async (req, res) => {
    try {
        console.log("hello")
        const id = req.query.id;
        let result;
        if (id) {
            const ID = req.query.id;
            result = await categoryDb.findById(ID);
        } else {
            result = await categoryDb.find();
        }
        console.log(result);
        res.status(200).json(result);
    } catch (err) {
        console.log('error', err);
    };
};

exports.create = async (req, res) => {
    try {
        const image = req.file.path;
        const imageS = image.split('\\').pop();
        console.log(imageS);
        console.log(req.body.category);
        const ctId = newId("Ct");
        var data = new categoryDb({
            categoryName: req.body.category,
            id: ctId,
            image: "http://localhost:4000/uploads/" + imageS,
        })
        console.log(data);
        data.save(data);
    } catch (err) {
        console.log(err);
    }
}