const mongoose = require('mongoose');

const adminAuth = mongoose.Schema({

})

const adminAuthDb = mongoose.model('adminAuth', adminAuth);

module.exports = adminAuthDb;