const Feed = require('./Feed');

module.exports = {
  add: async (details) => {
    try {
      const saved_data = await new Feed(details).save();
      return saved_data;
    } catch (error) {
      throw error;
    }
  },

  fetchOne: async (condition) => {
    try {
      return await Feed.findOne(condition);
    } catch (error) {
      throw error;
    }
  },

  fetchOneCertainFields: async (field_string, condition) => {
    try {
      return await Feed.findOne(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  },

  fetchAll: async (condition) => {
    try {
      return await Feed.find(condition);
    } catch (error) {
      throw error;
    }
  },

  fetchAllCertainFields: async (field_string, condition) => {
    try {
      return await Feed.find(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  },

  fetchOneOrConditions: async (condition) => {
    try {
      return await Feed.find({
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
      return await Feed.findOneAndUpdate(
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