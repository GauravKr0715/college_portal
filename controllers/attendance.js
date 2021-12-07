const attendance_repo = require('../models/attendance_repo');
const section_repo = require('../models/section_repo');
const student_repo = require('../models/student_repo');
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
};

const getReportForStudent = async (roll_no) => {
  try {
    const student_data = await student_repo.fetchOneCertainFields("section full_name", { roll_no });
    const section_data = await section_repo.fetchCertainFieldsByCondition("classes", { name: student_data.section });
    let result_array = [];
    let inter_array = section_data.classes.map(async c => {
      let class_id = c.class_id;
      let curr_attendances = await attendance_repo.fetchAllByCondition({ class_id });
      let curr_result = {};
      curr_result.class_id = class_id;
      curr_result.subject_name = c.subject_name;
      curr_result.faculty_name = c.faculty_name;
      curr_result.total_classes = curr_attendances.length;
      curr_result.classes_taken = 0;
      curr_result.percentage = 0;
      curr_attendances.forEach(record => {
        if (record.present_students.some(r_no => r_no === roll_no)) {
          curr_result.classes_taken += 1;
        }
      });
      if (curr_result.total_classes !== 0) {
        curr_result.percentage = (curr_result.classes_taken / curr_result.total_classes) * 100;
      }
      console.log(curr_result);
      result_array.push(curr_result);
    });

    await Promise.all(inter_array);
    console.log(result_array);
    return {
      success: true,
      message: 'Attendance Report fetched successfully',
      data: result_array
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
  addAttendance,
  getReportForStudent
}