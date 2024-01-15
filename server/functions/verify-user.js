const jwt = require('jsonwebtoken');
require('dotenv').config();
const key = process.env.USER_KEY;

const verifyUser = async (req, res, next) => {
    console.log("hellllll")
    const token = req.headers['authorization'];

    if(!token) {
        return res.status(400).json({message: "no token"});
    }

    jwt.verify(token, key, (err, decode) => {
        if(err) {
            return res.status(400).json(err);
        }
        req.user = decode;
        console.log('success')
        next();
    });
};

module.exports = verifyUser;