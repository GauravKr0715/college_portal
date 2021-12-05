const TestSubmission = require('./TestSubmission');

module.exports = {
  add: async (details) => {
    try {
      const saved_data = await new TestSubmission(details).save();
      return saved_data;
    } catch (error) {
      throw error;
    }
  },

  fetchOneCertainFields: async (field_string, condition) => {
    try {
      return await TestSubmission.findOne(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  },

  getAll: async (condition) => {
    try {
      return await TestSubmission.find(condition);
    } catch (error) {
      throw error;
    }
  },

  getAllWithCertainFields: async (field_string, condition) => {
    try {
      return await TestSubmission.find(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  }
}