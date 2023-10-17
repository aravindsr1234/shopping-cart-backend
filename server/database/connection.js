const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const con = await mongoose.connect(process.env.DATABASE, {
        })
        console.log(`Mongo started on ${con.connection.host}`);
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDb;