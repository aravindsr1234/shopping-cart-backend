const jwt = require('jsonwebtoken');
require('dotenv').config();
const key = process.env.Admin_Key;

async function verifyAdmin(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(400).json({ message: "" });
    }

    jwt.verify(token, key, (error, decode) => {
        if (error) {
            return res.status(400).json(error);
        }
        req.user = decode;
        next();
    });
}

module.exports = verifyAdmin;