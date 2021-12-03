const attendance_repo = require('../models/attendance_repo');
const logger = require('../helpers/logger');
const moment = require('moment');

const addAttendance = async (details) => {
  try {
    // const todays_date = moment().subtract(3, 'days').format('DD-MM-yyyy');
    const todays_date = moment().format('DD-MM-yyyy');
    const existing_record = await attendance_repo.fetchOneAndConditions(
      { date: todays_date, class_id: details.class_id }
    );

    // console.log(existing_record);

    if (existing_record) {
      // record already exists
      let new_present_students_list = details.all_students.filter(student => {
        return student.is_present
      }).map(student => student.roll_no);
      existing_record.present_students = new_present_students_list;
      existing_record.updatedAt = moment().unix() + "";
      await existing_record.save();

    } else {
      // no old record found
      let new_attendance = {};
      new_attendance.date = todays_date;
      new_attendance.class_id = details.class_id;
      new_attendance.section = details.section;
      new_attendance.updatedAt = moment().unix() + "";
      new_attendance.present_students = details.all_students.filter(student => {
        return student.is_present
      }).map(student => student.roll_no);
      await attendance_repo.add(new_attendance);
    }

    return {
      success: true,
      message: 'Attendance added Successfully'
    }
  } catch (error) {
    logger.error(error);

    return {
      success: false,
      message: 'Some error occured'
    }
  }
}

module.exports = {
  addAttendance
}