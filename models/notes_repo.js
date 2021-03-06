const Note = require('./Note');

module.exports = {
  add: async (details) => {
    try {
      const saved_data = await new Note(details).save();
      return saved_data;
    } catch (error) {
      throw error;
    }
  },

  updateOne: async (details, condition) => {
    try {
      return await Note.findOneAndUpdate(condition, details);
    } catch (error) {
      throw error;
    }
  },

  getAll: async (field_string, condition) => {
    try {
      return await Note.find(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  },

  getAllWithCertainFields: async (field_string, condition) => {
    try {
      return await Note.find(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  },

  getOneCertainFields: async (field_string, condition) => {
    try {
      return await Note.findOne(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  },

  delete: async (condition) => {
    try {
      return await Note.findOneAndDelete(condition);
    } catch (error) {
      throw error;
    }
  }
}