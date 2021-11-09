const Department = require('./Department');

module.exports = {
  add: async (details) => {
    try {
      const saved_data = await new Department(details).save();
      return saved_data;
    } catch (error) {
      throw error;
    }
  },

  update: async (details, condition) => {
    try {
      const updated_data = await Department.updateOne(condition, {
        $set: details
      })
      return updated_data;
    } catch (error) {
      throw error;
    }
  },

  updateSubjects: async (details, condition) => {
    try {
      const updated_data = await Department.updateOne(condition, {
        $push: details
      })
      return updated_data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (condition) => {
    try {
      return await Department.deleteOne({ condition });
    } catch (error) {
      throw error;
    }
  }
}