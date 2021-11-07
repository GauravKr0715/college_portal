const mongoose = require('mongoose');
const sectionSchema = mongoose.Schema({
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
  classes: [{
    class_id: String,
    subject_id: String,
    subject_name: String,
    subject_type: Number,
    faculty_id: String,
    faculty_name: String
  }],
  time_table: [[{
    slot_id: String,
    class_id: String,
    subject_name: String,
    faculty_name: String
  }]],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("section", sectionSchema);