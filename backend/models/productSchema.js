const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Name'],
  },
  description: {
    type: String,
    required: [true, 'Please Enter Description'],
  },
  price: {
    type: Number,
    required: [true, 'Please Enter Price'],
  },
  stock: {
    type: Number,
    required: [true, 'Please Enter Stock'],
  },

  images: [{ public_id: String, url: String }],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
