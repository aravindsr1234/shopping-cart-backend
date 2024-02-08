const userDb = require('../model/user');
const newId = require('../functions/uid');
const { use } = require('../routes/categoryRouter');
const { createPost } = require('../controller/cartController');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const mongoose = require('mongoose');

// exports.find = async (req, res) => {
//     try {
//         const id = req.query.id;
//         if (id) {
//             const result = await userDb.findById(id);
//             res.status(200).json(result);
//             return 0;
//         }
//         const result = await userDb.find();
//         res.status(200).json(result);

//     } catch (err) {
//         console.log(err);
//     }
// }

exports.find = async (req, res) => {
    try {
        console.log("query", req.query);
        let { search } = req.query;
        let page = parseInt(req.query.page) || 1;
        let size = parseInt(req.query.size) || 5;
        const limit = size;
        const skip = (page - 1) * size;

        const pipeline = [];

        const matchConditions = [
            { firstName: { $regex: search, $options: 'i' } },
            { lastName: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } }
        ];

        if (mongoose.Types.ObjectId.isValid(search)) {
            matchConditions.push({ _id: new mongoose.Types.ObjectId(search) });
        }

        if (search) {
            pipeline.push({
                $match: {
                    $or: matchConditions
                },
            });
        }

        const facetStage = {
            $facet: {
                users: [
                    ...pipeline,
                    { $skip: skip },
                    { $limit: limit },
                ],
                usersCount: [{ $count: 'totalCount' }],
            },
        };

        pipeline.push(facetStage);

        const result = await userDb.aggregate(pipeline).exec();

        const { users, usersCount } = result[0];

        res.status(200).json({ users, usersCount });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
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
    res.status(200).json({ token, user });
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

exports.search = async (req, res) => {
    try {
        const result = await userDb.aggregate([
            {
                $match: {
                    $or: [
                        { userName: { $regex: query, $options: "i" } },
                        // { description: { $regex: query, $options: "i" } },
                        // { price: { $gte: minPrice, $lte: maxPrice } }
                    ]
                }
            },
        ]);
        console.log(result);

    } catch (error) {
        res.status(500).json({ error: "an internal error", error });
    }
}