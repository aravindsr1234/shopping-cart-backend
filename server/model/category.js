const mongoose = require('mongoose');

const category = mongoose.Schema({
    categoryName : String,
    id : String,
});

const categoryDb= mongoose.model('category', category);

module.exports = categoryDb;