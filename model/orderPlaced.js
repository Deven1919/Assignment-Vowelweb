const Product = require('../model/productModel');
const User = require('../model/userModel');
const mongoose = require('mongoose');

const orderPlacedSchema = mongoose.Schema({
  orderPlacedHistory: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
    },
  ],
  username: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
});
// Query middleware
// this points to the query
// All the query start with find going to give this results.
orderPlacedSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'orderPlacedHistory',
    select: ' productName price quantity -_id  ',
  }).populate({
    path: 'username',
    select: ' name email contact address -_id ',
  });

  next();
});

const OrderPlaced = mongoose.model('OrderPlaced', orderPlacedSchema);
module.exports = OrderPlaced;
