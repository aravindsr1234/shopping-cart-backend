const categoryDb = require('../model/category');
const newId = require('../functions/uid');

exports.find = async (req, res) => {
    try {
        const id = req.params.id;
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
        console.log(req.body.category);
        const ctId = newId("Ct");
        var data = new categoryDb({
            categoryName: req.body.category,
            id: ctId,
        })
        console.log(data);
        data.save(data);
    } catch (err) {
        console.log(err);
    }
}