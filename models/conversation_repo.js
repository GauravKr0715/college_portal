const Conversation = require('./Conversation');

module.exports = {
  add: async (details) => {
    try {
      return await new Conversation(details).save();
    } catch (error) {
      throw error;
    }
  },

  fetchOneAndConditions: async (condition) => {
    try {
      return await Conversation.findOne(condition);
    } catch (error) {
      throw error;
    }
  },

  fetchAllByCondition: async (condition) => {
    try {
      return await Conversation.find(condition);
    } catch (error) {
      throw error;
    }
  }
}