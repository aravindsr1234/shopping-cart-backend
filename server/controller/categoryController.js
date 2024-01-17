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
        console.log("category result:", result);
        res.status(200).json(result);
    } catch (err) {
        console.log('error', err);
    };
};

exports.create = async (req, res) => {
    try {
        console.log("req.body", req.body.image);
        // const image = req.file.path;
        const image = req.body.image;
        const imageS = image.split('\\').pop();
        console.log(imageS);
        const ctId = newId("Ct");
        var data = new categoryDb({
            categoryName: req.body.categoryName,
            id: ctId,
            image: "http://localhost:4000/uploads/" + imageS,
        })
        console.log(data);
        data.save(data);
    } catch (err) {
        console.log(err);
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.query.id;
        console.log(id);
        console.log("update", req.body);
        const image = req.file.path;
        console.log("image", image);
        const imageS = image.split('\\').pop();
        console.log(imageS);
        var data = {
            categoryName: req.body.categoryName,
            image: "http://localhost:4000/uploads/" + imageS,
        }
        console.log(data);
        const updateData = await categoryDb.findByIdAndUpdate(id, data, { new: true });
        console.log("updatedData", updateData);
    } catch (error) {
        console.log(error);
    }
}

exports.delete = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}