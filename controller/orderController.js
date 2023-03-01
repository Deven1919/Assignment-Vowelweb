const { find } = require('../model/orderPlaced');
const OrderPlaced = require('../model/orderPlaced');

exports.AllOrder = async (req, res, next) => {
  try {
    const order = await OrderPlaced.find();
    res.status(200).json({
      status: 'Success',
      order,
    });
  } catch (err) {
    res.status(404).json({
      status: 'F',
      message: err.message,
    });
  }
};
exports.createOrder = async (req, res, next) => {
  try {
    const order = await OrderPlaced.create(req.body);
    res.status(200).json({
      status: 'Success',
      order,
    });
  } catch (err) {
    res.status(404).json({
      status: 'F',
      message: err.message,
    });
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await OrderPlaced.findById(id);
    res.status(200).json({
      status: 'Success',
      order,
    });
  } catch (err) {
    res.status(404).json({
      status: 'F',
      message: err.message,
    });
  }
};
