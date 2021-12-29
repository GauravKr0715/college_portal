const Section = require('./Section');

module.exports = {
  add: async (details) => {
    try {
      const saved_data = await new Section(details).save();
      return saved_data;
    } catch (error) {
      throw error;
    }
  },

  getAllWithCondition: async (condition) => {
    try {
      return await Section.find(condition);
    } catch (error) {
      throw error;
    }
  },

  fetchOne: async (condition) => {
    try {
      return await Section.findOne(condition);
    } catch (error) {
      throw error;
    }
  },

  update: async (details, condition) => {
    try {
      const updated_data = await Section.updateOne(condition, {
        $set: details
      })
      return updated_data;
    } catch (error) {
      throw error;
    }
  },

  updateDetailsByPush: async (details, condition, field_name) => {
    try {
      let push_obj = {};
      push_obj[`${field_name}`] = details;
      return await Section.findOneAndUpdate(
        condition,
        {
          $push: push_obj
        }
      )
    } catch (error) {
      throw error;
    }
  },

  fetchCertainFieldsByCondition: async (field_string, condition) => {
    try {
      return await Section.findOne(condition).select(field_string);
    } catch (error) {
      throw error;
    }
  }
}