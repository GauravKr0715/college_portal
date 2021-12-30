const mongoose = require('mongoose');
const feedSchema = mongoose.Schema({
  uid: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
  }
});

module.exports = mongoose.model("feed", feedSchema);