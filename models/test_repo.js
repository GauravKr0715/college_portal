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

  getAll: async (field_string, condition) => {
    try {
      return await Test.find(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  }
}