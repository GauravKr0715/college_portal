const mongoose = require('mongoose');
const testSchema = mongoose.Schema({
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
    required: true
  },
  total_marks: {
    type: String,
    required: true
  },
  files: {
    type: [String],
    default: null
  },
  last_edit_date: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model('test', testSchema);