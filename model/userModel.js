const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    maxLength: [20],
    minLength: [10],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    validate: [validator.isEmail, 'Enter valid email ID'],
  },
  password: {
    type: String,
    required: [true, 'password required'],
    minLength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, 'password required'],
    validate: {
      validator: function (el) {
        return el == this.password;
      },
    },
  },
  passwordChangedAt: {
    type: Date,
    default: Date,
  },
  contact: {
    type: Number,
    required: [true, 'Contact Number is required'],
    maxLength: 10,
    minLength: 10,
    select: false,
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    select: false,
  },
});

// Query middleware only use save ,create
// pre hooks is invoke at the time of adding the data to database
// so it is good to hash the password at the starting of process then it persisted
// to database
// this point to the current schema
userSchema.pre('save', async function (next) {
  console.log(this);
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

// Instance method
// for compare the password
userSchema.methods.correctPassword = function (password, candidatePassword) {
  return bcrypt.compare(password, candidatePassword);
};

userSchema.methods.passwordChanged = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changeTime = parseInt(this.passwordChangedAt.getTime() / 1000, 10);

    JWTTimestamp < changeTime;
    console.log(changeTime);
  }
  return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
