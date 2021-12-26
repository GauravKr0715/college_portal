const mongoose = require('mongoose');
const deptSchema = mongoose.Schema({
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
  head_id: {
    type: String
  },
  head_name: {
    type: String
  },
  subjects: {
    type: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("department", deptSchema);