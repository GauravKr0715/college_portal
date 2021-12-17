const mongoose = require('mongoose');
const testSubmissionSchema = mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  test_id: {
    type: String,
    required: true
  },
  student_id: {
    type: String,
    required: true
  },
  student_name: {
    type: String,
    required: true
  },
  response: {
    type: String,
    default: null
  },
  files: {
    type: [String],
    default: null
  },
  marks_scored: {
    type: String,
    default: null
  },
  createdAt: {
    type: String,
    required: true
  },
  last_edit_date: {
    type: String,
    default: null
  },
});

module.exports = mongoose.model('testSubmission', testSubmissionSchema);