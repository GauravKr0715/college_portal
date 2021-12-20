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

  updateOne: async (details, condition) => {
    try {
      return await Assignment.findOneAndUpdate(condition, details);
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
  },

  delete: async (condition) => {
    try {
      return await Assignment.findOneAndDelete(condition);
    } catch (error) {
      throw error;
    }
  }
}