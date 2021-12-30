const mongoose = require('mongoose');
const conversationSchema = mongoose.Schema({
  members: {
    type: Array
  }
});

module.exports = mongoose.model("conversation", conversationSchema);