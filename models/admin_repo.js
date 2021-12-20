const Admin = require('./Admin');

module.exports = {
  add: async (details) => {
    try {
      const saved_data = await new Admin(details).save();
      return saved_data;
    } catch (error) {
      throw error;
    }
  },

  fetchOne: async (condition) => {
    try {
      return await Admin.findOne(condition);
    } catch (error) {
      throw error;
    }
  },

  fetchOneCertainFields: async (field_string, condition) => {
    try {
      return await Admin.findOne(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  },

  fetchOneOrConditions: async (condition) => {
    try {
      return await Admin.find({
        $or: condition
      });
    } catch (error) {
      throw error;
    }
  },

  updateDetailsByPush: async (details, condition, field_name) => {
    try {
      let push_obj = {};
      push_obj[`${field_name}`] = details;
      return await Admin.findOneAndUpdate(
        condition,
        {
          $push: push_obj
        }
      )
    } catch (error) {
      throw error;
    }
  }
}