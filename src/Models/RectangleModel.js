const mongoose = require('mongoose');

const rectangleSchema = new mongoose.Schema({
  type: { required: true, type: String },
  x: {
    required: true,
    type: Number,
  },
  y: {
    required: true,
    type: Number,
  },
  width: {
    required: true,
    type: Number,
  },
  height: {
    required: true,
    type: Number,
  },
  color: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('rectangle', rectangleSchema);
