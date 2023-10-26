const mongoose = require('mongoose');

const admin = mongoose.Schema({
    userName : String,
    password : String,
    email : String,
    phone : String,
    adminId:String
})

const adminDb = mongoose.model('admin', admin);

module.exports = adminDb;