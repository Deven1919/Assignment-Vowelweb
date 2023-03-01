const mongoose = require('mongoose');
const User = require('../model/userModel');

exports.getAllUser = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: 'Success',
      results: user.length,
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'F',
      message: err.message,
    });
  }
};
exports.getUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json({
      status: 'Success',
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'F',
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const update = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'Success',
      data: {
        update,
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
exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.deleteOne({ id });

    res.status(200).json({
      status: 'Success',
      user,
      message: 'Deletion successfull!.',
    });
  } catch (err) {
    res.status(404).json({
      status: 'F',
      message: err.message,
    });
  }
};
