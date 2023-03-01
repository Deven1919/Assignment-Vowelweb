const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signIn = (id) => {
  return jwt.sign({ _id: id }, process.env.KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });
};

exports.signup = async (req, res, next) => {
  try {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      contact: req.body.contact,
      address: req.body.address,
    }); // reason to declare like this we want any one that they insert other info.
    const token = signIn(user._id);
    // console.log(token);
    res.status(200).json({
      status: 'Success',
      user,
      token,
    });
  } catch (err) {
    res.status(200).json({
      status: 'F',
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error('Please enter Email & Password');
    }
    const user = await User.findOne({ email }).select('+password');
    // console.log(user);
    //console.log(req.headers.authorization.split(' ')[1]);
    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new Error('Invalid password.');
    }
    const token = signIn(user._id);
    res.status(200).json({
      status: 'Success',
      token,
    });
  } catch (err) {
    res.status(404).json({
      status: 'F',
      message: err.message,
    });
  }
};

exports.protect = async (req, res, next) => {
  // Getting the token if it is there
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = await req.headers.authorization.split(' ')[1];
    }
    //  console.log(token);
    if (!token) {
      throw new Error('You are not logged Inn.');
    }
    // verifying the token
    // It return callback function also it return promise so
    // here  handle it using promisify
    const decoded = await promisify(jwt.verify)(token, process.env.KEY);
    console.log(decoded);
    const currentUser = await User.findById(decoded._id);
    console.log(currentUser);
    if (!currentUser) throw new Error('User belong to this token not exists');
    if (currentUser.passwordChanged(decoded.iat)) {
      throw new Error('User recently changed password! Please log in again.');
    }
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(404).json({
      status: 'F',
      message: err.message,
    });
  }
};
