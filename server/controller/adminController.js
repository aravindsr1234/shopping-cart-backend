const adminDb = require('../model/admin');
const newId = require('../functions/uid');

exports.find = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            res.status(400).json({ error: "missing user id in the request" });
        }
        const result = await adminDb.findById(id);

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ error: "user not found" });
        }
    } catch (err) {
        console.log(err);
    }
}


exports.create = async (req, res) => {
    try {
        const ID = newId("AD");
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Missing the user data" });
        }
        const admin = await adminDb.create({
            userName: req.body.userName,
            password: req.body.password,
            adminId: ID,
            email: req.body.email,
            phone: req.body.phone
        })

        res.status(200).json(admin);

    } catch (err) {
        res.status(500).json(err);
    }
}


exports.update = async (req, res) => {
    try {
        const id = req.query.id;
        const updatedData = await adminDb.findByIdAndUpdate(id, req.body)
        console.log(updatedData);
        res.status(200).json(updatedData);
    } catch (err) {
        res.status(500).json({ Error: "an internal error", err })
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.query.id;
        await adminDb.findByIdAndDelete(id)
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ Error: "an internal error", err });
    }
}