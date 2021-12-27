const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
  roll_no: {
    type: String,
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String
  },
  course: {
    type: String,
    required: true
  },
  yop: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  display_password: {
    type: String
  },
  section: {
    type: String
  },
  createdAt: {
    type: String,
  }
});

module.exports = mongoose.model("student", studentSchema);