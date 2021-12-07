const Assignment = require('./Assignment');

module.exports = {
  add: async (details) => {
    try {
      const saved_data = await new Assignment(details).save();
      return saved_data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async (condition) => {
    try {
      return await Assignment.find(condition);
    } catch (error) {
      throw error;
    }
  },

  getAllWithCertainFields: async (field_string, condition) => {
    try {
      return await Assignment.find(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  },

  getOneCertainFields: async (field_string, condition) => {
    try {
      return await Assignment.findOne(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  }
}