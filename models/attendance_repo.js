const Attendance = require('./Attendance');

module.exports = {
  add: async (details) => {
    try {
      return await new Attendance(details).save();
    } catch (error) {
      throw error;
    }
  },

  fetchOneAndConditions: async (condition) => {
    try {
      return await Attendance.findOne(condition);
    } catch (error) {
      throw error;
    }
  },

  fetchAllByCondition: async (condition) => {
    try {
      return await Attendance.find(condition);
    } catch (error) {
      throw error;
    }
  }
}