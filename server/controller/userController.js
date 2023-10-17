const userDb = require('../model/user');
const newId = require('../functions/uid');
const { use } = require('../routes/categoryRouter');

exports.find = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            res.status(400).json({ error: "missing user id in the request" });
        }
        const result = await userDb.findById(id);

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
        const ID = newId("UR");
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Missing the user data" });
        }
        const user = await userDb.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userId: ID,
            email: req.body.email,
            password: req.body.password,
            city: req.body.city,
            state: req.body.state,
            address: req.body.address
        })

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json(err);
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.query.id;
        const updatedData = await userDb.findByIdAndUpdate(id, req.body)
        console.log(updatedData);
        res.status(200).json(updatedData);
    } catch (err) {
        res.status(500).json({ Error: "an internal error", err })
    }
}

exports.delete = (req, res) => {
    const id = req.query.id;
    userDb.findByIdAndDelete(id)
    .then
}
