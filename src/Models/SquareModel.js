const mongoose = require('mongoose');

const squareSchema = new mongoose.Schema({
  type: { required: true, type: String },
  x: {
    required: true,
    type: Number,
  },
  y: {
    required: true,
    type: Number,
  },
  length: {
    required: true,
    type: Number,
  },
  color: {
    required: true,
    type: String,
  },
});
module.exports = mongoose.model('square', squareSchema);
