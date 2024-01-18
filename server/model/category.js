const mongoose = require('mongoose');

const category = mongoose.Schema({
    categoryName : String,
    id : String,
    delete: String,
    image: String
});

const categoryDb= mongoose.model('category', category);

module.exports = categoryDb;