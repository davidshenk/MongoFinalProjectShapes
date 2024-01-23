const mongoose = require('mongoose');

const lineSchema = new mongoose.Schema({
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
  vertical: { required: true, type: Boolean },
  color: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('line', lineSchema);
