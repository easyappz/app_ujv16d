const mongoose = require('mongoose');
const { hashPassword, comparePasswords } = require('../utils/auth');

// User Schema definition
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to hash password before saving
userSchema.pre('save', async function(next) {
  try {
    if (this.isModified('password')) {
      this.password = await hashPassword(this.password);
    }
    this.updatedAt = Date.now();
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await comparePasswords(candidatePassword, this.password);
};

module.exports = userSchema;
