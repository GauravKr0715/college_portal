const Subject = require('./Subject');

module.exports = {
  add: async (details) => {
    try {
      const saved_data = await new Subject(details).save();
      return saved_data;
    } catch (error) {
      throw error;
    }
  },

  getAll: async () => {
    try {
      return await Subject.find();
    } catch (error) {
      throw error;
    }
  },

  getAllWithCondition: async (condition) => {
    try {
      return await Subject.find(condition);
    } catch (error) {
      throw error;
    }
  },

  update: async (details, condition) => {
    try {
      const updated_data = await Subject.updateOne(condition, {
        $set: details
      })
      return updated_data;
    } catch (error) {
      throw error;
    }
  },

  delete: async (condition) => {
    try {
      return await Subject.deleteOne({ condition });
    } catch (error) {
      throw error;
    }
  }
}