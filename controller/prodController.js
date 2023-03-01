const Product = require('../model/productModel');

exports.createProduct = async (req, res, next) => {
  try {
    const prod = await Product.create(req.body);
    res.status(200).json({
      status: 'Success',
      data: {
        prod,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'F',
      message: err.message,
    });
  }
};
exports.getAllProduct = async (req, res, next) => {
  try {
    const getAll = await Product.find();
    res.status(200).json({
      status: 'Success',
      results: getAll.length,
      data: {
        getAll,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'F',
      message: err.message,
    });
  }
};
exports.getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const getProd = await Product.findById({ _id: id });
    res.status(200).json({
      status: 'Success',
      data: {
        getProd,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'F',
      message: err.message,
    });
  }
};
exports.updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateProd = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'Success',
      data: {
        updateProd,
      },
      message: 'updation successfull!.',
    });
  } catch (err) {
    res.status(404).json({
      status: 'F',
      message: err.message,
    });
  }
};
exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteProd = await Product.deleteOne({ id });

    res.status(200).json({
      status: 'Success',
      deleteProd,
      message: 'Deletion successfull!.',
    });
  } catch (err) {
    res.status(404).json({
      status: 'F',
      message: err.message,
    });
  }
};
