const mongoose = require('mongoose');

const user = mongoose.Schema({
    firstName : String,
    lastName : String,
    userId : String,
    email : String,
    password : String,
    city : String,
    state : String,
    address : String,
});

const userDb = mongoose.model('user', user);

module.exports = userDb;