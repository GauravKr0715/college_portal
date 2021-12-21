const AssignmentSubmission = require('./AssignmentSubmission');

module.exports = {
  add: async (details) => {
    try {
      const saved_data = await new AssignmentSubmission(details).save();
      return saved_data;
    } catch (error) {
      throw error;
    }
  },

  updateOne: async (details, condition) => {
    try {
      return await AssignmentSubmission.findOneAndUpdate(condition, details);
    } catch (error) {
      throw error;
    }
  },

  fetchOneCertainFields: async (field_string, condition) => {
    try {
      return await AssignmentSubmission.findOne(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  },

  getAll: async (condition) => {
    try {
      return await AssignmentSubmission.find(condition);
    } catch (error) {
      throw error;
    }
  },

  getAllWithCertainFields: async (field_string, condition) => {
    try {
      return await AssignmentSubmission.find(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  },

  delete: async (condition) => {
    try {
      return await AssignmentSubmission.findOneAndDelete(condition);
    } catch (error) {
      throw error;
    }
  }
}