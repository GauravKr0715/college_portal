const mongoose = require('mongoose');
const announcementSchema = mongoose.Schema({
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
  section: {
    type: String,
    required: true
  },
  message: {
    type: String,
    default: null
  },
  links: [{
    uid: String,
    title: String,
    url: String
  }],
  createdAt: {
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

module.exports = mongoose.model('announcement', announcementSchema);