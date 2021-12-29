const Student = require('./Student');

module.exports = {
  add: async (details) => {
    try {
      const saved_data = await new Student(details).save();
      return saved_data;
    } catch (error) {
      throw error;
    }
  },

  fetchOne: async (condition) => {
    try {
      return await Student.findOne(condition);
    } catch (error) {
      throw error;
    }
  },

  fetchOneCertainFields: async (field_string, condition) => {
    try {
      return await Student.findOne(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  },

  fetchOneOrConditions: async (condition) => {
    try {
      return await Student.find({
        $or: condition
      });
    } catch (error) {
      throw error;
    }
  },

  fetchAllByCondition: async (condition) => {
    try {
      return await Student.find(condition);
    } catch (error) {
      throw error;
    }
  },

  fetchAllByConditionCertainFields: async (field_string, condition) => {
    try {
      return await Student.find(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  },

  updateOne: async (details, condition) => {
    try {
      return await Student.findOneAndUpdate(condition, details);
    } catch (error) {
      throw error;
    }
  },
}