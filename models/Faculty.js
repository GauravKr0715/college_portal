const mongoose = require('mongoose');
const facultySchema = mongoose.Schema({
  uni_id: {
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
  dept: {
    type: String,
    required: true
  },
  yoj: {
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
  classes: [{
    class_id: String,
    subject_id: String,
    subject_name: String,
    subject_type: Number,
    section: String,
    link: {
      uid: String,
      title: String,
      url: String
    }
  }],
  time_table: [[{
    slot_id: String,
    class_id: String,
    subject_id: String,
    subject_name: String,
    subject_type: Number,
    section: String
  }]],
  links: [{
    uid: String,
    title: String,
    url: String
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("faculty", facultySchema);