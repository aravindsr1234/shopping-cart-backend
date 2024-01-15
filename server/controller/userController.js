const userDb = require('../model/user');
const newId = require('../functions/uid');
const { use } = require('../routes/categoryRouter');
const { createPost } = require('../controller/cartController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

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
        console.log(req.body)
        const ID = newId("UR");
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Missing the user data" });
        }

        const password = await bcrypt.hash(req.body.password, 10);
        const user = await userDb.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userId: ID,
            email: req.body.email,
            password: password,
            city: req.body.city,
            state: req.body.state,
            address: req.body.address
        })
        res.status(200).json(user);
        try {
            const cartDetails = await createPost(ID);
        } catch (postError) {
            console.error(postError);
        }

    } catch (err) {
        res.status(500).json(err);
    }
}

exports.login = async (req, res) => {
    const { firstName, password } = req.body;

    const user = await userDb.findOne({ firstName });

    if (!user) {
        return res.status(400).json("No User Find");
    }

    const hashPassword = await bcrypt.compare(password, user.password);

    if (!hashPassword) {
        return res.status(400).json({ message: "password is incorrect" });
    }

    const token = jwt.sign({ user }, process.env.USER_key);
    console.log(token);
    res.status(200).json({token, user});
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

exports.delete = async (req, res) => {
    try {
        const id = req.query.id;
        await userDb.findByIdAndDelete(id)
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ Error: "an internal error", err });
    }
}
