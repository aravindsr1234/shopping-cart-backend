const adminDb = require('../model/admin');
const newId = require('../functions/uid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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


exports.register = async (req, res) => {
    try {
        const ID = newId("AD");
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Missing the user data" });
        }
        const password =await bcrypt.hash(req.body.password, 10);
        const admin = await adminDb.create({
            userName: req.body.userName,
            password: password,
            adminId: ID,
            email: req.body.email,
            phone: req.body.phone
        })

        res.status(200).json(admin);

    } catch (err) {
        res.status(500).json(err);
    }
}

exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ message: "no data" });
        }

        const admin = await adminDb.findOne({ userName });

        if (!admin) {
            return res.status(404).json({ message: "no admin" }); 
        }

        const passwordMatch = await bcrypt.compare(password, admin.password);

        if (!passwordMatch) {
            return res.status(400).json({ message: "password is incorrect" });
        }

        const token = jwt.sign({ userName: userName, password: password }, process.env.Admin_Key);

        res.status(200).json({ token: token }); 

    } catch (error) {
        res.status(500).json(error);
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