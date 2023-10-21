const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Please Enter Category'],
  },
});

const Category = mongoose.model('Category', schema);

module.exports = Category;
