const mongoose = require('mongoose');
const subjectSchema = mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  sem: {
    type: Number,
    reuired: true
  },
  dept: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("subject", subjectSchema);