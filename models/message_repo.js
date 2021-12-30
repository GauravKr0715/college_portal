const Message = require('./Message');

module.exports = {
  add: async (details) => {
    try {
      return await new Message(details).save();
    } catch (error) {
      throw error;
    }
  },

  fetchOneAndConditions: async (condition) => {
    try {
      return await Message.findOne(condition);
    } catch (error) {
      throw error;
    }
  },

  fetchAllByCondition: async (condition) => {
    try {
      return await Message.find(condition);
    } catch (error) {
      throw error;
    }
  }
}