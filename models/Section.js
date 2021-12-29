const mongoose = require('mongoose');
const sectionSchema = mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  sem: {
    type: Number,
    reuired: true
  },
  dept: {
    type: String
  },
  year: {
    type: String
  },
  coordinator_name: {
    type: String
  },
  classes: [{
    class_id: String,
    subject_id: String,
    subject_name: String,
    subject_type: Number,
    faculty_id: String,
    faculty_name: String,
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
    faculty_id: String,
    faculty_name: String,
    is_changed: Boolean
  }]],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("section", sectionSchema);