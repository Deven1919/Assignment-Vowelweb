const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'Name required'],
    minLength: 5,
    maxLength: 20,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Price is must'],
  },
  quantity: {
    type: Number,
    required: [true],
  },
  // address: {
  //   type: String,
  //   required: [true, 'Address is must'],
  // },
  // contact: {
  //   type: Number,
  //   required: [true, 'Contact is must'],
  // },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
