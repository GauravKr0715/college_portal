const mongoose = require('mongoose');
const messageSchema = mongoose.Schema({
  conversation_id: {
    type: String
  },
  sender: {
    type: String
  },
  text: {
    type: String
  },
  createdAt: {
    type: String,
  }
});

module.exports = mongoose.model("message", messageSchema);