const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
  foodname: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  quantity: {
      type: Number,
      required: true,
      trim: true
  },
  expiryDate: {
        type: Date,
        required: true
  }
}, {
  timestamps: true,
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;