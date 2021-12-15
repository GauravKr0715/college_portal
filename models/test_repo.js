const Test = require('./Test');

module.exports = {
  add: async (details) => {
    try {
      const saved_data = await new Test(details).save();
      return saved_data;
    } catch (error) {
      throw error;
    }
  },

  updateOne: async (details, condition) => {
    try {
      return await Test.findOneAndUpdate(condition, details);
    } catch (error) {
      throw error;
    }
  },

  getAll: async (field_string, condition) => {
    try {
      return await Test.find(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  },

  getAllWithCertainFields: async (field_string, condition) => {
    try {
      return await Test.find(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  },

  getOneCertainFields: async (field_string, condition) => {
    try {
      return await Test.findOne(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  },

  delete: async (condition) => {
    try {
      return await Test.findOneAndDelete(condition);
    } catch (error) {
      throw error;
    }
  }
}