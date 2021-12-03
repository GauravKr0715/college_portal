const mongoose = require('mongoose');
const assignmentSchema = mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  faculty_id: {
    type: String,
    required: true
  },
  faculty_name: {
    type: String,
    required: true
  },
  class_id: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  createdAt: {
    type: String,
    required: true
  },
  due_date: {
    type: String,
    default: null
  },
  files: {
    type: [String],
    default: null
  }
});

module.exports = mongoose.model('assignment', assignmentSchema);