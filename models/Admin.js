const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
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
  role: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("admin", adminSchema);